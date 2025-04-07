import Hero from "@/components/hero";
import "../styles/globals.css";
import Footer from "@/components/footer";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className="flex justify-center bg-zinc-900 text-zinc-100 h-full p-6">
				<div className="flex justify-center items-center max-w-[900px] w-full flex-col">
					<Hero />
					{children}
					<Footer />
				</div>
			</body>
		</html>
	);
}
