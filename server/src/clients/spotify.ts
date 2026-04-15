import type { RedisClient } from "bun";
import { config } from "config.js";
import { dominantColor } from "../utils/dominant.js";
import { fetch } from "./fetch.js";

export const REDIS_SPOTIFY_REFRESH_TOKEN = `${config.REDIS_PREFIX}spotify:refresh_token`;
export const REDIS_SPOTIFY_ACCESS_TOKEN = `${config.REDIS_PREFIX}spotify:access_token`;
export const REDIS_LAST_UPDATE_ON = `${config.REDIS_PREFIX}spotify:last_update_on`;
export const REDIS_SPOTIFY_TOP_ARTISTS = `${config.REDIS_PREFIX}spotify:top_artists`;

/**
 * Returns a valid access token by checking Redis first, then attempting a
 * refresh if needed. Returns null when no refresh token exists. Throws on
 * refresh failure so callers can apply their own error-handling strategy.
 */
export async function ensureAccessToken(
	redis: RedisClient,
	spotify: SpotifyClient,
): Promise<string | null> {
	const existing = await redis.get(REDIS_SPOTIFY_ACCESS_TOKEN);
	if (existing) return existing;

	const refreshToken = await redis.get(REDIS_SPOTIFY_REFRESH_TOKEN);
	if (!refreshToken) return null;

	const data = await spotify.refreshAccessToken(refreshToken);

	await redis.set(
		REDIS_SPOTIFY_ACCESS_TOKEN,
		data.access_token,
		"EX",
		data.expires_in - 60,
	);

	if (data.refresh_token) {
		await redis.set(REDIS_SPOTIFY_REFRESH_TOKEN, data.refresh_token);
	}

	return data.access_token;
}

interface ExternalIds {
	isrc: string;
}

interface Item {
	album: Album;
	artists: Artist[];
	available_markets: string[];
	disc_number: number;
	duration_ms: number;
	explicit: boolean;
	external_ids: ExternalIds;
	external_urls: ExternalUrls;
	href: string;
	id: string;
	is_local: boolean;
	name: string;
	popularity: number;
	preview_url: string | null;
	track_number: number;
	type: string;
	uri: string;
}

interface Album {
	album_type: string;
	artists: Artist[];
	available_markets: string[];
	external_urls: ExternalUrls;
	href: string;
	id: string;
	images: Image[];
	name: string;
	release_date: string;
	release_date_precision: string;
	total_tracks: number;
	type: string;
	uri: string;
}

interface Artist {
	external_urls: ExternalUrls;
	href: string;
	id: string;
	name: string;
	type: string;
	uri: string;
}

interface Context {
	external_urls: ExternalUrls;
	href: string;
	type: string;
	uri: string;
}

interface ExplicitContent {
	filter_enabled: boolean;
	filter_locked: boolean;
}

interface ExternalUrls {
	spotify: string;
}

interface Followers {
	href: string;
	total: number;
}

interface Image {
	url: string;
	height: number;
	width: number;
}

interface Actions {
	disallows: Disallows;
}

interface Disallows {
	pausing: boolean;
}

interface TopArtist extends Artist {
	followers: Followers;
	genres: string[];
	images: Image[];
	popularity: number;
}

export type TimeRange = "short_term" | "medium_term" | "long_term";

interface AccessTokenResponse {
	access_token: string;
	refresh_token: string;
	expires_in: number;
	token_type: string;
	scope: string;
}

interface RefreshTokenResponse {
	access_token: string;
	expires_in: number;
	token_type: string;
	scope: string;
	refresh_token?: string;
}

interface UserProfileResponse {
	country: string;
	display_name: string;
	email: string;
	explicit_content: ExplicitContent;
	external_urls: ExternalUrls;
	followers: Followers;
	href: string;
	id: string;
	images: Image[];
	product: string;
	type: string;
	uri: string;
}

