import type { MetadataRoute } from "next"
import { contact } from "@/lib/profile"

/**
 * Allow public pages to be crawled and advertise their canonical sitemap.
 * @returns Public crawl rules and sitemap URL.
 */
export default function robots(): MetadataRoute.Robots {
	return {
		rules: { userAgent: "*", allow: "/" },
		sitemap: new URL("/sitemap.xml", contact.site).href,
	}
}
