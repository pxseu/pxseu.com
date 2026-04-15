import { createUtilities } from "@kaito-http/core";
import { createClients } from "./clients/index.js";
import { realtimeManager } from "./realtime/index.js";
import { ipStore } from "./utils/ip-store.js";

export const clients = await createClients();

const serverStarted = Date.now();

const realtime = await realtimeManager(clients.redis);

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
