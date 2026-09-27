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
	/**
	 * RESUME ONLY. Which `highlights`, by index, the one-page résumé shows.
	 * The long résumé shows them all.
	 */
	resumeHighlights?: number[]
}

/**
 * Projects, strongest first.
 *
 * The shape is deliberately narrative — problem / constraint / approach /
 * outcome — rather than a feature list, because that is what a hiring
 * reviewer actually reads. Add an entry here and both the landing grid and
 * its /projects/<slug> page are generated from it.
 *
 * The one-page résumé lists only the first two (see ONE_PAGE_PROJECTS in
 * scripts/build-resumes.mjs); the long résumé lists them all.
 */
export const projects: Project[] = [
	{
		slug: "lead-platform",
		title: "Lead Management Platform",
		tagline:
			"A Django REST API that moves sales leads through a validated pipeline and records every change on a timeline, with a React and TypeScript app whose types come from the API's schema.",
		year: "2026",
		role: "Sole developer",
		problem:
			"A sales team needs one place to capture leads, hand them to the right person and see what happened to each one. Leads also arrive from a public website form, where no one is signed in and anyone can send them.",
		constraint:
			"It began as a qualification task built to a short deadline, in two days in July 2026. That version worked but had gaps a reviewer would find quickly: the test suite didn't run, there was no CI, the browser app didn't refresh expired tokens, and the demo link was dead. The rules had to hold on the server whatever the client sends: a member must not see or change another member's leads, and a lead's status can only move along the pipeline.",
		approach:
			"Business rules live in one service layer. Each service is a single transaction and the only code that writes the activity timeline, so a change and its record are saved together or not at all. Allowed status changes are one mapping, and status can only change through its own endpoint. The lead queryset itself is filtered by role, so a member asking for someone else's lead gets 404 rather than learning it exists. The API is built schema-first: drf-spectacular generates the OpenAPI schema, the React app's TypeScript types are generated from it, and CI fails if either committed copy goes stale. In September I brought it to a finished release: a working test suite, CI, a single-flight token refresh in the browser, production settings that refuse to start when misconfigured, and one Docker image serving the API, admin and app.",
		outcome:
			"Released as v1.0.0 on 26 September 2026, complete and free to fork under the MIT licence. The API covers leads, assignment, a validated status pipeline, notes, an automatic timeline and a rate-limited public enquiry form, with OpenAPI docs. A Docker image for amd64 and arm64 is published to the GitHub Container Registry. A live demo runs on Render's free tier with Neon Postgres until 26 December 2026.",
		stack: [
			"Python",
			"Django",
			"Django REST Framework",
			"PostgreSQL",
			"OpenAPI",
			"React",
			"TypeScript",
			"TanStack Query",
			"Docker",
			"GitHub Actions",
			"pytest",
			"Vitest",
		],
		highlights: [
			"The status pipeline (New, Contacted, Qualified, Proposal, Won or Lost) is enforced in one service function; a blocked change returns 400 with the reason.",
			"Every create, edit, status change, assignment and note is written to the timeline in the same transaction as the change.",
			"Admins manage every lead; members see and work on only the leads they created or are assigned to, and anything else returns 404.",
			"Access tokens last 15 minutes; refresh tokens rotate on every use and are blacklisted after use or on logout. The browser shares one refresh across every request waiting on it, because a rotated token works only once.",
			"99 backend and 74 frontend tests. CI also runs flake8, a missing-migrations check, the stale-schema and stale-types check, and a Docker build with a smoke test of the running container.",
		],
		repo: "https://github.com/code-kasha/lead-platform",
		demo: "https://lead-platform-c3mw.onrender.com/",
		image: "/lead-platform.png",
		cover: "/lead-platform-social.png",
		featured: true,
		resumeHighlights: [2, 4],
	},
	{
		slug: "operations-api",
		title: "Operations API",
		tagline:
			"A Django REST API for the staff side of a small organisation: staff and roles, shifts and attendance, leave, office timesheets and overtime, working-day payroll and reports, built from scratch with fictional data.",
		year: "2026",
		role: "Sole developer",
		problem:
			"Schools, clinics and small offices share the same staff paperwork: who works when, who is away, whose overtime was approved and what each person is paid this month. I have built systems like this for clients, but that code is private, so nothing public showed how I build them.",
		constraint:
			"Everything had to be fictional and say so: no client data, no patient records, and no statutory payroll compliance claimed without building it. Pay is where mistakes cost most, so the rules had to hold on the server whatever a client sends. A manager must not see another department's staff, and nobody approves their own leave or overtime. The same overtime must never be paid twice, and a finished pay run must never change. It also had to ship as a finished release that a reviewer can try in a minute.",
		approach:
			"One installation serves one organisation, with a shared core and a module per sector; the first release ships the core with the office module. Every write goes from view to serializer to service. Services recheck permissions, lock what they change, and save the record and its audit entry in one transaction; querysets are filtered by role, so hidden records return 404. Payroll pro-rates by working days: base pay times payable days over the month's standard working days, with absences and unpaid leave as loss of pay. Overtime is paid at a multiplier or a flat rate chosen per salary structure. Each approved request links to exactly one payslip, and a locked run keeps a snapshot of every input. One shared rule classifies each shift, so attendance, payroll and reports cannot disagree. Tests and CI use SQLite by decision; I verified the production image against PostgreSQL 17, which caught a PostgreSQL-only bug before release.",
		outcome:
			"Released as v1.0.0 on 27 September 2026, complete and free to fork under the MIT licence: 73 documented API operations with Swagger UI and ReDoc. A Docker image for amd64 and arm64 is published to the GitHub Container Registry. A live demo runs on Render's free tier with Neon Postgres until 27 December 2026, with published demo accounts, and resets to fresh fictional data whenever it restarts.",
		stack: [
			"Python",
			"Django",
			"Django REST Framework",
			"PostgreSQL",
			"OpenAPI",
			"Docker",
			"GitHub Actions",
			"pytest",
		],
		highlights: [
			"Four business roles (operations admin, HR, manager and employee) follow a documented permission matrix. Managers see their department and employees see themselves; anything else returns 404, and nobody reviews their own leave, timesheet or overtime.",
			"Payroll pro-rates base pay by working days for joiners, leavers, absences and unpaid leave, rounds half-up to the paisa, pays each approved overtime request exactly once and locks finished pay runs. It calculates gross pay only and claims no statutory compliance.",
			"Monthly attendance summary, payroll register and headcount reports reuse each module's role-scoped querysets, so a report never shows what its reader could not open.",
			"One command loads a fictional office with a month of history and a locked pay run, all or nothing. The public demo resets to it on every start, and the reset refuses to run anywhere else.",
			"346 tests, also run once against PostgreSQL 17. CI checks lint, formatting, missing migrations and a stale OpenAPI schema, smoke-tests the Docker image, publishes releases from tags and redeploys the demo after each push.",
		],
		repo: "https://github.com/code-kasha/operations-api",
		demo: "https://operations-api-ji51.onrender.com/",
		image: "/operations-api.png",
		cover: "/operations-api-social.png",
		featured: true,
		resumeHighlights: [1],
	},
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
		resumeHighlights: [1, 0],
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
