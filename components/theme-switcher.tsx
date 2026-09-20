"use client"

import { motion } from "motion/react"
import { Button } from "@/components/ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "@/components/theme-provider"
import { THEMES, type ThemeId } from "@/lib/themes"
import { cn } from "@/lib/utils"

function Swatch({ colors }: { colors: readonly string[] }) {
	return (
		<span className="flex shrink-0 items-center -space-x-1">
			{colors.map((color) => (
				<span
					key={color}
					className="size-3 rounded-full border border-black/15 dark:border-white/15"
					style={{ backgroundColor: color }}
				/>
			))}
		</span>
	)
}

export function ThemeSwitcher() {
	const { theme, setTheme } = useTheme()
	const active = THEMES.find((t) => t.id === theme) ?? THEMES[0]

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="outline"
					size="sm"
					className="h-9 gap-2 rounded-full px-3"
					aria-label={`Change theme. Current theme: ${active.name}`}
				>
					<Swatch colors={active.swatch} />
					<span className="hidden text-xs font-medium sm:inline">
						{active.name}
					</span>
				</Button>
			</DropdownMenuTrigger>

			<DropdownMenuContent align="end" className="w-60">
				<DropdownMenuLabel className="text-xs tracking-wide uppercase">
					Theme
				</DropdownMenuLabel>
				<DropdownMenuSeparator />

				{THEMES.map((t) => {
					const isActive = t.id === theme

					return (
						<DropdownMenuItem
							key={t.id}
							onSelect={() => setTheme(t.id as ThemeId)}
							className="relative gap-3 py-2"
						>
							{isActive && (
								<motion.span
									layoutId="theme-active"
									className="absolute inset-0 rounded-sm bg-primary/10"
									transition={{
										type: "spring",
										stiffness: 380,
										damping: 32,
									}}
								/>
							)}
							<Swatch colors={t.swatch} />
							<span className="relative flex flex-col gap-0.5">
								<span
									className={cn(
										"text-sm leading-none",
										isActive && "font-semibold",
									)}
								>
									{t.name}
								</span>
								<span className="text-muted-foreground text-[0.7rem] leading-tight">
									{t.blurb}
								</span>
							</span>
						</DropdownMenuItem>
					)
				})}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
