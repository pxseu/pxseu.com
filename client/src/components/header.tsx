"use client";

import Link from "next/link";
import Quote from "./quotes";
import Logo from "./logo";

export default function Header() {
	return (
		<header className="w-full mb-12">
			<nav className="w-full flex items-center justify-between p-4 mb-4">
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

			{/* Original header content */}
			<div className="text-center">
				<h1 className="flex justify-center items-center mb-4">
					<Logo />
				</h1>
				<p className="mt-2 text-muted-foreground text-lg sm:text-xl">
					<span className="whitespace-nowrap">software engineer</span> ·{" "}
					<span className="whitespace-nowrap">car enthusiast</span> ·{" "}
					<span className="whitespace-nowrap">problem solver</span>
				</p>
				<Quote />
			</div>
		</header>
	);
}
