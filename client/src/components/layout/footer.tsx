export default function Footer() {
	return (
		<footer className="flex w-full items-center justify-center border border-border-100 bg-zinc-950/50 px-4 py-4">
			<p className="text-center text-[11px] tracking-[0.2em] uppercase text-zinc-400">
				&copy; 2019-{new Date().getFullYear()} pxseu. All rights reserved.
			</p>
		</footer>
	);
}
