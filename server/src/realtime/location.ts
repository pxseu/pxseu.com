import EventEmitter from "node:events";
import { hostname } from "node:os";
import type { RedisClient } from "bun";
import { config } from "config.js";
import { RealtimeClient } from "./abstract.js";

export const REDIS_LOCATION = `${config.REDIS_PREFIX}location`;
export const REDIS_LOCATION_UPDATE = `${config.REDIS_PREFIX}location:update`;

export type Location = {
	city: string;
	country: string;
	timestamp: Date;
} | null;

const cb = async function (this: RedisClient) {
	await this.send("CLIENT", [
		"SETNAME",
		`location-realtime-client-${hostname()}`,
	]);
};

export class LocationRealtimeClient extends RealtimeClient<
	typeof REDIS_LOCATION_UPDATE,
	Location
> {
	async initialize() {
		const listener = new EventEmitter<{
			[REDIS_LOCATION_UPDATE]: [Location];
		}>();

		const publisher = await this.redis.duplicate();
		publisher.onconnect = cb.bind(publisher);
		await cb.call(publisher);

		const parseLocation = (location: string) => {
			const parsed = JSON.parse(location);

			if (!parsed) return null;

			return {
				...parsed,
				timestamp: new Date(parsed.timestamp),
			};
		};

		let currentLocation: Location | null = await this.redis
			.get(REDIS_LOCATION)
			.then((v) => parseLocation(v || "null"));

		await publisher.subscribe(
			REDIS_LOCATION_UPDATE,
			async (message, channel) => {
				if (channel === REDIS_LOCATION_UPDATE) {
					const data = parseLocation(message);

					listener.emit(REDIS_LOCATION_UPDATE, data);
					currentLocation = data;
				}
			},
		);

		const update = async (state: Location) => {
			await Promise.all([
				this.redis.set(REDIS_LOCATION, JSON.stringify(state)),
				this.redis.publish(REDIS_LOCATION_UPDATE, JSON.stringify(state)),
			]);
		};

		return {
			addEventListener: listener.on.bind(listener),
			removeEventListener: listener.off.bind(listener),
			get state() {
				return currentLocation;
			},
			get update() {
				return update;
			},
		};
	}
}
