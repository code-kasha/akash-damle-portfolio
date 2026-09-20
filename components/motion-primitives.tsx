"use client"

import * as React from "react"
import {
	motion,
	useReducedMotion,
	useScroll,
	useSpring,
	useTransform,
	type Variants,
} from "motion/react"
import { cn } from "@/lib/utils"

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const

/* ---------------------------------------------------------------
   Reveal — fades/slides a block in the first time it enters view
   --------------------------------------------------------------- */

type RevealProps = React.ComponentProps<typeof motion.div> & {
	delay?: number
	y?: number
	as?: React.ElementType
}

export function Reveal({
	children,
	className,
	delay = 0,
	y = 24,
	...props
}: RevealProps) {
	const reduced = useReducedMotion()

	return (
		<motion.div
			className={className}
			initial={reduced ? false : { opacity: 0, y }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, margin: "-80px" }}
			transition={{ duration: 0.7, delay, ease: EASE_OUT_EXPO }}
			{...props}
		>
			{children}
		</motion.div>
	)
}

/* ---------------------------------------------------------------
   Stagger — parent/child pair for sequenced reveals
   --------------------------------------------------------------- */

const staggerParent: Variants = {
	hidden: {},
	show: {
		transition: { staggerChildren: 0.08, delayChildren: 0.05 },
	},
}

const staggerChild: Variants = {
	hidden: { opacity: 0, y: 28 },
	show: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.65, ease: EASE_OUT_EXPO },
	},
}

export function Stagger({
	children,
	className,
	...props
}: React.ComponentProps<typeof motion.div>) {
	const reduced = useReducedMotion()

	return (
		<motion.div
			className={className}
			variants={staggerParent}
			initial={reduced ? false : "hidden"}
			whileInView="show"
			viewport={{ once: true, margin: "-80px" }}
			{...props}
		>
			{children}
		</motion.div>
	)
}

export function StaggerItem({
	children,
	className,
	...props
}: React.ComponentProps<typeof motion.div>) {
	return (
		<motion.div variants={staggerChild} className={className} {...props}>
			{children}
		</motion.div>
	)
}

/* ---------------------------------------------------------------
   SplitText — per-word rise, used for the hero headline
   --------------------------------------------------------------- */

export function SplitText({
	text,
	className,
	delay = 0,
}: {
	text: string
	className?: string
	delay?: number
}) {
	const words = text.split(" ")

	// CSS-driven rather than motion-driven on purpose: this is the first
	// thing on the page, so it must not depend on hydration or on the tab
	// being painted. The keyframes live in globals.css and are neutralised
	// under prefers-reduced-motion.
	return (
		// word-spacing cancels the negative tracking on the space glyph, so
		// the gap matches the font's own space metric. Real space characters
		// sit between the wrappers so the headline still copies and reads
		// correctly; the gap is not faked with margins.
		<span className={`${className ?? ""} [word-spacing:0.035em]`}>
			{words.map((word, i) => (
				<React.Fragment key={`${word}-${i}`}>
					<span className="inline-block overflow-hidden align-bottom">
						<span
							className="word-rise"
							style={
								{
									"--word-delay": `${Math.round((delay + i * 0.08) * 1000)}ms`,
								} as React.CSSProperties
							}
						>
							{word}
						</span>
					</span>
					{i < words.length - 1 ? " " : ""}
				</React.Fragment>
			))}
		</span>
	)
}

/* ---------------------------------------------------------------
   Parallax — scroll-linked vertical drift
   --------------------------------------------------------------- */

export function Parallax({
	children,
	className,
	distance = 80,
}: {
	children: React.ReactNode
	className?: string
	distance?: number
}) {
	const ref = React.useRef<HTMLDivElement>(null)
	const reduced = useReducedMotion()

	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start end", "end start"],
	})

	const y = useTransform(scrollYProgress, [0, 1], [distance, -distance])
	const smoothY = useSpring(y, { stiffness: 120, damping: 30, mass: 0.6 })

	return (
		<div ref={ref} className={className}>
			<motion.div style={reduced ? undefined : { y: smoothY }}>
				{children}
			</motion.div>
		</div>
	)
}

/* ---------------------------------------------------------------
   Magnetic — pulls a control toward the cursor, springs back
   --------------------------------------------------------------- */

export function Magnetic({
	children,
	className,
	strength = 0.35,
}: {
	children: React.ReactNode
	className?: string
	strength?: number
}) {
	const ref = React.useRef<HTMLDivElement>(null)
	const reduced = useReducedMotion()

	const springConfig = { stiffness: 260, damping: 18, mass: 0.4 }
	const x = useSpring(0, springConfig)
	const y = useSpring(0, springConfig)

	const handleMove = (event: React.MouseEvent<HTMLDivElement>) => {
		if (reduced || !ref.current) return

		const rect = ref.current.getBoundingClientRect()
		const offsetX = event.clientX - (rect.left + rect.width / 2)
		const offsetY = event.clientY - (rect.top + rect.height / 2)

		x.set(offsetX * strength)
		y.set(offsetY * strength)
	}

	const reset = () => {
		x.set(0)
		y.set(0)
	}

	return (
		<motion.div
			ref={ref}
			className={cn("inline-block", className)}
			style={{ x, y }}
			onMouseMove={handleMove}
			onMouseLeave={reset}
		>
			{children}
		</motion.div>
	)
}

/* ---------------------------------------------------------------
   ScrollProgress — thin reading indicator pinned under the header
   --------------------------------------------------------------- */

export function ScrollProgress() {
	const { scrollYProgress } = useScroll()
	const scaleX = useSpring(scrollYProgress, {
		stiffness: 180,
		damping: 30,
		restDelta: 0.001,
	})

	return (
		<motion.div
			aria-hidden
			style={{ scaleX }}
			className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-primary"
		/>
	)
}
