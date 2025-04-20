interface ProjectCardProps {
	url: string;
	name: string;
	description: string;
}

export default function ProjectCard({ url, name, description }: ProjectCardProps) {
	return (
		<div className="border border-zinc-700 p-4 shadow-sm">
			<h3 className="text-lg font-semibold text-zinc-50">{name}</h3>
			<p className="text-sm text-zinc-300 mt-2">{description}</p>
			<a
				href={url}
				target="_blank"
				rel="noopener noreferrer"
				className="inline-block mt-4 text-blue-400 underline"
			>
				View on GitHub
			</a>
		</div>
	);
}
