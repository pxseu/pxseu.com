"use client";

import { useEffect } from "react";
import { HEADER_ID } from "./Header";

export default function ObserverHeader({ children }: { children: React.ReactNode }) {
	useEffect(() => {
		const header = document.getElementById(HEADER_ID);

		if (!header) return;

		const observer = new IntersectionObserver(
			([e]) => {
				console.log(e);

				e.target.classList.toggle("is-pinned", e.intersectionRatio < 1);
			},
			{ threshold: [1] },
		);

		observer.observe(header);

		return () => observer.disconnect();
	}, []);

	return <>{children}</>;
}
