import Header from "@/components/header";
import "../styles/globals.css";
import Footer from "@/components/footer";
import { Metadata } from "next";

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
			<body className="flex justify-center bg-zinc-900 text-zinc-100 h-full p-6">
				<div className="flex justify-center items-center max-w-[900px] w-full flex-col">
					<Header />
					{children}
					<Footer />
				</div>
			</body>
		</html>
	);
}
