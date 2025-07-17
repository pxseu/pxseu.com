"use client";

import NextLink from "next/link";
import React, { type FC } from "react";

const BirthdayNotice: FC = () => {
	return (
		<div className="relative w-full py-3 px-4 flex justify-center mb-4">
			{/* Animated background */}
			<div className="absolute inset-0 bg-gradient-to-r from-brand-100 to-brand-900 motion-safe:animate-gradient-bg motion-reduce:bg-[length:100%_100%] bg-[length:400%_400%]" />

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
};

export default BirthdayNotice;
