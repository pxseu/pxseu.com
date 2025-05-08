import { Redis } from "ioredis";
import { EventEmitter } from "node:events";

export abstract class RealtimeClient<T> {
	constructor(protected redis: Redis) {}

	abstract initialize(): Promise<{
		listener: EventEmitter;
		state: T;
		update: (state: T) => Promise<void>;
	}>;
}
