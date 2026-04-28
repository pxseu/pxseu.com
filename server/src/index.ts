import { config } from "./config.js";
import { root } from "./routes/index.js";

import "./node-manager.js";

const server = Bun.serve({
	hostname: "0.0.0.0",
	port: config.PORT,
	fetch: root.serve(),
});

console.log("Server listening at", server.url.href);
