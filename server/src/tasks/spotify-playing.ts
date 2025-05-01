import type { Redis } from "ioredis";
import SpotifyClient, {
	REDIS_SPOTIFY_ACCESS_TOKEN,
	REDIS_SPOTIFY_PLAYING,
	REDIS_SPOTIFY_REFRESH_TOKEN,
} from "../clients/spotify.js";
import { sleep } from "../utils/sleep.js";

export const spotifyPlayingTask = async (redis: Redis, spotify: SpotifyClient, signal?: AbortSignal) => {
	console.log("Starting spotify tracker");

	const interval = 5e2;
	const noPlayingInterval = 2e3; // Longer interval when nothing is playing
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
				await sleep(noPlayingInterval);
				continue;
			}

			try {
				const data = await spotify.refreshAccessToken(refreshToken);

				accessToken = data.access_token;
				await Promise.all([
					redis.set(REDIS_SPOTIFY_ACCESS_TOKEN, data.access_token, "EX", data.expires_in - 60),
					data.refresh_token ? redis.set(REDIS_SPOTIFY_REFRESH_TOKEN, data.refresh_token) : Promise.resolve(),
				]);
			} catch (error) {
				console.error("Failed to refresh access token", error);
				await Promise.all([redis.del(REDIS_SPOTIFY_ACCESS_TOKEN), redis.del(REDIS_SPOTIFY_REFRESH_TOKEN)]);
				await sleep(noPlayingInterval);
				continue;
			}
		}

		const nowPlaying = await spotify.getMyCurrentPlayingTrack(accessToken);

		if (!nowPlaying) {
			// If nothing is playing and we previously had a track, clear the playing state
			if (prevId !== null) {
				await Promise.all([redis.del(REDIS_SPOTIFY_PLAYING), publisher.publish(REDIS_SPOTIFY_PLAYING, "null")]);
				prevId = null;
				prevStartedt = null;
			}
			await sleep(noPlayingInterval);
			continue;
		}

		const formated = JSON.stringify(await spotify.formatTrack(nowPlaying));
		const data = JSON.parse(formated);
		const id = data?.id || null;
		const startedt = data?.progress?.start || null;

		// Skip if the same track is still playing
		if (id === prevId && startedt === prevStartedt) {
			await sleep(interval);
			continue;
		}

		// Update the playing state
		await Promise.all([
			redis.set(REDIS_SPOTIFY_PLAYING, formated),
			publisher.publish(REDIS_SPOTIFY_PLAYING, formated),
		]);
		prevId = id;
		prevStartedt = startedt;

		await sleep(interval);
	} while (true);
};
