export type PostStatus = 'draft' | 'published'

export type Post = {
	/** URL segment, and the file name of the post body in `content/blog/<slug>.mdx`. */
	slug: string
	title: string
	/** One or two sentences for the blog index, meta description and social preview. */
	description: string
	/** First publication date as `YYYY-MM-DD`; `null` while the post is a draft. */
	published: string | null
	/** Date of the last substantive revision as `YYYY-MM-DD`. */
	updated: string
	/** Drafts appear only under `next dev`, for review; production never lists or routes them. */
	status: PostStatus
	tags: string[]
	/** Approximate reading time, from the word count at about 230 words per minute. */
	readingMinutes: number
}

/**
 * Blog posts, newest first.
 *
 * Metadata lives here; each body lives in `content/blog/<slug>.mdx`. The
 * article text is drafted and fact-checked in the owner's local notes
 * (Ideas/local_ai_usage/data/blog_article_plan/ARTICLE.md) and copied here
 * without its title and standfirst, which come from this entry instead.
 *
 * To publish: set `status: 'published'` and `published` to the date.
 */
export const posts: Post[] = [
	{
		slug: 'local-ai-on-a-12gb-gpu',
		title: 'Local AI on a 12 GB GPU: what survived testing, and how to set it up',
		description:
			'Three local models, four apps, and the failures that decided the setup. Tested on one Windows PC with an RTX 3060 (12 GB) and 32 GB of RAM.',
		published: '2026-09-25',
		updated: '2026-09-25',
		status: 'published',
		tags: ['Local AI', 'Ollama', 'Developer tools'],
		readingMinutes: 12,
	},
]

const showDrafts = process.env.NODE_ENV !== 'production'

/**
 * Lists the posts that may appear on the public site.
 * @returns Published posts only, newest first by publication date.
 */
export function getPublishedPosts(): Post[] {
	return posts
		.filter((post) => post.status === 'published' && post.published !== null)
		.sort((a, b) => (b.published ?? '').localeCompare(a.published ?? ''))
}

/**
 * Lists the posts to render in this environment.
 * @returns Published posts in production; under `next dev`, drafts follow them for review.
 */
export function getVisiblePosts(): Post[] {
	const drafts = showDrafts ? posts.filter((post) => post.status === 'draft') : []
	return [...getPublishedPosts(), ...drafts]
}

/**
 * Finds a post that may be rendered in this environment.
 * @param slug - The post's URL segment.
 * @returns The post, or `undefined` if it does not exist or is a draft in production.
 */
export function getVisiblePost(slug: string): Post | undefined {
	return getVisiblePosts().find((post) => post.slug === slug)
}

/**
 * Formats a post's date for display, e.g. "25 September 2026".
 * @param post - The post to date.
 * @returns The publication date, or the last update for drafts.
 */
export function formatPostDate(post: Post): string {
	const iso = post.published ?? post.updated
	return new Intl.DateTimeFormat('en-GB', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
		timeZone: 'UTC',
	}).format(new Date(`${iso}T00:00:00Z`))
}
