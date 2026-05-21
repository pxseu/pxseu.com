import type { ReactNode } from "react";
import { FaChevronRight } from "react-icons/fa6";
import Link from "@/components/ui/link";
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
		<Link
			href={link}
			target="_blank"
			rel="noopener noreferrer"
			className="relative flex w-full items-center justify-between border border-border-100 px-4 py-3 text-zinc-100 transition-[border-color,background-color,color] duration-150 ease-linear hover:border-brand-500/40 hover:bg-zinc-900/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/50"
		>
			<div className="flex items-center gap-3">
				<span aria-hidden="true" className={cn("text-xl", colorClass)}>
					{icon}
				</span>
				<span
					className={cn(
						"text-sm font-semibold uppercase tracking-[0.08em]",
						colorClass,
					)}
				>
					{displayName}
				</span>
			</div>

			<FaChevronRight className="h-3 w-3 text-zinc-400" aria-hidden="true" />
		</Link>
	);
}
