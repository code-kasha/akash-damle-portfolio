export type Project = {
	slug: string
	title: string
	tagline: string
	year: string
	role: string
	/** One-line framing of the problem the project solves. */
	problem: string
	/** The constraint that shaped the design. */
	constraint: string
	/** The tradeoff made, and why. */
	approach: string
	/** What shipped, stated concretely. */
	outcome: string
	stack: string[]
	highlights: string[]
	repo?: string
	demo?: string
	image?: string
	/** 2:1 article image for the write-up page and its share card; `image` is used when absent. */
	cover?: string
	featured?: boolean
}

/**
 * Projects, strongest first.
 *
 * The shape is deliberately narrative — problem / constraint / approach /
 * outcome — rather than a feature list, because that is what a hiring
 * reviewer actually reads. Add an entry here and both the landing grid and
 * its /projects/<slug> page are generated from it.
 */
export const projects: Project[] = [
	{
		slug: "bharat-post-dir",
		title: "bharat-post-dir",
		tagline:
			"India's postal directory as a lookup page, a JSON API and a one-file download: 155,599 offices, with every page stating where the data came from.",
		year: "2023–2026",
		role: "Sole developer",
		problem:
			"The official postal directory lives on data.gov.in and can only be downloaded with an API key. The key comes from a sign-up form whose captcha never displays, so no key can be issued and the latest data can't be fetched. The only usable data was my own slightly older 2023 snapshot.",
		constraint:
			"Serve the older data honestly now and be ready for current data the moment the portal works. Government data lists some offices more than once, has coordinates outside India and no reliable source date, so the service must never serve a half-imported or silently altered directory. It also had to ship as a finished release that anyone can run, fork or host without me maintaining it.",
		approach:
			"The directory ships inside the repository as the verified 2023 snapshot, and every page and the API state its source, date and SHA256 without claiming freshness. Every import, whether the data.gov.in fetch or an uploaded CSV or JSON file, is validated in full before anything changes, then replaces the directory and its metadata in one transaction. Offices listed more than once are kept and counted, because government data can list an office twice legitimately. I kept deliberate limits: SQLite in WAL mode, no accounts, no JavaScript on the lookup page, and no runtime dependency on the upstream portal.",
		outcome:
			"Released as v1.0.0 on 26 September 2026, complete and free to fork: a server-rendered lookup page, a read-only JSON API with OpenAPI docs, and the whole directory as one 1.4 MB gzipped download. The release ships the database and the export, and a public Docker image for amd64 and arm64. A live demo runs on Render's free tier until 26 December 2026, redeployed by CI after every push to main.",
		stack: [
			"Python",
			"Django",
			"Django REST Framework",
			"SQLite",
			"OpenAPI",
			"Docker",
			"GitHub Actions",
			"pytest",
		],
		highlights: [
			"The lookup page costs one HTTP request and three database queries: inline CSS, no JavaScript, fonts or images. It works by keyboard and screen reader, in light and dark, and on phones.",
			"Imports are all-or-nothing. A short download is refused, identical rows merge, and offices listed more than once are kept and reported, never silently dropped.",
			"The whole-directory download is versioned by its SHA256 and sent with an ETag, so an unchanged directory is never downloaded twice.",
			"Anyone can load their own dataset. On a local clone an upload is temporary and private to one browser; in contributor mode it replaces the database and explains how to share it back. The hosted demo turns this off.",
			"CI deploys each push to main and waits until the demo's health check reports the new commit. 119 tests run against synthetic fixtures and never reach the network.",
		],
		repo: "https://github.com/code-kasha/bharat-post-dir",
		demo: "https://bharat-post-dir.onrender.com/",
		image: "/bharat-post-dir.png",
		cover: "/bharat-post-dir-social.png",
		featured: true,
	},
]

/** A product still being built, so there is nothing to write up yet. */
export type UpcomingProject = {
	slug: string
	title: string
	tagline: string
	/** Where it stands, stated plainly. */
	status: string
}

/**
 * Work in progress, shown ahead of the finished projects. These get a card
 * but no /projects/<slug> page or sitemap entry until they ship.
 */
export const upcoming: UpcomingProject[] = [
	{
		slug: "crm",
		title: "CRM",
		tagline:
			"A CRM that arrives already set up for how your business works — sales, agency, real estate or field services — instead of making you configure it first.",
		status: "In research and planning",
	},
]

export function getProject(slug: string): Project | undefined {
	return projects.find((project) => project.slug === slug)
}

export function getFeatured(): Project[] {
	const featured = projects.filter((project) => project.featured)
	return featured.length > 0 ? featured : projects
}
