import type NextLink from "next/link";
import type { ComponentPropsWithoutRef } from "react";

type Href = ComponentPropsWithoutRef<typeof NextLink>["href"];

export const isExternalHref = (href: Href): href is string => {
	if (typeof href !== "string") {
		return false;
	}

	return /^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(href);
};
