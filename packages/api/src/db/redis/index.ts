import Redis from "ioredis";
import { HOSTNAME, PORT, REDIS_HOST } from "../../config";

export const redis = new Redis({
	keyPrefix: `${HOSTNAME}:`,
	host: REDIS_HOST,
	port: PORT,
});
