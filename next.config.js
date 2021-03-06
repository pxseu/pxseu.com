const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");

module.exports = withPWA({
	poweredByHeader: false,
	pwa: {
		dest: "public",
		runtimeCaching,
		disable: process.env.NODE_ENV === "development",
	},
});
