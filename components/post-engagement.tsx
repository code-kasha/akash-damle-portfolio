"use client"

import * as React from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import { FavouriteIcon } from "@hugeicons/core-free-icons"
import { Button } from "@/components/ui/button"
import { countWords, limits, type PublicComment } from "@/lib/engagement/comments"
import { cn } from "@/lib/utils"

type Notice = { tone: "ok" | "error"; text: string } | null

const dateFormat = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric" })

/**
 * Likes and comments for one post. Counts and comments load from the API
 * after the static page renders, so they stay current without a rebuild.
 * @param props - Component props.
 * @param props.slug - The post's URL segment.
 * @returns The like button and comment section.
 */
export function PostEngagement({ slug }: { slug: string }) {
	const likedKey = `liked:${slug}`
	const [likes, setLikes] = React.useState<number | null>(null)
	const [liked, setLiked] = React.useState(false)
	const [comments, setComments] = React.useState<PublicComment[] | null>(null)
	const [loadError, setLoadError] = React.useState(false)

	React.useEffect(() => {
		let active = true
		// Read after mount: localStorage does not exist during prerendering.
		// eslint-disable-next-line react-hooks/set-state-in-effect
		setLiked(window.localStorage.getItem(likedKey) === "1")
		Promise.all([
			fetch(`/api/blog/${slug}/likes`).then((r) => (r.ok ? r.json() : Promise.reject(r))),
			fetch(`/api/blog/${slug}/comments`).then((r) => (r.ok ? r.json() : Promise.reject(r))),
		])
			.then(([likeData, commentData]: [{ likes: number }, { comments: PublicComment[] }]) => {
				if (!active) return
				setLikes(likeData.likes)
				setComments(commentData.comments)
			})
			.catch(() => active && setLoadError(true))
		return () => {
			active = false
		}
	}, [slug, likedKey])

	async function like() {
		if (liked) return
		setLiked(true)
		setLikes((n) => (n ?? 0) + 1)
		window.localStorage.setItem(likedKey, "1")
		try {
			const response = await fetch(`/api/blog/${slug}/likes`, { method: "POST" })
			if (response.ok) setLikes(((await response.json()) as { likes: number }).likes)
		} catch {
			// The optimistic count stays; the next visit shows the stored one.
		}
	}

	return (
		<section aria-labelledby="comments-heading" className="mt-16 border-t pt-10">
			<div className="flex flex-wrap items-center justify-between gap-4">
				<h2 id="comments-heading" className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
					Comments{comments && comments.length > 0 ? ` (${comments.length})` : ""}
				</h2>
				<Button
					type="button"
					variant={liked ? "default" : "outline"}
					className="h-10 rounded-full px-5 font-mono text-xs tracking-wider uppercase"
					aria-pressed={liked}
					onClick={like}
				>
					<HugeiconsIcon icon={FavouriteIcon} strokeWidth={2} />
					{liked ? "Liked" : "Like"}
					{likes !== null && <span className="tabular-nums">· {likes}</span>}
				</Button>
			</div>

			<p className="text-muted-foreground mt-5 max-w-2xl leading-relaxed">
				Tried this setup, hit a different result, or think something here is wrong? Say what you ran,
				what happened, and why. Agreement and disagreement are equally welcome; one-line reactions
				are not published. No account needed.
			</p>

			{loadError && (
				<p className="text-muted-foreground mt-8 font-mono text-xs tracking-widest uppercase">
					Comments could not be loaded right now.
				</p>
			)}

			{comments && comments.length > 0 && (
				<ol className="mt-10 space-y-8">
					{comments.map((comment) => (
						<li key={comment.id} className="border-l-2 pl-5">
							<div className="text-muted-foreground mb-2 flex flex-wrap items-center gap-x-3 font-mono text-xs tracking-widest uppercase">
								<span className="text-foreground">{comment.name}</span>
								<span aria-hidden>·</span>
								<time dateTime={comment.createdAt}>{dateFormat.format(new Date(comment.createdAt))}</time>
							</div>
							<p className="leading-relaxed whitespace-pre-line">{comment.body}</p>
						</li>
					))}
				</ol>
			)}

			{comments && comments.length === 0 && (
				<p className="text-muted-foreground mt-8">No comments yet. The first useful one sets the tone.</p>
			)}

			{!loadError && (
				<CommentForm
					slug={slug}
					onPublished={(comment) => setComments((list) => [...(list ?? []), comment])}
				/>
			)}
		</section>
	)
}

