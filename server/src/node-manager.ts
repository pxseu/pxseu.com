import { hostname } from "node:os";
import { spotifyPlayingTask } from "./tasks/spotify-playing.js";
import { redis, spotify } from "./context.js";

const MAIN_NODE_KEY = "main-node";
const MAIN_NODE_TTL = 30; // seconds
const NODE_CHECK_INTERVAL = 5000; // 5 seconds

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

await tryBecomeMain();
await startNodeCheck();

process.on("SIGTERM", async () => {
	if (is_main) {
		await redis.del(MAIN_NODE_KEY);
	}
	if (nodeCheckInterval) clearInterval(nodeCheckInterval);
	process.exit(0);
});

export { redis, spotify };
