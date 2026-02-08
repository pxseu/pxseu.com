interface SkillProps {
	category: string;
	skills: string[];
}

export default function Skill({ category, skills }: SkillProps) {
	return (
		<div className="border border-border-100 p-4">
			<h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-zinc-200">
				{category}
			</h3>
			<div className="flex flex-wrap gap-2">
				{skills.map((skill) => (
					<span
						key={skill}
						className="border border-border-100 px-2 py-1 text-xs uppercase tracking-[0.06em] text-zinc-400"
					>
						{skill}
					</span>
				))}
			</div>
		</div>
	);
}
