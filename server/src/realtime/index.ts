import type { RedisClient } from "bun";
import { LocationRealtimeClient } from "./location.js";
import { SpotifyRealtimeClient } from "./spotify.js";

export const realtimeManager = async (redis: RedisClient) => {
	const spotify = new SpotifyRealtimeClient(redis);
	const location = new LocationRealtimeClient(redis);

	return {
		spotify: await spotify.initialize(),
		location: await location.initialize(),
	};
};
