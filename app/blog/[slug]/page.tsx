import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Reveal } from "@/components/motion-primitives"
import { Aurora } from "@/components/aurora"
import { ShareButtons } from "@/components/share-buttons"
import { PostEngagement } from "@/components/post-engagement"
import { isEngagementEnabled } from "@/lib/engagement/store"
import { contact, identity } from "@/lib/profile"
import { formatPostDate, getVisiblePost, getVisiblePosts } from "@/lib/posts"

type Params = { slug: string }

/**
 * Prerenders every post visible in this environment (published only in production).
 * @returns One params object per post.
 */
export function generateStaticParams(): Params[] {
	return getVisiblePosts().map((post) => ({ slug: post.slug }))
}

// Any slug not returned above (including drafts in production) is a 404.
export const dynamicParams = false

/**
 * Builds the post's title, description and article metadata. The share image
 * comes from opengraph-image.tsx and twitter-image.tsx in this folder.
 * @param props - Route props.
 * @param props.params - The route params, a Promise in Next 16.
 * @returns Metadata for the post page.
 */
export async function generateMetadata({
	params,
}: {
	params: Promise<Params>
}): Promise<Metadata> {
	const { slug } = await params
	const post = getVisiblePost(slug)

	if (!post) {
		return { title: "Not found" }
	}

	return {
		title: post.title,
		description: post.description,
		alternates: { canonical: `/blog/${post.slug}` },
		authors: [{ name: identity.name, url: contact.site }],
		keywords: post.tags,
		openGraph: {
			type: "article",
			url: `/blog/${post.slug}`,
			siteName: identity.name,
			title: post.title,
			description: post.description,
			...(post.published ? { publishedTime: post.published } : {}),
			modifiedTime: post.updated,
			authors: [identity.name],
			tags: post.tags,
		},
		twitter: {
			card: "summary_large_image",
			title: post.title,
			description: post.description,
		},
		...(post.status === "draft" ? { robots: { index: false, follow: false } } : {}),
	}
}

/**
 * Renders one blog post: the header from lib/posts, the body from content/blog,
 * then sharing, likes and comments.
 * @param props - Route props.
 * @param props.params - The route params, a Promise in Next 16.
 * @returns The post page.
 */
export default async function PostPage({
	params,
}: {
	params: Promise<Params>
}) {
	const { slug } = await params
	const post = getVisiblePost(slug)

	if (!post) {
		notFound()
	}

	const { default: Body } = await import(`@/content/blog/${post.slug}.mdx`)
	const url = new URL(`/blog/${post.slug}`, contact.site).href

	// Structured data so search engines and link previews treat this as an article.
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "BlogPosting",
		headline: post.title,
		description: post.description,
		url,
		mainEntityOfPage: url,
		image: `${url}/opengraph-image`,
		datePublished: post.published ?? post.updated,
		dateModified: post.updated,
		keywords: post.tags.join(", "),
		author: { "@type": "Person", name: identity.name, url: contact.site },
	}

	return (
		<main id="main">
			<script
				type="application/ld+json"
				// JSON.stringify output is safe here once "<" is escaped.
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
			/>

			<section className="relative overflow-hidden px-6 pt-36 pb-16">
				<Aurora className="opacity-60" />

				<div className="relative mx-auto max-w-4xl">
					<Reveal y={12}>
						<Link
							href="/blog"
							className="text-muted-foreground hover:text-foreground mb-10 inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase transition-colors"
						>
							<span aria-hidden>←</span> All posts
						</Link>
					</Reveal>

					<Reveal delay={0.05}>
						<div className="text-muted-foreground mb-5 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs tracking-widest uppercase">
							<time dateTime={post.published ?? post.updated}>
								{formatPostDate(post)}
							</time>
							<span aria-hidden>·</span>
							<span>{post.readingMinutes} min read</span>
						</div>

						<h1 className="font-display mb-6 text-[clamp(2.25rem,6vw,4rem)] leading-[1.15] font-bold tracking-[-0.03em] text-balance">
							{post.title}
						</h1>

						<p className="text-muted-foreground max-w-2xl text-lg leading-relaxed text-balance">
							{post.description}
						</p>
					</Reveal>

					<Reveal delay={0.12}>
						<div className="mt-10 flex flex-wrap gap-2">
							{post.tags.map((tag) => (
								<Badge
									key={tag}
									variant="secondary"
									className="rounded-full font-mono text-xs"
								>
									{tag}
								</Badge>
							))}
						</div>
						<div className="mt-6">
							<ShareButtons url={url} title={post.title} />
						</div>
					</Reveal>
				</div>
			</section>

			<article className="px-6 pb-24">
				<div className="mx-auto max-w-3xl">
					<Body />

					<div className="mt-16 border-t pt-10">
						<h2 className="text-muted-foreground mb-5 font-mono text-xs tracking-widest uppercase">
							Share this post
						</h2>
						<ShareButtons url={url} title={post.title} />
					</div>

					{isEngagementEnabled() && <PostEngagement slug={post.slug} />}
				</div>
			</article>

			<footer className="px-6 py-10">
				<div className="mx-auto max-w-6xl">
					<Separator className="mb-8" />
					<div className="flex justify-center">
						<Button asChild variant="ghost" className="rounded-full">
							<Link href="/blog">← Back to the blog</Link>
						</Button>
					</div>
				</div>
			</footer>
		</main>
	)
}
