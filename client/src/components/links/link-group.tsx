import { LinkItem, type LinkItemProps } from "./link-item";

export interface LinkGroupProps {
	title: string;
	links: LinkItemProps[];
}

export function LinkGroup({ title, links }: LinkGroupProps) {
	const headingId = `${title.toLowerCase().replaceAll(" ", "-")}-heading`;

	return (
		<section aria-labelledby={headingId} data-stagger>
			<h2 id={headingId} className="mb-1 text-xs font-bold uppercase tracking-widest text-zinc-500">
				{title}
			</h2>
			<ul className="divide-y divide-zinc-800" data-stagger>
				{links.map((link) => (
					<LinkItem key={link.href} {...link} />
				))}
			</ul>
		</section>
	);
}
