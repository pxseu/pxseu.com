module.exports = {
	siteUrl: "https://www.pxseu.com",
	generateRobotsTxt: true,
	robotsTxtOptions: {
		policies: [
			{
				userAgent: "*",
				allow: "/",
			},
			{
				userAgent: "*",
				disallow: "/api",
			},
		],
	},
};
