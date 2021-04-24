import { Response } from "express";
import { redis } from "../../../db/redis";
import { getAccessToken } from ".";

const CACHE_KEY = "spotify:top_songs";
const CACHE_TIME = 5 * 60 * 1000; // 5 min

interface Song {
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
}

interface Res {
	items: Song[];
}

export const topTracks = async (_: unknown, res: Response): Promise<unknown> => {
	const cached = await redis.getAsync(CACHE_KEY);

	if (cached) {
		const ttl = await redis.ttlAsync(CACHE_KEY);

		res.set("Cache-Control", `max-age=${Math.ceil(ttl / 1000)}`);

		return res.api(200, {
			tracks: JSON.parse(cached),
			cached: true,
		});
	}

	const { access_token } = await getAccessToken();

	// TODO: implement caching - done

	let response: Res;

	try {
		response = await (
			await fetch("https://api.spotify.com/v1/me/top/tracks", {
				headers: {
					Authorization: `Bearer ${access_token}`,
				},
			})
		).json();
	} catch (error) {
		return res.api(500, {
			data: "Failed to make the call with an external Api",
			cached: false,
		});
	}

	const tracks = response.items.slice(0, 10).map((track) => ({
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

	await redis.setAsync(CACHE_KEY, CACHE_TIME, JSON.stringify(tracks));

	res.api(200, {
		tracks,
		cached: false,
	});
};
