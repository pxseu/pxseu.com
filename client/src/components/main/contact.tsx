interface ContactItem {
	label: string;
	link: string;
	display: string;
}

interface ContactProps {
	items: ContactItem[];
}

export default function Contact({ items }: ContactProps) {
	return (
		<div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
			{items.map((item) => (
				<a
					key={item.label}
					href={item.link}
					className="flex flex-col items-start border border-border-100 p-4 text-zinc-300 transition-all duration-150 ease-linear hover:border-brand-500/40 hover:bg-zinc-900/30"
					target="_blank"
					rel="noopener noreferrer"
				>
					<strong className="text-xs uppercase tracking-[0.18em] text-zinc-300">
						{item.label}
					</strong>
					<span className="mt-2 text-sm lowercase tracking-[0.06em] text-brand-500">
						{item.display}
					</span>
				</a>
			))}
		</div>
	);
}
