"use client"

import Link from "next/link"
import Image from "next/image"
import { Aurora } from "@/components/aurora"
import {
	Magnetic,
	Parallax,
	Reveal,
	SplitText,
	Stagger,
	StaggerItem,
} from "@/components/motion-primitives"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { getFeatured } from "@/lib/projects"

const skills = [
	{ group: "Backend", items: ["Django", "DRF", "Node.js", "Express", "REST"] },
	{ group: "Languages", items: ["Python", "TypeScript", "JavaScript", "SQL"] },
	{ group: "Data", items: ["PostgreSQL", "MongoDB", "Redis", "Query tuning"] },
	{ group: "Platform", items: ["Docker", "CI/CD", "Linux", "AWS", "Vercel"] },
	{ group: "Quality", items: ["Vitest", "Pytest", "Zod", "OpenAPI"] },
	{ group: "Frontend", items: ["React", "Next.js", "Tailwind", "Redux"] },
]

const marqueeItems = skills.flatMap((s) => s.items)

const stats = [
	{ value: "6+", label: "Years shipping production code" },
	{ value: "27+", label: "CRM deployments for real clients" },
	{ value: "2", label: "Industries: healthcare and education" },
]

const experience = [
	{
		period: "2021 — Present",
		role: "Freelance Software Engineer",
		company: "Independent · Remote",
		description:
			"Design, build and host Django CRM systems for schools, clinics and small businesses. Employee management, payroll, attendance and analytics, running on self-managed Linux servers with ongoing support.",
		tags: ["Django", "PostgreSQL", "Linux", "Self-hosted"],
	},
	{
		period: "2018 — 2021",
		role: "Junior Software Developer",
		company: "Matalli Infotech · Dombivli",
		description:
			"Built and maintained internal web applications on Django 2.2 LTS. Wrote unit and database tests, implemented CI/CD pipelines, and managed deployments across AWS and Heroku with minimal downtime.",
		tags: ["Django", "CI/CD", "AWS", "Testing"],
	},
]

