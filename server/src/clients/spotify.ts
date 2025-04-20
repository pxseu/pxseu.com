import { fetch } from "./fetch.js";

export default class SpotifyClient {
	private basicAuth: string;

	constructor(private clientId: string, clientSecret: string, private redirectUri: string) {
		this.basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
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

	async refreshAccessToken(refreshToken: string): Promise<string> {
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

		const data = (await response.json()) as { access_token: string };
		return data.access_token;
	}

	async getUserProfile(accessToken: string): Promise<any> {
		const response = await fetch("https://api.spotify.com/v1/me", {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});

		return response.json();
	}

	async getMyCurrentPlayingTrack(accessToken: string): Promise<any> {
		const response = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});

		return response.json();
	}
}
