"use client";

import { useServerInsertedHTML } from "next/navigation";
import { useRef } from "react";
import { type JsonLdData, serializeJson } from "@/utils/page-metadata";

interface PageHeadProps {
	id: string;
	json: JsonLdData;
	type?: "application/json" | "application/ld+json";
}

/** Runs during build-time prerendering; the saved HTML contains the script without JS. */
export function PageHead({ id, json, type = "application/ld+json" }: PageHeadProps) {
	const content = serializeJson(json);
	const inserted = useRef(false);
	useServerInsertedHTML(() => {
		if (inserted.current) return null;
		inserted.current = true;
		return (
			<script
				id={id}
				type={type}
				// biome-ignore lint/security/noDangerouslySetInnerHtml: serializeJson escapes HTML delimiters.
				dangerouslySetInnerHTML={{ __html: content }}
			/>
		);
	});
	return null;
}
