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
	{
		req: "/other/legal-stuff",
		res: "/legal-stuff",
	},
];

export const cspDirectives = {
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
			"i.scdn.co",
		],
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
			"i.scdn.co",
		],
		upgradeInsecureRequests: [],
		blockAllMixedContent: [],
	},
};
