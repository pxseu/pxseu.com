import z from "zod";
import { KaitoError } from "@kaito-http/core";
import { sse } from "@kaito-http/core/stream";
import { router } from "../context.js";
import { config } from "../config.js";
import { REDIS_SPOTIFY_ACCESS_TOKEN, REDIS_SPOTIFY_PLAYING, REDIS_SPOTIFY_REFRESH_TOKEN } from "../clients/spotify.js";
import { once } from "node:events";
// Routes
export const routes = router()
	.get("/auth-url", async ({ ctx }) => ({ url: ctx.spotify.getAuthorizationUrl() }))
	.get(
		"/auth-url-redirect",
		async ({ ctx }) =>
			new Response("Redirecting to Spotify...", {
				status: 302,
				headers: { Location: ctx.spotify.getAuthorizationUrl() },
			}),
	)
	.get("/callback", {
		query: {
			code: z.string(),
		},
		async run({ ctx, query }) {
			const { code } = query;
			const { spotify, redis } = ctx;

			try {
				const data = await spotify.getAccessToken(code);
				const me = await spotify.getUserProfile(data.access_token);

				if (config.SPOTIFY_AUTH_USER_ID && me.id !== config.SPOTIFY_AUTH_USER_ID) {
					throw new KaitoError(403, "Unauthorized user");
				}

				await redis.set(REDIS_SPOTIFY_ACCESS_TOKEN, data.access_token, "EX", data.expires_in - 60);
				await redis.set(REDIS_SPOTIFY_REFRESH_TOKEN, data.refresh_token);

				return { me };
			} catch (error) {
				throw new KaitoError(500, "Failed to get access token, token may be expired or invalid");
			}
		},
	})
	.get("/now-playing", async ({ ctx }) => ctx.spotifyListener.currentPlaying)
	.get("/now-playing-sse", async ({ ctx }) => {
		return sse({
			start: async (controller) => {
				const { signal } = ctx.req.request;
				const { spotify } = ctx;

				const eventHandler = (data: Awaited<ReturnType<typeof spotify.formatTrack>>) => {
					controller.enqueue({
						event: "now-playing",
						data,
					});
				};

				try {
					// Send initial state
					controller.enqueue({
						event: "init",
						data: ctx.spotifyListener.currentPlaying,
					});

					// Listen for updates
					ctx.spotifyListener.listener.on(REDIS_SPOTIFY_PLAYING, eventHandler);

					// Keep connection alive until client disconnects
					await once(signal, "abort");
				} catch (error) {
					console.error("SSE Error:", error);
					throw new KaitoError(500, "Failed to establish SSE connection");
				} finally {
					console.log("Closing SSE connection");
					ctx.spotifyListener.listener.off(REDIS_SPOTIFY_PLAYING, eventHandler);
					controller.close();
				}
			},
		});
	});
