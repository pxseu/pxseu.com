import { BIRTHDAY_TIMESTAMP, CODING_START_TIMESTAMP } from "@/config";
import Container from "@/components/container";
import { Timed } from "@/components/timed";

interface Props {
	content: string[];
}

export default function Main({}: Props) {
	return (
		<main className="flex flex-col w-full">
			<Container title="About Me" id="intro">
				<p>
					Hi there! I&apos;m Kuba, but online I go by{" "}
					<strong className="bg-gradient-to-r from-brand-100 to-brand-900 bg-clip-text text-transparent">
						pxseu
					</strong>
					. I&apos;m <Timed timestamp={BIRTHDAY_TIMESTAMP} /> years old, and I&apos;ve been in software
					development for <Timed timestamp={CODING_START_TIMESTAMP} /> years. My main focus is on creating
					systems that are stable, maintainable, and thoughtfully designed, with a strong emphasis on
					long-term usability.
				</p>

				<p className="mt-4">
					I specialize in <strong>backend systems</strong> and internal tools that aim to be structured and
					robust. For me, clean code, clarity in structure, and ensuring the system is easy to maintain for
					years to come are non-negotiable.
				</p>

				<p className="mt-4">
					When I&apos;m not coding, you&apos;ll often find me immersed in tech videos, exploring new trends
					online, or going down interesting rabbit holes just because something piqued my curiosity. I&apos;ve
					always been drawn to things that are well-crafted — whether that&apos;s software, design, or ideas.
				</p>

				<p className="mt-4">
					I value reliability and consistency, and I strive to be someone others can count on. It&apos;s not
					about the praise — it&apos;s just that following through feels right to me, especially with the
					little things that can make a big difference.
				</p>

				<p className="mt-4">
					Outside of tech, I have a few quirky hobbies — LEGO, anime figures, and oddly specific gadgets that
					just feel fun to have. Little things that often don&apos;t make sense to buy, but bring me joy in
					their simplicity and craftsmanship.
				</p>

				<p className="mt-4">
					I&apos;m still figuring things out, and I&apos;m okay with that. I like to experiment, learn from
					mistakes, and keep iterating until things click. It&apos;s all part of the process, and I&apos;m
					always moving forward.
				</p>
			</Container>

			<Container title="Skills" id="skills">
				<ul className="list-disc pl-4 space-y-1">
					<li>
						<strong>Back-end:</strong> Node.js, Fastify, PostgreSQL, Redis, REST, WebSocket
					</li>
					<li>
						<strong>Frontend:</strong> React / Next.js, TailwindCSS, Vite
					</li>
					<li>
						<strong>CLI / Tools:</strong> Rust, TypeScript, automation, terminal UX
					</li>
					<li>
						<strong>DevOps:</strong> Docker, Linux, Git, CI/CD, system automation
					</li>
					<li>
						<strong>Other:</strong> Python, C/C++, event-driven architectures, testing
					</li>
				</ul>
			</Container>

			<Container title="Projects" id="projects">
				<ul className="list-disc pl-4 space-y-1">
					<li>
						<strong>hopinc/cli</strong> — Interact with Hop in your terminal. Written in Rust.
					</li>
					<li>
						<strong>pxseu/pxseu.com</strong> — My personal portfolio website. Built with TypeScript.
					</li>
					<li>
						<strong>pxseu/anilist-readme</strong> — Showcases your latest AniList activity in your GitHub
						README. Made with Python.
					</li>
					<li>
						<strong>imperialbin/imperial.js</strong> — Official Node.js wrapper for{" "}
						<code>imperialb.in</code>, written in TypeScript.
					</li>
					<li>
						<strong>pxseu/lanyard-ui</strong> — Visualizes Discord presence data from Lanyard with a minimal
						UI. Built with TypeScript.
					</li>
					<li>
						<strong>pxseu/crabdis</strong> — A tiny Redis-like clone... but a little rusty. Written in Rust.
					</li>
				</ul>
			</Container>

			<Container title="Contact" id="contact">
				<p>Feel free to reach out through any of the platforms below:</p>
				<ul className="list-none space-y-1 mt-4">
					<li>
						<strong>Website:</strong>{" "}
						<a href="https://pxseu.com/message" className="text-primary underline">
							pxseu.com
						</a>
					</li>
					<li>
						<strong>Email:</strong>{" "}
						<a href="mailto:me@pxseu.com" className="text-primary underline">
							me@pxseu.com
						</a>
					</li>
					<li>
						<strong>GitHub:</strong>{" "}
						<a href="https://github.com/pxseu" className="text-primary underline">
							github.com/pxseu
						</a>
					</li>
					<li>
						<strong>Twitter:</strong>{" "}
						<a href="https://twitter.com/pxseu" className="text-primary underline">
							@pxseu
						</a>
					</li>
				</ul>
			</Container>
		</main>
	);
}
