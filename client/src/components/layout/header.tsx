"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import Link from "@/components/ui/link";
import { BIRTHDAY_TIMESTAMP } from "@/config";
import { useIsBirthday } from "@/hooks/useIsBirthday";
import { cn } from "@/utils/cn";
import BirthdayNotice from "./birthday-notice";
import Location from "./location";
import Logo from "./logo";
import Playing from "./now-playing";

interface NavLinkProps {
	href: string;
	extended?: boolean;
	className?: string;
	children: ReactNode;
}

function NavLink({ href, extended = false, children, className }: NavLinkProps) {
	const pathname = usePathname();

	return (
		<Link
			href={href}
			className={cn(
				"px-4 py-3 text-xs tracking-[0.2em] uppercase transition-all duration-150 ease-linear hover:bg-zinc-900/80 hover:text-zinc-100 border-r border-border-100",
				{
					"sm:border-b-0 border-b ": extended,
					"text-zinc-100 shadow-[inset_0_-1px_0_0_rgba(128,102,247,0.6)]":
						href === "/" ? pathname === "/" : pathname.startsWith(href),
				},
				className,
			)}
		>
			{children}
		</Link>
	);
}

export default function Header() {
	const isBirthday = useIsBirthday(BIRTHDAY_TIMESTAMP);

	return (
		<>
			{isBirthday ? <BirthdayNotice /> : null}
			<header className="w-full border border-border-100 bg-zinc-950/50">
				<nav className="grid w-full grid-cols-1 items-center border-b border-border-100 text-zinc-300 sm:grid-cols-[1fr_auto]">
					<NavLink href="/" extended>
						Home
					</NavLink>

					<div className="grid grid-cols-3 sm:flex">
						<NavLink href="/blog">Blog</NavLink>
						<NavLink href="/links">Links</NavLink>
						<NavLink href="/message" className="border-r-0">
							Message
						</NavLink>
					</div>
				</nav>

				<div className="relative grid gap-6 p-5 md:grid-cols-[minmax(0,1.85fr)_minmax(17rem,1fr)] md:p-6">
					<div className="flex flex-col gap-4">
						{/*<p className="text-[11px] tracking-[0.24em] uppercase text-zinc-500">
							Kuba Ellwart / pxseu
						</p>*/}
						<h1 className="flex items-center">
							<Logo />
						</h1>
					</div>

					<div className="border-t border-border-100 pt-4 md:border-t-0 md:border-l md:pl-6 md:pt-0 flex flex-col gap-1">
						<p className="text-[11px] tracking-[0.22em] uppercase text-zinc-400">Live Feed</p>
						<Location />
						<Playing />
						{/*<Quote />*/}
					</div>
				</div>
			</header>
		</>
	);
}
