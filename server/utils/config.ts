export const rewrites = [
	{
		req: "/bio",
		res: "/about",
	},
	{
		req: "/msg",
		res: "/other/message",
	},
	{
		req: "/%F0%9F%92%97",
		res: "https://ririxi.dev/",
	},
];

export const cspDirectives = {
	directives: {
		defaultSrc: ["'self'"],
		baseUri: ["'self'"],
		fontSrc: ["'self'", "https:", "data:"],
		frameAncestors: ["'self'"],
		imgSrc: ["'self'", "data:", "cdn.pxseu.com", "www.thiswaifudoesnotexist.net", "twemoji.maxcdn.com"],
		objectSrc: ["'none'"],
		scriptSrc: ["'self'", "ajax.cloudflare.com", "static.cloudflareinsights.com", "'unsafe-eval'"],
		scriptSrcAttr: ["'none'"],
		styleSrc: ["'self'", "https:", "'unsafe-inline'"],
		connectSrc: [
			"'self'",
			"data:",
			"cdn.pxseu.com",
			"www.thiswaifudoesnotexist.net",
			"twemoji.maxcdn.com",
			"ajax.cloudflare.com",
			"static.cloudflareinsights.com",
		],
		upgradeInsecureRequests: [],
		blockAllMixedContent: [],
	},
};
