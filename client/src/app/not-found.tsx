import Link from "next/link";

export default function NotFound() {
	return (
		<div className="w-full border border-border-100 px-5 py-12 text-center sm:px-6">
			<h1 className="mb-4 text-6xl font-bold tracking-tight text-zinc-200">
				404
			</h1>
			<h2 className="mb-3 text-xl font-semibold uppercase tracking-[0.08em] text-zinc-300 sm:text-2xl">
				Page Not Found
			</h2>
			<p className="mx-auto mb-8 max-w-md text-sm leading-relaxed text-zinc-500 sm:text-base">
				The page you&apos;re looking for doesn&apos;t exist or has been moved.
			</p>
			<Link
				href="/"
				className="inline-flex border border-border-100 px-6 py-3 text-xs uppercase tracking-[0.2em] text-zinc-300 transition-colors duration-150 ease-linear hover:bg-zinc-900/80"
			>
				Go Back Home
			</Link>
		</div>
	);
}
