/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	eslint: {
		ignoreDuringBuilds: true,
	},
	experimental: {
		appDir: true,
	},
	images: {
		domains: ["github.com", "avatars.githubusercontent.com"],
	},
};

module.exports = nextConfig;
