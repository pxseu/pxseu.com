import { Link } from "@/components/link";
import { Timed } from "@/components/timed";
import { BIRTHDAY_TIMESTAMP, CODING_START_TIMESTAMP } from "@/config";
import { Company } from "./company";

export function About() {
	return (
		<section aria-labelledby="about-heading" className="flex flex-col gap-4" data-stagger>
			<h1 id="about-heading" className="text-lg font-semibold text-zinc-100">
				Hey, I'm Kuba.
			</h1>

			<div className="flex flex-col gap-3" data-stagger>
				<p>
					Online I go by{" "}
					<span className="bg-[linear-gradient(to_right,var(--color-brand-100),var(--color-brand-500),var(--color-brand-900))] bg-clip-text text-transparent [-webkit-text-fill-color:transparent] font-bold">
						pxseu
					</span>
					. I'm <Timed timestamp={BIRTHDAY_TIMESTAMP} label="years old" />, have been writing code for{" "}
					<Timed timestamp={CODING_START_TIMESTAMP} prefix="over " label="years" />, and work at <Company />.
				</p>

				<p>
					Most of that time has gone into backend services, CLIs and internal tooling, though I somehow always
					end up doing a bit of everything anyway. Before this I spent a couple of years building{" "}
					<Link href="https://github.com/hopinc/cli">Hop's CLI</Link> which is still my favourite thing I've
					shipped, mostly because people actually used it every day and it made their lives easier.
				</p>

				<p>
					I learn by taking things apart. <Link href="https://github.com/pxseu/crabdis">crabdis</Link> exists
					because I wanted to know what Redis does under the hood, so I built a small compatible server in
					Rust. <Link href="https://github.com/pxseu/fami">fami</Link> exists because I wanted to make a
					really good way to interact with cookies because they're really hard to get right.
				</p>

				<p>
					If you want to chat, collaborate, or just say hi, <Link href="/message">my inbox is open</Link>. =]
				</p>
			</div>
		</section>
	);
}
