import { createUtilities } from "@kaito-http/core";
import { getRemoteAddress } from "@kaito-http/uws";
import { Redis } from "ioredis";
import { hostname } from "node:os";
import { config } from "./config.js";
import SpotifyClient from "./clients/spotify.js";
import { spotifyPlayingTask } from "./tasks/spotify-playing.js";

const MAIN_NODE_KEY = "main-node";
const MAIN_NODE_TTL = 30; // seconds
const NODE_CHECK_INTERVAL = 5000; // 5 seconds
const serverStarted = Date.now();
const spotify = new SpotifyClient(config.SPOTIFY_CLIENT_ID, config.SPOTIFY_CLIENT_SECRET, config.SPOTIFY_REDIRECT_URI);
const redis = new Redis(config.REDIS_URL);

let is_main = false;
let nodeCheckInterval: NodeJS.Timeout | null = null;

async function tryBecomeMain() {
	const result = await redis.set(MAIN_NODE_KEY, hostname(), "EX", MAIN_NODE_TTL, "NX");
	if (result === "OK") {
		is_main = true;
		spotifyPlayingTask(redis, spotify);
	}
}

async function startNodeCheck() {
	if (nodeCheckInterval) clearInterval(nodeCheckInterval);

	nodeCheckInterval = setInterval(async () => {
		try {
			if (is_main) {
				// Health check for main node
				const currentMain = await redis.get(MAIN_NODE_KEY);
				if (currentMain !== hostname()) {
					is_main = false;
					return;
				}
				// Refresh the TTL
				await redis.expire(MAIN_NODE_KEY, MAIN_NODE_TTL);
			} else {
				// Migration check for non-main nodes
				const currentMain = await redis.get(MAIN_NODE_KEY);
				if (!currentMain) {
					// No main node exists, try to become one
					await tryBecomeMain();
				}
			}
		} catch (error) {
			console.error("Node check failed:", error);
			is_main = false;
		}
	}, NODE_CHECK_INTERVAL);
}

// Initial attempt to become main
await tryBecomeMain();
await startNodeCheck();

process.on("SIGTERM", async () => {
	if (is_main) {
		await redis.del(MAIN_NODE_KEY);
	}
	if (nodeCheckInterval) clearInterval(nodeCheckInterval);
	process.exit(0);
});

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
