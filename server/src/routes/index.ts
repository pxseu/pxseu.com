import { kaito } from "../context.js";
import { routes as locationRoutes } from "./location.js";
import { routes as messageRoutes } from "./message.js";
import { routes as realtimeRoutes } from "./realtime.js";
import { routes as spotifyRoutes } from "./spotify.js";

const HEALTHCHECK_TIMEOUT_MS = 2000;

export const root = kaito
	.get("/", () => ({
		message: "umm hi!!",
	}))
	.get("/ip", ({ ctx }) => ctx.ip)
	.get("/health", async ({ ctx }) => {
		try {
			const start = performance.now();

			await Promise.race([
				ctx.clients.redis.ping(),
				Bun.sleep(HEALTHCHECK_TIMEOUT_MS).then(() => {
					throw new Error("Redis health check timed out");
				}),
			]);

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
			return Response.json(
				{
					status: "error",
					timestamp: new Date().toISOString(),
					redis: {
						status: "disconnected",
						error: error instanceof Error ? error.message : "Unknown error",
					},
				},
				{ status: 503 },
			);
		}
	})
	.merge("/v2/realtime", realtimeRoutes)
	.merge("/v2/spotify", spotifyRoutes)
	.merge("/v2/location", locationRoutes)
	.merge("/v2/message", messageRoutes);
