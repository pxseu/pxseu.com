import Head from "next/head";

interface JsonLdProps {
	id: string;
	json: string;
}

export default function JsonLd({ id, json }: JsonLdProps) {
	return (
		<Head key={id}>
			<script
				id={id}
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD requires dangerouslySetInnerHTML
				dangerouslySetInnerHTML={{ __html: json }}
			/>
		</Head>
	);
}
