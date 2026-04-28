interface ProjectCardProps {
	url: string;
	name: string;
	description: string;
}

export default function ProjectCard({
	url,
	name,
	description,
}: ProjectCardProps) {
	return (
		<a
			href={url}
			target="_blank"
			rel="noopener noreferrer"
			className="group flex h-full flex-col border border-border-100 transition-[border-color,background-color,color] duration-150 ease-linear hover:border-brand-500/40 hover:bg-zinc-900/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/50"
		>
			<div className="border-b border-border-100 px-4 py-2">
				<p className="text-[11px] tracking-[0.18em] uppercase text-zinc-400 ">
					Repository
				</p>
			</div>
			<div className="flex h-full flex-col p-4">
				<h3 className="text-base font-semibold lowercase tracking-[0.05em] text-zinc-200 transition-colors group-hover:text-brand-500">
					{name}
				</h3>
				<p className="mt-3 text-sm leading-relaxed text-zinc-300">
					{description}
				</p>
			</div>
			<div className="mt-auto border-t border-border-100 px-4 py-3 text-xs uppercase tracking-[0.2em] text-brand-500 transition-colors duration-150 ease-linear group-hover:bg-zinc-900/90">
				View on GitHub
			</div>
		</a>
	);
}
