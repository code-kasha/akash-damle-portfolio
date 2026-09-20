"use client"

import { motion } from "motion/react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme-provider"

function SunIcon() {
	return (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.8"
			strokeLinecap="round"
			className="size-4"
			aria-hidden
		>
			<circle cx="12" cy="12" r="4.2" />
			<path d="M12 2.6v2.1M12 19.3v2.1M4.24 4.24l1.48 1.48M18.28 18.28l1.48 1.48M2.6 12h2.1M19.3 12h2.1M4.24 19.76l1.48-1.48M18.28 5.72l1.48-1.48" />
		</svg>
	)
}

function MoonIcon() {
	return (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.8"
			strokeLinecap="round"
			strokeLinejoin="round"
			className="size-4"
			aria-hidden
		>
			<path d="M20.5 14.2A8.4 8.4 0 1 1 9.8 3.5a6.6 6.6 0 0 0 10.7 10.7Z" />
		</svg>
	)
}

export function ThemeToggle() {
	const { theme, toggleTheme } = useTheme()
	const isDark = theme === "dark"

	return (
		<Button
			variant="outline"
			size="icon"
			onClick={toggleTheme}
			aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
			title={`Switch to ${isDark ? "light" : "dark"} theme`}
			className="relative size-9 overflow-hidden rounded-full"
		>
			<motion.span
				key={theme}
				initial={{ y: isDark ? -14 : 14, opacity: 0, rotate: isDark ? -60 : 60 }}
				animate={{ y: 0, opacity: 1, rotate: 0 }}
				transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
				className="flex items-center justify-center"
			>
				{isDark ? <MoonIcon /> : <SunIcon />}
			</motion.span>
		</Button>
	)
}
