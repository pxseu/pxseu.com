import { SiPalantir } from "react-icons/si";

export function Company() {
	return (
		<a
			className="group relative inline-flex items-center gap-0.5 overflow-hidden whitespace-nowrap rounded-md border border-zinc-700/80 bg-zinc-900 px-1.5 py-1 align-middle -translate-y-px text-zinc-100 no-underline shadow-[inset_0_1px_0_rgb(255_255_255/0.06)] transition-colors before:pointer-events-none before:absolute before:inset-0 before:translate-x-[-130%] before:bg-linear-to-r before:from-transparent before:via-white/12 before:to-transparent before:transition-transform before:duration-500 hover:border-zinc-500 hover:bg-zinc-800 hover:before:translate-x-[130%] motion-reduce:before:transition-none"
			href="https://palantir.com"
			title="Palantir Technologies"
			target="_blank"
			rel="noopener noreferrer"
		>
			<span
				aria-hidden="true"
				className="relative flex size-4 shrink-0 items-center justify-center text-zinc-100 transition-transform duration-300 group-hover:-rotate-8 group-hover:scale-105 motion-reduce:transition-none"
			>
				<SiPalantir className="size-3.5" />
			</span>
			<span className="relative leading-none">Palantir</span>
		</a>
	);
}
