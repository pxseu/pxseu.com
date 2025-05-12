import Header from "@/components/header";
import "../styles/globals.css";
import Footer from "@/components/footer";
import { Metadata } from "next";
import { RealtimeProvider } from "@/contexts/RealtimeContext";
import ReactLenis from "lenis/react";
import { API_ROUTE } from "@/config";

const THEME_COLOR = "#8066F7";
const ASSET_VERSION = "3.0";
const description = "pxseu's personal website";

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
			{ url: `/favicon-16x16.png?v=${ASSET_VERSION}`, sizes: "16x16", type: "image/png" },
			{ url: `/favicon-32x32.png?v=${ASSET_VERSION}`, sizes: "32x32", type: "image/png" },
		],
		shortcut: `/favicon.ico?v=${ASSET_VERSION}`,
		apple: { url: `/apple-touch-icon.png?v=${ASSET_VERSION}`, sizes: "180x180", type: "image/png" },
		other: [{ url: `/safari-pinned-tab.svg?v=${ASSET_VERSION}`, rel: "mask-icon", color: THEME_COLOR }],
	},
	themeColor: THEME_COLOR,
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
		<html lang="en">
			<head>
				<link rel="preconnect" href={API_ROUTE} />
				<link rel="preconnect" href="https://i.scdn.co" />
			</head>
			<body className="flex justify-center bg-zinc-950 text-zinc-400 h-full p-6">
				<div className="flex justify-center items-center max-w-[900px] w-full flex-col">
					<RealtimeProvider>
						<ReactLenis root options={{ smoothWheel: true, lerp: 0.2 }}>
							<Header />
							{children}
							<Footer />
						</ReactLenis>
					</RealtimeProvider>
				</div>
			</body>
		</html>
	);
}
