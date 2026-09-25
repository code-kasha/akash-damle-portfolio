import { randomUUID } from "node:crypto"
import { getStore } from "@/lib/engagement/store"
import { limits, normalise, reviewComment, toPublic } from "@/lib/engagement/comments"
import { fail, isLivePost, readJson, senderHash } from "@/lib/engagement/request"

/**
 * Lists a post's published comments, oldest first.
 * @param _request - Unused.
 * @param ctx - Route context with the post slug.
 * @returns `{ comments }`, or an error.
 */
export async function GET(_request: Request, ctx: RouteContext<"/api/blog/[slug]/comments">) {
	const { slug } = await ctx.params
	const store = getStore()
	if (!store) return fail(503, "Comments are not enabled.")
	if (!isLivePost(slug)) return fail(404, "No such post.")

	const comments = (await store.listComments(slug))
		.filter((c) => c.status === "published")
		.sort((a, b) => a.createdAt.localeCompare(b.createdAt))
		.map(toPublic)
	return Response.json({ comments })
}

/**
 * Accepts a comment: rejects it with a reason, holds it for review, or publishes it.
 * @param request - JSON `{ name, body, startedAt, website }`; `website` is a honeypot.
 * @param ctx - Route context with the post slug.
 * @returns 201 with the comment, 202 when held, or an error the form can show.
 */
export async function POST(request: Request, ctx: RouteContext<"/api/blog/[slug]/comments">) {
	const { slug } = await ctx.params
	const store = getStore()
	if (!store) return fail(503, "Comments are not enabled.")
	if (!isLivePost(slug)) return fail(404, "No such post.")

	const input = await readJson(request)
	if (!input) return fail(400, "That didn't arrive as expected. Please try again.")
	const name = typeof input.name === "string" ? input.name : ""
	const body = typeof input.body === "string" ? input.body : ""
	const startedAt = typeof input.startedAt === "number" ? input.startedAt : 0

	// Bots fill every field. Answer as if held, and store nothing.
	if (typeof input.website === "string" && input.website.trim() !== "") {
		return Response.json({ status: "pending" }, { status: 202 })
	}
	if (!startedAt || Date.now() - startedAt < limits.minFillMs) {
		return fail(400, "That was very quick. Please take a moment to read it over and send it again.")
	}

	const sender = senderHash(request)
	if ((await store.hit(`comment:${sender}`, limits.windowSeconds)) > limits.perWindow) {
		return fail(429, "You've posted several comments in the last few minutes. Please try again a little later.")
	}

	const existing = await store.listComments(slug)
	const review = reviewComment(
		{ name, body },
		existing.map((c) => normalise(c.body)),
		process.env.COMMENTS_MODERATION === "review",
	)
	if (review.decision === "reject") return fail(422, review.reason)

	const comment = {
		id: randomUUID(),
		slug,
		name: name.trim(),
		body: body.trim(),
		createdAt: new Date().toISOString(),
		status: review.decision === "publish" ? ("published" as const) : ("pending" as const),
		ipHash: sender,
		flags: review.flags,
	}
	await store.addComment(comment)

	return comment.status === "published"
		? Response.json({ status: "published", comment: toPublic(comment) }, { status: 201 })
		: Response.json({ status: "pending" }, { status: 202 })
}
