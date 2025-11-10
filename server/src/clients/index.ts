import { RedisClient } from "bun";
import { config } from "../config.js";
import { DiscordClient } from "./discord.js";
import SpotifyClient from "./spotify.js";
import { hostname } from "node:os";

const cb = async function (this: RedisClient) {
	await this.send("CLIENT", ["SETNAME", `master-client-${hostname()}`]);
};

export const createClients = async () => {
	const spotify = new SpotifyClient(
		config.SPOTIFY_CLIENT_ID,
		config.SPOTIFY_CLIENT_SECRET,
		config.SPOTIFY_REDIRECT_URI,
	);

	const redis = new RedisClient(config.REDIS_URL);
	redis.onconnect = cb.bind(redis);
	await cb.call(redis);

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
