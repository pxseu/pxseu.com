import z from "zod";
import { KaitoError } from "@kaito-http/core";
import { router } from "../context.js";
import { config } from "../config.js";
import { REDIS_SPOTIFY_ACCESS_TOKEN, REDIS_SPOTIFY_REFRESH_TOKEN } from "../clients/spotify.js";

// Routes
export const routes = router()
	.get("/auth-url", async ({ ctx }) => ({ url: ctx.clients.spotify.getAuthorizationUrl() }))
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

				if (config.SPOTIFY_AUTH_USER_ID && me.id !== config.SPOTIFY_AUTH_USER_ID) {
					throw new KaitoError(403, "Unauthorized user");
				}

				await clients.redis.set(REDIS_SPOTIFY_ACCESS_TOKEN, data.access_token, "EX", data.expires_in - 60);
				await clients.redis.set(REDIS_SPOTIFY_REFRESH_TOKEN, data.refresh_token);

				return { me };
			} catch (error) {
				throw new KaitoError(500, "Failed to get access token, token may be expired or invalid");
			}
		},
	})
	.get("/now-playing", async ({ ctx }) => ctx.realtime.spotify.state);
