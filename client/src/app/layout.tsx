import Header from "@/components/header";
import "../styles/globals.css";
import Footer from "@/components/footer";
import { Metadata } from "next";
import { RealtimeProvider } from "@/contexts/RealtimeContext";
import ReactLenis from "lenis/react";
import { API_ROUTE } from "@/config";

export const metadata: Metadata = {
	title: "pxseu.com",
	keywords: ["pxseu"],
	authors: [{ name: "pxseu", url: "https://pxseu.com" }],
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
