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
	/** Drafts are kept here for review but must never be listed or routed. */
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
 */
export const posts: Post[] = [
	{
		slug: 'local-ai-on-a-12gb-gpu',
		title: 'Local AI on a 12 GB GPU: what survived testing, and how to set it up',
		description:
			'Three local models, four apps, and the failures that decided the setup. Tested on one Windows PC with an RTX 3060 (12 GB) and 32 GB of RAM.',
		published: null,
		updated: '2026-09-25',
		status: 'draft',
		tags: ['Local AI', 'Ollama', 'Developer tools'],
		readingMinutes: 12,
	},
]

/**
 * Finds a published post by slug.
 * @param slug - The post's URL segment.
 * @returns The post, or `undefined` if it does not exist or is still a draft.
 */
export function getPost(slug: string): Post | undefined {
	return getPublishedPosts().find((post) => post.slug === slug)
}

/**
 * Lists the posts that may appear on the site.
 * @returns Published posts only, newest first by publication date.
 */
export function getPublishedPosts(): Post[] {
	return posts
		.filter((post) => post.status === 'published' && post.published !== null)
		.sort((a, b) => (b.published ?? '').localeCompare(a.published ?? ''))
}
