import type { RedisClient } from "bun";
import type SpotifyClient from "../clients/spotify.js";
import {
	REDIS_LAST_UPDATE_ON,
	REDIS_SPOTIFY_ACCESS_TOKEN,
	REDIS_SPOTIFY_REFRESH_TOKEN,
} from "../clients/spotify.js";
import { REDIS_SPOTIFY_PLAYING } from "../realtime/spotify.js";
import { sleep } from "../utils/sleep.js";

export const spotifyPlayingTask = async (
	redis: RedisClient,
	spotify: SpotifyClient,
	signal?: AbortSignal,
) => {
	console.log("Starting spotify tracker");

	const interval = 2e2;
	const noPlayingInterval = 2e3; // Longer interval when nothing is playing

	const prev = await redis
		.get(REDIS_SPOTIFY_PLAYING)
		.then((v) => JSON.parse(v || "null"));

	let prevId: string | null = prev?.id || null;
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
					redis.set(
						REDIS_SPOTIFY_ACCESS_TOKEN,
						data.access_token,
						"EX",
						data.expires_in - 60,
					),
					data.refresh_token
						? redis.set(REDIS_SPOTIFY_REFRESH_TOKEN, data.refresh_token)
						: Promise.resolve(),
				]);
			} catch (error) {
				console.error("Failed to refresh access token", error);
				await Promise.all([
					redis.del(REDIS_SPOTIFY_ACCESS_TOKEN),
					redis.del(REDIS_SPOTIFY_REFRESH_TOKEN),
				]);
				await sleep(noPlayingInterval);
				continue;
			}
		}

		let nowPlaying: Awaited<
			ReturnType<typeof spotify.getMyCurrentPlayingTrack>
		> | null = null;

		try {
			nowPlaying = await spotify.getMyCurrentPlayingTrack(accessToken);
		} catch (error) {
			console.error("Failed to get current playing track");
			console.error(error);
			await Promise.all([
				redis.del(REDIS_SPOTIFY_ACCESS_TOKEN),
				redis.del(REDIS_SPOTIFY_REFRESH_TOKEN),
			]);
			await sleep(noPlayingInterval);
			continue;
		}

		if (!nowPlaying || nowPlaying.currently_playing_type !== "track") {
			// If nothing is playing and we previously had a track, clear the playing state
			if (prevId !== null) {
				await Promise.all([
					redis.del(REDIS_SPOTIFY_PLAYING),
					redis.publish(REDIS_SPOTIFY_PLAYING, "null"),
					redis.del(REDIS_LAST_UPDATE_ON),
				]);
				prevId = null;
				prevStartedt = null;
			}
			await sleep(noPlayingInterval);
			continue;
		}

		const id = nowPlaying.item.id || null;
		const startedAt = nowPlaying.timestamp || null;

		// Skip if the same track is still playing
		if (
			id === prevId &&
			startedAt &&
			prevStartedt &&
			startedAt <= prevStartedt
		) {
			await sleep(interval);
			continue;
		}

		const formated = JSON.stringify(await spotify.formatTrack(nowPlaying));

		await Promise.all([
			redis.set(REDIS_SPOTIFY_PLAYING, formated),
			redis.publish(REDIS_SPOTIFY_PLAYING, formated),
			redis.set(REDIS_LAST_UPDATE_ON, (startedAt ?? 0).toString()),
		]);
		prevId = id;
		prevStartedt = startedAt;

		await sleep(interval);
		// biome-ignore lint/correctness/noConstantCondition: intentional infinite loop for background task
	} while (true);
};
