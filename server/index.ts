import "dotenv/config";
import express, { Request, Response } from "express";
import helmet from "helmet";
import morgan from "morgan";
import next from "next";
import cors from "cors";
import { router as apiRouter } from "./api";
import { connect } from "./db/mongo";
import { cspDirectives } from "./utils/config";
import { useApiExtender } from "./utils/extenders";
import headersSet from "./utils/headersSet";
import redirects from "./utils/rewrites";

const DISSABLE_NEXT = process.env.API_ONLY === "true";

const server = express();

const port = parseInt(process.env.PORT ?? "3000", 10);
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

(async () => {
	if (!DISSABLE_NEXT) await app.prepare();
	await connect();

	server.set("trust proxy", 1);
	server.use(morgan(dev ? "dev" : "common"));
	server.use(cors());
	server.use(helmet());
	server.use(helmet.contentSecurityPolicy(cspDirectives));
	server.use(useApiExtender);

	server.use(redirects);
	server.use("/api", apiRouter);
	server.use(headersSet);

	if (!DISSABLE_NEXT)
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
