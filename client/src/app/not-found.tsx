import Link from "next/link";

export default function NotFound() {
	return (
		<article className="flex flex-col gap-3" data-stagger>
			<h1 className="text-lg font-semibold text-zinc-100">404 — not found</h1>

			<p>This page doesn't exist. It probably died in planning, like half of my side projects.</p>

			<p>
				<Link
					href="/"
					className="text-zinc-100 underline decoration-zinc-600 underline-offset-2 transition-colors hover:decoration-brand-500"
				>
					Back home
				</Link>
			</p>
		</article>
	);
}