interface CurrentlyPlayingResponse {
	timestamp: number;
	context: Context;
	progress_ms: number;
	item: Item;
	currently_playing_type: string;
	actions: Actions;
	is_playing: boolean;
}

interface TopArtistsResponse {
	items: TopArtist[];
	total: number;
	limit: number;
	offset: number;
	href: string;
	next: string | null;
	previous: string | null;
}

/**
 * Typed JSON parser for API responses. Response.json() returns
 * Promise<unknown>; this centralizes the single unavoidable
 * narrowing so call-sites stay assertion-free.
 */
function parseJson<T>(response: Response): Promise<T> {
	return response.json() as Promise<T>;
}

export default class SpotifyClient {
	private basicAuth: string;

	constructor(
		private clientId: string,
		clientSecret: string,
		private redirectUri: string,
	) {
		this.basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString(
			"base64",
		);
	}

	async formatTrack(
		playing: Awaited<ReturnType<typeof this.getMyCurrentPlayingTrack>>,
		now = new Date(),
	) {
		if (!playing) return null;

		const albumImage = playing.item.album.images[0]?.url ?? "";

		return {
			id: playing.item.id,
			song: {
				title: playing.item.name,
				artists: playing.item.artists.map((artist) => artist.name).join(", "),
				url: playing.item.external_urls.spotify,
			},
			album: {
				name: playing.item.album.name,
				image: albumImage,
				color: await dominantColor(albumImage),
				url: playing.item.album.external_urls.spotify,
			},
			progress: {
				start: new Date(now.getTime() - playing.progress_ms),
				end: new Date(
					now.getTime() + playing.item.duration_ms - playing.progress_ms,
				),
			},
		};
	}

	getAuthorizationUrl(): string {
		const params = new URLSearchParams({
			client_id: this.clientId,
			response_type: "code",
			redirect_uri: this.redirectUri,
			scope: [
				"user-read-private",
				"user-read-email",
				"user-read-playback-state",
				"user-modify-playback-state",
				"user-top-read",
			].join(" "),
		});

		return `https://accounts.spotify.com/authorize?${params.toString()}`;
	}

	async getAccessToken(code: string) {
		const response = await fetch("https://accounts.spotify.com/api/token", {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
				Authorization: `Basic ${this.basicAuth}`,
			},
			body: new URLSearchParams({
				code,
				redirect_uri: this.redirectUri,
				grant_type: "authorization_code",
			}),
		});

		return parseJson<AccessTokenResponse>(response);
	}

	async refreshAccessToken(refreshToken: string) {
		const response = await fetch("https://accounts.spotify.com/api/token", {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
				Authorization: `Basic ${this.basicAuth}`,
			},
			body: new URLSearchParams({
				refresh_token: refreshToken,
				grant_type: "refresh_token",
			}),
		});

		return parseJson<RefreshTokenResponse>(response);
	}

	async getUserProfile(accessToken: string) {
		const response = await fetch("https://api.spotify.com/v1/me", {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});

		return parseJson<UserProfileResponse>(response);
	}

	async getMyCurrentPlayingTrack(accessToken: string) {
		const response = await fetch(
			"https://api.spotify.com/v1/me/player/currently-playing",
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			},
		);

		if (response.status === 204) return null;

		const parsed = await parseJson<CurrentlyPlayingResponse>(response);

		if (!parsed.is_playing) return null;

		return parsed;
	}

	async getMyTopArtists(
		accessToken: string,
		timeRange: TimeRange = "medium_term",
		limit: number = 10,
	) {
		const response = await fetch(
			`https://api.spotify.com/v1/me/top/artists?time_range=${timeRange}&limit=${limit}`,
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			},
		);

		return parseJson<TopArtistsResponse>(response);
	}

	async formatTopArtists(artists: TopArtist[]) {
		return artists.map((artist) => ({
			id: artist.id,
			name: artist.name,
			image: artist.images[0]?.url,
		}));
	}
}
