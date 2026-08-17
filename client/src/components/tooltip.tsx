"use client";

import {
	arrow,
	autoUpdate,
	FloatingPortal,
	flip,
	offset,
	safePolygon,
	shift,
	useClick,
	useDismiss,
	useFloating,
	useFocus,
	useHover,
	useInteractions,
	useRole,
} from "@floating-ui/react";
import type { ReactNode } from "react";
import { useRef, useState } from "react";
import { cn } from "@/utils/cn";

interface TooltipProps {
	children: ReactNode;
	content: ReactNode;
	contentClassName?: string;
	triggerClassName?: string;
}

export function Tooltip({ children, content, contentClassName, triggerClassName }: TooltipProps) {
	const [open, setOpen] = useState(false);
	const arrowRef = useRef<HTMLSpanElement>(null);
	const { refs, floatingStyles, context, middlewareData, placement } = useFloating({
		open,
		onOpenChange: setOpen,
		placement: "top",
		middleware: [offset(10), flip(), shift({ padding: 8 }), arrow({ element: arrowRef })],
		whileElementsMounted: autoUpdate,
	});
	const hover = useHover(context, {
		move: false,
		handleClose: safePolygon(),
	});
	const focus = useFocus(context);
	const click = useClick(context);
	const dismiss = useDismiss(context);
	const role = useRole(context, { role: "tooltip" });
	const { getReferenceProps, getFloatingProps } = useInteractions([hover, focus, click, dismiss, role]);
	const side = placement.split("-")[0] as "top" | "right" | "bottom" | "left";
	const staticSide = {
		top: "bottom",
		right: "left",
		bottom: "top",
		left: "right",
	}[side];

	return (
		<>
			<button
				ref={refs.setReference}
				className={cn(
					"hit-area cursor-help appearance-none border-0 bg-transparent p-0 text-inherit underline decoration-dotted decoration-zinc-400 underline-offset-4 [font:inherit] focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/70 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950",
					triggerClassName,
				)}
				type="button"
				{...getReferenceProps()}
			>
				{children}
			</button>

			{open && (
				<FloatingPortal>
					<span
						ref={refs.setFloating}
						style={floatingStyles}
						className={cn(
							"z-50 block cursor-text whitespace-nowrap border border-zinc-700 bg-zinc-950 px-3 py-2 font-mono text-sm tracking-normal text-zinc-100 shadow-xl",
							contentClassName,
						)}
						{...getFloatingProps()}
					>
						{content}
						<span
							ref={arrowRef}
							aria-hidden="true"
							style={{
								left: middlewareData.arrow?.x,
								top: middlewareData.arrow?.y,
								[staticSide]: "-5px",
							}}
							className={cn(
								"absolute size-2.5 rotate-45 bg-zinc-950",
								side === "top" && "border-r border-b border-zinc-700",
								side === "right" && "border-b border-l border-zinc-700",
								side === "bottom" && "border-t border-l border-zinc-700",
								side === "left" && "border-t border-r border-zinc-700",
							)}
						/>
					</span>
				</FloatingPortal>
			)}
		</>
	);
}
