import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeMdxCodeProps from "rehype-mdx-code-props";
import rehypeUnwrapImages from "rehype-unwrap-images";
import { MDX_COMPONENTS } from "@/components/mdx";
import { getAllBlogSlugs, getBlogPost } from "@/utils/blog";
import { formatDate } from "@/utils/date";

interface BlogPostPageProps {
	params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
	const slugs = await getAllBlogSlugs();
	return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
	params,
}: BlogPostPageProps): Promise<Metadata> {
	const { slug } = await params;
	const post = await getBlogPost(slug);

	if (!post) return {};

	return {
		title: `${post.frontmatter.title} - pxseu.com`,
		description: post.frontmatter.description,
		openGraph: {
			title: post.frontmatter.title,
			description: post.frontmatter.description,
			type: "article",
			publishedTime: post.frontmatter.date.toISOString(),
		},
		twitter: {
			title: post.frontmatter.title,
			description: post.frontmatter.description,
			card: "summary",
		},
	};
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
	const { slug } = await params;
	const post = await getBlogPost(slug);

	if (!post) {
		notFound();
	}

	return (
		<article className="w-full border border-border-100 bg-zinc-950/50">
			<div className="border-b border-border-100 px-5 py-4 md:px-6">
				<p className="mb-2 text-[11px] tracking-[0.22em] uppercase text-zinc-400">
					<Link href="/blog" className="transition-colors hover:text-brand-500">
						../{post.slug}
					</Link>
				</p>
				<h1 className="text-2xl font-semibold tracking-tight text-zinc-100 md:text-3xl">
					{post.frontmatter.title}
				</h1>
				<div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-zinc-400">
					<time>{formatDate(post.frontmatter.date)}</time>
					{post.frontmatter.tags && (
						<>
							<span className="text-zinc-700">·</span>
							<div className="flex flex-wrap gap-2">
								{post.frontmatter.tags.map((tag) => (
									<span
										key={tag}
										className="tracking-[0.15em] uppercase text-zinc-400"
									>
										{tag}
									</span>
								))}
							</div>
						</>
					)}
				</div>
			</div>

			<main className="px-5 md:px-6">
				<MDXRemote
					source={post.content}
					components={MDX_COMPONENTS}
					options={{
						mdxOptions: {
							rehypePlugins: [rehypeUnwrapImages, rehypeMdxCodeProps],
						},
					}}
				/>
			</main>
		</article>
	);
}
