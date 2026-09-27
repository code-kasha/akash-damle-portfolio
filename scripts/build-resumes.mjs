/**
 * Generates public/Resume.pdf (one page) and public/Resume(Long).pdf from
 * lib/profile.ts and lib/projects.ts, so the résumés say exactly what the
 * site says. Run with `pnpm resume`; needs Chrome or Edge installed (set
 * CHROME_PATH if it is somewhere unusual).
 */
import { execFileSync } from "node:child_process"
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { basename, join, resolve } from "node:path"
import { pathToFileURL } from "node:url"

import {
	certifications,
	contact,
	education,
	experience,
	identity,
	resumeSummary,
	skills,
} from "../lib/profile.ts"
import { projects, upcoming } from "../lib/projects.ts"

const ROOT = resolve(import.meta.dirname, "..")
const OUT = {
	short: join(ROOT, "public", contact.resumePdf),
	long: join(ROOT, "public", contact.resumeLongPdf),
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

/** HTML-escape a string. */
const esc = (text) =>
	String(text).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c])

/** "https://github.com/x" → "github.com/x", for printed links. */
const bare = (url) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")

const link = (url, label = bare(url)) => `<a href="${esc(url)}">${esc(label)}</a>`

/** "2021-03" → "Mar 2021"; null → "Present". */
const month = (iso) => {
	if (!iso) return "Present"
	const [y, m] = iso.split("-").map(Number)
	return `${MONTHS[m - 1]} ${y}`
}

/** Inclusive length of a role, e.g. "5 yr 7 mo". */
const duration = (from, to) => {
	const [fy, fm] = from.split("-").map(Number)
	const end = to ? to.split("-").map(Number) : [new Date().getFullYear(), new Date().getMonth() + 1]
	const total = (end[0] - fy) * 12 + (end[1] - fm) + 1
	const years = Math.floor(total / 12)
	const months = total % 12
	return [years && `${years} yr`, months && `${months} mo`].filter(Boolean).join(" ")
}

const bullets = (items) => `<ul>${items.map((item) => `<li>${esc(item)}</li>`).join("")}</ul>`

/**
 * A titled section. `parts` may be one string or a list of entries; the
 * heading is kept on the same page as the first entry.
 */
const section = (title, parts) => {
	const [first, ...rest] = Array.isArray(parts) ? parts : [parts]
	return `<section><div class="keep"><h2>${esc(title)}</h2>${first}</div>${rest.join("")}</section>`
}

function header() {
	const reach = [
		`<a href="mailto:${esc(contact.email)}">${esc(contact.email)}</a>`,
		esc(contact.phone),
	]
	const links = [link(contact.site), link(contact.github), link(contact.linkedin)]
	return `<header>
		<div class="name-row">
			<h1>${esc(identity.name)}</h1>
			<p class="title">${esc(identity.title)}</p>
		</div>
		<div class="name-row meta">
			<span>${esc(identity.location)} · Open to remote roles</span>
			<span class="contact">${reach.join('<span class="dot">·</span>')}</span>
		</div>
		<p class="contact">${links.join('<span class="dot">·</span>')}</p>
	</header>`
}

function experienceSection(long) {
	const roles = experience.map((role) => {
		const dates = `${month(role.from)} – ${month(role.to)}${long ? ` · ${duration(role.from, role.to)}` : ""}`
		return `<article>
			<div class="row"><h3>${esc(role.role)} <span class="at">${esc(role.company)}</span></h3><span class="when">${esc(dates)}</span></div>
			${long && role.intro ? `<p class="lede">${esc(role.intro)}</p>` : ""}
			${bullets(long ? role.details : role.highlights)}
			${long ? `<p class="stack">${role.stack.map(esc).join(" · ")}</p>` : ""}
		</article>`
	})
	return section("Experience", roles)
}

/** The one-page résumé has room for this many projects: the first ones, strongest first. */
const ONE_PAGE_PROJECTS = 2

