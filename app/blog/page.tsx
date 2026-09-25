import type { Metadata } from "next"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Reveal } from "@/components/motion-primitives"
import { Aurora } from "@/components/aurora"
import { formatPostDate, getVisiblePosts } from "@/lib/posts"

export const metadata: Metadata = {
	title: "Writing",
	description:
		"Notes from building and testing software: what worked, what broke, and how to reproduce it.",
	alternates: { canonical: "/blog" },
}

/**
 * Lists the posts visible in this environment, newest first.
 * @returns The blog index page.
 */
export default function BlogIndexPage() {
	const posts = getVisiblePosts()

	return (
		<main id="main">
			<section className="relative overflow-hidden px-6 pt-36 pb-16">
				<Aurora className="opacity-60" />

				<div className="relative mx-auto max-w-4xl">
					<Reveal y={12}>
						<Link
							href="/"
							className="text-muted-foreground hover:text-foreground mb-10 inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase transition-colors"
						>
							<span aria-hidden>←</span> Home
						</Link>
					</Reveal>

					<Reveal delay={0.05}>
						<h1 className="font-display mb-6 text-[clamp(2.5rem,8vw,5rem)] leading-[1.15] font-bold tracking-[-0.03em]">
							Writing
						</h1>
						<p className="text-muted-foreground max-w-2xl text-lg leading-relaxed text-balance">
							Notes from building and testing software: what worked, what
							broke, and how to reproduce it.
						</p>
					</Reveal>
				</div>
			</section>

			<section className="px-6 pb-24">
				<div className="mx-auto max-w-3xl">
					{posts.length === 0 ? (
						<p className="text-muted-foreground border-t py-10">
							No posts yet.
						</p>
					) : (
						<ul>
							{posts.map((post, i) => (
								<li key={post.slug}>
									<Reveal delay={i * 0.04}>
										<Link
											href={`/blog/${post.slug}`}
											className="group block border-t py-10"
										>
											<div className="text-muted-foreground mb-4 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs tracking-widest uppercase">
												<time dateTime={post.published ?? post.updated}>
													{formatPostDate(post)}
												</time>
												<span aria-hidden>·</span>
												<span>{post.readingMinutes} min read</span>
												{post.status === "draft" && (
													<Badge
														variant="outline"
														className="rounded-full font-mono text-xs"
													>
														Draft
													</Badge>
												)}
											</div>
											<h2 className="font-display group-hover:text-primary mb-3 text-2xl leading-snug font-bold tracking-tight text-balance transition-colors">
												{post.title}
											</h2>
											<p className="text-muted-foreground leading-relaxed">
												{post.description}
											</p>
										</Link>
									</Reveal>
								</li>
							))}
						</ul>
					)}
				</div>
			</section>
		</main>
	)
}
