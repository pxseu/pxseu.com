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
					. I&apos;m <Timed timestamp={BIRTHDAY_TIMESTAMP} label="years old" /> and have been writing code for{" "}
					<Timed timestamp={CODING_START_TIMESTAMP} label="years" suffix="." /> Most of that has been backend
					services, CLIs and internal tooling, though somehow I always end up doing a bit of everything.
				</p>

				<p className="mt-4 text-sm leading-relaxed text-zinc-300 sm:text-base">
					The work I&apos;m proudest of is the stuff people actually used. I built and maintained Hop&apos;s
					CLI for a couple of years and loved every bit of it. On the side I keep making things just because I
					want them to exist: crabdis, a small Redis clone in Rust, or fami, a cookie library that takes RFC
					6265bis more seriously than it probably should.
				</p>

				<p className="mt-4 text-sm leading-relaxed text-zinc-300 sm:text-base">
					I have a habit of over-engineering things. Partly on purpose, since I genuinely care about structure
					and code that reads well, and partly, well... half of my side projects die because I planned them
					wrong. The ones that survive turn out pretty neat though lol.
				</p>

				<p className="mt-4 text-sm leading-relaxed text-zinc-300 sm:text-base">
					What keeps me hooked on programming is figuring out how things actually work. That&apos;s literally
					how crabdis happened: I wanted to know what Redis does under the hood, so I took it apart and then
					built my own. Same story with digging through Docker and Podman internals, or reading way more RFCs
					than anyone reasonably should. Most of what I know comes from doing exactly that.
				</p>

				<p className="mt-4 text-sm leading-relaxed text-zinc-300 sm:text-base">
					Outside of code it&apos;s mostly cars, the fast and pretty kind. My heart says W204 C63, my dreams
					say LaFerrari, and realistically I&apos;d be very happy with a Taycan. Sometimes I also make videos
					about whatever I&apos;m working on.
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
								"Open source and freelance work, mostly backend and tooling. I've contributed to Bun, MDN, Kaito HTTP and DefinitelyTyped, and there's always some side project cooking, currently crabdis and fami. Independent client work so far: account systems, card linking and analytics backends.",
						},
						{
							title: "Full Stack Engineer",
							company: "c/side",
							period: { from: "2025", to: "2025" },
							description:
								"Dashboard features in React and ClickHouse data pipelines, including compliant user-data anonymization for org offboarding. The gaps in between were filled with query optimization, debugging and UI polish.",
						},
						{
							title: "Backend Developer",
							company: "Incard Ltd.",
							period: { from: "2024", to: "2025" },
							description:
								"Helped merge two services into a single open banking and e-commerce platform, cutting the public API from around 12 endpoints down to 4. Lots of queues and async messaging (Redis, SQS, Kafka) to keep everything in sync, plus integrations with Stripe, Google Ads and many other providers.",
						},
						{
							title: "Product Engineer",
							company: "Hop Inc.",
							period: { from: "2022", to: "2024" },
							description:
								"Built and maintained Hop's CLI, including the whole `hop deploy` flow, and wrote the Rust service that orchestrated containers on customer hardware: lifecycle, health checks and reporting. Also looked after the internal Rust crates for WebSockets and auth that every service leaned on.",
						},
						{
							title: "Volunteer Developer",
							company: "PreMiD",
							period: { from: "2020", to: "2021" },
							description:
								"Worked on PreMiD's Discord bot in TypeScript: role and perk automation for boosters and donors, fixing the search command so it actually found things, and plenty of smaller commands, fixes and optimizations. Also helped localize the app through Crowdin. My first time writing code for a community that size.",
						},
					]}
				/>
			</Container>

			<Container title="Skills" id="skills">
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
					<Skill
						category="Backend"
						skills={[
							"Node.js",
							"Bun",
							"Fastify",
							"PostgreSQL",
							"Redis",
							"ClickHouse",
							"REST APIs",
							"GraphQL",
							"WebSockets",
						]}
					/>
					<Skill
						category="Frontend"
						skills={["React", "Next.js", "React Query", "TanStack Router", "Tailwind CSS", "Vite"]}
					/>
					<Skill
						category="CLIs & Tooling"
						skills={["Rust", "TypeScript", "Clap", "Automation", "Terminal UX"]}
					/>
					<Skill
						category="Infrastructure"
						skills={["Docker", "Linux", "Nix", "Git", "CI/CD", "System Automation"]}
					/>
					<Skill
						category="Other"
						skills={["Python", "C & C++", "Elixir", "Event-Driven Systems", "Testing"]}
					/>
				</div>
			</Container>

			<Container title="Projects" id="projects">
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
					<ProjectCard
						url="https://github.com/hopinc/cli"
						name="hopinc/cli"
						description="The CLI for deploying to and managing projects on Hop, written in Rust. Still the project I'm proudest of, mostly because people actually used it every day."
					/>
					<ProjectCard
						url="https://github.com/pxseu/pxseu.com"
						name="pxseu/pxseu.com"
						description="This website. A Next.js frontend with a Bun backend and far more live status information than anybody asked for."
					/>
					<ProjectCard
						url="https://github.com/pxseu/anilist-readme"
						name="pxseu/anilist-readme"
						description="A GitHub Action that puts your latest AniList activity in your README. Written in Python by somebody who mostly writes TypeScript."
					/>
					<ProjectCard
						url="https://github.com/imperialbin/imperial.js"
						name="imperialbin/imperial.js"
						description="A Node.js wrapper for the imperialb.in API."
					/>
					<ProjectCard
						url="https://github.com/pxseu/lanyard-ui"
						name="pxseu/lanyard-ui"
						description="A small UI for viewing Discord presence and editing data stored in Lanyard KV."
					/>
					<ProjectCard
						url="https://github.com/pxseu/crabdis"
						name="pxseu/crabdis"
						description="It's like Redis, but a bit rusty. A small in-memory server written in Rust that speaks RESP, with Pub/Sub and RDB persistence."
					/>
					<ProjectCard
						url="https://github.com/pxseu/fami"
						name="pxseu/fami"
						description="A zero-dependency cookie parsing and serialization library for TypeScript. Schema-based, type safe and written after actually reading RFC 6265bis cover to cover."
					/>
					<ProjectCard
						url="https://github.com/pxseu/ganyu"
						name="pxseu/ganyu"
						description="Ganyu as a Service. An Elixir API that serves random Ganyu pictures from a Postgres-backed collection. Built as an excuse to learn Elixir and a little bit of OTP/Beam."
					/>
				</div>
			</Container>

			<Container title="Contact" id="contact">
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

				<div className="mt-4 w-full">
					<Link
						href="/message"
						className="flex items-center justify-center border border-brand-500/30 px-6 py-4 text-xs uppercase tracking-[0.2em] text-zinc-300 transition-[border-color,background-color,color] duration-150 ease-linear hover:border-brand-500/60 hover:bg-zinc-900/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/50"
					>
						Send me a message
					</Link>
				</div>
			</Container>
		</main>
	);
}
