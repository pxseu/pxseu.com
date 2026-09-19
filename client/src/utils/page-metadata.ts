import type { Metadata } from "next";

export const SITE_URL = "https://pxseu.com";
export const SITE_NAME = "pxseu.com";
export const THEME_COLOR = "#8066F7";
export const ASSET_VERSION = "3.0";
export const SITE_DESCRIPTION = "Software engineer and open source enthusiast.";
export const PERSON_ID = `${SITE_URL}/#person`;
const DEFAULT_IMAGE = `/android-chrome-512x512.png?v=${ASSET_VERSION}`;

export type JsonLdData = Record<string, unknown> | Record<string, unknown>[];

export interface PageDefinition {
	path: `/${string}`;
	title?: string;
	description: string;
	image?: string;
	keywords?: string[];
	/**
	 * Schema-specific fields override defaults derived from this page's metadata.
	 */
	jsonLd?: JsonLdData;
	discord?:
		| false
		| {
				/**
				 * Discord markdown; defaults to the page description.
				 */
				content?: string;
				/**
				 * Up to five link buttons; defaults to a link to this page.
				 */
				links?: { label: string; url: string }[];
		  };
}

function absoluteUrl(path: string) {
	const url = new URL(path, SITE_URL);
	if (url.protocol !== "https:") throw new Error(`Preview URLs must use HTTPS: ${path}`);
	return url.href;
}

export function resolvePage({
	path,
	title,
	description,
	image = DEFAULT_IMAGE,
	keywords,
	discord,
	jsonLd,
}: PageDefinition) {
	const pageTitle = title ? `${title} - ${SITE_NAME}` : SITE_NAME;
	const url = absoluteUrl(path);
	const imageUrl = absoluteUrl(image);
	const options = discord || undefined;
	const links = options?.links ?? [{ label: title ? `Open ${title}` : "Visit website", url }];
	if (links.length > 5) throw new Error("Discord previews support at most five link buttons per row.");
	for (const link of links) {
		if (!link.label.length || link.label.length > 80)
			throw new Error("Discord button labels must be 1–80 characters.");
	}

	const metadata: Metadata = {
		title: pageTitle,
		description,
		...(keywords ? { keywords } : {}),
		alternates: { canonical: url },
		openGraph: {
			url,
			type: "website",
			locale: "en_US",
			siteName: SITE_NAME,
			title: pageTitle,
			description,
			images: [{ url: imageUrl }],
		},
		twitter: {
			card: "summary",
			site: "@pxseu",
			title: pageTitle,
			description,
			images: [imageUrl],
		},
	};

	const withDefaults = (schema: Record<string, unknown>) => ({
		"@context": "https://schema.org",
		"@type": "WebPage",
		name: pageTitle,
		description,
		url,
		image: imageUrl,
		...schema,
	});
	const resolvedJsonLd = Array.isArray(jsonLd) ? jsonLd.map(withDefaults) : jsonLd ? withDefaults(jsonLd) : undefined;

	if (discord === false) return { metadata, discord: undefined, jsonLd: resolvedJsonLd };

	const payload = {
		component: {
			type: 17,
			accent_color: Number.parseInt(THEME_COLOR.slice(1), 16),
			components: [
				{
					type: 9,
					components: [{ type: 10, content: `## ${pageTitle}\n${options?.content ?? description}` }],
					accessory: { type: 11, media: { url: imageUrl } },
				},
				...(links.length
					? [
							{
								type: 1,
								components: links.map(({ label, url }) => ({
									type: 2,
									style: 5,
									label,
									url: absoluteUrl(url),
								})),
							},
						]
					: []),
			],
		},
	};

	return { metadata, discord: payload, jsonLd: resolvedJsonLd };
}

export function serializeJson(value: unknown) {
	return JSON.stringify(value).replace(/</g, "\\u003c");
}
