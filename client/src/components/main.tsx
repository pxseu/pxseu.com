import { BIRTHDAY_TIMESTAMP, CODING_START_TIMESTAMP } from "@/config";
import Container from "@/components/container";
import { Timed } from "@/components/timed";
import ProjectCard from "./project-card";
import Skill from "./skill";
import Contact from "./contact";

interface Props {
	content: string[];
}

export default function Main({}: Props) {
	return (
		<main className="flex flex-col w-full">
			{/* ABOUT ME */}
			<Container title="About Me" id="intro">
				<p>
					Hi there! I&apos;m Kuba, but online I go by <strong className="text-zinc-50">pxseu</strong>.
					I&apos;m <Timed timestamp={BIRTHDAY_TIMESTAMP} /> years old, and I&apos;ve been in software
					development for <Timed timestamp={CODING_START_TIMESTAMP} /> years. My main focus is on creating
					systems that are stable, maintainable, and thoughtfully designed, with a strong emphasis on
					long-term usability.
				</p>

				<p className="mt-4 text-zinc-300">
					I specialize in <strong>backend systems</strong> and internal tools that aim to be structured and
					robust. For me, clean code, clarity in structure, and ensuring the system is easy to maintain for
					years to come are non-negotiable.
				</p>

				<p className="mt-4 text-zinc-300">
					When I&apos;m not coding, you&apos;ll often find me immersed in tech videos, exploring new trends
					online, or going down interesting rabbit holes just because something piqued my curiosity. I&apos;ve
					always been drawn to things that are well-crafted — whether that&apos;s software, design, or ideas.
				</p>

				<p className="mt-4 text-zinc-300">
					I value reliability and consistency, and I strive to be someone others can count on. It&apos;s not
					about the praise — it&apos;s just that following through feels right to me, especially with the
					little things that can make a big difference.
				</p>

				<p className="mt-4 text-zinc-300">
					Outside of tech, I have a few quirky hobbies — LEGO, anime figures, and oddly specific gadgets that
					just feel fun to have. Little things that often don&apos;t make sense to buy, but bring me joy in
					their simplicity and craftsmanship.
				</p>

				<p className="mt-4 text-zinc-300">
					I&apos;m still figuring things out, and I&apos;m okay with that. I like to experiment, learn from
					mistakes, and keep iterating until things click. It&apos;s all part of the process, and I&apos;m
					always moving forward.
				</p>
			</Container>

			{/* SKILLS */}
			<Container title="Skills" id="skills">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-zinc-300">
					<Skill
						category="Back-end"
						skills={["Node.js", "Fastify", "PostgreSQL", "Redis", "REST", "WebSocket"]}
					/>
					<Skill category="Frontend" skills={["React / Next.js", "TailwindCSS", "Vite"]} />
					<Skill category="CLI / Tools" skills={["Rust", "TypeScript", "Automation", "Terminal UX"]} />
					<Skill category="DevOps" skills={["Docker", "Linux", "Git", "CI/CD", "System Automation"]} />
					<Skill category="Other" skills={["Python", "C/C++", "Event-Driven Architectures", "Testing"]} />
				</div>
			</Container>

			{/* PROJECTS */}
			<Container title="Projects" id="projects">
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
					<ProjectCard
						url="https://github.com/hopinc/cli"
						name="hopinc/cli"
						description="Interact with Hop in your terminal. Written in Rust."
					/>
					<ProjectCard
						url="https://github.com/pxseu/pxseu.com"
						name="pxseu/pxseu.com"
						description="My personal portfolio website. Built with TypeScript."
					/>
					<ProjectCard
						url="https://github.com/pxseu/anilist-readme"
						name="pxseu/anilist-readme"
						description="Showcases your latest AniList activity in your GitHub README. Made with Python."
					/>
					<ProjectCard
						url="https://github.com/imperialbin/imperial.js"
						name="imperialbin/imperial.js"
						description="Official Node.js wrapper for imperialb.in, written in TypeScript."
					/>
					<ProjectCard
						url="https://github.com/pxseu/lanyard-ui"
						name="pxseu/lanyard-ui"
						description="Visualizes Discord presence data from Lanyard with a minimal UI. Built with TypeScript."
					/>
					<ProjectCard
						url="https://github.com/pxseu/crabdis"
						name="pxseu/crabdis"
						description="A tiny Redis-like clone... but a little rusty. Written in Rust."
					/>
				</div>
			</Container>

			{/* CONTACT */}
			<Container title="Contact" id="contact">
				<p className="text-zinc-300 mb-4">Feel free to reach out through any of the platforms below:</p>

				<Contact
					items={[
						{
							label: "Website",
							link: "https://pxseu.com/message",
							display: "pxseu.com",
						},
						{
							label: "Email",
							link: "mailto:me@pxseu.com",
							display: "me@pxseu.com",
						},
						{
							label: "GitHub",
							link: "https://github.com/pxseu",
							display: "github.com/pxseu",
						},
						{
							label: "Twitter",
							link: "https://twitter.com/pxseu",
							display: "@pxseu",
						},
					]}
				/>
			</Container>
		</main>
	);
}
