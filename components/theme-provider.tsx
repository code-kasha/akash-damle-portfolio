"use client"

import * as React from "react"
import {
	DEFAULT_THEME,
	THEME_IDS,
	THEME_STORAGE_KEY,
	type ThemeId,
} from "@/lib/themes"

const THEME_EVENT = "ad-themechange"

/**
 * The live theme lives on <html data-theme>, written by the pre-paint script
 * in the document head before React ever runs. Treating that attribute as an
 * external store — rather than mirroring it into state inside an effect —
 * keeps the server snapshot and the hydrated snapshot honest, and means a
 * switch only ever has one source of truth.
 */
function subscribe(onChange: () => void) {
	window.addEventListener(THEME_EVENT, onChange)

	// Also catch a switch made in another tab.
	const onStorage = (event: StorageEvent) => {
		if (event.key !== THEME_STORAGE_KEY || !event.newValue) return

		const next = event.newValue as ThemeId
		if (!THEME_IDS.includes(next)) return

		document.documentElement.setAttribute("data-theme", next)
		onChange()
	}

	window.addEventListener("storage", onStorage)

	return () => {
		window.removeEventListener(THEME_EVENT, onChange)
		window.removeEventListener("storage", onStorage)
	}
}

function getSnapshot(): ThemeId {
	const applied = document.documentElement.getAttribute(
		"data-theme",
	) as ThemeId | null

	return applied && THEME_IDS.includes(applied) ? applied : DEFAULT_THEME
}

function getServerSnapshot(): ThemeId {
	return DEFAULT_THEME
}

type ThemeContextValue = {
	theme: ThemeId
	setTheme: (theme: ThemeId) => void
}

const ThemeContext = React.createContext<ThemeContextValue | null>(null)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
	const theme = React.useSyncExternalStore(
		subscribe,
		getSnapshot,
		getServerSnapshot,
	)

	const setTheme = React.useCallback((next: ThemeId) => {
		const root = document.documentElement

		// Opt into the cross-fade only for a deliberate switch, so it never
		// fires on first paint or against a reduced-motion preference.
		const reduced = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches

		if (!reduced) {
			root.classList.add("theme-transition")
			window.setTimeout(() => root.classList.remove("theme-transition"), 450)
		}

		root.setAttribute("data-theme", next)

		try {
			localStorage.setItem(THEME_STORAGE_KEY, next)
		} catch {
			// Storage can be unavailable (private mode, blocked cookies).
			// The theme still applies for this session.
		}

		window.dispatchEvent(new Event(THEME_EVENT))
	}, [])

	const value = React.useMemo(() => ({ theme, setTheme }), [theme, setTheme])

	return <ThemeContext value={value}>{children}</ThemeContext>
}

export function useTheme() {
	const ctx = React.useContext(ThemeContext)

	if (!ctx) {
		throw new Error("useTheme must be used within a ThemeProvider")
	}

	return ctx
}
