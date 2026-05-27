import type { Metadata } from "next";
import Container from "@/components/ui/container";
import JsonLd from "@/components/ui/json-ld";
import Link from "@/components/ui/link";
import { getAllBlogPosts } from "@/utils/blog";
import { formatDate } from "@/utils/date";

export const metadata: Metadata = {
	title: "Blog - pxseu.com",
	description: "Thoughts, engineering and the web",
};

export default async function BlogIndex() {
	const posts = await getAllBlogPosts();

	const blogSchema = {
		"@context": "https://schema.org",
		"@type": "Blog",
		name: "Blog - pxseu.com",
		url: "https://pxseu.com/blog",
		description: metadata.description,
		author: {
			"@type": "Person",
			name: "pxseu",
			url: "https://pxseu.com",
		},
		blogPost: posts.map((post) => ({
			"@type": "BlogPosting",
			headline: post.frontmatter.title,
			description: post.frontmatter.description,
			url: `https://pxseu.com/blog/${post.slug}`,
			datePublished: post.frontmatter.date.toISOString(),
			...(post.frontmatter.tags ? { keywords: post.frontmatter.tags } : {}),
			author: {
				"@type": "Person",
				name: "pxseu",
				url: "https://pxseu.com",
			},
		})),
	};

	const blogSchemaJson = JSON.stringify(blogSchema);

	return (
		<>
			<JsonLd id="blog-schema" json={blogSchemaJson} />
			<Container
				as="main"
				label="Listing"
				title="Blog"
				contentClassName="!p-0 divide-y divide-border-100"
			>
				{posts.length === 0 ? (
					<div className="px-5 py-12 text-center text-zinc-400 md:px-6">
						No posts yet. Check back soon.
					</div>
				) : (
					posts.map((post) => (
						<Link
							key={post.slug}
							href={`/blog/${post.slug}`}
							className="group block px-5 py-5 transition-colors duration-150 hover:bg-zinc-900/50 md:px-6"
						>
							<div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
								<h3 className="text-base font-semibold tracking-tight text-zinc-200 transition-colors group-hover:text-brand-500">
									{post.frontmatter.title}
								</h3>
								<time className="shrink-0 text-xs tracking-wide text-zinc-400">
									{formatDate(post.frontmatter.date)}
								</time>
							</div>
							<p className="mt-1 text-sm leading-relaxed text-zinc-400">
								{post.frontmatter.description}
							</p>
							{post.frontmatter.tags ? (
								<div className="mt-3 flex flex-wrap gap-2">
									{post.frontmatter.tags.map((tag) => (
										<span
											key={tag}
											className="border border-border-100 px-2 py-0.5 text-[10px] tracking-[0.15em] uppercase text-zinc-400"
										>
											{tag}
										</span>
									))}
								</div>
							) : null}
						</Link>
					))
				)}
			</Container>
		</>
	);
}
