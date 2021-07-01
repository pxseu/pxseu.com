import { Response } from "express";
import fetch from "node-fetch";
import { redis } from "../../../db/redis";
import { getAccessToken } from "./refreshToken";
import { TopSongs } from "./types";

const CACHE_KEY = "spotify:top_songs";
const CACHE_TIME = 20 * 60 * 1000;

export const topTracks = async (_: unknown, res: Response): Promise<unknown> => {
	const cached = await redis.get(CACHE_KEY);

	if (cached) {
		const ttl = await redis.pttl(CACHE_KEY);

		res.set("Cache-Control", `max-age=${Math.ceil(ttl / 1000)}`);

		return res.api(200, {
			tracks: JSON.parse(cached),
			cached: true,
		});
	}

	const accessToken = await getAccessToken();

	// TODO: implement caching - done

	const response = await fetch("https://api.spotify.com/v1/me/top/tracks", {
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	});

	if (response.status !== 200)
		return res.api(500, {
			data: "Failed to make the call with an external Api",
			cached: false,
		});

	const json: TopSongs = await response.json();

	const tracks = json.items.slice(0, 10).map((track) => ({
		// TODO: remove the 3 props bellow at a later date so stuff doesn't break
		title: track.name,
		artist: track.artists.map((artist) => artist.name).join(", "),
		songUrl: track.external_urls.spotify,

		song: {
			name: track.name,
			artists: track.artists.map((artist) => artist.name).join(", "),
			url: track.external_urls.spotify,
		},
		album: {
			name: track.album.name,
			image: track.album.images[0].url,
			url: track.album.external_urls.spotify,
		},
	}));

	res.set("Cache-Control", `max-age=${Math.ceil(CACHE_TIME / 1000)}`);

	await redis.psetex(CACHE_KEY, CACHE_TIME, JSON.stringify(tracks));

	res.api(200, {
		tracks,
		cached: false,
	});
};
