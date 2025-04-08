interface SkillProps {
	category: string;
	skills: string[];
}

export default function Skill({ category, skills }: SkillProps) {
	return (
		<div>
			<h3 className="text-lg font-semibold text-zinc-50 mb-2">{category}</h3>
			<div className="flex flex-wrap gap-2">
				{skills.map((skill) => (
					<span key={skill} className="text-zinc-100 px-2 py-1 text-sm border border-zinc-700">
						{skill}
					</span>
				))}
			</div>
		</div>
	);
}
