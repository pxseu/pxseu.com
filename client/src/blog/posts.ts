import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

export interface BlogFrontmatter {
	title: string;
	description: string;
	date: Date;
	tags?: string[];
}

export interface BlogPost {
	slug: string;
	frontmatter: BlogFrontmatter;
	content: string;
}

const BLOG_DIR = path.dirname(new URL(import.meta.url).pathname);

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
	try {
		const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
		const raw = await fs.readFile(filePath, "utf-8");
		const { data, content } = matter(raw);

		return {
			slug,
			frontmatter: {
				title: data.title,
				description: data.description,
				date: new Date(data.date),
				tags: data.tags,
			},
			content,
		};
	} catch (_) {
		return null;
	}
}

export async function getAllBlogSlugs(): Promise<string[]> {
	const files = await fs.readdir(BLOG_DIR);
	return files
		.filter((f) => f.endsWith(".mdx"))
		.map((f) => f.substring(0, f.length - 4));
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
	const files = await getAllBlogSlugs();
	const posts = await Promise.all(files.map((slug) => getBlogPost(slug)));

	return posts
		.filter((p) => p !== null)
		.sort(
			(a, b) =>
				new Date(b.frontmatter.date).getTime() -
				new Date(a.frontmatter.date).getTime(),
		);
}
