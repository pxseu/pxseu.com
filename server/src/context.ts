import { create, KaitoError, SchemaError } from "@kaito-http/core";
import { createClients } from "./clients/index.js";
import { realtimeManager } from "./realtime/index.js";

const serverStarted = Date.now();
export const clients = await createClients();
const realtime = await realtimeManager(clients.redis);

export const kaito = create({
	getContext: (req) => ({
		req,
		ip: req.headers.get("x-forwarded-for") ?? "::1",
		uptime: Date.now() - serverStarted,
		clients,
		realtime,
	}),

	onError: async (error) => {
		console.error(error);

		if (error instanceof SchemaError) {
			return {
				status: 400,
				message: error.message,
			};
		}

		return {
			status: error instanceof KaitoError ? error.status : 500,
			message:
				error instanceof KaitoError ? error.message : "Internal Server Error",
		};
	},

	before: async (request) => {
		console.log(request.method, new URL(request.url).pathname);

		const pathname = new URL(request.url).pathname;
		if (pathname === "/v1" || pathname.startsWith("/v1/")) {
			return Response.json(
				{
					message: "The v1 API is deprecated. Please use v2 endpoints instead.",
				},
				{ status: 410 },
			);
		}

		if (request.method === "OPTIONS") {
			return new Response(null, { status: 204 });
		}

		return undefined;
	},

	transform: async (request, response) => {
		const origin = request.headers.get("origin");

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
