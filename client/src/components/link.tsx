import NextLink from "next/link";
import { cn } from "@/utils/cn";

const baseClassName =
	"hit-area  text-zinc-100 underline decoration-zinc-600 underline-offset-4 transition-colors hover:decoration-brand-500";

export function Link({ href = "", className, ...props }: React.ComponentPropsWithoutRef<"a">) {
	if (href.startsWith("http"))
		return (
			<a
				className={cn(baseClassName, className)}
				href={href}
				target="_blank"
				rel="noopener noreferrer"
				{...props}
			>
				{props.children}
			</a>
		);

	return (
		<NextLink className={cn(baseClassName, className)} href={href} {...props}>
			{props.children}
		</NextLink>
	);
}
