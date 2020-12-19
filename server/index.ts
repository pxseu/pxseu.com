import express, { Request, Response } from "express";
import helmet from "helmet";
import morgan from "morgan";
import next from "next";
import api from "./api";
import redirects from "./rewrites";
import headersSet from "./headersSet";
import { connect } from "./db";

const server = express();

const port = parseInt(process.env.PORT ?? "3000", 10);
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(async () => {
	server.set("trust proxy", 1);
	server.use(morgan(dev ? "dev" : "common"));
	server.use(helmet());
	server.use(
		helmet.contentSecurityPolicy({
			directives: {
				defaultSrc: ["'self'"],
				baseUri: ["'self'"],
				fontSrc: ["'self'", "https:", "data:"],
				frameAncestors: ["'self'"],
				imgSrc: [
					"'self'",
					"data:",
					"cdn.pxseu.com",
					"www.thiswaifudoesnotexist.net",
					"twemoji.maxcdn.com",
				],
				objectSrc: ["'none'"],
				scriptSrc: ["'self'", "ajax.cloudflare.com", "static.cloudflareinsights.com"],
				scriptSrcAttr: ["'none'"],
				styleSrc: ["'self'", "https:", "'unsafe-inline'"],
				upgradeInsecureRequests: [],
				blockAllMixedContent: [],
			},
		})
	);

	server.use(redirects);
	server.use("/api", api);
	server.use(headersSet);
	server.all("*", (req: Request, res: Response) => {
		return handle(req, res);
	});

	await connect();
	server
		.listen(port, () => {
			console.log("\x1b[36m%s\x1b[0m", `> Ready on http://localhost:${port}`, "\x1b[0m");
		})
		.on("error", (error) => {
			console.error(error);
		});
});
