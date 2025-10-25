import Link from "next/link";
import Container from "@/components/container";
import { Timed } from "@/components/main/timed";
import { BIRTHDAY_TIMESTAMP, CODING_START_TIMESTAMP } from "@/config";
import Contact from "./contact";
import Experience from "./experience";
import ProjectCard from "./project-card";
import Skill from "./skill";

export default function Main() {
	return (
		<main className="flex flex-col w-full">
			{/* ABOUT ME */}
			{/* biome-ignore lint/correctness/useUniqueElementIds: section IDs are intentionally static for navigation */}
			<Container title="About Me" id="intro">
				<div>
					Hey, I&apos;m Kuba — online I go by{" "}
					<strong className="bg-linear-to-r from-brand-100 to-brand-900 bg-clip-text text-transparent">
						pxseu
					</strong>
					. I&apos;m <Timed timestamp={BIRTHDAY_TIMESTAMP} label="years old" />{" "}
					and have been writing code for{" "}
					<Timed timestamp={CODING_START_TIMESTAMP} label="years" />. I care
					about building systems that don&apos;t fall apart: clean,
					maintainable, and structured in a way that actually makes sense.
				</div>
				<div className="mt-4">
					My thing is backend systems and internal tools — the kind of work
					that&apos;s rarely flashy, but absolutely essential. I like clarity,
					reliability, and the feeling of leaving something better than I found
					it. If it can last years without turning into a mess, I&apos;ve done
					my job right.
				</div>

				<div className="mt-4">
					I&apos;m naturally curious — sometimes annoyingly so. I end up in
					weird internet corners, digging into obscure protocols, vintage tech,
					or whatever random detail catches my brain that week. I don&apos;t
					chase trends much; I just follow the &quot;wait, that&apos;s
					interesting&quot; moments wherever they go.
				</div>

				<div className="mt-4">
					Outside of code, I&apos;m into cars and overly specific gadgets that
					serve one purpose perfectly. I like things that are well-built,
					well-designed, and a little bit unnecessary — but in a good way.
				</div>

				<div className="mt-4">
					Every now and then, I also dabble in content creation — making videos,
					sharing projects, or documenting random experiments. It&apos;s a fun
					creative outlet and a good way to stay inspired outside of the usual
					routine.
				</div>

				<div className="mt-4">
					I don&apos;t pretend to have it all figured out. I build, I break
					things, I adjust. That process — of iterating until something feels
					right — is where I do my best work.
				</div>
			</Container>

			{/* EXPERIENCE */}
			{/* biome-ignore lint/correctness/useUniqueElementIds: section IDs are intentionally static for navigation */}
			<Container title="Experience" id="experience">
				<Experience
					items={[
						{
							title: "Full Stack Developer",
							company: "c/side",
							period: "2025 - Present",
							description:
								"Working on all aspects of c/side, from backend to frontend and everything in between. Creating simple and intuitive tools interfaces to make the web ever so slightly better, one step at a time. Writing complex and over the top React Componenets and fancy Database Queries to make everything fast, responsive and secure.",
						},
						{
							title: "Full Stack Developer",
							company: "Freelance",
							period: "2025 - Present",
							description:
								"Developing a Linktree-like service focused on physical NFC cards, allowing users to share their digital presence through physical cards. Maintaining and improving open source projects, including a Redis clone written in Rust. Ensuring stability and security across all projects while contributing to the OSS ecosystem. Mentoring university students by providing guidance, tips, and advice on their programming projects.",
						},
						{
							title: "Backend Developer",
							company: "Incard Ltd.",
							period: "2024 - 2025",
							description:
								"Led the consolidation of two separate services into a unified platform, focusing on open banking and e-commerce integrations. Created common schemas and improved the overall developer experience. Worked on integrating various services including Stripe, Google, and other payment providers.",
						},
						{
							title: "Product Engineer",
							company: "Hop Inc.",
							period: "2022 - 2024",
							description:
								"Led the development of Hop's CLI tool, creating a seamless deployment experience with `hop deploy`. Built the first tool that automated the entire deployment process, making it effortless for users. Managed and reviewed internal services while serving as the primary developer for the CLI, which served as a replacement for the web frontend.",
						},
						{
							title: "Full Stack Developer",
							company: "Freelance",
							period: "2020 - 2022",
							description:
								"Contributed to various open source projects, with a focus on PreMiD. Worked on localizations, improvements, and features for projects I used and enjoyed. Maintained a strong presence in the open source community through meaningful contributions.",
						},
					]}
				/>
			</Container>

			{/* SKILLS */}
			{/* biome-ignore lint/correctness/useUniqueElementIds: section IDs are intentionally static for navigation */}
			<Container title="Skills" id="skills">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

			{/* PROJECTS */}
			{/* biome-ignore lint/correctness/useUniqueElementIds: section IDs are intentionally static for navigation */}
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
			{/* biome-ignore lint/correctness/useUniqueElementIds: section IDs are intentionally static for navigation */}
			<Container title="Contact" id="contact">
				<p className="mb-4">
					Feel free to reach out through any of the platforms below:
				</p>

				<Contact
					items={[
						{
							label: "Website",
							link: "https://pxseu.com/message",
							display: "pxseu.com",
						},
						{
							label: "Email",
							link: "mailto:kuba@pxseu.com",
							display: "kuba@pxseu.com",
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

				<div className="mt-4 text-center text-zinc-400">- or simply -</div>

				<div className="mt-4 w-full">
					<Link
						href="/message"
						className="flex flex-col items-center border border-zinc-700 px-6 py-4 shadow-xs text-zinc-300 hover:shadow-md transition hover:bg-zinc-800/40"
					>
						<strong>Message Me</strong>
					</Link>
				</div>
			</Container>
		</main>
	);
}
