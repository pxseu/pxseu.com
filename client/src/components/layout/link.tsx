import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/utils/cn";

export function HeaderLink({ className, ...props }: ComponentProps<typeof Link>) {
	return (
		<Link
			className={cn(
				"inline-flex items-center justify-center bg-transparent p-3 text-sm font-semibold text-zinc-400 transition-[color,background-color] duration-200 ease-out hover:bg-zinc-800/60 hover:text-zinc-100 focus-visible:bg-zinc-800/60 focus-visible:ring-2 focus-visible:ring-brand-500/70 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 focus-visible:outline-none",
				className,
			)}
			{...props}
		/>
	);
}
