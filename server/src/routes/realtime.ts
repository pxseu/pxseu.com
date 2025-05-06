import { once } from "node:events";
import { sse } from "@kaito-http/core/stream";
import { KaitoError } from "@kaito-http/core";
import { router } from "../context.js";
import { REDIS_SPOTIFY_PLAYING } from "../clients/spotify.js";

export const routes = router().get("/", async ({ ctx }) => {
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

			let interval: NodeJS.Timeout | undefined;

			try {
				// Send initial state
				controller.enqueue({
					event: "init",
					data: {
						now_playing: ctx.spotifyListener.currentPlaying,
					},
				});

				interval = setInterval(() => {
					controller.enqueue({
						event: "ping",
						data: new Date().toISOString(),
					});
				}, 3e4);

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
				clearInterval(interval);
				controller.close();
			}
		},
	});
});
