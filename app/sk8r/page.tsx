import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Reveal, Stagger, StaggerItem } from "@/components/motion-primitives"
import { Aurora } from "@/components/aurora"
import { CopyCommand } from "@/components/copy-command"

const repo = "https://github.com/code-kasha/sk8r"
const pypi = "https://pypi.org/project/sk8r/"
const install = "uv tool install sk8r"
const description =
	"sk8r sets a project up so it actually runs: it works out what the project is, installs it, fills local settings, adds run buttons to your editor and checks the app really starts, after one approval."

export const metadata: Metadata = {
	title: "sk8r — Keep your momentum",
	description,
	alternates: { canonical: "/sk8r" },
	openGraph: {
		type: "website",
		url: "/sk8r",
		title: "sk8r — Keep your momentum",
		description,
		images: [{ url: "/sk8r-social.png", width: 1280, height: 640, alt: "sk8r: Keep your momentum." }],
	},
	twitter: {
		card: "summary_large_image",
		title: "sk8r — Keep your momentum",
		description,
		images: [{ url: "/sk8r-social.png", alt: "sk8r: Keep your momentum." }],
	},
}

const exchange = [
	{ who: "You", text: "Set this project up with sk8r; follow `sk8r guide`." },
	{
		who: "Agent",
		text: "Here is the plan:\n1. Write sk8r.toml (preset django, python=uv inferred from uv.lock)\n2. Write 3 run buttons into T3 Code (backup first)\n3. Setup: uv sync\n4. Add app settings to .env: SECRET_KEY, ALLOWED_HOSTS, DATABASE_URL, DEBUG (names only)\n5. Start check: wait for http://127.0.0.1:8000/admin/login/, then stop\nApprove?",
	},
	{ who: "You", text: "approve it" },
	{
		who: "Agent",
		text: "configured ✓  dependencies installed ✓  dry-run verified ✓  launched ✓ (HTTP 200)",
	},
]

const benefits = [
	{
		title: "One plan, one yes",
		body: "sk8r works out the stack from the files that are there, then shows everything it will do as one numbered plan: configuration, run buttons, installs, missing settings and a start check. Approve once and it carries it all out. Preview first with sk8r run --dry-run.",
	},
	{
		title: "A real start, not a guess",
		body: "“It should work now” isn't an answer. sk8r starts the app, waits for a real HTTP response on your machine, then stops what it started. It reports configured, installed, checked and launched separately, and never touches a server you're already running.",
	},
	{
		title: "Safe to try",
		body: "A project's commands run only after you've seen and approved them, with the full path of every program. Settings values are never printed. And sk8r undo reverses everything it changed, leaving your own edits alone.",
	},
]

const stacks = ["Django", "Django + Vite", "Django + Expo", "FastAPI + Vite", "Next.js", "Static Python"]

const steps = [
	{ title: "Install", body: "With uv on any machine with Python 3.11 or later:", command: install },
	{
		title: "Ask your assistant",
		body: "In T3 Code, open your project and say: “Set this project up with sk8r; follow sk8r guide.” Read the plan, approve once, and the run buttons appear.",
	},
	{ title: "Or use a terminal", body: "In your project, preview the plan without changing anything. Then sk8r run carries it out after one yes, and sk8r start dev launches the app.", command: "sk8r run --dry-run" },
]

/**
 * The sk8r landing page: what it is, a real run, why it helps and how to start.
 * @returns The page.
 */
