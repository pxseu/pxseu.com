import Link from "next/link";

export default function NotFound() {
	return (
		<div className="flex flex-col items-center justify-center w-full px-4 py-16 text-center">
			<h1 className="text-6xl font-bold text-zinc-300 mb-4">404</h1>
			<h2 className="text-2xl font-semibold text-zinc-400 mb-4">
				Page Not Found
			</h2>
			<p className="text-zinc-500 mb-8 max-w-md">
				The page you&apos;re looking for doesn&apos;t exist or has been moved.
			</p>
			<Link
				href="/"
				className="px-6 py-3 text-sm font-medium border border-zinc-700 text-zinc-300 hover:bg-zinc-800 transition-colors duration-300"
			>
				Go Back Home
			</Link>
		</div>
	);
}
