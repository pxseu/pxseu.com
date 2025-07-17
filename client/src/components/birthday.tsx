"use client";

import NextLink from "next/link";

export default function BirthdayNotice() {
	return (
		<div className="sticky top-4 z-[213769420] w-full py-3 px-4 flex justify-center mb-4 border-[0.5px] border-border-100">
			{/* Animated background */}
			<div className="absolute inset-0 bg-gradient-to-r from-brand-100/70 to-brand-900/70 motion-safe:animate-gradient-bg motion-reduce:bg-[length:100%_100%] bg-[length:400%_400%] backdrop-blur-sm" />

			{/* Content with black text */}
			<p className="relative z-20 text-center text-lg font-medium text-zinc-950">
				Hey! Today is my Birthday 🎂. Send me some wishes in{" "}
				<NextLink
					href="/message"
					className="underline decoration-brand-100 decoration-2 hover:decoration-brand-900 transition-colors duration-300"
				>
					/message
				</NextLink>
				!
			</p>
		</div>
	);
}
