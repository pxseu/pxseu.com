import { once } from "node:events";
import { sse } from "@kaito-http/core/stream";
import { KaitoError } from "@kaito-http/core";
import { router } from "../context.js";
import { REDIS_SPOTIFY_PLAYING } from "../realtime/spotify.js";
import { REDIS_LOCATION_UPDATE, Location } from "../realtime/location.js";

// Base retry of 1000ms with ±100ms jitter
const getRetryWithJitter = (base = 1000, jitter = 100) => {
	return base + Math.floor(Math.random() * (jitter * 2)) - jitter;
};

export const routes = router().get("/", async ({ ctx }) => {
	const last_event_id = ctx.req.headers.get("last-event-id");

	console.log(last_event_id);

	return sse({
		start: async (controller) => {
			console.log("Starting SSE connection");

			// Send initial state
			// if (ctx.spotifyListener.requiresInitialUpdate(last_event_id ?? "0"))
			controller.enqueue({
				id: Date.now().toString(),
				event: "init",
				data: {
					now_playing: ctx.realtime.spotify.state,
					location: ctx.realtime.location.state,
				},
				retry: getRetryWithJitter(),
			});
		},

		pull: async (controller) => {
			const { signal } = ctx.req.request;
			const { spotify, location } = ctx.realtime;

			let interval = setInterval(() => {
				controller.enqueue({
					event: "ping",
					data: new Date().toISOString(),
				});
			}, 3e4);

			const eventHandler = (data: Awaited<ReturnType<typeof ctx.clients.spotify.formatTrack>>) => {
				controller.enqueue({
					event: "playing",
					data,
					id: Date.now().toString(),
				});
			};

			const locationEventHandler = (data: Location) => {
				controller.enqueue({
					event: "location",
					data,
					id: Date.now().toString(),
				});
			};

			try {
				// Listen for updates
				spotify.listener.on(REDIS_SPOTIFY_PLAYING, eventHandler);
				location.listener.on(REDIS_LOCATION_UPDATE, locationEventHandler);

				// Keep connection alive until client disconnects
				await once(signal, "abort");
			} catch (error) {
				console.error("SSE Error:", error);
				throw new KaitoError(500, "Failed to establish SSE connection");
			} finally {
				console.log("Closing SSE connection");
				spotify.listener.off(REDIS_SPOTIFY_PLAYING, eventHandler);
				location.listener.off(REDIS_LOCATION_UPDATE, locationEventHandler);
				clearInterval(interval);
				controller.close();
			}
		},
	});
});
