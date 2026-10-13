export type Project = {
	slug: string
	title: string
	/** The project's part in the ecosystem, shown as a label on its card. */
	part: string
	/** One sentence on what is unique to this project. */
	tagline: string
	/**
	 * RESUME ONLY. The résumé lede, when it should name the kind of thing the
	 * project is ("Django REST API: …"). Falls back to `tagline`.
	 */
	resumeTagline?: string
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
	/** Real interface capture displayed without cropping on the project page. */
	screenshot?: {
		src: string
		width: number
		height: number
		alt: string
	}
	/** 2:1 graphic for the project card and social preview. */
	cover?: string
	featured?: boolean
	/**
	 * RESUME ONLY. Which `highlights`, by index, the one-page résumé shows.
	 * The long résumé shows them all.
	 */
	resumeHighlights?: number[]
}

/**
 * Projects in display order: the foundation first, then each part of the ecosystem.
 *
 * The shape is deliberately narrative — problem / constraint / approach /
 * outcome — rather than a feature list, because that is what a hiring
 * reviewer actually reads. Add an entry here and both the landing grid and
 * its /projects/<slug> page are generated from it.
 *
 * The one-page résumé lists only the projects named in ONE_PAGE_PROJECTS
 * (scripts/build-resumes.mjs); the long résumé lists them all, in this order.
 */
