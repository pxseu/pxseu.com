import express, { Request, Response } from "express";
import helmet from "helmet";
import morgan from "morgan";
import next from "next";
import api from "./api";

const server = express();

const port = parseInt(process.env.PORT ?? "3000", 10);
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
	server.set("trust proxy", 1);
	server.use(morgan("common"));
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
				],
				objectSrc: ["'none'"],
				scriptSrc: ["'self'", "ajax.cloudflare.com"],
				scriptSrcAttr: ["'none'"],
				styleSrc: ["'self'", "https:", "'unsafe-inline'"],
				upgradeInsecureRequests: [],
				blockAllMixedContent: [],
			},
		}),
	);
	server.use("/api", api);
	server.all("*", (req: Request, res: Response) => {
		return handle(req, res);
	});

	server.listen(port, (error?: any) => {
		if (error) throw error;
		console.log(
			"\x1b[36m%s\x1b[0m",
			`> Ready on http://localhost:${port}`,
			"\x1b[0m",
		);
	});
});
