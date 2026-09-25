import { getStore } from "@/lib/engagement/store"
import { fail, isModerator, readJson } from "@/lib/engagement/request"

/**
 * Lists comments waiting for review. Requires `Authorization: Bearer <MODERATION_TOKEN>`.
 * @param request - The incoming request.
 * @returns `{ pending }` with every stored field, or an error.
 */
export async function GET(request: Request) {
	if (!isModerator(request)) return fail(401, "Not authorised.")
	const store = getStore()
	if (!store) return fail(503, "Comments are not enabled.")
	const pending = (await store.listPending()).sort((a, b) => a.createdAt.localeCompare(b.createdAt))
	return Response.json({ pending })
}

/**
 * Publishes or hides one comment. Body: `{ id, action: "publish" | "hide" }`.
 * @param request - The incoming request, with the moderator token.
 * @returns `{ comment }` after the change, or an error.
 */
export async function POST(request: Request) {
	if (!isModerator(request)) return fail(401, "Not authorised.")
	const store = getStore()
	if (!store) return fail(503, "Comments are not enabled.")

	const input = await readJson(request)
	const id = typeof input?.id === "string" ? input.id : ""
	const action = input?.action
	if (!id || (action !== "publish" && action !== "hide")) {
		return fail(400, 'Send { "id": "...", "action": "publish" | "hide" }.')
	}
	const comment = await store.setStatus(id, action === "publish" ? "published" : "hidden")
	return comment ? Response.json({ comment }) : fail(404, "No such comment.")
}
