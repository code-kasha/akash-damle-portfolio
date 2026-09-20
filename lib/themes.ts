export const THEMES = [
	{
		id: "editorial",
		name: "Editorial",
		blurb: "Bone canvas, ink type, terracotta",
		swatch: ["#FAF7F2", "#C4552D", "#14100C"],
	},
	{
		id: "electric",
		name: "Electric",
		blurb: "Deep violet with magenta bloom",
		swatch: ["#0A0118", "#A855F7", "#EC4899"],
	},
	{
		id: "acid",
		name: "Acid",
		blurb: "Brutalist monochrome, lime accent",
		swatch: ["#000000", "#CCFF00", "#FFFFFF"],
	},
	{
		id: "nordic",
		name: "Nordic",
		blurb: "Paper, slate, sage and ochre",
		swatch: ["#F4F3F0", "#6B8A7A", "#B08C4F"],
	},
] as const

export type ThemeId = (typeof THEMES)[number]["id"]

export const DEFAULT_THEME: ThemeId = "editorial"

export const THEME_IDS = THEMES.map((t) => t.id) as readonly ThemeId[]

export const THEME_STORAGE_KEY = "ad-theme"

/**
 * Runs before paint, inlined in <head>, so the stored theme is applied
 * before first paint rather than flashing the default.
 */
export const THEME_INIT_SCRIPT = `
(function(){
	try {
		var k = ${JSON.stringify(THEME_STORAGE_KEY)};
		var allowed = ${JSON.stringify(THEME_IDS)};
		var t = localStorage.getItem(k);
		if (allowed.indexOf(t) === -1) t = ${JSON.stringify(DEFAULT_THEME)};
		document.documentElement.setAttribute("data-theme", t);
	} catch (e) {
		document.documentElement.setAttribute("data-theme", ${JSON.stringify(DEFAULT_THEME)});
	}
})();
`.trim()
