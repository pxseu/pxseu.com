import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import type { IconType } from "react-icons/lib";
import { cn } from "@/utils/cn";

export interface LinkItemProps {
	displayName: string;
	href: string;
	icon: IconType;
	colorClass?: string;
}

export function LinkItem({ icon: Icon, displayName, href, colorClass }: LinkItemProps) {
	const external = href.startsWith("http");

	return (
		<li>
			<a
				href={href}
				target={external ? "_blank" : undefined}
				rel={external ? "noopener noreferrer" : undefined}
				className="hit-area-0.25 group flex items-center gap-3 py-3 text-sm font-semibold text-zinc-300 transition-colors hover:text-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/70 focus-visible:ring-offset-4 focus-visible:ring-offset-zinc-950"
			>
				<span
					aria-hidden="true"
					className={cn("text-base text-zinc-500 transition-colors group-hover:text-brand-500", colorClass)}
				>
					<Icon />
				</span>
				<span>{displayName}</span>
				{external ? (
					<FaArrowUpRightFromSquare
						aria-hidden="true"
						className="ml-auto size-2.5 text-zinc-700 transition-[color,transform] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-zinc-400"
					/>
				) : null}
			</a>
		</li>
	);
}
