export const THEMES = [
	{ id: "light", name: "Light", palette: "Nordic — paper, slate, sage" },
	{ id: "dark", name: "Dark", palette: "Acid — black, white, lime" },
] as const

export type ThemeId = (typeof THEMES)[number]["id"]

export const THEME_IDS = THEMES.map((t) => t.id) as readonly ThemeId[]

/** Used for SSR and whenever the visitor has no stored preference. */
export const DEFAULT_THEME: ThemeId = "dark"

export const THEME_STORAGE_KEY = "ad-theme"

/**
 * Runs before paint, inlined in <head>, so the resolved theme is applied
 * before first paint rather than flashing the default.
 *
 * Order of precedence: a stored choice wins; otherwise the OS setting; and
 * DEFAULT_THEME only if neither is available.
 */
export const THEME_INIT_SCRIPT = `
(function(){
	try {
		var stored = localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)});
		var t = (stored === "light" || stored === "dark")
			? stored
			: (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
		document.documentElement.setAttribute("data-theme", t);
	} catch (e) {
		document.documentElement.setAttribute("data-theme", ${JSON.stringify(DEFAULT_THEME)});
	}
})();
`.trim()
