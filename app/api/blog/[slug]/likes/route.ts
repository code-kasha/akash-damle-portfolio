import { getStore } from "@/lib/engagement/store"
import { fail, isLivePost } from "@/lib/engagement/request"

/**
 * Returns the like count for a post.
 * @param _request - Unused.
 * @param ctx - Route context with the post slug.
 * @returns `{ likes }`, or an error.
 */
export async function GET(_request: Request, ctx: RouteContext<"/api/blog/[slug]/likes">) {
	const { slug } = await ctx.params
	const store = getStore()
	if (!store) return fail(503, "Likes are not enabled.")
	if (!isLivePost(slug)) return fail(404, "No such post.")
	return Response.json({ likes: await store.getLikes(slug) })
}

/**
 * Adds a like. Deliberately unrestricted: there are no accounts, and the
 * browser only remembers locally that it has liked.
 * @param _request - Unused.
 * @param ctx - Route context with the post slug.
 * @returns `{ likes }` after the increment, or an error.
 */
export async function POST(_request: Request, ctx: RouteContext<"/api/blog/[slug]/likes">) {
	const { slug } = await ctx.params
	const store = getStore()
	if (!store) return fail(503, "Likes are not enabled.")
	if (!isLivePost(slug)) return fail(404, "No such post.")
	return Response.json({ likes: await store.addLike(slug) })
}
