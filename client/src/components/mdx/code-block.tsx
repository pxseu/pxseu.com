import { codeToHtml } from "shiki";

interface CodeBlockProps {
	children: string;
	language?: string;
	filename?: string;
}

export async function CodeBlock({
	children,
	language = "text",
	filename,
}: CodeBlockProps) {
	const html = await codeToHtml(children.trim(), {
		lang: language,
		theme: "github-dark-dimmed",
	});

	return (
		<div className="group my-4 overflow-hidden border border-border-100">
			{filename && (
				<div className="border-b border-border-100 bg-zinc-900/60 px-4 py-2 text-xs tracking-wide text-zinc-400">
					{filename}
				</div>
			)}
			<div
				className="overflow-x-auto bg-zinc-950/80 p-4 text-sm leading-relaxed [&_pre]:bg-transparent! [&_code]:bg-transparent!"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: Pre-compilled so its fine
				dangerouslySetInnerHTML={{ __html: html }}
			/>
		</div>
	);
}
