import EventEmitter from "node:events";
import { config } from "config.js";
import {
	REDIS_LAST_UPDATE_ON,
	type default as SpotifyClient,
} from "../clients/spotify.js";
import { createRedisClientNamer } from "../utils/redis.js";
import { RealtimeClient } from "./abstract.js";

export const REDIS_SPOTIFY_PLAYING = `${config.REDIS_PREFIX}spotify:playing`;

type Song = Awaited<
	ReturnType<typeof SpotifyClient.prototype.formatTrack>
> | null;

export class SpotifyRealtimeClient extends RealtimeClient<
	typeof REDIS_SPOTIFY_PLAYING,
	Song
> {
	async initialize() {
		const listener = new EventEmitter<{
			[REDIS_SPOTIFY_PLAYING]: [Song, number];
		}>();

		const namer = createRedisClientNamer("spotify-realtime-client");
		const publisher = await this.redis.duplicate();
		publisher.onconnect = namer.bind(publisher);
		await namer.call(publisher);

		let currentPlaying: Song = await this.redis
			.get(REDIS_SPOTIFY_PLAYING)
			.then((v) => JSON.parse(v || "null"));
		let lastUpdateOn = await this.redis
			.get(REDIS_LAST_UPDATE_ON)
			.then((v) => parseInt(v || "0", 10));

		await publisher.subscribe(
			REDIS_SPOTIFY_PLAYING,
			async (message, channel) => {
				if (channel === REDIS_SPOTIFY_PLAYING) {
					const data = JSON.parse(message);

					listener.emit(REDIS_SPOTIFY_PLAYING, data, lastUpdateOn);
					currentPlaying = data;
					lastUpdateOn = Date.now();
				}
			},
		);

		const update = async (state: Song) => {
			await Promise.all([
				this.redis.set(REDIS_SPOTIFY_PLAYING, JSON.stringify(state)),
				this.redis.set(REDIS_LAST_UPDATE_ON, Date.now().toString()),
				this.redis.publish(REDIS_SPOTIFY_PLAYING, JSON.stringify(state)),
			]);
		};

		return {
			addEventListener: listener.on.bind(listener),
			removeEventListener: listener.off.bind(listener),
			get state() {
				return currentPlaying;
			},
			get update() {
				return update;
			},
		};
	}
}
