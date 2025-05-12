"use client";

import { useFloating, offset, useHover, useInteractions } from "@floating-ui/react";
import React, { useState } from "react";
import { useTimePassed } from "@/hooks/useTimePassed";

type TimedProps = {
	timestamp: number;
	label?: string;
};

function Tooltip({ children, content }: { children: React.ReactNode; content: string }) {
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

	React.useEffect(() => {
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
				className="relative inline-block group underline decoration-dotted"
			>
				{children}
			</span>
			{shouldRender && (
				<div
					ref={refs.setFloating}
					style={floatingStyles}
					{...getFloatingProps()}
					className={`z-50 bg-zinc-900 text-white text-xs px-2 py-1 rounded font-mono shadow-lg transition-opacity duration-350 ${
						open ? "opacity-100" : "opacity-0"
					}`}
				>
					{content}
					<div className="absolute left-1/2 -bottom-1.5 transform -translate-x-1/2 w-2 h-2 bg-zinc-900 rotate-45" />
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
