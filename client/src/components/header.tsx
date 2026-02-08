"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BIRTHDAY_TIMESTAMP } from "@/config";
import { useIsBirthday } from "@/hooks/useIsBirthday";
import BirthdayNotice from "./birthday";
import Location from "./location";
import Logo from "./logo";
import Playing from "./playing";
import Quote from "./quotes";

const navBase =
	"px-4 py-3 text-xs tracking-[0.2em] uppercase transition-all duration-150 ease-linear hover:bg-zinc-900/80 hover:text-zinc-100";

const activeClass =
	"text-zinc-100 shadow-[inset_0_-1px_0_0_rgba(128,102,247,0.6)]";

export default function Header() {
	const isBirthday = useIsBirthday(BIRTHDAY_TIMESTAMP);
	const pathname = usePathname();

	const isActive = (href: string) =>
		href === "/" ? pathname === "/" : pathname.startsWith(href);

	return (
		<>
			{isBirthday && <BirthdayNotice />}
			<header className="w-full border border-border-100 bg-zinc-950/50">
				<nav className="grid w-full grid-cols-1 items-center border-b border-border-100 text-zinc-300 sm:grid-cols-[1fr_auto]">
					<Link
						href="/"
						className={`border-b border-border-100 sm:border-b-0 sm:border-r ${navBase} ${
							isActive("/") ? activeClass : ""
						}`}
					>
						Index / Home
					</Link>

					<div className="grid grid-cols-2 sm:flex">
						<Link
							href="/links"
							className={`border-r border-border-100 ${navBase} ${
								isActive("/links") ? activeClass : ""
							}`}
						>
							Links
						</Link>
						<Link
							href="/message"
							className={`${navBase} ${
								isActive("/message") ? activeClass : ""
							}`}
						>
							Message
						</Link>
					</div>
				</nav>

				<div className="grid gap-5 p-5 md:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)] md:p-6">
					<div>
						<p className="mb-4 text-[11px] tracking-[0.26em] uppercase text-zinc-500">
							Kuba Ellwart / pxseu / backend
						</p>
						<h1 className="mb-4 flex items-center">
							<Logo />
						</h1>
						<p className="max-w-2xl text-base leading-snug text-zinc-300 sm:text-lg">
							<span className="whitespace-nowrap">backend engineer</span> ·{" "}
							<span className="whitespace-nowrap">builds reliable systems</span>
						</p>
					</div>

					<div className="border-t border-border-100 pt-4 md:border-t-0 md:border-l md:pl-6 md:pt-0">
						<p className="mb-2 text-[11px] tracking-[0.22em] uppercase text-zinc-500">
							Live Feed
						</p>
						<Location />
						<Quote />
					</div>
				</div>
				<Playing />
			</header>
		</>
	);
}
