import { KaitoError, k } from "@kaito-http/core";
import {
	ensureAccessToken,
	REDIS_SPOTIFY_ACCESS_TOKEN,
	REDIS_SPOTIFY_REFRESH_TOKEN,
	REDIS_SPOTIFY_TOP_ARTISTS,
} from "../clients/spotify.js";
import { config } from "../config.js";
import { kaito } from "../context.js";

export const routes = kaito
	.get("/auth-url", ({ ctx }) => ({
		url: ctx.clients.spotify.getAuthorizationUrl(),
	}))
	.get("/auth-url-redirect", ({ ctx }) =>
		Response.redirect(ctx.clients.spotify.getAuthorizationUrl(), 302),
	)
	.get("/callback", {
		query: { code: k.string() },
		async run({ ctx, query }) {
			const { code } = query;
			const { clients } = ctx;

			const data = await clients.spotify.getAccessToken(code);
			const me = await clients.spotify.getUserProfile(data.access_token);

			if (
				config.SPOTIFY_AUTH_USER_ID &&
				// not auth check
				me.id !== config.SPOTIFY_AUTH_USER_ID
			) {
				throw new KaitoError(403, "Unauthorized user");
			}

			await clients.redis.set(
				REDIS_SPOTIFY_ACCESS_TOKEN,
				data.access_token,
				"EX",
				data.expires_in - 60,
			);
			await clients.redis.set(REDIS_SPOTIFY_REFRESH_TOKEN, data.refresh_token);

			return { me };
		},
	})
	.get("/now-playing", ({ ctx }) => ctx.realtime.spotify.state)
	.get("/top-artists", {
		query: {
			range: k
				.enum(["short_term", "medium_term", "long_term"])
				.default("medium_term"),
			limit: k.coerce.number().min(1).max(50).default(10),
		},
		async run({ ctx, query }) {
			const { range, limit } = query;
			const { clients } = ctx;
			const cacheKey = `${REDIS_SPOTIFY_TOP_ARTISTS}:${range}:${limit}`;

			const cachedData = await clients.redis.get(cacheKey);
			if (cachedData) {
				return clients.spotify.formatTopArtists(JSON.parse(cachedData).items);
			}

			let accessToken: string | null;
			try {
				accessToken = await ensureAccessToken(clients.redis, clients.spotify);
			} catch (_refreshError) {
				throw new KaitoError(401, "Failed to refresh access token");
			}

			if (!accessToken) {
				throw new KaitoError(401, "Not authenticated with Spotify");
			}

			const topArtists = await clients.spotify.getMyTopArtists(
				accessToken,
				range,
				limit,
			);

			await clients.redis.set(
				cacheKey,
				JSON.stringify(topArtists),
				"EX",
				86400,
			);

			return clients.spotify.formatTopArtists(topArtists.items);
		},
	});
