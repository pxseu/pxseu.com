"use client";

import NextLink from "next/link";
import type { ComponentPropsWithoutRef, MouseEvent } from "react";
import { useCallback } from "react";
import { type AudioSource, useAudio } from "@/contexts/AudioProvider";
import { isExternalHref } from "@/utils/href";

export type LinkProps = ComponentPropsWithoutRef<typeof NextLink> & {
	sound?: AudioSource | false;
};

export default function Link({
	href,
	onClick,
	sound = "bleepReverb",
	rel,
	target,
	prefetch,
	replace,
	scroll,
	shallow,
	locale,
	onNavigate,
	...props
}: LinkProps) {
	const { playAudio } = useAudio();

	const handleClick = useCallback(
		(event: MouseEvent<HTMLAnchorElement>) => {
			onClick?.(event);

			if (sound && !event.defaultPrevented) {
				void playAudio(sound);
			}
		},
		[onClick, playAudio, sound],
	);

	if (isExternalHref(href)) {
		return (
			<a
				href={href}
				onClick={handleClick}
				rel={rel ?? (target === "_blank" ? "noopener noreferrer" : undefined)}
				target={target}
				{...props}
			/>
		);
	}

	return (
		<NextLink
			href={href}
			onClick={handleClick}
			prefetch={prefetch}
			replace={replace}
			scroll={scroll}
			shallow={shallow}
			locale={locale}
			onNavigate={onNavigate}
			rel={rel}
			target={target}
			{...props}
		/>
	);
}
