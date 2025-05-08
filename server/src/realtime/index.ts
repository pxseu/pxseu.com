import { Redis } from "ioredis";
import { SpotifyRealtimeClient } from "./spotify.js";
import { LocationRealtimeClient } from "./location.js";

export const realtimeManager = async (redis: Redis) => {
	const spotify = new SpotifyRealtimeClient(redis);
	const location = new LocationRealtimeClient(redis);

	return {
		spotify: await spotify.initialize(),
		location: await location.initialize(),
	};
};
