import { createUtilities } from "@kaito-http/core";
import { createClients } from "./clients/index.js";
import { ipStore } from "./index.js";
import { realtimeManager } from "./realtime/index.js";

export const clients = createClients();

const serverStarted = Date.now();

export const realtime = await realtimeManager(clients.redis);

export const { getContext, router } = createUtilities(async (req) => {
	const ip =
		req.headers.get("x-forwarded-for") ?? ipStore.getStore() ?? "unknown";

	return {
		req,
		ip,
		uptime: Date.now() - serverStarted,
		clients,
		realtime,
	};
});
