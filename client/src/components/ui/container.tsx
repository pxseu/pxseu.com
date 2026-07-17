import type { ElementType, ReactNode } from "react";
import { cn } from "@/utils/cn";

interface ContainerProps {
	children: ReactNode;
	title: string;
	id?: string;
	as?: ElementType;
	contentClassName?: string;
}

export default function Container({ children, title, id, as: Tag = "div", contentClassName }: ContainerProps) {
	return (
		<Tag id={id} className="w-full border border-border-100 bg-zinc-950/50">
			<div className="border-b border-border-100 px-5 py-3 md:px-6">
				<h2 className="text-lg font-semibold tracking-tight text-zinc-200 md:text-xl">{title}</h2>
			</div>

			<div className={cn("px-5 py-5 text-zinc-400 md:px-6 md:py-6", contentClassName)}>{children}</div>
		</Tag>
	);
}
