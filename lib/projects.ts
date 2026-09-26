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
		slug: "bharat",
		title: "Bharat",
		tagline:
			"A read-only API for India's postal directory: PIN lookup, office search and provenance for 155,599 offices.",
		year: "2023–2026",
		role: "Sole developer",
		problem:
			"The official postal directory lives on data.gov.in and can only be downloaded with an API key. The key comes from a sign-up form whose captcha never displays, so no key can be issued and the latest data can't be fetched. The only usable data was my own slightly older 2023 snapshot.",
		constraint:
			"Serve the older data honestly now and be ready for current data the moment the portal works. The official data also has repeated office identities, coordinates outside India and no reliable source date, so the service must never serve a half-imported or silently altered directory.",
		approach:
			"The API ships with the verified 2023 snapshot and makes no claim about its freshness. All writes go through a single fetch command, ready for when a key can be obtained. It validates the complete download before touching anything, then replaces the whole directory and its metadata in one transaction; a failed fetch leaves the current data in service. I kept deliberate limits: one SQLite snapshot in WAL mode so reads continue during a refresh, no accounts, no fuzzy search and no runtime dependency on the upstream API.",
		outcome:
			"A Django REST Framework API with PIN lookup, office search, state and district browsing, and a dataset endpoint that reports source, date and SHA256. OpenAPI docs are generated from the code. The Docker image bundles the 155,599-office 2023 snapshot and runs with no setup. Not yet hosted.",
		stack: [
			"Python",
			"Django",
			"Django REST Framework",
			"SQLite",
			"OpenAPI",
			"Docker",
			"pytest",
		],
		highlights: [
			"Imports are all-or-nothing: exact duplicates collapse, conflicting records fail the fetch and are listed, and empty or short downloads are refused.",
			"Provenance comes from the source itself. Freshness is never invented; an unreported date stays empty.",
			"PINs stay six-character strings and may map to many offices. A PIN lookup is not treated as proof that an address is deliverable.",
			"34 tests run against synthetic API-shaped fixtures and never reach the network, including rollback regressions.",
			"The API key is read only from the environment, so it never appears in process listings.",
		],
		repo: "https://github.com/code-kasha/bharat",
		image: "/bharat.png",
		featured: true,
	},
]

export function getProject(slug: string): Project | undefined {
	return projects.find((project) => project.slug === slug)
}

export function getFeatured(): Project[] {
	const featured = projects.filter((project) => project.featured)
	return featured.length > 0 ? featured : projects
}
