import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

interface LinkItemProps {
	icon: ReactNode;
	displayName: string;
	link: string;
	colorClass?: string;
}

export default function LinkItem({
	icon,
	displayName,
	link,
	colorClass = "text-brand-500",
}: LinkItemProps) {
	return (
		<a
			href={link}
			target="_blank"
			rel="noopener noreferrer"
			className="relative flex w-full items-center justify-between border border-border-100 px-4 py-3 text-zinc-100 transition-all duration-150 ease-linear hover:border-brand-500/40 hover:bg-zinc-900/80"
		>
			<div className="flex items-center gap-3">
				<span className={cn("text-xl", colorClass)}>{icon}</span>
				<span
					className={cn(
						"text-sm font-semibold uppercase tracking-[0.08em]",
						colorClass,
					)}
				>
					{displayName}
				</span>
			</div>

			<svg
				xmlns="http://www.w3.org/2000/svg"
				className="h-5 w-5 text-zinc-500"
				viewBox="0 0 20 20"
				fill="currentColor"
				role="img"
				aria-label="External link icon"
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
