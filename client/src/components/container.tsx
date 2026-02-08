import type { ReactNode } from "react";

interface ContainerProps {
	children: ReactNode;
	title: string;
	id?: string;
}

export default function Container({ children, title, id }: ContainerProps) {
	return (
		<div id={id} className="w-full border border-border-100 bg-zinc-950/50">
			<div className="border-b border-border-100 px-5 py-4 md:px-6">
				<p className="mb-2 text-[11px] tracking-[0.22em] uppercase text-zinc-500">
					Section
				</p>
				<h2 className="text-2xl font-semibold tracking-tight text-zinc-200 md:text-3xl">
					{title}
				</h2>
			</div>

			<div className="px-5 py-5 text-zinc-400 md:px-6 md:py-6">{children}</div>
		</div>
	);
}
