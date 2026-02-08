import type { FC } from "react";

interface ExperienceItem {
	title: string;
	company: string;
	period: string;
	description: string;
}

interface ExperienceProps {
	items: ExperienceItem[];
}

const Experience: FC<ExperienceProps> = ({ items }) => {
	return (
		<div className="space-y-4">
			{items.map((item) => (
				<div
					key={`${item.company}-${item.period}`}
					className="border border-border-100 p-4 sm:grid sm:grid-cols-[6rem_1fr] sm:gap-6"
				>
					<div className="mb-2 text-[11px] tracking-[0.18em] uppercase text-zinc-500 sm:mb-0">
						{item.period}
					</div>
					<div className="border-t border-border-100 pt-3 sm:border-t-0 sm:pt-0">
						<h3 className="text-base font-semibold uppercase tracking-[0.04em] text-zinc-200">
							{item.title}
						</h3>
						<p className="mt-1 text-sm uppercase tracking-widest text-zinc-400">
							{item.company}
						</p>
						<p className="mt-3 text-sm leading-relaxed text-zinc-400">
							{item.description}
						</p>
					</div>
				</div>
			))}
		</div>
	);
};

export default Experience;
