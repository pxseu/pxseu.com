export default function Footer() {
	return (
		<footer className="flex justify-center items-center w-full h-16 mt-6">
			<p className="text-sm text-muted-foreground">
				&copy; 2019-{new Date().getFullYear()} pxseu. All rights reserved.
			</p>
		</footer>
	);
}
