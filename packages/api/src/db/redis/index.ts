import Redis from "ioredis";
import { HOSTNAME, REDIS_HOST, REDIS_PORT } from "../../config";

export const redis = new Redis({
	keyPrefix: `${HOSTNAME}:`,
	host: REDIS_HOST,
	port: REDIS_PORT,
});
