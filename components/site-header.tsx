"use client"

import * as React from "react"
import Link from "next/link"
import { motion, useMotionValueEvent, useScroll } from "motion/react"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { ScrollProgress } from "@/components/motion-primitives"
import { cn } from "@/lib/utils"

const links = [
	{ label: "Work", href: "/#work" },
	{ label: "Skills", href: "/#skills" },
	{ label: "Experience", href: "/#experience" },
	{ label: "Contact", href: "/#contact" },
]

export function SiteHeader() {
	const [condensed, setCondensed] = React.useState(false)
	const { scrollY } = useScroll()

	useMotionValueEvent(scrollY, "change", (latest) => {
		setCondensed(latest > 24)
	})

	return (
		<>
			<ScrollProgress />

			<header className="fixed inset-x-0 top-0 z-50">
				<motion.div
					className={cn(
						"mx-auto flex items-center justify-between gap-4 transition-all duration-500",
						condensed
							? "surface-glass mt-3 w-[min(64rem,calc(100%-1.5rem))] rounded-full border px-4 py-2 shadow-lg shadow-black/5"
							: "mt-0 w-full max-w-none rounded-none border-transparent px-6 py-5",
					)}
				>
					<Link
						href="/"
						className="font-display text-lg font-bold tracking-tight"
					>
						Akash<span className="text-primary">.</span>
					</Link>

					<nav aria-label="Primary" className="hidden md:block">
						<ul className="flex items-center gap-1">
							{links.map((link) => (
								<li key={link.href}>
									<Link
										href={link.href}
										className="text-muted-foreground hover:text-foreground relative rounded-full px-3 py-1.5 text-sm transition-colors"
									>
										{link.label}
									</Link>
								</li>
							))}
						</ul>
					</nav>

					<div className="flex items-center gap-2">
						{/* Nav collapses to a scrollable rail on small screens
						    rather than disappearing behind a JS menu. */}
						<nav aria-label="Primary, compact" className="md:hidden">
							<ul className="flex max-w-[40vw] items-center gap-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
								{links.map((link) => (
									<li key={link.href}>
										<Link
											href={link.href}
											className="text-muted-foreground hover:text-foreground rounded-full px-2 py-1 text-xs whitespace-nowrap transition-colors"
										>
											{link.label}
										</Link>
									</li>
								))}
							</ul>
						</nav>

						<ThemeSwitcher />
					</div>
				</motion.div>
			</header>
		</>
	)
}
