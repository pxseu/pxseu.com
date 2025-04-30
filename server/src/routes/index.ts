import { router } from "../context.js";
import { routes as spotifyRoutes } from "./spotify.js";

export const root = router()
	.get("/", async ({ ctx }) => ctx.ip)
	.get("/health", async ({ ctx }) => {
		try {
			const start = performance.now();

			await ctx.redis.ping();

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
	.merge("/v2/spotify", spotifyRoutes);
