import Quote from "./quotes";

export default function Hero() {
	return (
		<header className="w-full mb-12 text-center">
			<h1 className="text-4xl font-bold tracking-tight sm:text-5xl">pxseu</h1>
			<p className="mt-2 text-muted-foreground text-lg sm:text-xl">
				<span className="whitespace-nowrap">software engineer</span> ·{" "}
				<span className="whitespace-nowrap">car enthusiast</span> ·{" "}
				<span className="whitespace-nowrap">problem solver</span>
			</p>
			<Quote />
		</header>
	);
}
