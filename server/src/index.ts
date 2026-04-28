import { config } from "./config.js";
import { root } from "./routes/index.js";
import { ipStore } from "./utils/ip-store.js";

import "./node-manager.js";

const handle = root.serve();

const server = Bun.serve({
	hostname: "0.0.0.0",
	port: config.PORT,
	fetch: async (request, server) => {
		const ip = server.requestIP(request)?.address ?? "0.0.0.0";

		return ipStore.run(ip, () => handle(request));
	},
	idleTimeout: 0,
});

console.log("Server listening at", server.url.href);
