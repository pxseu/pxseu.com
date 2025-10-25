import { once } from "node:events";
import { sse } from "@kaito-http/core/stream";
import { router } from "../context.js";
import { type Location, REDIS_LOCATION_UPDATE } from "../realtime/location.js";
import { REDIS_SPOTIFY_PLAYING } from "../realtime/spotify.js";

// Base retry of 1000ms with ±100ms jitter
const getRetryWithJitter = (base = 1000, jitter = 100) => {
	return base + Math.floor(Math.random() * (jitter * 2)) - jitter;
};

const PLAYING_KEY = "playing";
const LOCATION_KEY = "location";

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
					[PLAYING_KEY]: ctx.realtime.spotify.state,
					[LOCATION_KEY]: ctx.realtime.location.state,
				},
				retry: getRetryWithJitter(),
			});
		},

		pull: async (controller) => {
			const { signal } = ctx.req.request;
			const { spotify, location } = ctx.realtime;

			const interval = setInterval(() => {
				controller.enqueue({
					event: "ping",
					data: new Date().toISOString(),
				});
			}, 3e4);

			const eventHandler = (
				data: Awaited<ReturnType<typeof ctx.clients.spotify.formatTrack>>,
			) => {
				controller.enqueue({
					event: PLAYING_KEY,
					data,
					id: Date.now().toString(),
				});
			};

			const locationEventHandler = (data: Location) => {
				controller.enqueue({
					event: LOCATION_KEY,
					data,
					id: Date.now().toString(),
				});
			};

			// Listen for updates
			spotify.addEventListener(REDIS_SPOTIFY_PLAYING, eventHandler);
			location.addEventListener(REDIS_LOCATION_UPDATE, locationEventHandler);

			// Keep connection alive until client disconnects
			await once(signal, "abort");

			location.removeEventListener(REDIS_LOCATION_UPDATE, locationEventHandler);
			spotify.removeEventListener(REDIS_SPOTIFY_PLAYING, eventHandler);

			clearInterval(interval);
			console.log("Closing SSE connection");
		},
	});
});
