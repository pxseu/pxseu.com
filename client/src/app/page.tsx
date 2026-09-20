import { About } from "@/components/home/about";
import { Work } from "@/components/home/work";
import { definePage } from "@/utils/define-page";
import { SITE_DESCRIPTION } from "@/utils/page-metadata";

const page = definePage({
	path: "/",
	description: SITE_DESCRIPTION,
	discord: {
		content: `${SITE_DESCRIPTION}\n\nI now work at [<:palantir:1551259180176773150> Palantir](https://palantir.com).`,
		links: [
			{ label: "Website", url: "/" },
			{ label: "Links", url: "/links" },
			{ label: "Send a message", url: "/message" },
		],
	},
});

export const generateMetadata = page.generateMetadata;

export default page.wrap(function Home() {
	return (
		<article className="flex flex-col gap-8" data-stagger>
			<About />
			<Work />
		</article>
	);
});
