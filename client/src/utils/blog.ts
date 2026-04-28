import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

interface BlogFrontmatter {
	title: string;
	description: string;
	date: Date;
	tags?: string[];
}

interface BlogPost {
	slug: string;
	frontmatter: BlogFrontmatter;
	content: string;
}

const BLOG_DIR = path.join(process.cwd(), "src", "blog");

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
	const filePath = path.join(BLOG_DIR, `${slug}.mdx`);

	const stat = await fs.stat(filePath).catch(() => null);
	if (!stat) return null;

	const raw = await fs.readFile(filePath, "utf-8");
	const {
		data: { title, description, date, tags },
		content,
	} = matter(raw);

	return {
		slug,
		frontmatter: {
			title,
			description,
			date: new Date(date),
			tags,
		},
		content,
	};
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
