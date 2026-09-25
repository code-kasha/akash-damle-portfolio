import type { MetadataRoute } from "next"
import { contact } from "@/lib/profile"
import { projects } from "@/lib/projects"
import { getPublishedPosts } from "@/lib/posts"

/**
 * List the homepage, the case studies and published blog posts (drafts never).
 * @returns Canonical URLs for existing pages.
 */
export default function sitemap(): MetadataRoute.Sitemap {
	const posts = getPublishedPosts()
	return [
		{ url: new URL("/", contact.site).href },
		...projects.map((project) => ({
			url: new URL(`/projects/${project.slug}`, contact.site).href,
		})),
		...(posts.length > 0 ? [{ url: new URL("/blog", contact.site).href }] : []),
		...posts.map((post) => ({
			url: new URL(`/blog/${post.slug}`, contact.site).href,
			lastModified: post.updated,
		})),
	]
}
