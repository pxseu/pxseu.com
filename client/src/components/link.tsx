import React, { ReactNode } from "react";

interface LinkProps {
	icon: ReactNode;
	displayName: string;
	link: string;
	color?: string;
}

export default function LinkItem({ icon, displayName, link, color = "text-blue-400" }: LinkProps) {
	return (
		<a
			href={link}
			target="_blank"
			rel="noopener noreferrer"
			className="
        flex
        items-center
        justify-center
        gap-3
        px-12
        py-3
        border
        border-zinc-700
        hover:bg-zinc-700
        transition-colors
        text-zinc-100
        text-center
      "
		>
			<span className="text-2xl text-zinc-600">{icon}</span>

			<span className={`font-semibold text-xl ${color}`}>{displayName}</span>
		</a>
	);
}
