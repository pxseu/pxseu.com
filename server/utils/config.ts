export const rewrites = [
	{
		req: "/bio",
		res: "/about",
	},
	{
		req: "/msg",
		res: "/message",
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
		imgSrc: ["'self'", "data:", "cdn.pxseu.com", "twemoji.maxcdn.com", "i.scdn.co", "s4.anilist.co"],
		objectSrc: ["'none'"],
		scriptSrc: ["'self'", "ajax.cloudflare.com", "static.cloudflareinsights.com", "'unsafe-eval'"],
		scriptSrcAttr: ["'none'"],
		styleSrc: ["'self'", "https:", "'unsafe-inline'"],
		connectSrc: [
			"'self'",
			"data:",
			"cdn.pxseu.com",
			"twemoji.maxcdn.com",
			"ajax.cloudflare.com",
			"static.cloudflareinsights.com",
			"i.scdn.co",
			"s4.anilist.co",
		],
		upgradeInsecureRequests: [],
		blockAllMixedContent: [],
	},
};
