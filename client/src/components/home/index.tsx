import Container from "@/components/ui/container";
import Link from "@/components/ui/link";
import { Timed } from "@/components/ui/timed";
import { BIRTHDAY_TIMESTAMP, CODING_START_TIMESTAMP } from "@/config";
import Contact from "./contact";
import Experience from "./experience";
import ProjectCard from "./project-card";
import Skill from "./skill";

export default function Main() {
	return (
		<main className="flex w-full flex-col gap-8">
			<Container title="About Me" id="intro">
				<p className="text-sm leading-relaxed text-zinc-300 sm:text-base">
					Hey, I&apos;m Kuba — online I go by{" "}
					<strong className="bg-[linear-gradient(to_right,var(--color-brand-100),var(--color-brand-500),var(--color-brand-900))] bg-clip-text text-transparent [-webkit-text-fill-color:transparent]">
						pxseu
					</strong>
					. I&apos;m <Timed timestamp={BIRTHDAY_TIMESTAMP} label="years old" />{" "}
					and have been writing code for{" "}
					<Timed timestamp={CODING_START_TIMESTAMP} label="years" suffix="." />{" "}
					I mostly work on backend services, internal tooling, and small
					interfaces that make technical systems easier to use.
				</p>
				<p className="mt-4 text-sm leading-relaxed text-zinc-300 sm:text-base">
					I care about code that survives contact with real usage: clear names,
					predictable behavior, boring failure modes, and enough taste that the
					result does not feel disposable.
				</p>

				<p className="mt-4 text-sm leading-relaxed text-zinc-300 sm:text-base">
					I spend a lot of time pulling systems apart, learning where the edges
					are, and putting the useful pieces back together. That is the part of
					programming I keep coming back for.
				</p>

				<p className="mt-4 text-sm leading-relaxed text-zinc-300 sm:text-base">
					Outside of code, I&apos;m into cars, oddly specific gadgets, and
					occasionally making videos about what I&apos;m working on.
				</p>

				<p className="mt-4 text-sm leading-relaxed text-zinc-300 sm:text-base">
					If you want to chat, collaborate, or just say hi, my inbox is open. =]
				</p>
			</Container>

			<Container title="Experience" id="experience">
				<Experience
					items={[
						{
							title: "Full Stack & Systems Developer",
							company: "Independent",
							period: { from: "2020", to: "Present" },
							description:
								"Open source and freelance work across backend and tooling. Contributed to projects including Bun, Kaito HTTP, and DefinitelyTyped. Built smaller side projects too, like Crabdis, a Redis-style clone in Rust.",
						},
						{
							title: "Full Stack Developer",
							company: "c/side",
							period: { from: "2025", to: "2025" },
							description:
								"Worked across the stack on product features and internal tooling. Shipped frontend and backend changes, improved reliability, and owned a lot of cross-service glue work.",
						},
						{
							title: "Backend Developer",
							company: "Incard Ltd.",
							period: { from: "2024", to: "2025" },
							description:
								"Helped merge two services into one platform focused on open banking and e-commerce. Standardized shared schemas, improved developer workflows, and integrated payment providers including Stripe and Google Pay.",
						},
						{
							title: "Product Engineer",
							company: "Hop Inc.",
							period: { from: "2022", to: "2024" },
							description:
								"Built and maintained Hop's CLI, including the `hop deploy` workflow. Automated deployment paths, owned core CLI features, and reviewed related internal services.",
						},
						{
							title: "Full Stack Developer",
							company: "PreMiD & Freelance",
							period: { from: "2020", to: "2022" },
							description:
								"Contributed features, fixes, and localization work for PreMiD plus other open source projects I actively used.",
						},
					]}
				/>
			</Container>

			<Container title="Skills" id="skills">
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
					<Skill
						category="Back-end"
						skills={[
							"Node.js",
							"Fastify",
							"PostgreSQL",
							"Redis",
							"REST",
							"WebSocket",
						]}
					/>
					<Skill
						category="Frontend"
						skills={["React / Next.js", "TailwindCSS", "Vite"]}
					/>
					<Skill
						category="CLI / Tools"
						skills={["Rust", "TypeScript", "Automation", "Terminal UX"]}
					/>
					<Skill
						category="DevOps"
						skills={["Docker", "Linux", "Git", "CI/CD", "System Automation"]}
					/>
					<Skill
						category="Other"
						skills={[
							"Python",
							"C/C++",
							"Event-Driven Architectures",
							"Testing",
						]}
					/>
				</div>
			</Container>

			<Container title="Projects" id="projects">
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
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

			<Container title="Contact" id="contact">
				<p className="mb-4 text-sm uppercase tracking-widest text-zinc-400">
					Best ways to reach me
				</p>

				<Contact
					items={[
						{
							label: "Email",
							link: "mailto:kuba@pxseu.com",
							display: "kuba@pxseu.com",
						},
						{
							label: "Discord",
							link: "https://discord.com/users/338718840873811979",
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

				<div className="mt-5 text-center text-[11px] uppercase tracking-[0.2em] text-zinc-400">
					Or send me a direct message
				</div>

				<div className="mt-4 w-full">
					<Link
						href="/message"
						className="flex flex-col items-center border border-brand-500/30 px-6 py-4 text-zinc-300 transition-[border-color,background-color,color] duration-150 ease-linear hover:border-brand-500/60 hover:bg-zinc-900/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/50"
					>
						<strong className="text-xs uppercase tracking-[0.2em]">
							Message Me
						</strong>
					</Link>
				</div>
			</Container>
		</main>
	);
}
