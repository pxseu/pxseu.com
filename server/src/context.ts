import { createUtilities } from "@kaito-http/core";
import { Redis } from "ioredis";
import SpotifyClient from "./clients/spotify.js";
import { config } from "./config.js";
import { ipStore } from "./index.js";

export const redis = new Redis(config.REDIS_URL);
await redis.ping();
export const spotify = new SpotifyClient(
	config.SPOTIFY_CLIENT_ID,
	config.SPOTIFY_CLIENT_SECRET,
	config.SPOTIFY_REDIRECT_URI,
);

const serverStarted = Date.now();

const spotifyListener = await spotify.createListener(redis);

export const { getContext, router } = createUtilities(async (req) => {
	const ip = req.headers.get("x-forwarded-for") ?? ipStore.getStore()!;

	return {
		req,
		ip,
		spotify,
		redis,
		uptime: Date.now() - serverStarted,
		spotifyListener,
	};
});
