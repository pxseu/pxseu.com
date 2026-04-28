import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	typescript: {
		ignoreBuildErrors: true,
	},
	allowedDevOrigins: ["hori"],
};

export default nextConfig;