export default function Sk8rPage() {
	return (
		<main id="main">
			<section className="relative overflow-hidden px-6 pt-36 pb-24">
				<Aurora className="opacity-60" />
				<div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
					<div>
					<Reveal y={12}>
						<p className="text-muted-foreground mb-8 font-mono text-xs tracking-widest uppercase">
							sk8r · open-source developer tool
						</p>
					</Reveal>
					<Reveal delay={0.05}>
						<h1 className="font-display mb-6 text-[clamp(2.75rem,9vw,5.5rem)] leading-[1.05] font-bold tracking-[-0.03em]">
							Keep your momentum.
						</h1>
						<p className="text-muted-foreground max-w-2xl text-lg leading-relaxed text-balance">
							Cloning a project is easy. Getting it to run is where momentum dies. {description}
						</p>
					</Reveal>
					<Reveal delay={0.12}>
						<div className="mt-10 flex flex-col gap-4">
							<CopyCommand command={install} />
							<div className="flex flex-wrap gap-3">
								<Button asChild className="h-11 rounded-full px-6">
									<a href={repo} target="_blank" rel="noopener noreferrer">
										Get started on GitHub
									</a>
								</Button>
								<Button asChild variant="outline" className="h-11 rounded-full px-6">
									<a href={pypi} target="_blank" rel="noopener noreferrer">
										PyPI
									</a>
								</Button>
							</div>
							<p className="text-muted-foreground font-mono text-xs">
								Free and open source (MIT) · Python 3.11+ · Linux, macOS and Windows · no model, no account
							</p>
						</div>
					</Reveal>
					</div>
					<Reveal delay={0.18}>
						<div className="overflow-hidden rounded-3xl border shadow-2xl">
							{/* The cover follows the site theme, like the project cards. */}
							<Image
								src="/sk8r-social-light.png"
								alt="sk8r: Keep your momentum."
								width={1280}
								height={640}
								priority
								sizes="(min-width: 1024px) 45vw, 100vw"
								className="h-auto w-full [[data-theme=dark]_&]:hidden"
							/>
							<Image
								src="/sk8r-social.png"
								alt="sk8r: Keep your momentum."
								width={1280}
								height={640}
								priority
								sizes="(min-width: 1024px) 45vw, 100vw"
								className="hidden h-auto w-full [[data-theme=dark]_&]:block"
							/>
						</div>
					</Reveal>
				</div>
			</section>

			<section className="px-6 pb-24">
				<div className="mx-auto max-w-4xl">
					<Reveal>
						<div className="overflow-hidden rounded-3xl border border-white/10 bg-[#0d1117] p-5 font-mono text-[0.8rem] sm:p-6 sm:text-[0.85rem] leading-relaxed text-[#e6edf3] shadow-2xl md:p-10">
							{exchange.map((line, index) => (
								<div key={index} className="mb-4 grid gap-1 last:mb-0 sm:grid-cols-[4.5rem_1fr] sm:gap-3">
									<span className={line.who === "You" ? "text-[#7ee2b8]" : "text-[#f2a99b]"}>{line.who}:</span>
									<span className="whitespace-pre-wrap [overflow-wrap:anywhere]">{line.text}</span>
								</div>
							))}
						</div>
						<p className="text-muted-foreground mt-4 text-sm leading-relaxed">
							A real run on a Django project: about 11 seconds from approval to a verified HTTP 200, with its
							packages already installed.{" "}
							<a
								href={`${repo}/blob/main/results/README.md`}
								target="_blank"
								rel="noopener noreferrer"
								className="underline underline-offset-4"
							>
								Field results
							</a>
						</p>
					</Reveal>
				</div>
			</section>

			<section className="border-t px-6 py-24">
				<div className="mx-auto max-w-5xl">
					<Stagger className="grid gap-6 md:grid-cols-3">
						{benefits.map((benefit) => (
							<StaggerItem key={benefit.title}>
								<Card className="h-full rounded-3xl p-0">
									<CardContent className="flex flex-col gap-3 p-7">
										<h2 className="font-display text-xl font-bold tracking-tight">{benefit.title}</h2>
										<p className="text-muted-foreground leading-relaxed">{benefit.body}</p>
									</CardContent>
								</Card>
							</StaggerItem>
						))}
					</Stagger>
					<Reveal>
						<div className="mt-14 flex flex-wrap items-center gap-2">
							<span className="text-muted-foreground mr-2 font-mono text-xs tracking-widest uppercase">
								Ready for
							</span>
							{stacks.map((stack) => (
								<Badge key={stack} variant="secondary" className="rounded-full font-mono text-xs">
									{stack}
								</Badge>
							))}
							<span className="text-muted-foreground ml-2 text-sm">and more through presets</span>
						</div>
					</Reveal>
				</div>
			</section>

			<section className="border-t px-6 py-24">
				<div className="mx-auto max-w-4xl">
					<Reveal>
						<h2 className="font-display mb-12 text-3xl font-bold tracking-tight md:text-4xl">Start in a minute</h2>
					</Reveal>
					<Stagger className="flex flex-col gap-10">
						{steps.map((step, index) => (
							<StaggerItem key={step.title}>
								<div className="grid gap-4 md:grid-cols-[3rem_1fr]">
									<span className="text-muted-foreground font-mono text-sm">0{index + 1}</span>
									<div className="flex flex-col gap-4">
										<h3 className="text-lg font-semibold">{step.title}</h3>
										<p className="text-muted-foreground leading-relaxed">{step.body}</p>
										{step.command && <CopyCommand command={step.command} />}
									</div>
								</div>
							</StaggerItem>
						))}
					</Stagger>
				</div>
			</section>

			<section className="border-t px-6 py-24">
				<div className="mx-auto flex max-w-4xl flex-col gap-6">
					<Reveal>
						<h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">Try it on your next project.</h2>
						<p className="text-muted-foreground mt-4 max-w-2xl leading-relaxed">
							sk8r is young and grows from real projects. A preset for your stack is the most welcome
							contribution, and if you have a Mac, a report of how it went helps most of all.
						</p>
					</Reveal>
					<Reveal delay={0.08}>
						<div className="flex flex-wrap gap-3">
							<Button asChild className="h-11 rounded-full px-6">
								<a href={repo} target="_blank" rel="noopener noreferrer">
									GitHub
								</a>
							</Button>
							<Button asChild variant="outline" className="h-11 rounded-full px-6">
								<Link href="/blog/sk8r-from-clone-to-running-app">How it was built</Link>
							</Button>
							<Button asChild variant="outline" className="h-11 rounded-full px-6">
								<Link href="/projects/sk8r">Case study</Link>
							</Button>
						</div>
					</Reveal>
				</div>
			</section>
		</main>
	)
}
