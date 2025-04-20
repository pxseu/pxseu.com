import { createUtilities } from "@kaito-http/core";
import { getRemoteAddress } from "@kaito-http/uws";
import SpotifyClient from "clients/spotify.js";
import { config } from "config.js";
import { Redis } from "ioredis";

const serverStarted = Date.now();

export const { getContext, router } = createUtilities(async (req) => {
	const ip = getRemoteAddress();
	const spotify = new SpotifyClient(
		config.SPOTIFY_CLIENT_ID,
		config.SPOTIFY_CLIENT_SECRET,
		config.SPOTIFY_REDIRECT_URI,
	);

	const redis = new Redis(config.REDIS_URL);

	const pong = await redis.ping();

	if (pong !== "PONG") {
		throw new Error("Redis is not responding");
	}

	return {
		req,
		ip,
		spotify,
		uptime: Date.now() - serverStarted,
	};
});
