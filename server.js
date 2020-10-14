"use strict";

const server = require("express")();
const helmet = require("helmet");
const morgan = require("morgan");
const next = require("next");

const port = parseInt(process.env.PORT, 10) || 3000;
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
		})
	);

	server.all("*", (req, res) => {
		return handle(req, res);
	});

	server.listen(port, (err) => {
		if (err) throw err;
		console.log(
			"\x1b[36m%s\x1b[0m",
			`> Ready on http://localhost:${port}`,
			"\x1b[0m"
		);
	});
});
