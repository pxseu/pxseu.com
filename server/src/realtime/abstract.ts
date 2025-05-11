import { Redis } from "ioredis";

export abstract class RealtimeClient<E extends string, T> {
	constructor(protected redis: Redis) {}

	abstract initialize(): Promise<{
		readonly state: T;
		readonly update: (state: T) => Promise<void>;
		readonly addEventListener: (event: E, listener: (state: T) => void) => void;
		readonly removeEventListener: (event: E, listener: (state: T) => void) => void;
	}>;
}
