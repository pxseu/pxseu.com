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
		<div className="relative">
			{/* Vertical line */}
			<div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border-100" />

			<div className="space-y-8">
				{items.map((item) => (
					<div
						key={`${item.company}-${item.period}`}
						className="relative pl-12"
					>
						{/* Circle */}
						<div className="absolute left-[17px] top-1.5 w-3 h-3 rounded-full bg-brand-500 -translate-x-1/2" />

						<div>
							<h3 className="text-lg font-semibold text-zinc-300">
								{item.title}
							</h3>
							<p className="text-zinc-300">{item.company}</p>
							<p className="text-sm mb-2">{item.period}</p>
							<p className="">{item.description}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Experience;