export const projects: Project[] = [
	{
		slug: "rootstock",
		title: "Rootstock",
		part: "Foundation",
		tagline:
			"A Django starter with accounts, settings and deploy files done, where every feature can be pruned in one verified commit.",
		year: "2026",
		role: "Developer, with Claude as an AI co-author",
		problem:
			"Every Django project I start repeats the same first week: a custom user, email verification, settings that differ per environment, a base layout, deploy files and tests. Starter templates either include everything forever or generate a project once and can't be updated afterwards. I wanted one starter for my own projects, from an API on a VPS to a site on shared hosting.",
		constraint:
			"Code that a project doesn't use should not exist in it: no runtime feature flags and no dead imports. A project must still be able to take later improvements from the starter. Shared hosts often offer only Python 3.11 to 3.13 under Passenger with no Docker, while the main target is Django 6.1 on the latest Python. Everything had to work on Windows as well as Linux and macOS.",
		approach:
			"One inclusive repository, not a generator; Copier, branches per feature and runtime flags were all rejected. A features.toml manifest declares, for each of 23 features, the files, tests, docs, Poetry dependency group and environment variables it owns. Core code never imports a feature: settings fragments, URLs and middleware are discovered from feature folders, and the few lines that must live in shared files are fenced with marker comments. scripts/prune deletes a feature or a preset, strips its marked blocks, then formats, lints, runs Django's checks and the remaining tests before making one commit. scripts/sync-rootstock merges new upstream work and re-prunes what the project removed. Business rules sit in one service layer under thin DRF and Django Ninja adapters that share one error envelope, rate limiting and a merged OpenAPI 3.1 document.",
		outcome:
			"Version 0.1.0, in early development and MIT licensed; the repository is private for now. More than 1,200 tests with 98 percent line coverage of src. A 47-job GitHub Actions workflow runs the suite on Linux and Windows for Python 3.12 to 3.14, every preset, every feature pruned with its dependents, and PostgreSQL, MySQL and MariaDB servers. A compatibility workflow passed all 18 combinations of Django 6.1 and 5.2 across Python versions on Linux, Windows and macOS. The Docker image has been built and probed; deploy files for Fly.io and Railway exist but have not yet been used on a live account.",
		stack: [
			"Python",
			"Django",
			"django-allauth",
			"Django REST Framework",
			"Django Ninja",
			"OpenAPI",
			"HTMX",
			"Tailwind CSS",
			"Celery",
			"PostgreSQL",
			"MySQL",
			"Docker",
			"Poetry",
			"GitHub Actions",
			"pytest",
		],
		highlights: [
			"Twenty-three removable features and four presets (full, shared, api-only and minimal). Pruning is dry-run by default, needs a clean git tree, checks feature dependencies and is deliberately one-way.",
			"CI prunes every feature and preset and runs what remains. Doing that before the first push found seven defects, including a service worker that precached a stylesheet a prune had removed.",
			"Accounts use django-allauth with a UUID email user and required verification, as HTML pages and headless JSON. Hosted settings refuse to start without a secret key, allowed hosts, admin URL, database URL or email provider.",
			"A Django 5.2 LTS preset for shared hosting, with a Passenger upload bundle and a standard-library host probe that reports what a host can run before anything is installed.",
			"Every class and function has a docstring and no two are identical, enforced by a pre-commit check; a pre-push hook fails below 90 percent coverage.",
		],
		screenshot: {
			src: "/rootstock.png",
			width: 1280,
			height: 800,
			alt: "The sign-in page of a new Rootstock project, captured from the development server",
		},
		cover: "/rootstock-social.png",
		featured: true,
		resumeHighlights: [0, 1],
	},
	{
		slug: "promeet-desk",
		title: "Pro Meet Desk",
		part: "Bookings",
		tagline:
			"Guests book without an account, PostgreSQL rules out double booking, and private notes never leave the professional.",
		resumeTagline:
			"Django booking app: guests book without an account, PostgreSQL rules out double booking, and private notes never leave the professional.",
		year: "2026",
		role: "Developer, with Claude as an AI pair programmer",
		problem:
			"Doctors, consultants, engineers and other professionals take appointments from people who will not create an account to book one. After the meeting they keep notes that are among the most private data they hold. I wanted to prove the core loop for an India-first product: publish services and hours, let a visitor book a slot, approve, move or cancel it, and record notes afterwards.",
		constraint:
			"Correct booking and privacy mattered more than breadth. Two guests can press Book on the same slot at the same moment, and an application-level check cannot settle that. A street address or meeting link must not reach a guest before the booking is confirmed, and meeting notes must never reach a client page, an email or the Django admin. It was built as a demonstration with fictional data, so every step towards real use had to be stated rather than implied.",
		approach:
			"PostgreSQL holds the final guarantee: an exclusion constraint on each professional's time ranges rejects overlapping pending or confirmed appointments, and writes that claim time queue behind a per-professional advisory lock, with a bounded retry if the database still aborts one. Slots come from a pure, table-driven generator that handles time zones and DST. Every owner query goes through a manager scoped to the signed-in user, so another professional's data returns 404. A privacy test plants a canary string in every private field and checks every page, email and admin search. Later versions added an append-only audit trail enforced by a database trigger, field encryption with key rotation and a blind index for lookups, verified guest emails, retention, export and erasure. The frontend is server-rendered with Tailwind and HTMX, and runs without Node.",
		outcome:
			"Closed at version 0.6.0 on 13 October 2026 as a demonstration; the repository is private. 589 tests pass against PostgreSQL. It includes demo-scope versions of a calendar feed, generated video rooms, passwordless client links, SMS reminders, payment records and assistants. Deployment runbooks for a VM, cPanel and Render with Neon are written but not yet run on a live host, and the privacy wording has not had legal review.",
		stack: [
			"Python",
			"Django",
			"PostgreSQL",
			"HTMX",
			"Tailwind CSS",
			"cryptography",
			"Brevo",
			"Poetry",
			"pytest",
		],
		highlights: [
			"Double booking is impossible at the database: a btree_gist exclusion constraint, a per-professional advisory lock and threaded tests of simultaneous bookings and moves.",
			"Guests see only an area label until a booking is confirmed; the full address and meeting link arrive with the confirmation. A canary-string test checks that notes never reach any client-facing page, email or the admin.",
			"Client names, contact details, messages, addresses and notes are encrypted at rest with rotatable keys; clients are matched by a keyed hash of their email.",
			"An append-only audit trail, versioned consent, verified guest emails, and retention, export and erasure flows, at demo scope with the remaining legal work listed.",
			"Assistants can manage appointments and payments but never read notes; owner-only pages answer them with 403.",
		],
		screenshot: {
			src: "/promeet-desk.png",
			width: 1280,
			height: 800,
			alt: "Pro Meet Desk booking page with a day picker, time slots and the guest details form, using fictional demo data",
		},
		cover: "/promeet-desk-social.png",
		featured: true,
		resumeHighlights: [0, 1],
	},
	{
		slug: "lead-platform",
		title: "Lead Management Platform",
		part: "Sales",
		tagline:
			"Leads move through a validated pipeline with every change on a timeline, and the React app is typed from the API schema.",
		resumeTagline:
			"Django REST API: leads move through a validated pipeline with every change on a timeline, and the React app is typed from the API schema.",
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
		screenshot: {
			src: "/lead-platform.png",
			width: 1280,
			height: 800,
			alt: "Lead Management Platform showing the sales pipeline with fictional leads",
		},
		cover: "/lead-platform-social.png",
		featured: true,
		resumeHighlights: [2, 4],
	},
	{
		slug: "webhook-delivery",
		title: "Webhook Delivery",
		part: "Integrations",
		tagline:
			"Signed webhooks with durable retries and a full attempt history, in Node.js and TypeScript on PostgreSQL.",
		resumeTagline:
			"Node.js and TypeScript service: signed webhooks with durable retries and a full attempt history, on PostgreSQL.",
		year: "2026",
		role: "Developer, with Claude and Codex as AI pair programmers",
		problem:
			"A CRM needs to tell other systems when something changes, even when a receiver is slow or offline. Sending an HTTP request inside the original business operation leaves no reliable record of what needs another attempt. I built a standalone delivery service as a precursor to the webhook and integration-log requirements of my planned CRM.",
		constraint:
			"A receiver can accept a request just before the sender crashes, so exactly-once delivery would be a false promise. The queue needed to survive restarts, competing workers and temporary database failures. User-supplied destinations also create an SSRF boundary: signed requests must not become a route into private networks. All demonstration data is fictional, and the free hosted worker sleeps when its API does.",
		approach:
			"PostgreSQL stores the event, subscription snapshot, delivery jobs and audit entry in one transaction. Workers claim short leases, release database locks before network I/O, and fence completion with a lease token. A review caught a race where the selection snapshot could predate another worker's claim; rechecking the live lease after locking the endpoint fixed it. Deliveries use timestamped HMAC signatures and encrypted signing secrets, with bounded I/O, DNS validation and address pinning. Eight attempts per replay cycle, a five-failure automatic pause and manual replay make recovery explicit. Zod drives validation and generated OpenAPI. Claude and Codex helped implement, review and test the service; the repository records the findings and verification.",
		outcome:
			"Released as v1.0.0 on 28 September 2026 under the MIT licence, with public amd64 and arm64 images on GHCR and a controlled Render and Neon demo until 28 December 2026. Real signed HTTPS delivery returned 204, and a Render restart preserved API keys, encrypted signing secrets, attempt history and queued work. The public demo exposes Swagger; credentials stay private. Free-tier sleep stops the background worker, so it is not an always-on delivery service.",
		stack: ["Node.js", "TypeScript", "Fastify", "PostgreSQL", "Zod", "OpenAPI", "Docker", "GitHub Actions", "Vitest"],
		highlights: [
			"Transactional fan-out, fenced worker leases and bounded retries retain events and attempt history across failures; delivery is at least once, with no ordering guarantee.",
			"85 tests run against PostgreSQL in CI on Node 22 and 24, including concurrent claims, worker crashes, database outages, HTTPS verification and SSRF boundaries.",
			"Timestamped HMAC signatures, overlapping secret rotation and DNS/IP validation with address pinning protect the receiver and outbound request boundary.",
			"A controlled Render restart retained credentials, signing secrets, queued deliveries and prior attempt history; the retained webhook then received HTTP 204.",
		],
		repo: "https://github.com/code-kasha/webhook-delivery",
		demo: "https://webhook-delivery-demo.onrender.com/docs",
		screenshot: {
			src: "/webhook-delivery-screenshot.jpg",
			width: 1905,
			height: 854,
			alt: "Webhook Delivery 1.0.0 Swagger documentation showing endpoint and event operations",
		},
		cover: "/webhook-delivery-social.png",
		featured: true,
		resumeHighlights: [0, 1],
	},
	{
		slug: "operations-api",
		title: "Operations API",
		part: "Operations",
		tagline:
			"Staff, shifts, leave, overtime and working-day payroll, where a finished pay run can never change.",
		resumeTagline:
			"Django REST API: staff, shifts, leave, overtime and working-day payroll, where a finished pay run can never change.",
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
		screenshot: {
			src: "/operations-api.png",
			width: 1280,
			height: 800,
			alt: "Operations API Swagger documentation showing attendance operations",
		},
		cover: "/operations-api-social.png",
		featured: true,
		resumeHighlights: [1],
	},
	{
		slug: "bharat-post-dir",
		title: "bharat-post-dir",
		part: "Reference data",
		tagline:
			"India's 155,599 post offices as a lookup page, a JSON API and one download, each stating where the data came from.",
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
		screenshot: {
			src: "/bharat-post-dir.png",
			width: 1280,
			height: 800,
			alt: "bharat-post-dir lookup page showing Delhi results and the dataset source information",
		},
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
