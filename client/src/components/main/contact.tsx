import { JSX } from "react";

interface ContactItem {
	label: string;
	link: string;
	display: string;
}

interface ContactsProps {
	items: ContactItem[];
}

export default function Contact({ items }: ContactsProps): JSX.Element {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
			{items.map((item) => (
				<a
					key={item.label}
					href={item.link}
					className="flex flex-col items-start border border-zinc-700 p-4 shadow-xs text-zinc-300 hover:shadow-md transition hover:bg-zinc-800/40"
					target="_blank"
					rel="noopener noreferrer"
				>
					<strong>{item.label}</strong>
					<span className="text-blue-400 underline">{item.display}</span>
				</a>
			))}
		</div>
	);
}
