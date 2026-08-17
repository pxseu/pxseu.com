import cside from "../../assets/cside.png";
import hop from "../../assets/hop.png";
import incard from "../../assets/incard.png";
import palantir from "../../assets/palantir.png";
import { Job, type JobProps } from "./job";

const JOBS = [
	{
		company: "Palantir",
		position: "Delta",
		positionTitle: "Forward Deployed Software Engineer",
		start: "2026",
		end: "Now",
		url: "https://palantir.com",
		image: palantir,
	},
	{
		company: "cside",
		position: "Product Engineer",
		start: "2025",
		end: "2025",
		url: "https://cside.com",
		image: cside,
	},
	{
		company: "Incard",
		position: "Backend Engineer",
		start: "2024",
		end: "2025",
		url: "https://incard.co",
		image: incard,
	},
	{
		company: "Hop",
		position: "Product Engineer",
		start: "2022",
		end: "2024",
		url: "https://github.com/hopinc",
		image: hop,
	},
] as const satisfies JobProps[];

export function Work() {
	return (
		<section aria-labelledby="work-heading" className="flex flex-col gap-4" data-stagger>
			<h2 id="work-heading" className="text-lg font-semibold text-zinc-100">
				Work
			</h2>

			<div className="flex flex-col gap-3" data-stagger>
				{JOBS.map((job) => (
					<Job key={job.company} {...job} />
				))}
			</div>
		</section>
	);
}
