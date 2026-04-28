import {
	offset,
	useFloating,
	useFocus,
	useHover,
	useInteractions,
	useRole,
} from "@floating-ui/react";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { cn } from "@/utils/cn";

interface TooltipProps {
	children: ReactNode;
	content: ReactNode;
	focus?: boolean;
	suffix?: string;
}

export function Tooltip({
	children,
	content,
	suffix,
	focus: canFocus,
}: TooltipProps) {
	const [open, setOpen] = useState(false);
	const [shouldRender, setShouldRender] = useState(false);

	const { refs, floatingStyles, context } = useFloating({
		open,
		onOpenChange: setOpen,
		middleware: [offset(8)],
		placement: "top",
	});

	const hover = useHover(context);
	const focus = useFocus(context);
	const role = useRole(context, { role: "tooltip" });
	const { getReferenceProps, getFloatingProps } = useInteractions([
		hover,
		focus,
		role,
	]);

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
				className="relative inline-block"
				tabIndex={canFocus ? 0 : -1}
			>
				<span className="underline decoration-dotted underline-offset-4">
					{children}
				</span>
				{suffix}
			</span>
			{shouldRender && (
				<span
					ref={refs.setFloating}
					style={floatingStyles}
					{...getFloatingProps()}
					className={cn(
						"z-50 border border-border-100 bg-zinc-950 px-2 py-1 text-sm text-zinc-200 transition-opacity duration-350",
						open ? "opacity-100" : "opacity-0",
					)}
				>
					{content}
					<span className="absolute -bottom-1.25 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 border-r border-b border-border-100 bg-zinc-950" />
				</span>
			)}
		</>
	);
}
