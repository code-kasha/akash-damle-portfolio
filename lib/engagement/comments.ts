/**
 * Comment rules. There are no accounts, so quality is enforced by the text
 * itself: a comment has to say something specific. Agreement and
 * disagreement are treated the same; only substance is checked.
 *
 * This module has no Node imports, so the client form can share the limits.
 */

export type CommentStatus = "published" | "pending" | "hidden"

export type StoredComment = {
	id: string
	slug: string
	name: string
	body: string
	createdAt: string
	status: CommentStatus
	/** Salted hash of the sender's IP, for rate limits and spotting abuse. Never shown. */
	ipHash: string
	/** Why a comment was held for review, if it was. */
	flags: string[]
}

/** What the public API returns: no status, hash or flags. */
export type PublicComment = Pick<StoredComment, "id" | "name" | "body" | "createdAt">

export const limits = {
	nameMin: 2,
	nameMax: 60,
	bodyMaxChars: 2000,
	minWords: 12,
	/** Distinct words of four or more letters, excluding filler, that a comment must contain. */
	minSpecificWords: 6,
	maxLinks: 2,
	/** A form submitted faster than this was not written by a person reading the post. */
	minFillMs: 4000,
	/** Comments per sender per window. */
	perWindow: 3,
	windowSeconds: 600,
} as const

/** Words that carry no specific content on their own. */
const filler = new Set([
	"this", "that", "with", "have", "just", "very", "really", "great", "good", "nice", "awesome",
	"amazing", "cool", "love", "like", "thanks", "thank", "post", "article", "blog", "read",
	"reading", "keep", "work", "well", "done", "useful", "helpful", "interesting", "informative",
	"content", "share", "sharing", "wonderful", "excellent", "best", "much", "more", "what", "your",
	"from", "about", "here", "there", "they", "them", "then", "than", "been", "were", "will",
	"would", "could", "should", "also", "some", "such", "into", "only", "even", "bad", "terrible",
	"worst", "useless", "boring", "agree", "disagree",
])

/** Phrases that usually mean advertising; such comments wait for review rather than being refused. */
const promotional =
	/\b(casino|betting|bet365|viagra|cialis|escort|loan offer|crypto (giveaway|signal)|forex|backlinks?|seo services?|guest post|whatsapp\s*\+?\d|telegram\s*@|onlyfans)\b/i

const linkPattern = /\bhttps?:\/\/|\bwww\.|\b[a-z0-9-]+\.(com|net|org|io|in|co|ru|xyz|info|biz)\b/gi

export type Review =
	| { decision: "reject"; reason: string }
	| { decision: "publish" | "hold"; flags: string[] }

/**
 * Normalises text for duplicate checks: lower case, words only.
 * @param text - Comment body.
 * @returns The normalised form.
 */
export function normalise(text: string): string {
	return text.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, " ").trim()
}

/**
 * Counts words the way the form's counter does.
 * @param text - Comment body.
 * @returns The number of words.
 */
export function countWords(text: string): number {
	return text.trim().split(/\s+/).filter(Boolean).length
}

/**
 * Checks a submitted comment against the posting rules.
 * @param input - The submission.
 * @param input.name - Display name, as typed.
 * @param input.body - Comment text, as typed.
 * @param existingBodies - Normalised bodies of comments already on the post, to refuse repeats.
 * @param reviewAll - When true (COMMENTS_MODERATION=review), every acceptable comment is held.
 * @returns A rejection with a reason the writer can act on, or whether to publish or hold.
 */
export function reviewComment(
	input: { name: string; body: string },
	existingBodies: string[],
	reviewAll: boolean,
): Review {
	const name = input.name.trim()
	const body = input.body.trim()

	if (name.length < limits.nameMin || name.length > limits.nameMax) {
		return { decision: "reject", reason: `Please add a name between ${limits.nameMin} and ${limits.nameMax} characters.` }
	}
	if (new RegExp(linkPattern.source, "i").test(name)) {
		return { decision: "reject", reason: "Names can't contain links." }
	}
	if (body.length > limits.bodyMaxChars) {
		return { decision: "reject", reason: `Please keep it under ${limits.bodyMaxChars.toLocaleString("en")} characters.` }
	}

	const words = body.split(/\s+/).filter(Boolean)
	if (words.length < limits.minWords) {
		return {
			decision: "reject",
			reason: `Please write at least ${limits.minWords} words: what you tried, what happened, or why you agree or disagree.`,
		}
	}

	const letters = body.replace(/[^\p{L}]/gu, "")
	const upper = body.replace(/[^\p{Lu}]/gu, "")
	if (letters.length >= 20 && upper.length / letters.length > 0.7) {
		return { decision: "reject", reason: "Please don't write in all capitals." }
	}
	if (/(.)\1{7,}/u.test(body)) {
		return { decision: "reject", reason: "Please remove the long run of repeated characters." }
	}

	const lowerWords = normalise(body).split(" ").filter(Boolean)
	if (new Set(lowerWords).size / lowerWords.length < 0.35) {
		return { decision: "reject", reason: "This reads as repetitive. Please say it once, with the detail." }
	}
	const specific = new Set(lowerWords.filter((w) => w.length >= 4 && !filler.has(w) && !/^\d+$/.test(w)))
	if (specific.size < limits.minSpecificWords) {
		return {
			decision: "reject",
			reason: "Please add something specific: a step, a number, an error, or the reason you disagree.",
		}
	}

	const links = body.match(linkPattern) ?? []
	if (links.length > limits.maxLinks) {
		return { decision: "reject", reason: `Please include at most ${limits.maxLinks} links.` }
	}
	if (existingBodies.includes(normalise(body))) {
		return { decision: "reject", reason: "This comment has already been posted." }
	}

	const flags: string[] = []
	if (links.length > 0) flags.push("contains links")
	if (promotional.test(body) || promotional.test(name)) flags.push("looks promotional")
	if (reviewAll) flags.push("all comments reviewed")

	return flags.length > 0 ? { decision: "hold", flags } : { decision: "publish", flags }
}

/**
 * Strips the fields that must not leave the server.
 * @param comment - A stored comment.
 * @returns The public view of it.
 */
export function toPublic(comment: StoredComment): PublicComment {
	return { id: comment.id, name: comment.name, body: comment.body, createdAt: comment.createdAt }
}
