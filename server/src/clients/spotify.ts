import { dominantColor } from "../utils/dominant.js";
import { fetch } from "./fetch.js";

export const REDIS_SPOTIFY_REFRESH_TOKEN = "spotify:refresh_token";
export const REDIS_SPOTIFY_ACCESS_TOKEN = "spotify:access_token";
export const REDIS_SPOTIFY_PLAYING = "spotify:playing";

export interface ExternalIds {
	isrc: string;
}

export interface Item {
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
	preview_url: any;
	track_number: number;
	type: string;
	uri: string;
}

export interface Album {
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

export interface Artist {
	external_urls: ExternalUrls;
	href: string;
	id: string;
	name: string;
	type: string;
	uri: string;
}

export interface Context {
	external_urls: ExternalUrls;
	href: string;
	type: string;
	uri: string;
}

export interface ExplicitContent {
	filter_enabled: boolean;
	filter_locked: boolean;
}

export interface ExternalUrls {
	spotify: string;
}

export interface Followers {
	href: string;
	total: number;
}

export interface Image {
	url: string;
	height: number;
	width: number;
}

export interface Actions {
	disallows: Disallows;
}

export interface Disallows {
	pausing: boolean;
}

export default class SpotifyClient {
	private basicAuth: string;

	constructor(private clientId: string, clientSecret: string, private redirectUri: string) {
		this.basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
	}

	async formatTrack(playing: Awaited<ReturnType<typeof this.getMyCurrentPlayingTrack>>, now = new Date()) {
		if (!playing) return null;

		return {
			id: playing.item.id,
			song: {
				title: playing.item.name,
				artists: playing.item.artists.map((artist) => artist.name).join(", "),
				url: playing.item.external_urls.spotify,
			},
			album: {
				name: playing.item.album.name,
				image: playing.item.album.images[0]?.url,
				color: await dominantColor(playing.item.album.images[0]?.url!),
				url: playing.item.album.external_urls.spotify,
			},
			progress: {
				start: new Date(now.getTime() - playing.progress_ms),
				end: new Date(now.getTime() + playing.item.duration_ms - playing.progress_ms),
			},
			timestamp: playing.timestamp,
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

		return response.json() as Promise<{
			access_token: string;
			refresh_token: string;
			expires_in: number;
			token_type: string;
			scope: string;
		}>;
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

		return response.json() as Promise<{
			access_token: string;
			expires_in: number;
			token_type: string;
			scope: string;
			refresh_token?: string;
		}>;
	}

	async getUserProfile(accessToken: string) {
		const response = await fetch("https://api.spotify.com/v1/me", {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});

		return response.json() as Promise<{
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
		}>;
	}

	async getMyCurrentPlayingTrack(accessToken: string) {
		const response = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});

		if (response.status === 204) return null;

		const parsed = (await response.json()) as {
			timestamp: number;
			context: Context;
			progress_ms: number;
			item: Item;
			currently_playing_type: string;
			actions: Actions;
			is_playing: boolean;
		};

		if (!parsed.is_playing) return null;

		return parsed;
	}
}
