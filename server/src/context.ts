import { createUtilities } from "@kaito-http/core";
import { getRemoteAddress } from "@kaito-http/uws";
import { Redis } from "ioredis";
import { hostname } from "node:os";
import { config } from "./config.js";
import SpotifyClient from "./clients/spotify.js";
import { spotifyPlayingTask } from "./tasks/spotify-playing.js";

const MAIN_NODE_KEY = "main-node";
const serverStarted = Date.now();
const spotify = new SpotifyClient(config.SPOTIFY_CLIENT_ID, config.SPOTIFY_CLIENT_SECRET, config.SPOTIFY_REDIRECT_URI);
const redis = new Redis(config.REDIS_URL);
export const is_main = (await redis.set(MAIN_NODE_KEY, hostname(), "NX").catch(null)) === "OK";

process.on("SIGTERM", async () => {
	if (is_main) await redis.del(MAIN_NODE_KEY);

	process.exit(0);
});

if (is_main) spotifyPlayingTask(redis, spotify);

export const { getContext, router } = createUtilities(async (req) => {
	const ip = getRemoteAddress();

	return {
		req,
		ip,
		spotify,
		redis,
		uptime: Date.now() - serverStarted,
	};
});
