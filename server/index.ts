import express, { Request, Response } from "express";
import helmet from "helmet";
import morgan from "morgan";
import next from "next";
import api from "./api";
import redirects from "./utils/rewrites";
import headersSet from "./utils/headersSet";
import { connect } from "./db";
import { cspDirectives } from "./utils/config";

const server = express();

const port = parseInt(process.env.PORT ?? "3000", 10);
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

(async () => {
	await app.prepare();
	await connect();

	server.set("trust proxy", 1);
	server.use(morgan(dev ? "dev" : "common"));
	server.use(helmet());
	server.use(helmet.contentSecurityPolicy(cspDirectives));

	server.use(redirects);
	server.use("/api", api);
	server.use(headersSet);
	server.all("*", (req: Request, res: Response) => {
		return handle(req, res);
	});

	const httpServer = server.listen(port);

	httpServer.on("listening", () => {
		console.log("\x1b[36m%s\x1b[0m", `> Ready on http://localhost:${port}`, "\x1b[0m");
	});

	httpServer.on("error", (error) => {
		console.error(error);
	});
})();
