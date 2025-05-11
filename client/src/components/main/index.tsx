import { BIRTHDAY_TIMESTAMP, CODING_START_TIMESTAMP } from "@/config";
import Container from "@/components/container";
import { Timed } from "@/components/main/timed";
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
					Hey, I&apos;m Kuba — online I go by{" "}
					<strong className="bg-gradient-to-r from-brand-100 to-brand-900 bg-clip-text text-transparent">
						pxseu
					</strong>
					. I&apos;m <Timed timestamp={BIRTHDAY_TIMESTAMP} label="years old" /> and have been writing code for{" "}
					<Timed timestamp={CODING_START_TIMESTAMP} label="years" />. I care about building systems that
					don&apos;t fall apart: clean, maintainable, and structured in a way that actually makes sense.
				</p>
				<p className="mt-4">
					My thing is backend systems and internal tools — the kind of work that&apos;s rarely flashy, but
					absolutely essential. I like clarity, reliability, and the feeling of leaving something better than
					I found it. If it can last years without turning into a mess, I&apos;ve done my job right.
				</p>

				<p className="mt-4">
					I&apos;m naturally curious — sometimes annoyingly so. I end up in weird internet corners, digging
					into obscure protocols, vintage tech, or whatever random detail catches my brain that week. I
					don&apos;t chase trends much; I just follow the &quot;wait, that&apos;s interesting&quot; moments
					wherever they go.
				</p>

				<p className="mt-4">
					Outside of code, I&apos;m into cars and overly specific gadgets that serve one purpose perfectly. I
					like things that are well-built, well-designed, and a little bit unnecessary — but in a good way.
				</p>

				<p className="mt-4">
					Every now and then, I also dabble in content creation — making videos, sharing projects, or
					documenting random experiments. It&apos;s a fun creative outlet and a good way to stay inspired
					outside of the usual routine.
				</p>

				<p className="mt-4">
					I don&apos;t pretend to have it all figured out. I build, I break things, I adjust. That process —
					of iterating until something feels right — is where I do my best work.
				</p>
			</Container>

			{/* SKILLS */}
			<Container title="Skills" id="skills">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
				<p className="mb-4">Feel free to reach out through any of the platforms below:</p>

				<Contact
					items={[
						{
							label: "Website",
							link: "https://pxseu.com/message",
							display: "pxseu.com",
						},
						{
							label: "TikTok",
							link: "https://tiktok.com/@pxseu",
							display: "@pxseu",
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
