interface ExperienceItem {
	title: string;
	company: string;
	period: {
		from: string;
		to: string;
	};
	description: string;
}

interface ExperienceProps {
	items: ExperienceItem[];
}

export default function Experience({ items }: ExperienceProps) {
	return (
		<div className="space-y-4">
			{items.map((item) => (
				<div
					key={`${item.company}-${item.period.from}-${item.period.to}`}
					className="border border-border-100 border-l-2 border-l-brand-500/20 p-4 transition-colors duration-150 ease-linear hover:border-l-brand-500/60 hover:bg-zinc-900/30"
				>
					<div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
						<h3 className="text-base font-semibold text-zinc-200">{item.title}</h3>
						<span className="shrink-0 text-[11px] tracking-[0.18em] uppercase text-zinc-400">
							{item.period.from === item.period.to
								? item.period.from
								: `${item.period.from} - ${item.period.to}`}
						</span>
					</div>
					<p className="mt-1 text-xs uppercase tracking-[0.15em] text-zinc-400">{item.company}</p>
					<p className="mt-3 text-sm leading-relaxed text-zinc-300">{item.description}</p>
				</div>
			))}
		</div>
	);
}
