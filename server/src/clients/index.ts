import { Redis } from "ioredis";
import SpotifyClient from "./spotify.js";
import { config } from "../config.js";
import { DiscordClient } from "./discord.js";

export const createClients = () => {
	const spotify = new SpotifyClient(
		config.SPOTIFY_CLIENT_ID,
		config.SPOTIFY_CLIENT_SECRET,
		config.SPOTIFY_REDIRECT_URI,
	);

	const redis = new Redis(config.REDIS_URL, {
		keyPrefix: "pxseu:2:",
	});

	const discord = new DiscordClient(
		redis,
		config.WEBHOOK_MESSAGE_ID,
		config.WEBHOOK_MESSAGE_TOKEN,
		config.WEBHOOK_AVATAR,
	);

	return {
		spotify,
		redis,
		discord,
	};
};
