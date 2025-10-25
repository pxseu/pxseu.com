import { KaitoError } from "@kaito-http/core";
import { router } from "../context.js";
import { routes as locationRoutes } from "./location.js";
import { routes as messageRoutes } from "./message.js";
import { routes as realtimeRoutes } from "./realtime.js";
import { routes as spotifyRoutes } from "./spotify.js";

// Function to return a deprecation response
const deprecatedV1Response = () => {
	throw new KaitoError(
		410,
		"The v1 API is deprecated. Please use v2 endpoints instead.",
	);
};

export const root = router()
	.get("/", async ({ ctx }) => ctx.ip)
	.get("/health", async ({ ctx }) => {
		try {
			const start = performance.now();

			await ctx.clients.redis.ping();

			const latency = performance.now() - start;

			return {
				status: "ok",
				timestamp: new Date().toISOString(),
				redis: {
					status: "connected",
					latency,
				},
			};
		} catch (error) {
			return {
				status: "error",
				timestamp: new Date().toISOString(),
				redis: {
					status: "disconnected",
					error: error instanceof Error ? error.message : "Unknown error",
				},
			};
		}
	})
	.get("/v1/*", deprecatedV1Response)
	.post("/v1/*", deprecatedV1Response)
	.put("/v1/*", deprecatedV1Response)
	.delete("/v1/*", deprecatedV1Response)
	.patch("/v1/*", deprecatedV1Response)
	.merge("/v2/realtime", realtimeRoutes)
	.merge("/v2/spotify", spotifyRoutes)
	.merge("/v2/location", locationRoutes)
	.merge("/v2/message", messageRoutes);
