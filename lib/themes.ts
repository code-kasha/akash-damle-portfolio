export const THEMES = [
	{ id: "light", name: "Light", palette: "Nordic — paper, slate, sage" },
	{ id: "dark", name: "Dark", palette: "Acid — black, white, lime" },
] as const

export type ThemeId = (typeof THEMES)[number]["id"]

export const THEME_IDS = THEMES.map((t) => t.id) as readonly ThemeId[]

/** Used for SSR and whenever the visitor has no stored preference. */
export const DEFAULT_THEME: ThemeId = "dark"

export const THEME_STORAGE_KEY = "ad-theme"

/** The icon link this app owns and keeps in step with the active theme. */
export const THEME_ICON_ID = "theme-icon"

export const THEME_ICON_HREF: Record<ThemeId, string> = {
	light: "/icon-light.svg",
	dark: "/icon-dark.svg",
}

/**
 * Point the favicon at the active theme.
 *
 * This has to be done in script rather than with `media` on the link,
 * because `media` resolves prefers-color-scheme — the OS setting — while
 * the site's theme can be an explicit stored override. Keying the icon off
 * the OS leaves a dark icon above a light page whenever the two disagree.
 */
export function syncThemeIcon(theme: ThemeId) {
	if (typeof document === "undefined") return

	let link = document.getElementById(
		THEME_ICON_ID,
	) as HTMLLinkElement | null

	if (!link) {
		link = document.createElement("link")
		link.id = THEME_ICON_ID
		link.rel = "icon"
		link.type = "image/svg+xml"
		document.head.appendChild(link)
	}

	link.href = THEME_ICON_HREF[theme]
}

/**
 * Runs before paint, inlined in <head>, so both the theme and its icon are
 * settled before the first frame rather than flashing the default.
 *
 * Order of precedence: a stored choice wins; otherwise the OS setting; and
 * DEFAULT_THEME only if neither is available.
 */
export const THEME_INIT_SCRIPT = `
(function(){
	var t = ${JSON.stringify(DEFAULT_THEME)};
	try {
		var stored = localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)});
		t = (stored === "light" || stored === "dark")
			? stored
			: (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
	} catch (e) {}
	document.documentElement.setAttribute("data-theme", t);
	try {
		var id = ${JSON.stringify(THEME_ICON_ID)};
		var l = document.getElementById(id);
		if (!l) {
			l = document.createElement("link");
			l.id = id;
			l.rel = "icon";
			l.type = "image/svg+xml";
			document.head.appendChild(l);
		}
		l.href = t === "light" ? "/icon-light.svg" : "/icon-dark.svg";
	} catch (e) {}
})();
`.trim()
