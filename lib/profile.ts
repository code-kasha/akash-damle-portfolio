/**
 * Single source of truth for the facts that appear in more than one place:
 * the site, the one-page résumé and the long CV.
 *
 * These three had drifted apart — the site said 27+ client systems while the
 * résumé said 30+ production applications, and the job title was "Freelance
 * Software Engineer" in one document and "Associate Web Developer" in
 * another. Anything stated as fact about Akash belongs here, and every
 * surface reads from it rather than restating it.
 *
 * Fields marked RESUME ONLY are not rendered on the site. They live here so
 * the documents can be generated from the same data later.
 */

export const identity = {
	name: "Akash Damle",
	/** The one job title. Used everywhere; do not vary it per document. */
	title: "Backend Engineer",
	/** Longer form for the hero and metadata. */
	positioning: "Backend engineer, six years in.",
	location: "Dombivli, India",
	availability: "Available for remote roles",
	/** Shown in the footer and useful on a résumé for remote applications. */
	workingStyle: "Working remotely",
} as const

export const contact = {
	email: "akashdamle07@gmail.com",
	github: "https://github.com/code-kasha",
	linkedin: "https://www.linkedin.com/in/akash-damle-58a808258/",
	site: "https://www.akashdamle.in",
	/** RESUME ONLY. Already public via the linked PDF. */
	phone: "+91 98333 58619",
	/** RESUME ONLY. */
	resumePdf: "/Resume.pdf",
} as const

export const summary =
	"I build the unglamorous parts properly — typed APIs, real test suites, deployments that hold up on a Tuesday afternoon."

/**
 * Every number here has to survive being asked "measured how?".
 *
 * The unverifiable claims that used to sit on both the site and the résumé
 * ("2000+ users", "20-35% performance improvement") are deliberately absent:
 * nothing backs them, and a reviewer who probes one of them discredits the
 * rest. Replacements are traceable — the coverage figure is checkable in the
 * maxread-api repo, the client count comes from the CV's own 27+ CRM
 * deployments.
 */
export const stats = [
	{ value: "100%", label: "Endpoint coverage on my latest API" },
	{ value: "27+", label: "Client systems built and self-hosted" },
	{ value: "6+", label: "Years shipping production code" },
	{ value: "3", label: "Stacks in production: Django, Node, TS" },
] as const

export const skills = [
	{ group: "Backend", items: ["Django", "DRF", "Node.js", "Express", "REST"] },
	{ group: "Languages", items: ["Python", "TypeScript", "JavaScript", "SQL"] },
	{ group: "Data", items: ["PostgreSQL", "MongoDB", "Redis", "Query tuning"] },
	{ group: "Platform", items: ["Docker", "CI/CD", "Linux", "AWS", "Vercel"] },
	{ group: "Quality", items: ["Vitest", "Pytest", "Zod", "OpenAPI"] },
	{ group: "Frontend", items: ["React", "Next.js", "Tailwind", "Redux"] },
] as const

export type Role = {
	/** Display form, e.g. "2021 — Present". */
	period: string
	/** RESUME ONLY. ISO months, so documents can format dates themselves. */
	from: string
	to: string | null
	role: string
	company: string
	description: string
	tags: string[]
}

export const experience: Role[] = [
	{
		period: "2021 — Present",
		from: "2021-03",
		to: null,
		role: "Freelance Software Engineer",
		company: "Independent · Remote",
		description:
			"Design, build and host Django CRM systems for schools, clinics and small businesses. Employee management, payroll, attendance and analytics, running on self-managed Linux servers with ongoing support.",
		tags: ["Django", "PostgreSQL", "Linux", "Self-hosted"],
	},
	{
		period: "2018 — 2021",
		from: "2018-08",
		to: "2021-02",
		role: "Junior Software Developer",
		company: "Matalli Infotech · Dombivli",
		description:
			"Built and maintained internal web applications on Django 2.2 LTS. Wrote unit and database tests, implemented CI/CD pipelines, and managed deployments across AWS and Heroku with minimal downtime.",
		tags: ["Django", "CI/CD", "AWS", "Testing"],
	},
]

/** RESUME ONLY. The short résumé currently omits institution and years. */
export const education = [
	{
		qualification: "B.Sc, Computer Science",
		institution: "P V G's College of Science",
		from: "2014",
		to: "2018",
	},
] as const

/** Flat list for the ticker. */
export const skillTicker = skills.flatMap((group) => group.items)
