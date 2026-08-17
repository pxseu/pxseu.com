import type { Metadata } from "next";
import JsonLd from "@/components/json-ld";
import { Links } from "@/components/links/links";

export const metadata: Metadata = {
	title: "Links - pxseu.com",
	description: "Places you can find me elsewhere on the internet.",
};

const collectionPageSchema = {
	"@context": "https://schema.org",
	"@type": "CollectionPage",
	name: "Links - pxseu.com",
	url: "https://pxseu.com/links",
	description: "Places you can find me elsewhere on the internet.",
	mainEntity: {
		"@type": "Person",
		name: "pxseu",
		url: "https://pxseu.com",
	},
};

export default function LinksPage() {
	return (
		<article className="flex flex-col gap-8" data-stagger>
			<JsonLd id="collection-page-schema" json={collectionPageSchema} />

			<section className="flex flex-col gap-2" data-stagger>
				<h1 className="text-lg font-semibold text-zinc-100">Links</h1>
				<p>Places you can find me elsewhere on the internet.</p>
			</section>
			<Links />
		</article>
	);
}
