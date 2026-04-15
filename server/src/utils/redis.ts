import { hostname } from "node:os";
import type { RedisClient } from "bun";

export function createRedisClientNamer(name: string) {
	const fullName = `${name}-${hostname()}`;

	return async function (this: RedisClient) {
		await this.send("CLIENT", ["SETNAME", fullName]);
	};
}
