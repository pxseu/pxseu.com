import { config } from "./config.js";
import { root } from "./routes/index.js";

import "./node-manager.js";

const server = Bun.serve({
	hostname: "0.0.0.0",
	port: config.PORT,
	fetch: root.serve(),
	// Bun is so bad😂😂😂😂😂
	idleTimeout: 0,
});

console.log("Server listening at", server.url.href);
