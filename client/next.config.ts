import path from "node:path";
import { fileURLToPath } from "node:url";
import type { NextConfig } from "next";

const repoRoot = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const isDevelopment = process.env.NODE_ENV !== "production";
const getEnv = (key: string) => process.env[key];
const apiOrigin = new URL(
	getEnv("NEXT_PUBLIC_API_ROUTE") || "https://api.pxseu.com",
).origin;

const csp = [
	["default-src", "'self'"],
	[
		"script-src",
		"'self'",
		"'unsafe-inline'",
		isDevelopment ? "'unsafe-eval'" : "",
		"https://proxy.csidetm.com",
	],
	["style-src", "'self'", "'unsafe-inline'"],
	["img-src", "'self'", "https://i.scdn.co", "https://*.pxseu.com"],
	["font-src", "'self'"],
	["media-src", "'self'"],
	[
		"connect-src",
		"'self'",
		apiOrigin,
		"https://proxy.csidetm.com",
		isDevelopment ? "ws://localhost:*" : "",
		isDevelopment ? "ws://127.0.0.1:*" : "",
		isDevelopment ? "ws://hori:*" : "",
	],
	["object-src", "'none'"],
	["base-uri", "'self'"],
	["form-action", "'self'"],
	["frame-ancestors", "'none'"],
	["frame-src", "'none'"],
	["manifest-src", "'self'"],
	["worker-src", "'self'"],
	isDevelopment ? [] : ["upgrade-insecure-requests"],
]
	.map((directive) => directive.filter(Boolean).join(" "))
	.filter(Boolean)
	.join("; ");

const nextConfig: NextConfig = {
	allowedDevOrigins: ["hori"],
	async headers() {
		return [
			{
				source: "/:path*",
				headers: [
					{
						key: "Content-Security-Policy",
						value: csp,
					},
					{
						key: "Referrer-Policy",
						value: "strict-origin-when-cross-origin",
					},
					{
						key: "X-Content-Type-Options",
						value: "nosniff",
					},
					{
						key: "X-Frame-Options",
						value: "DENY",
					},
					{
						key: "Permissions-Policy",
						value:
							"camera=(), microphone=(), geolocation=(), payment=(), usb=(), serial=()",
					},
				],
			},
		];
	},
	turbopack: {
		root: repoRoot,
	},
};

export default nextConfig;
