import Header from "@/components/layout/header";
import "../styles/globals.css";
import { CSideScript } from "@cside.dev/next";
import { GeistMono } from "geist/font/mono";
import ReactLenis from "lenis/react";
import type { Metadata, Viewport } from "next";
import BackgroundParallax from "@/components/layout/background-parallax";
import Footer from "@/components/layout/footer";
import JsonLd from "@/components/ui/json-ld";
import { API_ROUTE } from "@/config";
import { AudioProvider } from "@/contexts/AudioProvider";
import { RealtimeProvider } from "@/contexts/RealtimeContext";

const THEME_COLOR = "#8066F7";
const ASSET_VERSION = "3.0";
const description = "pxseu's personal website";

const websiteSchema = {
	"@context": "https://schema.org",
	"@type": "WebSite",
	name: "pxseu.com",
	url: "https://pxseu.com",
	description,
	author: {
		"@type": "Person",
		name: "pxseu",
		url: "https://pxseu.com",
	},
};

const personSchema = {
	"@context": "https://schema.org",
	"@type": "Person",
	name: "pxseu",
	alternateName: "Kuba Ellwart",
	url: "https://pxseu.com",
	description,
	sameAs: [
		"https://github.com/pxseu",
		"https://twitter.com/pxseu",
		"https://www.linkedin.com/in/kubaellwart/",
		"https://discord.com/users/338718840873811979",
		"https://tiktok.com/@pxseu",
		"https://twitch.tv/pxseu",
		"https://open.spotify.com/user/1evum6fq9klvekqjbz4cu5v79",
		"https://www.youtube.com/channel/UC5_T1P4TJ4lJUt3XaM3Y_8Q",
		"https://www.npmjs.com/~pxseu",
		"https://gitlab.com/pxseu",
		"https://crates.io/users/pxseu",
		"https://hub.docker.com/u/pxseu",
	],
	email: "kuba@pxseu.com",
};

const websiteSchemaJson = JSON.stringify(websiteSchema);
const personSchemaJson = JSON.stringify(personSchema);

export const viewport: Viewport = {
	themeColor: THEME_COLOR,
};

export const metadata: Metadata = {
	title: "pxseu.com",
	description,
	keywords: ["pxseu", "poseuxck"],
	authors: [{ name: "pxseu", url: "https://pxseu.com" }],
	robots: "index, follow",
	manifest: `/manifest.json?v=${ASSET_VERSION}`,
	applicationName: "pxseu",
	appleWebApp: {
		title: "pxseu",
	},
	icons: {
		icon: [
			{
				url: `/favicon-16x16.png?v=${ASSET_VERSION}`,
				sizes: "16x16",
				type: "image/png",
			},
			{
				url: `/favicon-32x32.png?v=${ASSET_VERSION}`,
				sizes: "32x32",
				type: "image/png",
			},
		],
		shortcut: `/favicon.ico?v=${ASSET_VERSION}`,
		apple: {
			url: `/apple-touch-icon.png?v=${ASSET_VERSION}`,
			sizes: "180x180",
			type: "image/png",
		},
		other: [
			{
				url: `/safari-pinned-tab.svg?v=${ASSET_VERSION}`,
				rel: "mask-icon",
				color: THEME_COLOR,
			},
		],
	},
	openGraph: {
		url: "https://pxseu.com",
		type: "website",
		locale: "en_US",
		siteName: "pxseu.com",
		title: "pxseu.com",
		images: [
			{
				url: `https://pxseu.com/android-chrome-512x512.png?v=${ASSET_VERSION}`,
			},
		],
		description,
	},
	twitter: {
		card: "summary_large_image",
		site: "@pxseu",
		title: "pxseu.com",
		description,
		images: [`https://pxseu.com/android-chrome-512x512.png?v=${ASSET_VERSION}`],
	},
	verification: {
		google: "azPHAHBpTuJ-8stcPE_LX6-GNwVGjzp5_V7E3KCcmMk",
	},
	other: {
		"msapplication-TileColor": THEME_COLOR,
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className={GeistMono.variable}>
			<head>
				<CSideScript scriptURLOverride="https://7228584649694834688.csidetm.com/client.js" />
				<JsonLd id="website-schema" json={websiteSchemaJson} />
				<JsonLd id="person-schema" json={personSchemaJson} />
				<link rel="preconnect" href={API_ROUTE} />
				<link rel="preconnect" href="https://i.scdn.co" />
			</head>
			<body className="relative min-h-screen overflow-x-hidden bg-zinc-950 font-mono text-zinc-350 antialiased leading-relaxed tracking-[-0.01em] selection:bg-brand-500/40 selection:text-zinc-100">
				<div className="relative z-10 mx-auto flex w-full max-w-245 flex-col px-4 py-4 sm:px-6 sm:py-6 gap-8">
					<RealtimeProvider>
						<AudioProvider>
							<ReactLenis root options={{ smoothWheel: true, lerp: 0.2 }}>
								<BackgroundParallax />
								<Header />
								{children}
								<Footer />
							</ReactLenis>
						</AudioProvider>
					</RealtimeProvider>
				</div>
			</body>
		</html>
	);
}
