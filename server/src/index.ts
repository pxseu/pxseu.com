import { createKaitoHandler, KaitoError } from "@kaito-http/core";
import { KaitoServer } from "@kaito-http/uws";
import { getContext } from "./context.js";
import { root } from "./routes/index.js";
import { config } from "./config.js";

import "./node-manager.js";

const handle = createKaitoHandler({
	router: root,
	getContext,

	onError: async ({ error }) => {
		console.error(error);

		return {
			status: 500,
			message: error instanceof KaitoError ? error.message : "Internal Server Error",
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
			response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
			response.headers.set(
				"Access-Control-Allow-Headers",
				"Content-Type, Authorization, Cache-Control, X-Requested-With, Accept, Origin",
			);
			response.headers.set("Access-Control-Max-Age", "86400");
			response.headers.set("Access-Control-Allow-Credentials", "true");
		}
	},
});

const server = await KaitoServer.serve({
	port: config.PORT,
	fetch: handle,
});

console.log("Server listening at", server.url);

export type App = typeof root;
