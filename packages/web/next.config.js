const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");

module.exports = {
	reactStrictMode: true,
	compress: false,
	poweredByHeader: false,
	images: {
		domains: ["i.scdn.co", "s4.anilist.co", "avatars.githubusercontent.com"],
	},
	eslint: {
		ignoreDuringBuilds: true,
	},
	pwa: {
		dest: "public",
		runtimeCaching,
		disable: process.env.NODE_ENV === "development",
	},
};
