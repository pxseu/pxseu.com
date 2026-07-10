import { hostname } from "node:os";
import { config } from "config.js";
import { clients } from "./context.js";
import { spotifyPlayingTask } from "./tasks/spotify-playing.js";

const MAIN_NODE_KEY = `${config.REDIS_PREFIX}main-node`;
const MAIN_NODE_TTL = 30; // seconds
const NODE_CHECK_INTERVAL = 5000; // 5 seconds
const SPOTIFY_TASK_RESTART_DELAY = 2000;

let is_main = false;
let nodeCheckInterval: NodeJS.Timeout | null = null;
let spotifyTaskAbortController: AbortController | null = null;

async function superviseSpotifyTask(signal: AbortSignal) {
	while (!signal.aborted) {
		try {
			await spotifyPlayingTask(clients.redis, clients.spotify, signal);
		} catch (error) {
			console.error("Spotify task failed:", error);
		}

		if (!signal.aborted) {
			await Bun.sleep(SPOTIFY_TASK_RESTART_DELAY);
		}
	}
}

async function tryBecomeMain() {
	const result = await clients.redis.set(
		MAIN_NODE_KEY,
		hostname(),
		"EX",
		MAIN_NODE_TTL.toString(),
		"NX",
	);
	if (result === "OK") {
		is_main = true;
		spotifyTaskAbortController = new AbortController();
		void superviseSpotifyTask(spotifyTaskAbortController.signal);
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
				const currentMain = await clients.redis.get(MAIN_NODE_KEY);

				if (currentMain !== hostname()) {
					is_main = false;
					await stopSpotifyTask();
					return;
				}

				await clients.redis.expire(MAIN_NODE_KEY, MAIN_NODE_TTL);
			} else {
				const currentMain = await clients.redis.get(MAIN_NODE_KEY);
				if (!currentMain || currentMain === hostname()) {
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
