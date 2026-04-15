import Link from "next/link";
import {
	type ComponentPropsWithoutRef,
	isValidElement,
	type ReactNode,
} from "react";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { cn } from "@/utils/cn";
import { CodeBlock } from "./code-block";

interface CodeElementProps {
	className?: string;
	children?: string;
	filename?: string;
	"data-filename"?: string;
}

function extractCodeProps(children: ReactNode) {
	if (!isValidElement<CodeElementProps>(children)) return null;

	const { className = "", children: code = "", filename } = children.props;
	if (
		!className.startsWith("language-") &&
		typeof children.type === "string" &&
		children.type !== "code"
	)
		return null;

	return {
		code,
		language: className.replace(/^language-/, "") || "text",
		filename: children.props["data-filename"] ?? filename,
	};
}

const heading = "font-semibold tracking-tight text-zinc-100 scroll-mt-24";

export const MDX_COMPONENTS = {
	h1: ({ children, ...props }: ComponentPropsWithoutRef<"h1">) => (
		<h1 className={cn(heading, "mt-8 mb-4 text-2xl md:text-3xl")} {...props}>
			{children}
		</h1>
	),
	h2: ({ children, ...props }: ComponentPropsWithoutRef<"h2">) => (
		<h2 className={cn(heading, "mt-7 mb-3 text-xl md:text-2xl")} {...props}>
			{children}
		</h2>
	),
	h3: ({ children, ...props }: ComponentPropsWithoutRef<"h3">) => (
		<h3 className={cn(heading, "mt-6 mb-2 text-lg md:text-xl")} {...props}>
			{children}
		</h3>
	),
	p: ({ children, ...props }: ComponentPropsWithoutRef<"p">) => (
		<p className="my-4 leading-relaxed text-zinc-400" {...props}>
			{children}
		</p>
	),
	a: ({ href, children, ...props }: ComponentPropsWithoutRef<"a">) => {
		const isExternal = href?.startsWith("http");

		if (isExternal) {
			return (
				<a
					href={href}
					target="_blank"
					rel="noopener noreferrer"
					className="text-brand-500 underline decoration-brand-500/30 underline-offset-2 transition-colors hover:text-brand-100 hover:decoration-brand-100/50"
					{...props}
				>
					{children}
					<FaArrowUpRightFromSquare className="size-3.5 ml-1 inline-block" />
				</a>
			);
		}

		return (
			<Link
				href={href ?? "#"}
				className="text-brand-500 underline decoration-brand-500/30 underline-offset-2 transition-colors hover:text-brand-100 hover:decoration-brand-100/50"
				{...props}
			>
				{children}
			</Link>
		);
	},
	ul: ({ children, ...props }: ComponentPropsWithoutRef<"ul">) => (
		<ul
			className="my-4 ml-6 list-disc space-y-1 text-zinc-400 marker:text-zinc-600"
			{...props}
		>
			{children}
		</ul>
	),
	ol: ({ children, ...props }: ComponentPropsWithoutRef<"ol">) => (
		<ol
			className="my-4 ml-6 list-decimal space-y-1 text-zinc-400 marker:text-zinc-400"
			{...props}
		>
			{children}
		</ol>
	),
	li: ({ children, ...props }: ComponentPropsWithoutRef<"li">) => (
		<li className="leading-relaxed" {...props}>
			{children}
		</li>
	),
	blockquote: ({
		children,
		...props
	}: ComponentPropsWithoutRef<"blockquote">) => (
		<blockquote
			className="my-4 border-l-2 border-brand-500/50 pl-4 text-zinc-400 italic"
			{...props}
		>
			{children}
		</blockquote>
	),
	code: ({
		children,
		className,
		...props
	}: ComponentPropsWithoutRef<"code">) => {
		const isInline = !className?.startsWith("language-");

		if (isInline) {
			return (
				<code
					className="rounded bg-zinc-800/80 px-1.5 py-0.5 text-[0.875em] text-zinc-300"
					{...props}
				>
					{children}
				</code>
			);
		}

		return (
			<code className={className} {...props}>
				{children}
			</code>
		);
	},
	pre: ({
		children,
		filename,
		...props
	}: ComponentPropsWithoutRef<"pre"> & { filename?: string }) => {
		const codeProps = extractCodeProps(children);

		if (codeProps) {
			return (
				<CodeBlock
					language={codeProps.language}
					filename={filename ?? codeProps.filename}
				>
					{codeProps.code}
				</CodeBlock>
			);
		}
		return (
			<pre
				className="my-4 overflow-x-auto border border-border-100 bg-zinc-950/80 p-4 text-sm leading-relaxed text-zinc-300"
				{...props}
			>
				{children}
			</pre>
		);
	},
	hr: () => <hr className="my-8 border-border-100" />,
	table: ({ children, ...props }: ComponentPropsWithoutRef<"table">) => (
		<div className="my-4 overflow-x-auto border border-border-100">
			<table className="w-full text-sm" {...props}>
				{children}
			</table>
		</div>
	),
	th: ({ children, ...props }: ComponentPropsWithoutRef<"th">) => (
		<th
			className="border-b border-border-100 bg-zinc-900/40 px-4 py-2 text-left text-xs font-semibold tracking-wider text-zinc-300 uppercase"
			{...props}
		>
			{children}
		</th>
	),
	td: ({ children, ...props }: ComponentPropsWithoutRef<"td">) => (
		<td
			className="border-b border-border-100 px-4 py-2 text-zinc-400"
			{...props}
		>
			{children}
		</td>
	),
	img: ({ src, alt, ...props }: ComponentPropsWithoutRef<"img">) => (
		<figure className="my-6 flex flex-col items-center">
			{/* biome-ignore lint/performance/noImgElement: i don't like next */}
			<img
				src={src}
				alt={alt}
				className="max-h-96 w-auto border border-border-100"
				{...props}
			/>
			{alt ? (
				<figcaption className="mt-2 text-center text-xs text-zinc-400">
					{alt}
				</figcaption>
			) : null}
		</figure>
	),
};
