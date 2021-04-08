import { Response } from "express";
import { redis } from "../../../db/redis";
import { getAccessToken } from "../spotify";

const CACHE_KEY = "spotify:top_songs";
const CACHE_TIME = 5 * 60; // 5 min

interface Song {
	name: string;
	artists: {
		name: string;
	}[];
	external_urls: {
		spotify: string;
	};
}

const TopTracks = async (_: unknown, res: Response): Promise<unknown> => {
	const cached = await redis.getAsync(CACHE_KEY);

	if (cached)
		return res.api(200, {
			tracks: JSON.parse(cached),
			cached: true,
		});

	const { access_token } = await getAccessToken();

	// TODO: implement caching - done

	const response = await (
		await fetch("https://api.spotify.com/v1/me/top/tracks", {
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
		})
	).json();

	const tracks = response.items.slice(0, 10).map((track: Song) => ({
		title: track.name,
		artist: track.artists.map((_artist) => _artist.name).join(", "),
		songUrl: track.external_urls.spotify,
	}));

	res.set("Cache-Control", `max-age=${CACHE_TIME}`);

	await redis.setAsync(CACHE_KEY, CACHE_TIME, JSON.stringify(tracks));

	res.api(200, {
		tracks,
		cached: false,
	});
};

export default TopTracks;
