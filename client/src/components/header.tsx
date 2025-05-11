"use client";

import Link from "next/link";
import Quote from "./quotes";
import Logo from "./logo";
import Location from "./location";
import Playing from "./playing";

export default function Header() {
	return (
		<header className="w-full mb-12">
			<nav className="w-full flex items-center justify-between p-4 mb-8 text-zinc-300">
				<Link
					href="/"
					className="px-3 py-1 text-sm font-medium border border-zinc-700 
                               hover:bg-zinc-800 transition-colors duration-300"
				>
					Home
				</Link>

				<div className="flex items-center space-x-2">
					<Link
						href="/links"
						className="px-3 py-1 text-sm font-medium border border-zinc-700
                               hover:bg-zinc-800 transition-colors duration-300"
					>
						Links
					</Link>
					<Link
						href="/message"
						className="px-3 py-1 text-sm font-medium border border-zinc-700
                               hover:bg-zinc-800 transition-colors duration-300"
					>
						Message
					</Link>
				</div>
			</nav>

			<div className="text-center">
				<h1 className="flex justify-center items-center mb-4">
					<Logo />
				</h1>
				<p className="mt-2 text-muted-foreground text-lg sm:text-xl">
					<span className="whitespace-nowrap">backend engineer</span> ·{" "}
					<span className="whitespace-nowrap">real-world systems thinker</span>
				</p>
				<Location />
				<Quote />
				<Playing />
			</div>
		</header>
	);
}
