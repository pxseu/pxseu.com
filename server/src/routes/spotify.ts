import { KaitoError } from "@kaito-http/core";
import z from "zod";
import {
	ensureAccessToken,
	REDIS_SPOTIFY_ACCESS_TOKEN,
	REDIS_SPOTIFY_REFRESH_TOKEN,
	REDIS_SPOTIFY_TOP_ARTISTS,
} from "../clients/spotify.js";
import { config } from "../config.js";
import { router } from "../context.js";

export const routes = router()
	.get("/auth-url", async ({ ctx }) => ({
		url: ctx.clients.spotify.getAuthorizationUrl(),
	}))
	.get(
		"/auth-url-redirect",
		async ({ ctx }) =>
			new Response("Redirecting to Spotify...", {
				status: 302,
				headers: { Location: ctx.clients.spotify.getAuthorizationUrl() },
			}),
	)
	.get("/callback", {
		query: {
			code: z.string(),
		},
		async run({ ctx, query }) {
			const { code } = query;
			const { clients } = ctx;

			const data = await clients.spotify.getAccessToken(code);
			const me = await clients.spotify.getUserProfile(data.access_token);

			if (
				config.SPOTIFY_AUTH_USER_ID &&
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
	.get("/now-playing", async ({ ctx }) => ctx.realtime.spotify.state)
	.get("/top-artists", {
		query: {
			// @ts-expect-error kaito dumb types
			range: z
				.enum(["short_term", "medium_term", "long_term"])
				.nullish()
				.transform((v) => v ?? "medium_term"),
			// @ts-expect-error kaito dumb types
			limit: z.coerce
				.number()
				.min(1)
				.max(50)
				.nullish()
				.transform((v) => v ?? 10),
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
