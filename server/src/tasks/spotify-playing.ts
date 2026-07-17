import type { RedisClient } from "bun";
import type SpotifyClient from "../clients/spotify.js";
import { ensureAccessToken, REDIS_LAST_UPDATE_ON, REDIS_SPOTIFY_ACCESS_TOKEN } from "../clients/spotify.js";
import { REDIS_SPOTIFY_PLAYING } from "../realtime/spotify.js";

export const spotifyPlayingTask = async (redis: RedisClient, spotify: SpotifyClient, signal?: AbortSignal) => {
	console.log("Starting spotify tracker");

	const interval = 2e2;
	const noPlayingInterval = 2e3; // Longer interval when nothing is playing

	const prev = await redis.get(REDIS_SPOTIFY_PLAYING).then((v) => JSON.parse(v || "null"));

	let prevId: string | null = prev?.id || null;
	let prevStartedt: number | null = null;

	do {
		if (signal?.aborted) {
			console.log("Spotify tracker stopped");
			break;
		}

		let accessToken: string | null;
		try {
			accessToken = await ensureAccessToken(redis, spotify);
		} catch (error) {
			console.error("Failed to refresh access token", error);
			await redis.del(REDIS_SPOTIFY_ACCESS_TOKEN);
			await Bun.sleep(noPlayingInterval);
			continue;
		}

		if (!accessToken) {
			console.error("No access token or refresh token found");
			await Bun.sleep(noPlayingInterval);
			continue;
		}

		let nowPlaying: Awaited<ReturnType<typeof spotify.getMyCurrentPlayingTrack>> | null = null;

		try {
			nowPlaying = await spotify.getMyCurrentPlayingTrack(accessToken);
		} catch (error) {
			console.error("Failed to get current playing track", error);
			await redis.del(REDIS_SPOTIFY_ACCESS_TOKEN);
			await Bun.sleep(noPlayingInterval);
			continue;
		}

		if (!nowPlaying || nowPlaying.currently_playing_type !== "track") {
			if (prevId !== null) {
				await Promise.all([
					redis.del(REDIS_SPOTIFY_PLAYING),
					redis.publish(REDIS_SPOTIFY_PLAYING, "null"),
					redis.del(REDIS_LAST_UPDATE_ON),
				]);
				prevId = null;
				prevStartedt = null;
			}
			await Bun.sleep(noPlayingInterval);
			continue;
		}

		const id = nowPlaying?.item?.id || null;
		const startedAt = nowPlaying.timestamp || null;

		if (id === prevId && startedAt && prevStartedt && startedAt <= prevStartedt) {
			await Bun.sleep(interval);
			continue;
		}

		try {
			const formatted = JSON.stringify(await spotify.formatTrack(nowPlaying));

			await Promise.all([
				redis.set(REDIS_SPOTIFY_PLAYING, formatted),
				redis.publish(REDIS_SPOTIFY_PLAYING, formatted),
				redis.set(REDIS_LAST_UPDATE_ON, (startedAt ?? 0).toString()),
			]);
		} catch (error) {
			console.error("Failed to format or publish current track", error);
			await Bun.sleep(noPlayingInterval);
			continue;
		}
		prevId = id;
		prevStartedt = startedAt;

		await Bun.sleep(interval);
		// biome-ignore lint/correctness/noConstantCondition: intentional infinite loop for background task
	} while (true);
};
