import { KaitoError } from "@kaito-http/core";
import z from "zod";
import {
	REDIS_SPOTIFY_ACCESS_TOKEN,
	REDIS_SPOTIFY_REFRESH_TOKEN,
	REDIS_SPOTIFY_TOP_ARTISTS,
	type TimeRange,
} from "../clients/spotify.js";
import { config } from "../config.js";
import { router } from "../context.js";

// Routes
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

			try {
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
				await clients.redis.set(
					REDIS_SPOTIFY_REFRESH_TOKEN,
					data.refresh_token,
				);

				return { me };
			} catch (_error) {
				throw new KaitoError(
					500,
					"Failed to get access token, token may be expired or invalid",
				);
			}
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

			// Try to get cached data first
			const cachedData = await clients.redis.get(cacheKey);
			if (cachedData) {
				return clients.spotify.formatTopArtists(JSON.parse(cachedData).items);
			}

			// Try to get a valid access token
			let accessToken = await clients.redis.get(REDIS_SPOTIFY_ACCESS_TOKEN);

			// If no access token is found, try to refresh it
			if (!accessToken) {
				const refreshToken = await clients.redis.get(
					REDIS_SPOTIFY_REFRESH_TOKEN,
				);
				if (!refreshToken) {
					throw new KaitoError(401, "Not authenticated with Spotify");
				}

				try {
					const data = await clients.spotify.refreshAccessToken(refreshToken);
					accessToken = data.access_token;

					await clients.redis.set(
						REDIS_SPOTIFY_ACCESS_TOKEN,
						data.access_token,
						"EX",
						data.expires_in - 60,
					);

					if (data.refresh_token) {
						await clients.redis.set(
							REDIS_SPOTIFY_REFRESH_TOKEN,
							data.refresh_token,
						);
					}
				} catch (_refreshError) {
					throw new KaitoError(401, "Failed to refresh access token");
				}
			}

			try {
				// Fetch top artists from Spotify
				const topArtists = await clients.spotify.getMyTopArtists(
					accessToken,
					range as TimeRange,
					limit,
				);

				// Cache the result for 24 hours (86400 seconds)
				await clients.redis.set(
					cacheKey,
					JSON.stringify(topArtists),
					"EX",
					86400,
				);

				return clients.spotify.formatTopArtists(topArtists.items);
			} catch (error) {
				console.error(error);

				throw new KaitoError(500, "Failed to fetch top artists");
			}
		},
	});
