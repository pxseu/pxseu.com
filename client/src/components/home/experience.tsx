import { FaArrowDown } from "react-icons/fa";

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
					className="border border-border-100 border-l-2 border-l-brand-500/20 p-4 transition-colors duration-150 ease-linear hover:border-l-brand-500/60 hover:bg-zinc-900/30 sm:grid sm:grid-cols-[4.75rem_1fr] sm:gap-5"
				>
					<div className="mb-2 flex flex-col items-start text-[11px] tracking-[0.18em] uppercase text-zinc-400 sm:mb-0">
						<span className="block">{item.period.from}</span>

						<FaArrowDown size={11} className="my-2" aria-hidden="true" />

						<span className="block">{item.period.to}</span>
					</div>
					<div className="border-t border-border-100 pt-3 sm:border-t-0 sm:pt-0">
						<h3 className="text-base font-semibold uppercase tracking-[0.04em] text-zinc-200">
							{item.title}
						</h3>
						<p className="mt-1 text-sm uppercase tracking-widest text-zinc-400">
							{item.company}
						</p>
						<p className="mt-3 text-sm leading-relaxed text-zinc-300">
							{item.description}
						</p>
					</div>
				</div>
			))}
		</div>
	);
}
