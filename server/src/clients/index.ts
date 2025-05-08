import { Redis } from "ioredis";
import SpotifyClient from "./spotify.js";
import { config } from "../config.js";

export const createClients = () => {
	const spotify = new SpotifyClient(
		config.SPOTIFY_CLIENT_ID,
		config.SPOTIFY_CLIENT_SECRET,
		config.SPOTIFY_REDIRECT_URI,
	);

	const redis = new Redis(config.REDIS_URL, {
		keyPrefix: "pxseu:2:",
	});

	return {
		spotify,
		redis,
	};
};
