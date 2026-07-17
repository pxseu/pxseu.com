import Link from "@/components/ui/link";

export default function NotFound() {
	return (
		<div className="w-full border border-border-100 bg-zinc-950/50 px-5 py-12 text-center sm:px-6">
			<h1 className="mb-4 text-6xl font-bold tracking-tight text-zinc-200">404</h1>
			<h2 className="mb-3 text-xl font-semibold uppercase tracking-[0.08em] text-zinc-300 sm:text-2xl">
				Nothing here
			</h2>
			<p className="mx-auto mb-8 max-w-md text-sm leading-relaxed text-zinc-400 sm:text-base">
				The page may have moved, or the link is wrong.
			</p>
			<Link
				href="/"
				className="inline-flex border border-border-100 px-6 py-3 text-xs uppercase tracking-[0.2em] text-zinc-300 transition-all duration-150 ease-linear hover:border-brand-500/40 hover:bg-zinc-900/80"
			>
				Go home
			</Link>
		</div>
	);
}
