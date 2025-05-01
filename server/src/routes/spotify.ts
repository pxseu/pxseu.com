import z from "zod";
import { KaitoError } from "@kaito-http/core";
import { sse } from "@kaito-http/core/stream";
import { router } from "../context.js";
import { config } from "../config.js";
import { REDIS_SPOTIFY_ACCESS_TOKEN, REDIS_SPOTIFY_PLAYING, REDIS_SPOTIFY_REFRESH_TOKEN } from "../clients/spotify.js";

export const routes = router()
	.get("/auth-url", async ({ ctx }) => {
		const { spotify } = ctx;

		if (!spotify) {
			throw new KaitoError(500, "Spotify client not initialized");
		}

		const url = spotify.getAuthorizationUrl();

		return {
			url,
		};
	})
	.get("/auth-url-redirect", async ({ ctx }) => {
		const { spotify } = ctx;

		if (!spotify) {
			throw new KaitoError(500, "Spotify client not initialized");
		}

		return new Response("Redirecting to Spotify...", {
			status: 302,
			headers: {
				Location: spotify.getAuthorizationUrl(),
			},
		});
	})
	.get("/callback", {
		query: {
			code: z.string(),
		},

		async run({ ctx, query }) {
			const { code } = query;
			const { spotify, redis } = ctx;

			if (!spotify) {
				throw new KaitoError(500, "Spotify client not initialized");
			}

			let data: Awaited<ReturnType<typeof spotify.getAccessToken>>;

			try {
				data = await spotify.getAccessToken(code);
			} catch (error) {
				throw new KaitoError(500, "Failed to get access token, token may be expired or invalid");
			}

			const me = await spotify.getUserProfile(data.access_token);

			if (config.SPOTIFY_AUTH_USER_ID && me.id !== config.SPOTIFY_AUTH_USER_ID)
				throw new KaitoError(403, "Unauthorized user");

			await redis.set(REDIS_SPOTIFY_ACCESS_TOKEN, data.access_token, "EX", data.expires_in - 60);
			await redis.set(REDIS_SPOTIFY_REFRESH_TOKEN, data.refresh_token);

			return {
				me,
			};
		},
	})
	.get("/now-playing", async ({ ctx }) => {
		const { redis } = ctx;

		const nowPlaying = await redis.get(REDIS_SPOTIFY_PLAYING);

		if (!nowPlaying) {
			throw new KaitoError(404, "No song is currently playing");
		}

		return JSON.parse(nowPlaying);
	})
	.get("/now-playing-sse", async ({ ctx }) => {
		return sse({
			start: async (controller) => {
				const { redis } = ctx;
				const subscriber = redis.duplicate();

				const hello = await subscriber.hello();
				// flat array of key,value pairs
				const id = hello[hello.findIndex((v) => v === "id") + 1];

				try {
					// Subscribe to updates
					await subscriber.subscribe(REDIS_SPOTIFY_PLAYING);

					// Send initial state
					const initialData = JSON.parse((await redis.get(REDIS_SPOTIFY_PLAYING)) ?? "null");
					if (initialData) {
						initialData.timestamp = undefined;
						controller.enqueue({
							event: "init",
							data: {
								now_playing: initialData,
								connection_id: id,
							},
						});
					}

					// Listen for updates
					subscriber.on("message", (channel, message) => {
						if (channel === REDIS_SPOTIFY_PLAYING) {
							const data = JSON.parse(message);
							if (data) data.timestamp = undefined;
							controller.enqueue({
								event: "now-playing",
								data,
							});
						}
					});

					// Keep the connection alive
					await new Promise(() => {});
				} catch (e) {
					console.error(e);
				} finally {
					await subscriber.unsubscribe();
					await subscriber.quit();
					controller.close();
				}
			},
		});
	});
