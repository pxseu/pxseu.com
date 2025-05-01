import type { Redis } from "ioredis";
import SpotifyClient, {
	REDIS_SPOTIFY_ACCESS_TOKEN,
	REDIS_SPOTIFY_PLAYING,
	REDIS_SPOTIFY_REFRESH_TOKEN,
} from "../clients/spotify.js";
import { sleep } from "../utils/sleep.js";

export const spotifyPlayingTask = async (redis: Redis, spotify: SpotifyClient, signal?: AbortSignal) => {
	console.log("Starting spotify tracker");

	const interval = 500;
	const publisher = redis.duplicate();
	let prevId: string | null = null;
	let prevStartedt: number | null = null;

	do {
		if (signal?.aborted) {
			console.log("Spotify tracker stopped");
			break;
		}

		let accessToken = await redis.get(REDIS_SPOTIFY_ACCESS_TOKEN);

		if (!accessToken) {
			const refreshToken = await redis.get(REDIS_SPOTIFY_REFRESH_TOKEN);

			if (!refreshToken) {
				console.error("No access token or refresh token found");
				await sleep(interval * 10);
				continue;
			}

			try {
				const data = await spotify.refreshAccessToken(refreshToken);

				accessToken = data.access_token;
				await redis.set(REDIS_SPOTIFY_ACCESS_TOKEN, data.access_token, "EX", data.expires_in - 60);

				if (data.refresh_token) {
					await redis.set(REDIS_SPOTIFY_REFRESH_TOKEN, data.refresh_token);
				}
			} catch (error) {
				console.error("Failed to refresh access token", error);
				await redis.del(REDIS_SPOTIFY_ACCESS_TOKEN);
				await redis.del(REDIS_SPOTIFY_REFRESH_TOKEN);
				continue;
			}
		}

		const nowPlaying = await spotify.getMyCurrentPlayingTrack(accessToken);
		const formated = JSON.stringify(await spotify.formatTrack(nowPlaying));

		const prev = await redis.get(REDIS_SPOTIFY_PLAYING);

		if (prev && nowPlaying) {
			const prevDate = JSON.parse(prev)?.timestamp ?? 0;
			const nowDate = nowPlaying?.timestamp ?? Date.now();

			if (prevDate < nowDate) {
				const data = JSON.parse(formated);
				const id = data?.id || null;
				const startedt = data?.progress?.start || null;

				if (id !== prevId || startedt !== prevStartedt) {
					await redis.set(REDIS_SPOTIFY_PLAYING, formated);
					await publisher.publish(REDIS_SPOTIFY_PLAYING, formated);
					prevId = id;
					prevStartedt = startedt;
				}
			}
		} else {
			await redis.set(REDIS_SPOTIFY_PLAYING, formated);
			await publisher.publish(REDIS_SPOTIFY_PLAYING, formated);
			const data = JSON.parse(formated);
			prevId = data?.id || null;
			prevStartedt = data?.progress?.start || null;
		}

		await sleep(interval);
	} while (true);
};
