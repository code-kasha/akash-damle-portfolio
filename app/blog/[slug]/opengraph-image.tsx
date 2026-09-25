import { getVisiblePost } from "@/lib/posts"
import { postCardSize, renderPostCard } from "@/lib/post-card"

export const alt = "Blog post card"
export const size = postCardSize
export const contentType = "image/png"

/**
 * The post's share card; the same image serves Open Graph and X/Twitter.
 * @param props - Route props.
 * @param props.params - The route params, a Promise in Next 16.
 * @returns The card as a PNG response.
 */
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params
	return renderPostCard(getVisiblePost(slug))
}