export default function HomePage() {
	const featured = getFeatured()

	return (
		<main id="main">
			{/* ---------------------------------------------------------
			    Hero
			    --------------------------------------------------------- */}
			<section className="relative flex min-h-svh items-center overflow-hidden px-6 pt-28 pb-20">
				<Aurora />

				<div className="relative mx-auto w-full max-w-5xl">
					<Reveal delay={0.1} y={12}>
						<div className="mb-8 flex items-center gap-3">
							<span className="relative flex size-2">
								<span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-60" />
								<span className="relative inline-flex size-2 rounded-full bg-primary" />
							</span>
							<span className="text-muted-foreground font-mono text-xs tracking-widest uppercase">
								Available for remote roles
							</span>
						</div>
					</Reveal>

					{/* The name sits in the navbar, so the hero leads with the
					    positioning line instead. */}
					<h1 className="font-display mb-8 max-w-4xl text-[clamp(2.25rem,6.5vw,4.75rem)] font-bold tracking-[-0.035em]">
						<SplitText text="Backend engineer, six years in." delay={0.1} />
					</h1>

					<Reveal delay={0.5}>
						<p className="text-muted-foreground mb-10 max-w-2xl text-lg leading-relaxed text-balance sm:text-xl">
							I build the unglamorous parts properly — typed APIs, real test
							suites, deployments that hold up on a Tuesday afternoon.
						</p>
					</Reveal>

					<Reveal delay={0.68}>
						<div className="flex flex-wrap items-center gap-4">
							<Magnetic>
								<Button
									asChild
									className="h-12 rounded-full px-7 text-sm font-semibold"
								>
									<Link href="#work">See the work</Link>
								</Button>
							</Magnetic>
							<Magnetic>
								<Button
									asChild
									variant="outline"
									className="h-12 rounded-full px-7 text-sm font-semibold"
								>
									<Link href="#contact">Get in touch</Link>
								</Button>
							</Magnetic>
						</div>
					</Reveal>

					<Reveal delay={0.8}>
						<dl className="mt-20 grid max-w-3xl grid-cols-1 gap-8 sm:grid-cols-3">
							{stats.map((stat) => (
								<div key={stat.label} className="border-t pt-4">
									<dt className="font-display text-4xl font-bold tracking-tight">
										{stat.value}
									</dt>
									<dd className="text-muted-foreground mt-1 text-sm leading-snug">
										{stat.label}
									</dd>
								</div>
							))}
						</dl>
					</Reveal>
				</div>
			</section>

			{/* ---------------------------------------------------------
			    Skills marquee
			    --------------------------------------------------------- */}
			<section
				id="skills"
				aria-label="Technologies"
				className="marquee-host border-y py-5"
			>
				<div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
					<div className="marquee-track flex shrink-0 items-center gap-10 pr-10">
						{[...marqueeItems, ...marqueeItems].map((item, i) => (
							<span
								key={`${item}-${i}`}
								className="text-muted-foreground font-mono text-sm whitespace-nowrap"
							>
								{item}
							</span>
						))}
					</div>
				</div>
			</section>

			{/* ---------------------------------------------------------
			    Work
			    --------------------------------------------------------- */}
			<section id="work" className="px-6 py-28">
				<div className="mx-auto max-w-6xl">
					<Reveal className="mb-16 flex flex-wrap items-end justify-between gap-6">
						<div>
							<p className="text-muted-foreground mb-3 font-mono text-xs tracking-widest uppercase">
								Selected work
							</p>
							<h2 className="font-display text-[clamp(2.25rem,6vw,4rem)] leading-[1.15] font-bold tracking-tight">
								Case studies
							</h2>
						</div>
						<p className="text-muted-foreground max-w-sm text-sm leading-relaxed">
							Each one is written as problem, constraint, tradeoff and
							outcome — not a feature list.
						</p>
					</Reveal>

					{featured.length > 0 ? (
						<Stagger className="grid gap-6 md:grid-cols-2">
							{featured.map((project) => (
								<StaggerItem key={project.slug}>
									<Link
										href={`/projects/${project.slug}`}
										className="group block h-full"
									>
										<Card className="h-full overflow-hidden rounded-3xl p-0 transition-all duration-500 group-hover:-translate-y-1.5 group-hover:shadow-2xl">
											{project.image && (
												<div className="relative aspect-[16/10] overflow-hidden">
													<Image
														src={project.image}
														alt=""
														fill
														sizes="(min-width: 768px) 50vw, 100vw"
														className="object-cover transition-transform duration-700 group-hover:scale-105"
													/>
												</div>
											)}
											<CardContent className="flex flex-col gap-4 p-7">
												<div className="flex items-baseline justify-between gap-4">
													<h3 className="font-display text-2xl font-bold tracking-tight">
														{project.title}
													</h3>
													<span className="text-muted-foreground font-mono text-xs">
														{project.year}
													</span>
												</div>
												<p className="text-muted-foreground text-sm leading-relaxed">
													{project.tagline}
												</p>
												<div className="flex flex-wrap gap-1.5">
													{project.stack.slice(0, 4).map((tech) => (
														<Badge
															key={tech}
															variant="secondary"
															className="rounded-full font-mono text-[0.7rem]"
														>
															{tech}
														</Badge>
													))}
												</div>
												<span className="text-primary mt-2 inline-flex items-center gap-1.5 text-sm font-semibold">
													Read case study
													<span className="transition-transform duration-300 group-hover:translate-x-1">
														→
													</span>
												</span>
											</CardContent>
										</Card>
									</Link>
								</StaggerItem>
							))}
						</Stagger>
					) : (
						<Reveal>
							<div className="rounded-3xl border border-dashed px-8 py-20 text-center">
								<p className="font-display mb-3 text-2xl font-bold tracking-tight">
									Case studies in progress
								</p>
								<p className="text-muted-foreground mx-auto max-w-md text-sm leading-relaxed">
									Being rewritten as proper write-ups rather than repo links.
									In the meantime the source is all on GitHub.
								</p>
								<Button
									asChild
									variant="outline"
									className="mt-8 h-10 rounded-full px-5"
								>
									<a
										href="https://github.com/code-kasha"
										target="_blank"
										rel="noopener noreferrer"
									>
										Browse the code
									</a>
								</Button>
							</div>
						</Reveal>
					)}
				</div>
			</section>

			{/* ---------------------------------------------------------
			    Skills detail
			    --------------------------------------------------------- */}
			<section className="relative overflow-hidden px-6 py-28">
				<Aurora className="opacity-50" />

				<div className="relative mx-auto max-w-6xl">
					<Reveal className="mb-16">
						<p className="text-muted-foreground mb-3 font-mono text-xs tracking-widest uppercase">
							Toolkit
						</p>
						<h2 className="font-display text-[clamp(2.25rem,6vw,4rem)] leading-[1.15] font-bold tracking-tight">
							What I reach for
						</h2>
					</Reveal>

					<Stagger className="grid gap-px overflow-hidden rounded-3xl border bg-border sm:grid-cols-2 lg:grid-cols-3">
						{skills.map((skill) => (
							<StaggerItem key={skill.group} className="bg-background">
								<Parallax distance={10} className="h-full">
									<div className="hover:bg-surface h-full p-8 transition-colors duration-500">
										<h3 className="mb-5 font-mono text-xs tracking-widest uppercase">
											{skill.group}
										</h3>
										<ul className="flex flex-wrap gap-2">
											{skill.items.map((item) => (
												<li key={item}>
													<Badge
														variant="outline"
														className="rounded-full text-xs font-normal"
													>
														{item}
													</Badge>
												</li>
											))}
										</ul>
									</div>
								</Parallax>
							</StaggerItem>
						))}
					</Stagger>
				</div>
			</section>

			{/* ---------------------------------------------------------
			    Experience
			    --------------------------------------------------------- */}
			<section id="experience" className="px-6 py-28">
				<div className="mx-auto max-w-4xl">
					<Reveal className="mb-16">
						<p className="text-muted-foreground mb-3 font-mono text-xs tracking-widest uppercase">
							Track record
						</p>
						<h2 className="font-display text-[clamp(2.25rem,6vw,4rem)] leading-[1.15] font-bold tracking-tight">
							Experience
						</h2>
					</Reveal>

					<ol className="space-y-px overflow-hidden rounded-3xl border bg-border">
						{experience.map((job) => (
							<li key={job.role} className="bg-background">
								<Reveal>
									<article className="hover:bg-surface p-8 transition-colors duration-500 sm:p-10">
										<div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
											<div>
												<h3 className="font-display text-2xl font-bold tracking-tight">
													{job.role}
												</h3>
												<p className="text-muted-foreground mt-1 text-sm">
													{job.company}
												</p>
											</div>
											<span className="text-primary font-mono text-xs whitespace-nowrap">
												{job.period}
											</span>
										</div>
										<p className="text-muted-foreground mb-5 leading-relaxed">
											{job.description}
										</p>
										<div className="flex flex-wrap gap-1.5">
											{job.tags.map((tag) => (
												<Badge
													key={tag}
													variant="secondary"
													className="rounded-full font-mono text-[0.7rem]"
												>
													{tag}
												</Badge>
											))}
										</div>
									</article>
								</Reveal>
							</li>
						))}
					</ol>
				</div>
			</section>

			{/* ---------------------------------------------------------
			    Contact
			    --------------------------------------------------------- */}
			<section
				id="contact"
				className="relative overflow-hidden border-t px-6 py-32"
			>
				<Aurora />

				<div className="relative mx-auto max-w-4xl text-center">
					<Reveal>
						<p className="text-muted-foreground mb-4 font-mono text-xs tracking-widest uppercase">
							Contact
						</p>
						<h2 className="font-display mb-6 text-[clamp(2.5rem,8vw,5.5rem)] leading-[1.15] font-bold tracking-[-0.03em]">
							<span className="text-gradient">Let&apos;s build something</span>
						</h2>
						<p className="text-muted-foreground mx-auto mb-12 max-w-xl leading-relaxed">
							Open to remote backend and full-stack roles. If you have a
							problem that needs someone methodical, I&apos;d like to hear
							about it.
						</p>
					</Reveal>

					<Reveal delay={0.12}>
						<div className="flex flex-wrap justify-center gap-3">
							<Magnetic>
								<Button
									asChild
									className="h-12 rounded-full px-7 text-sm font-semibold"
								>
									<a href="mailto:akashdamle07@gmail.com">Email me</a>
								</Button>
							</Magnetic>
							<Magnetic>
								<Button
									asChild
									variant="outline"
									className="h-12 rounded-full px-7 text-sm font-semibold"
								>
									<a
										href="https://www.linkedin.com/in/akash-damle-58a808258/"
										target="_blank"
										rel="noopener noreferrer"
									>
										LinkedIn
									</a>
								</Button>
							</Magnetic>
							<Magnetic>
								<Button
									asChild
									variant="outline"
									className="h-12 rounded-full px-7 text-sm font-semibold"
								>
									<a
										href="https://github.com/code-kasha"
										target="_blank"
										rel="noopener noreferrer"
									>
										GitHub
									</a>
								</Button>
							</Magnetic>
							<Magnetic>
								<Button
									asChild
									variant="ghost"
									className="h-12 rounded-full px-7 text-sm font-semibold"
								>
									<a
										href="/Resume.pdf"
										target="_blank"
										rel="noopener noreferrer"
									>
										Résumé
									</a>
								</Button>
							</Magnetic>
						</div>
					</Reveal>
				</div>
			</section>

			<footer className="px-6 py-10">
				<div className="mx-auto max-w-6xl">
					<Separator className="mb-8" />
					<div className="text-muted-foreground flex flex-col items-center justify-between gap-3 text-xs sm:flex-row">
						<p>© {new Date().getFullYear()} Akash Damle</p>
						<p className="font-mono">Dombivli, India · Working remotely</p>
					</div>
				</div>
			</footer>
		</main>
	)
}
