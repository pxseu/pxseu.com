import { Links } from "@/components/links/links";
import { definePage } from "@/utils/define-page";
import { PERSON_ID } from "@/utils/page-metadata";

const page = definePage({
	path: "/links",
	title: "Links",
	description: "Places you can find me elsewhere on the internet.",
	discord: {
		links: [
			{ label: "All links", url: "/links" },
			{ label: "GitHub", url: "https://github.com/pxseu" },
			{ label: "Twitter", url: "https://twitter.com/pxseu" },
		],
	},
	jsonLd: {
		"@type": "CollectionPage",
		mainEntity: { "@id": PERSON_ID },
	},
});

export const generateMetadata = page.generateMetadata;

export default page.wrap(function LinksPage() {
	return (
		<article className="flex flex-col gap-8" data-stagger>
			<section className="flex flex-col gap-2" data-stagger>
				<h1 className="text-lg font-semibold text-zinc-100">Links</h1>
				<p>Places you can find me elsewhere on the internet.</p>
			</section>
			<Links />
		</article>
	);
});
