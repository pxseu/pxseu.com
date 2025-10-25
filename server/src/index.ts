import { createKaitoHandler, KaitoError } from "@kaito-http/core";
import { config } from "./config.js";
import { getContext } from "./context.js";
import { root } from "./routes/index.js";

import "./node-manager.js";
import { AsyncLocalStorage } from "node:async_hooks";

const handle = createKaitoHandler({
	router: root,
	getContext,

	onError: async ({ error }) => {
		console.error(error);

		return {
			status: 500,
			message:
				error instanceof KaitoError ? error.message : "Internal Server Error",
		};
	},

	before: async (req) => {
		console.log(req.method, new URL(req.url).pathname);

		if (req.method === "OPTIONS") {
			return new Response(null, { status: 204 });
		}

		return void undefined;
	},

	transform: async (request, response) => {
		const origin = request.headers.get("origin");

		// Include CORS headers if the origin is allowed
		if (origin) {
			response.headers.set("Access-Control-Allow-Origin", origin);
			response.headers.set(
				"Access-Control-Allow-Methods",
				"GET, POST, PUT, DELETE, OPTIONS",
			);
			response.headers.set(
				"Access-Control-Allow-Headers",
				"Content-Type, Authorization, Cache-Control, X-Requested-With, Accept, Origin",
			);
			response.headers.set("Access-Control-Max-Age", "86400");
			response.headers.set("Access-Control-Allow-Credentials", "true");
		}
	},
});

export const ipStore = new AsyncLocalStorage<string>();

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

export type App = typeof root;
