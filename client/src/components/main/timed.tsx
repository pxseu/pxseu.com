"use client";

import {
	offset,
	useFloating,
	useHover,
	useInteractions,
} from "@floating-ui/react";
import type React from "react";
import { useEffect, useState } from "react";
import { useTimePassed } from "@/hooks/useTimePassed";

type TimedProps = {
	timestamp: number;
	label?: string;
};

function Tooltip({
	children,
	content,
}: {
	children: React.ReactNode;
	content: string;
}) {
	const [open, setOpen] = useState(false);
	const [shouldRender, setShouldRender] = useState(false);

	const { refs, floatingStyles, context } = useFloating({
		open,
		onOpenChange: setOpen,
		middleware: [offset(8)],
		placement: "top",
	});

	const hover = useHover(context);
	const { getReferenceProps, getFloatingProps } = useInteractions([hover]);

	useEffect(() => {
		if (open) {
			setShouldRender(true);
		} else {
			const timeout = setTimeout(() => setShouldRender(false), 350); // match transition duration
			return () => clearTimeout(timeout);
		}
	}, [open]);

	return (
		<>
			<span
				ref={refs.setReference}
				{...getReferenceProps()}
				className="relative inline-block underline decoration-dotted underline-offset-4"
			>
				{children}
			</span>
			{shouldRender && (
				<div
					ref={refs.setFloating}
					style={floatingStyles}
					{...getFloatingProps()}
					className={`z-50 border border-border-100 bg-zinc-950 px-2 py-1 font-mono text-sm text-zinc-200 transition-opacity duration-350 ${
						open ? "opacity-100" : "opacity-0"
					}`}
				>
					{content}
					<div className="absolute bottom-[-5px] left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 border-r border-b border-border-100 bg-zinc-950" />
				</div>
			)}
		</>
	);
}

export function Timed({ timestamp, label }: TimedProps) {
	const time = useTimePassed(timestamp);

	return (
		<Tooltip content={time.toPrecision(20)}>
			{Math.floor(time)} {label}
		</Tooltip>
	);
}
