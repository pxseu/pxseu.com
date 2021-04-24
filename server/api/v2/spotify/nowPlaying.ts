import { Response } from "express";
import fetch from "node-fetch";
import { redis } from "../../../db/redis";
import { getAccessToken } from ".";

const CACHE_KEY = "spotify:now_playing";
const CACHE_TIME = 10 * 1000;

interface Song {
	is_playing: boolean;
	item: {
		name: string;
		artists: {
			name: string;
		}[];
		album: {
			name: string;
			external_urls: {
				spotify: string;
			};

			images: {
				url: string;
			}[];
		};
		external_urls: {
			spotify: string;
		};
	};
}

export const nowPlaying = async (_: unknown, res: Response): Promise<unknown> => {
	const cached = await redis.getAsync(CACHE_KEY);

	if (cached) {
		const ttl = await redis.ttlAsync(CACHE_KEY);

		res.set("Cache-Control", `max-age=${Math.ceil(ttl / 1000)}`);

		const parsedCache = JSON.parse(cached);

		if (!parsedCache.playing)
			return res.api(200, {
				playing: false,
				cached: true,
			});

		return res.api(200, {
			playing: true,
			data: parsedCache.data,
			cached: true,
		});
	}

	const { access_token } = await getAccessToken();

	const response = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
		headers: {
			Authorization: `Bearer ${access_token}`,
		},
	});

	if (response.status === 204 || response.status > 400) {
		await redis.setAsync(CACHE_KEY, CACHE_TIME, JSON.stringify({ playing: false }));
		return res.api(200, { playing: false, cached: false });
	}

	const song: Song = await response.json();

	const data = {
		song: {
			title: song.item.name,
			artists: song.item.artists.map((artist) => artist.name).join(", "),
			url: song.item.external_urls.spotify,
		},
		album: {
			name: song.item.album.name,
			image: song.item.album.images[0]?.url,
			url: song.item.album.external_urls.spotify,
		},
	};

	if (!song.is_playing) {
		await redis.setAsync(CACHE_KEY, CACHE_TIME, JSON.stringify({ playing: false }));
		return res.api(200, { playing: false });
	}

	await redis.setAsync(CACHE_KEY, CACHE_TIME, JSON.stringify({ playing: true, data }));

	res.set("Cache-Control", `max-age=${Math.ceil(CACHE_TIME / 1000)}`);

	res.api(200, {
		playing: true,
		data: data,
		cached: false,
	});
};
