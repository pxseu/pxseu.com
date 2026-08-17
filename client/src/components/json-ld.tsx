interface JsonLdProps {
	id: string;
	json: Record<string, unknown>;
}

export default function JsonLd({ id, json }: JsonLdProps) {
	return (
		<script
			id={id}
			type="application/ld+json"
			// biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD requires dangerouslySetInnerHTML
			dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
		/>
	);
}
