import { RedisClient } from "bun";
import { config } from "../config.js";
import { createRedisClientNamer } from "../utils/redis.js";
import { DiscordClient } from "./discord.js";
import SpotifyClient from "./spotify.js";

export const createClients = async () => {
	const spotify = new SpotifyClient(
		config.SPOTIFY_CLIENT_ID,
		config.SPOTIFY_CLIENT_SECRET,
		config.SPOTIFY_REDIRECT_URI,
	);

	const namer = createRedisClientNamer("master-client");
	const redis = new RedisClient(config.REDIS_URL);
	redis.onconnect = namer.bind(redis);
	await namer.call(redis);

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
