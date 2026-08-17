import { About } from "@/components/home/about";
import { Work } from "@/components/home/work";

export default function Home() {
	return (
		<article className="flex flex-col gap-8" data-stagger>
			<About />
			<Work />
		</article>
	);
}
