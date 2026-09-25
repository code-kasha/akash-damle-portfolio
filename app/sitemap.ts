import type { MetadataRoute } from "next"
import { contact } from "@/lib/profile"
import { projects } from "@/lib/projects"

/**
 * List the homepage and the same case studies used by generateStaticParams.
 * @returns Canonical URLs for existing pages.
 */
export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{ url: new URL("/", contact.site).href },
		...projects.map((project) => ({
			url: new URL(`/projects/${project.slug}`, contact.site).href,
		})),
	]
}
