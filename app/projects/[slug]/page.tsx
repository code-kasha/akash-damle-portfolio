import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Reveal } from "@/components/motion-primitives"
import { Aurora } from "@/components/aurora"
import { getProject, projects } from "@/lib/projects"

type Params = { slug: string }

export function generateStaticParams(): Params[] {
	return projects.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({
	params,
}: {
	params: Promise<Params>
}): Promise<Metadata> {
	const { slug } = await params
	const project = getProject(slug)

	if (!project) {
		return { title: "Not found" }
	}

	return {
		title: project.title,
		description: project.tagline,
		alternates: { canonical: `/projects/${project.slug}` },
		openGraph: {
			type: "article",
			url: `/projects/${project.slug}`,
			title: project.title,
			description: project.tagline,
		},
	}
}

const sections = [
	{ key: "problem", label: "The problem" },
	{ key: "constraint", label: "The constraint" },
	{ key: "approach", label: "The approach" },
	{ key: "outcome", label: "The outcome" },
] as const

export default async function ProjectPage({
	params,
}: {
	params: Promise<Params>
}) {
	const { slug } = await params
	const project = getProject(slug)

	if (!project) {
		notFound()
	}

	return (
		<main id="main">
			<section className="relative overflow-hidden px-6 pt-36 pb-20">
				<Aurora className="opacity-60" />

				<div className="relative mx-auto max-w-4xl">
					<Reveal y={12}>
						<Link
							href="/#work"
							className="text-muted-foreground hover:text-foreground mb-10 inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase transition-colors"
						>
							<span aria-hidden>←</span> All work
						</Link>
					</Reveal>

					<Reveal delay={0.05}>
						<div className="text-muted-foreground mb-5 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs tracking-widest uppercase">
							<span>{project.year}</span>
							<span aria-hidden>·</span>
							<span>{project.role}</span>
						</div>

						<h1 className="font-display mb-6 text-[clamp(2.5rem,8vw,5rem)] leading-[0.98] font-bold tracking-[-0.03em]">
							{project.title}
						</h1>

						<p className="text-muted-foreground max-w-2xl text-lg leading-relaxed text-balance">
							{project.tagline}
						</p>
					</Reveal>

					<Reveal delay={0.12}>
						<div className="mt-10 flex flex-wrap gap-2">
							{project.stack.map((tech) => (
								<Badge
									key={tech}
									variant="secondary"
									className="rounded-full font-mono text-xs"
								>
									{tech}
								</Badge>
							))}
						</div>
					</Reveal>

					{(project.repo || project.demo) && (
						<Reveal delay={0.18}>
							<div className="mt-10 flex flex-wrap gap-3">
								{project.demo && (
									<Button asChild className="h-11 rounded-full px-6">
										<a
											href={project.demo}
											target="_blank"
											rel="noopener noreferrer"
										>
											Live demo
										</a>
									</Button>
								)}
								{project.repo && (
									<Button
										asChild
										variant="outline"
										className="h-11 rounded-full px-6"
									>
										<a
											href={project.repo}
											target="_blank"
											rel="noopener noreferrer"
										>
											Source
										</a>
									</Button>
								)}
							</div>
						</Reveal>
					)}
				</div>
			</section>

			{project.image && (
				<section className="px-6 pb-20">
					<Reveal className="mx-auto max-w-5xl">
						<div className="relative aspect-[16/9] overflow-hidden rounded-3xl border">
							<Image
								src={project.image}
								alt={`${project.title} interface`}
								fill
								priority
								sizes="(min-width: 1024px) 64rem, 100vw"
								className="object-cover"
							/>
						</div>
					</Reveal>
				</section>
			)}

			<section className="px-6 pb-24">
				<div className="mx-auto max-w-3xl">
					{sections.map((section, i) => (
						<Reveal key={section.key} delay={i * 0.04}>
							<div className="border-t py-10">
								<h2 className="text-muted-foreground mb-4 font-mono text-xs tracking-widest uppercase">
									{section.label}
								</h2>
								<p className="text-lg leading-relaxed">
									{project[section.key]}
								</p>
							</div>
						</Reveal>
					))}

					{project.highlights.length > 0 && (
						<Reveal>
							<div className="border-t py-10">
								<h2 className="text-muted-foreground mb-6 font-mono text-xs tracking-widest uppercase">
									Engineering notes
								</h2>
								<ul className="space-y-4">
									{project.highlights.map((highlight) => (
										<li key={highlight} className="flex gap-4">
											<span
												aria-hidden
												className="bg-primary mt-2.5 size-1.5 shrink-0 rounded-full"
											/>
											<span className="text-muted-foreground leading-relaxed">
												{highlight}
											</span>
										</li>
									))}
								</ul>
							</div>
						</Reveal>
					)}
				</div>
			</section>

			<footer className="px-6 py-10">
				<div className="mx-auto max-w-6xl">
					<Separator className="mb-8" />
					<div className="flex justify-center">
						<Button asChild variant="ghost" className="rounded-full">
							<Link href="/#work">← Back to all work</Link>
						</Button>
					</div>
				</div>
			</footer>
		</main>
	)
}