/**
 * The comment form, with the same limits the server enforces shown as the writer types.
 * @param props - Component props.
 * @param props.slug - The post's URL segment.
 * @param props.onPublished - Called with a comment that was published immediately.
 * @returns The form.
 */
function CommentForm({
	slug,
	onPublished,
}: {
	slug: string
	onPublished: (comment: PublicComment) => void
}) {
	const [name, setName] = React.useState("")
	const [body, setBody] = React.useState("")
	const [sending, setSending] = React.useState(false)
	const [notice, setNotice] = React.useState<Notice>(null)
	const startedAt = React.useRef<number | null>(null)

	const words = countWords(body)
	const enough = words >= limits.minWords
	const tooLong = body.trim().length > limits.bodyMaxChars

	function markStarted() {
		startedAt.current ??= Date.now()
	}

	async function submit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault()
		const website = new FormData(event.currentTarget).get("website")
		setSending(true)
		setNotice(null)
		try {
			const response = await fetch(`/api/blog/${slug}/comments`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ name, body, website, startedAt: startedAt.current }),
			})
			const data = (await response.json()) as {
				status?: string
				comment?: PublicComment
				error?: string
			}
			if (response.status === 201 && data.comment) {
				onPublished(data.comment)
				setBody("")
				setNotice({ tone: "ok", text: "Thank you. Your comment is published." })
			} else if (response.status === 202) {
				setBody("")
				setNotice({ tone: "ok", text: "Thank you. Your comment will appear once it has been reviewed." })
			} else {
				setNotice({ tone: "error", text: data.error ?? "Something went wrong. Please try again." })
			}
		} catch {
			setNotice({ tone: "error", text: "Couldn't reach the server. Please try again." })
		} finally {
			setSending(false)
		}
	}

	const field =
		"bg-background focus-visible:ring-ring w-full rounded-2xl border px-4 py-3 text-base outline-none focus-visible:ring-2"

	return (
		<form onSubmit={submit} className="mt-12 space-y-4" noValidate>
			<div>
				<label htmlFor="comment-name" className="text-muted-foreground mb-2 block font-mono text-xs tracking-widest uppercase">
					Name
				</label>
				<input
					id="comment-name"
					name="name"
					value={name}
					onChange={(e) => setName(e.target.value)}
					onFocus={markStarted}
					maxLength={limits.nameMax}
					autoComplete="name"
					required
					className={field}
				/>
			</div>

			<div>
				<label htmlFor="comment-body" className="text-muted-foreground mb-2 block font-mono text-xs tracking-widest uppercase">
					Comment
				</label>
				<textarea
					id="comment-body"
					name="body"
					value={body}
					onChange={(e) => setBody(e.target.value)}
					onFocus={markStarted}
					rows={6}
					required
					aria-describedby="comment-hint"
					placeholder="What did you try, what happened, and what would you change?"
					className={cn(field, "resize-y leading-relaxed")}
				/>
				<p
					id="comment-hint"
					className={cn(
						"mt-2 font-mono text-xs tracking-wider",
						tooLong ? "text-destructive" : enough ? "text-primary" : "text-muted-foreground",
					)}
				>
					{tooLong
						? `Too long: keep it under ${limits.bodyMaxChars.toLocaleString("en")} characters.`
						: enough
							? `${words} words`
							: `${words} of at least ${limits.minWords} words. Links are reviewed before they appear.`}
				</p>
			</div>

			{/* Honeypot: hidden from people and assistive technology, filled in by bots. */}
			<div aria-hidden className="absolute -left-[10000px] h-px w-px overflow-hidden">
				<label htmlFor="comment-website">Website</label>
				<input id="comment-website" name="website" tabIndex={-1} autoComplete="off" />
			</div>

			<div className="flex flex-wrap items-center gap-4">
				<Button
					type="submit"
					disabled={sending || !enough || tooLong || name.trim().length < limits.nameMin}
					className="h-11 rounded-full px-6"
				>
					{sending ? "Sending…" : "Post comment"}
				</Button>
				<p
					role="status"
					className={cn("text-sm", notice?.tone === "error" ? "text-destructive" : "text-muted-foreground")}
				>
					{notice?.text}
				</p>
			</div>
		</form>
	)
}