function projectsSection(long) {
	const listed = long ? projects : projects.slice(0, ONE_PAGE_PROJECTS)
	const shipped = listed.map((project) => {
		const picks = project.resumeHighlights ?? [0, 1]
		const highlights = long ? project.highlights : picks.map((i) => project.highlights[i])
		const links = [
			project.repo && link(project.repo),
			project.demo && link(project.demo, "Live demo"),
			link(new URL(`/projects/${project.slug}`, contact.site).href, "Write-up"),
		].filter(Boolean)
		const stack = long ? project.stack : project.stack.slice(0, 7)
		return `<article>
			<div class="row"><h3>${esc(project.title)}</h3><span class="when">${esc(project.year)}</span></div>
			<p class="links">${links.join('<span class="dot">·</span>')}</p>
			<p class="lede">${esc(project.tagline)}</p>
			${bullets(highlights)}
			<p class="stack">${stack.map(esc).join(" · ")}</p>
		</article>`
	})
	const coming = upcoming.map(
		(project) => `<article class="upcoming">
			<div class="row"><h3>${esc(project.title)} <span class="badge">${esc(project.status)}</span></h3></div>
			<p class="lede">${esc(project.tagline)}</p>
		</article>`,
	)
	return section("Selected Projects", [...shipped, ...coming])
}

function skillsSection() {
	const rows = skills
		.map((group) => `<div class="skill"><dt>${esc(group.group)}</dt><dd>${group.items.map(esc).join(" · ")}</dd></div>`)
		.join("")
	return section("Skills", `<dl class="skills">${rows}</dl>`)
}

function educationSection(long) {
	const degrees = education
		.map(
			(item) =>
				`<div class="row"><h3>${esc(item.qualification)} <span class="at">${esc(item.institution)}</span></h3><span class="when">${esc(item.from)} – ${esc(item.to)}</span></div>`,
		)
		.join("")
	if (!long) return section("Education", degrees)
	const courses = certifications.map(
		(item) =>
			`<div class="row cert"><span>${esc(item.course)} <span class="at">${esc(item.provider)}</span></span><span class="when">${esc(item.period)}</span></div>`,
	)
	return section("Education", degrees) + section("Training and Certifications", courses)
}

/** The PDF viewer shows the document title, so it is the file name. */
function page(long) {
	const summary = long ? resumeSummary.long : [resumeSummary.short]
	return `<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<title>${esc(basename(long ? contact.resumeLongPdf : contact.resumePdf))}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Geist+Mono:wght@400;500;600&display=block" rel="stylesheet">
<style>${readFileSync(join(import.meta.dirname, "resume.css"), "utf8")}</style>
</head><body class="${long ? "long" : "short"}">
${header()}
${section("Summary", summary.map((p) => `<p>${esc(p)}</p>`).join(""))}
${experienceSection(long)}
${projectsSection(long)}
${skillsSection()}
${educationSection(long)}
</body></html>`
}

function findChrome() {
	const candidates = [
		process.env.CHROME_PATH,
		"C:/Program Files/Google/Chrome/Application/chrome.exe",
		"C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
		"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
		"/usr/bin/google-chrome",
		"/usr/bin/chromium",
	].filter(Boolean)
	const found = candidates.find((path) => existsSync(path))
	if (!found) throw new Error("Chrome or Edge not found; set CHROME_PATH.")
	return found
}

/** Counts pages in a Chrome-generated PDF. */
const pageCount = (pdf) => (readFileSync(pdf, "latin1").match(/\/Type\s*\/Page\b/g) ?? []).length

const chrome = findChrome()
const work = mkdtempSync(join(tmpdir(), "resume-"))
try {
	for (const kind of ["short", "long"]) {
		const html = join(work, `${kind}.html`)
		writeFileSync(html, page(kind === "long"))
		execFileSync(chrome, [
			"--headless=new",
			"--disable-gpu",
			"--no-pdf-header-footer",
			"--virtual-time-budget=10000",
			`--print-to-pdf=${OUT[kind]}`,
			pathToFileURL(html).href,
		], { stdio: "ignore" })
		const pages = pageCount(OUT[kind])
		console.log(`${kind}: ${OUT[kind]} (${pages} page${pages === 1 ? "" : "s"})`)
		if (kind === "short" && pages !== 1) {
			process.exitCode = 1
			console.error("The one-page résumé runs to more than one page; shorten it.")
		}
	}
} finally {
	// `--keep` leaves the HTML behind for checking the layout in a browser.
	if (process.argv.includes("--keep")) console.log(`HTML kept in ${work}`)
	else rmSync(work, { recursive: true, force: true })
}
