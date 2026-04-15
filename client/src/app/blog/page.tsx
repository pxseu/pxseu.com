import type { Metadata } from "next";
import Link from "next/link";
import { getAllBlogPosts } from "@/blog/posts";
import { formatDate } from "@/utils/date";

export const metadata: Metadata = {
	title: "Blog - pxseu.com",
	description: "Thoughts, engineering and the web",
};

export default async function BlogIndex() {
	const posts = await getAllBlogPosts();

	return (
		<main className="w-full border border-border-100 bg-zinc-950/50">
			<div className="border-b border-border-100 px-5 py-4 md:px-6">
				<p className="mb-2 text-[11px] tracking-[0.22em] uppercase text-zinc-400">
					Section
				</p>
				<h2 className="text-2xl font-semibold tracking-tight text-zinc-200 md:text-3xl">
					Blog
				</h2>
			</div>

			<div className="divide-y divide-border-100">
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
								<div className="mt-2 flex flex-wrap gap-2">
									{post.frontmatter.tags.map((tag) => (
										<span
											key={tag}
											className="text-[10px] tracking-[0.15em] uppercase text-zinc-400"
										>
											{tag}
										</span>
									))}
								</div>
							) : null}
						</Link>
					))
				)}
			</div>
		</main>
	);
}
