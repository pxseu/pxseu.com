"use client";

import Link from "next/link";

export default function BirthdayNotice() {
	return (
		<div className="sticky top-4 z-213769420 mb-4 flex w-full justify-center border border-border-100 px-4 py-3">
			<div className="absolute inset-0 bg-linear-to-r from-brand-500/70 to-brand-900/70 motion-safe:animate-gradient-bg motion-reduce:bg-size-[100%_100%] bg-size-[400%_400%] backdrop-blur-sm" />

			<p className="relative z-20 text-center text-sm font-semibold uppercase tracking-[0.12em] text-zinc-950 sm:text-base">
				Hey! Today is my Birthday 🎂. Send me some wishes in{" "}
				<Link
					href="/message"
					className="underline decoration-brand-500 decoration-2 transition-colors duration-300 hover:decoration-brand-900"
				>
					/message
				</Link>
				!
			</p>
		</div>
	);
}
