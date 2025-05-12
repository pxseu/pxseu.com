import { hostname } from "node:os";
import { spotifyPlayingTask } from "./tasks/spotify-playing.js";
import { clients } from "./context.js";

const MAIN_NODE_KEY = "main-node";
const MAIN_NODE_TTL = 30; // seconds
const NODE_CHECK_INTERVAL = 5000; // 5 seconds

let is_main = false;
let nodeCheckInterval: NodeJS.Timeout | null = null;
let spotifyTaskAbortController: AbortController | null = null;

async function tryBecomeMain() {
	const result = await clients.redis.set(MAIN_NODE_KEY, hostname(), "EX", MAIN_NODE_TTL, "NX");
	if (result === "OK") {
		is_main = true;
		spotifyTaskAbortController = new AbortController();
		spotifyPlayingTask(clients.redis, clients.spotify, spotifyTaskAbortController.signal).catch((error) => {
			console.error("Spotify task failed:", error);
		});
	}
}

async function stopSpotifyTask() {
	if (spotifyTaskAbortController) {
		spotifyTaskAbortController.abort();
		spotifyTaskAbortController = null;
	}
}

async function startNodeCheck() {
	if (nodeCheckInterval) clearInterval(nodeCheckInterval);

	nodeCheckInterval = setInterval(async () => {
		try {
			if (is_main) {
				// Health check for main node
				const currentMain = await clients.redis.get(MAIN_NODE_KEY);

				if (currentMain !== hostname()) {
					is_main = false;
					await stopSpotifyTask();
					return;
				}
				// Refresh the TTL
				await clients.redis.expire(MAIN_NODE_KEY, MAIN_NODE_TTL);
			} else {
				// Migration check for non-main nodes
				const currentMain = await clients.redis.get(MAIN_NODE_KEY);
				if (!currentMain || currentMain === hostname()) {
					// No main node exists or I am the main node (I was the main node before the check)
					await tryBecomeMain();
				}
			}
		} catch (error) {
			console.error("Node check failed:", error);
			is_main = false;
			await stopSpotifyTask();
		}
	}, NODE_CHECK_INTERVAL);
}

await tryBecomeMain();
await startNodeCheck();

process.on("SIGTERM", async () => {
	if (is_main) {
		await clients.redis.del(MAIN_NODE_KEY);
	}
	await stopSpotifyTask();
	if (nodeCheckInterval) clearInterval(nodeCheckInterval);
	process.exit(0);
});

export { clients };
