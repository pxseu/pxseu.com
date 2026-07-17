"use client";

import Link from "@/components/ui/link";

export default function BirthdayNotice() {
	return (
		<div className="sticky top-4 z-213769420 isolate flex w-full justify-center overflow-hidden border border-brand-500/40 bg-zinc-950 px-4 py-3">
			<div className="absolute inset-0 bg-linear-to-r from-brand-500/70 to-brand-900/70 motion-safe:animate-gradient-bg motion-reduce:bg-size-[100%_100%] bg-size-[400%_400%] backdrop-blur-sm" />

			<p className="relative z-20 text-center text-sm font-semibold uppercase tracking-[0.12em] text-zinc-300 [text-shadow:0_1px_10px_rgba(0,0,0,0.2)] sm:text-base">
				Hey, it&apos;s my birthday! 🎂 You can send me something nice at{" "}
				<Link
					href="/message"
					className="underline decoration-zinc-300/80 decoration-2 underline-offset-4 transition-colors duration-300 hover:decoration-zinc-50"
				>
					/message
				</Link>
				.
			</p>
		</div>
	);
}
