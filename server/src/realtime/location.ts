import EventEmitter from "node:events";
import { RealtimeClient } from "./abstract.js";

export const REDIS_LOCATION = "location";
export const REDIS_LOCATION_UPDATE = "location:update";

export type Location = {
	city: string;
	country: string;
	timestamp: Date;
} | null;

export class LocationRealtimeClient extends RealtimeClient<Location> {
	async initialize() {
		const listener = new EventEmitter<{
			[REDIS_LOCATION_UPDATE]: [Location];
		}>();

		const publisher = this.redis.duplicate();

		await publisher.subscribe(REDIS_LOCATION_UPDATE);

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

		publisher.on("message", async (channel, message) => {
			if (channel === REDIS_LOCATION_UPDATE) {
				const data = parseLocation(message);

				listener.emit(REDIS_LOCATION_UPDATE, data);
				currentLocation = data;
			}
		});

		const update = async (state: Location) => {
			await Promise.all([
				this.redis.set(REDIS_LOCATION, JSON.stringify(state)),
				this.redis.publish(REDIS_LOCATION_UPDATE, JSON.stringify(state)),
			]);
		};

		return {
			listener,
			get state() {
				return currentLocation;
			},
			update,
		};
	}
}
