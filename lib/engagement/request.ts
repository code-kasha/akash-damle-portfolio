import { createHash, timingSafeEqual } from "node:crypto"
import { getPublishedPosts } from "@/lib/posts"

/**
 * Reads a small JSON body, refusing anything oversized or malformed.
 * @param request - The incoming request.
 * @param maxBytes - Upper bound on the body size.
 * @returns The parsed object, or `null` if it is too large or not a JSON object.
 */
export async function readJson(request: Request, maxBytes = 8_000): Promise<Record<string, unknown> | null> {
	const text = await request.text()
	if (text.length > maxBytes) return null
	try {
		const value: unknown = JSON.parse(text)
		return value && typeof value === "object" && !Array.isArray(value) ? (value as Record<string, unknown>) : null
	} catch {
		return null
	}
}

/**
 * Pseudonymises the sender for rate limits. The raw IP is never stored.
 * @param request - The incoming request.
 * @returns A salted SHA-256 hash, shortened.
 */
export function senderHash(request: Request): string {
	const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
	const ip = forwarded || request.headers.get("x-real-ip") || "unknown"
	const salt = process.env.ENGAGEMENT_SALT ?? "akashdamle.in-engagement"
	return createHash("sha256").update(`${salt}:${ip}`).digest("hex").slice(0, 32)
}

/**
 * Likes and comments are only accepted for posts that are live on the site.
 * @param slug - The post's URL segment.
 * @returns `true` if the post is published.
 */
export function isLivePost(slug: string): boolean {
	return getPublishedPosts().some((post) => post.slug === slug)
}

/**
 * Checks the moderator's bearer token in constant time.
 * @param request - The incoming request.
 * @returns `true` only when MODERATION_TOKEN is set and matches.
 */
export function isModerator(request: Request): boolean {
	const expected = process.env.MODERATION_TOKEN
	const given = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "") ?? ""
	if (!expected || given.length !== expected.length) return false
	return timingSafeEqual(Buffer.from(given), Buffer.from(expected))
}

/**
 * Shorthand for a JSON error response.
 * @param status - HTTP status code.
 * @param error - Message the client can show.
 * @returns The response.
 */
export function fail(status: number, error: string): Response {
	return Response.json({ error }, { status })
}
