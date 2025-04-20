import { router } from "../context.js";
import { routes as spotifyRoutes } from "./spotify.js";

export const root = router()
	.get("/", async ({ ctx }) => ctx.ip)
	.merge("/v2/spotify", spotifyRoutes);
