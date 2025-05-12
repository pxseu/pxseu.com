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
        justify-between
        w-full
        px-5
        py-4
        rounded-none
		bg-zinc-800/10
        hover:bg-zinc-800/40
        border-[0.5px]
        border-solid
        border-border-100
        transition-all
        duration-200
        text-zinc-100
        relative
      "
		>
			<div className="flex items-center gap-3 mx-auto">
				<span className={`text-2xl ${color}`}>{icon}</span>
				<span className={`font-semibold text-xl ${color}`}>{displayName}</span>
			</div>

			<svg
				xmlns="http://www.w3.org/2000/svg"
				className="h-5 w-5 text-zinc-400 absolute right-5"
				viewBox="0 0 20 20"
				fill="currentColor"
			>
				<path
					fillRule="evenodd"
					d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
					clipRule="evenodd"
				/>
			</svg>
		</a>
	);
}
