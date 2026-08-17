import { HeaderLink } from "./link";
import Logo from "./logo";

export function Header() {
	return (
		<header className="flex items-stretch justify-between border-b border-zinc-800 py-4" data-stagger>
			<HeaderLink className="p-1" href="/" aria-label="pxseu.com home">
				<Logo />
			</HeaderLink>

			<nav aria-label="primary navigation" className="flex gap-1" data-stagger>
				{/*<HeaderLink href="/blog">Blog</HeaderLink>*/}
				<HeaderLink href="/links">Links</HeaderLink>
				<HeaderLink href="/message">Message</HeaderLink>
			</nav>
		</header>
	);
}
