# Agent start here

Context handoff for this repository. Read this first, then `AGENTS.md`.

Last updated: **2026-09-27** · Live since 27 September: `v2` pushed and fast-forwarded into `main` at `8603f36`, Vercel deploy verified.

---

## 1. What this is

Akash Damle's personal portfolio. Next.js **16.2.4**, App Router, TypeScript,
Tailwind v4, shadcn/ui. Deployed on Vercel at **akashdamle.in**.

It is not a hobby site. It is the primary artefact in a job search, and that
goal decides most arguments:

| | |
|---|---|
| **Target role** | Software / backend developer |
| **Location** | Remote preferred (Akash is in Badlapur, India) |
| **Compensation floor** | 15 LPA |
| **Positioning** | Backend engineer, 8+ years of total experience, Django + Node/TypeScript |

When a design or content question is genuinely balanced, pick the option a
hiring reviewer would respect.

---

## 2. Branch workflow

```
main   deployed to production on Vercel. Merge here only when satisfied.
v2     working branch. All new work starts here.
v1     archive of the pre-revamp site (ad9ccf0). Do not build on it.
```

`v2` contains local changes ahead of `main`. Work on `v2`; publication remains
a separate explicitly requested action. The history is linear; **no force-push has ever been needed and
none should be**.

Akash's standing preference: **commit locally, do not push or open PRs unless
he asks in that message.** The one time this was assumed, it was corrected.
The 2026-09-20 publish was explicitly authorised and does not generalise.

---

## 3. Where things live

```
app/layout.tsx              metadata, fonts, theme init script, providers
app/page.tsx                the single landing page (client component)
app/projects/[slug]/page.tsx  case-study route, SSG, params is a Promise
app/blog/page.tsx           blog index ("Blog" in the header)
app/blog/[slug]/*-image.tsx  per-post share card (lib/post-card.tsx)
app/api/blog/**            likes, comments, moderation route handlers
lib/engagement/*           comment rules, storage (Redis or local file), request helpers
components/post-engagement.tsx, share-buttons.tsx  like/comment UI, share row
app/blog/[slug]/page.tsx    post route: imports content/blog/<slug>.mdx, SSG
mdx-components.tsx          blog typography (required by @next/mdx)
next.config.ts              the only Next config; wires @next/mdx + remark-gfm
app/globals.css             Tailwind import, theme tokens, keyframes, utilities

lib/profile.ts              SINGLE SOURCE OF TRUTH for stated facts
lib/projects.ts             project write-ups: lead-platform, operations-api, bharat-post-dir
lib/posts.ts                blog post metadata; drafts (if any) show only under next dev
content/blog/<slug>.mdx     blog post bodies
lib/themes.ts               theme ids, storage key, pre-paint init script
lib/utils.ts                shadcn cn()

components/site-header.tsx  sticky header, nav, theme toggle
components/theme-provider.tsx  useSyncExternalStore over <html data-theme>
components/theme-toggle.tsx    light/dark button
components/motion-primitives.tsx  Reveal, Stagger, SplitText, Parallax, Magnetic
components/aurora.tsx       CSS-only animated background mesh
components/ui/*             shadcn, style "radix-mira"

scripts/build-resumes.mjs   `pnpm resume`: builds public/Resume.pdf and Resume(Long).pdf
scripts/resume.css          the résumés' print styles (the site's light palette)
docs/project-audit.xlsx     audit of all 34 GitHub repos, with expansion plans
```

**`lib/profile.ts` is the important one.** The site, the résumé and the CV had
drifted into stating different facts about the same career. Anything asserted
as fact — job title, years, client counts, contact details — belongs there and
nowhere else. Do not restate a fact inline in a component. The two résumé
PDFs are generated from it and `lib/projects.ts` by `pnpm resume`; there are
no hand-edited résumé drafts any more.

---

## 4. Decisions already made — do not re-litigate

Each of these was argued through and settled. Reopen only if Akash asks.

- **Tailwind + shadcn.** There was a phase that moved to plain CSS and CSS
  Modules; it was reverted when shadcn came back. `page.module.css` is gone.
- **Two themes, light and dark.** Light is the Nordic palette (paper/sage),
  dark is Acid (black/lime). The initial theme follows `prefers-color-scheme`;
  an explicit toggle overrides and persists to `localStorage`.
- **The favicon does NOT follow the theme.** This is deliberate and was
  requested. It is one fixed icon, `public/icon.svg`, an interlocked AD
  monogram on a sage tile. Any code that switches it by theme has been
  removed on purpose — do not reintroduce it.
- **Inter for display type in both themes.** Space Grotesk was tried and
  rejected; see the gotcha below before "fixing" its descenders again.
- **Unverifiable claims are banned.** "2000+ users" and "20-35% performance
  improvement" were removed from the site because nothing backs them. They
  still appear in the old PDFs. Do not reintroduce them anywhere. Replacements
  must be checkable by a reviewer in about 30 seconds.
- **The résumés mirror the site** (Akash, 27 September). Both PDFs are
  generated: projects come from `lib/projects.ts` (tagline, highlights,
  stack) and the CRM from `upcoming`; the one-page version picks each
  project's `resumeHighlights`. A project that isn't on the site isn't on
  the résumé either, so MaxRead and XO Anime are out until they have a
  write-up. After changing profile or project data, run `pnpm resume` and
  commit the PDFs. The one-page résumé must stay one page (the script fails
  otherwise); the long one is three pages today.
- **"Integration test suites that run against a real database in CI"** stays
  in the long summary. Akash has done this on other work; the public
  projects deliberately test on SQLite. Don't flag it again.
- **The CRM will be paid software.** The public projects are a prelude to
  it: solid, finished releases, not the product itself.

---

## 5. Gotchas that cost real time

**The dev server serves stale CSS after structural changes.** Hit three times.
Symptoms: the palette does not apply, CSS custom properties read as `""`, the
body background is transparent, or selectors you deleted are still being
served. Clearing `.next/static` and `.next/cache` is **not** enough:

```bash
# stop the server, then
rm -rf .next
pnpm dev
```

Confirm by fetching the served stylesheet and grepping for a selector you know
you deleted. The dev CSS URL does not change between rebuilds, so browsers
cache it too — hard-reload when checking visually.

**Source files are CRLF.** Python string surgery with `'\n'` in the pattern
will silently fail to match. Detect the line ending and build patterns with it:

```python
s = io.open(p, encoding='utf-8', newline='').read()
nl = '\r\n' if '\r\n' in s else '\n'
```

**The browser pane is often hidden, which freezes animation.**
`requestAnimationFrame` never fires, so motion/react animations and CSS
transitions stay pinned at their start values. A frozen `translateY(110%)` or a
background still reading as the old colour is usually this, not a bug. Neutralise
the animation before measuring geometry:

```js
document.querySelectorAll('.word-rise').forEach(e => {
  e.style.animation = 'none'; e.style.transform = 'none';
});
```

**Space Grotesk's `g` and `y` look clipped but are not.** Their descenders end
in a wide flat terminal — 44px of ink on the bottom row at 120px, against
Inter's 13px. Measured: both fonts' ink stops at the same depth. No amount of
`line-height` fixes it; only a different face does. This was misdiagnosed once.

**`@theme inline` cannot self-reference.** `--font-display: var(--font-display)`
is circular, computes to empty, and every `font-display` utility silently falls
back to inherited type. The Tailwind key must read a differently named variable
(`--display-family`), which the theme blocks own.

**Never put `:root` in a theme block.** `:root` matches `<html>` under *every*
theme at the same specificity as `[data-theme="..."]`, so source order decides
the winner and themes bleed into each other. `<html data-theme>` is always
server-rendered, so the attribute selector alone is sufficient.

**`params` is a `Promise` in Next 16.** `const { slug } = await params`.

**LibreOffice is not installed**, so the xlsx skill's `recalc.py` cannot run.
Workbook formulas ship without cached values; Excel computes them on open.
Verify formulas by computing expected values independently instead.

**`gh api` from Python on Windows** needs a command *string* with
`shell=True`, not an argument list — a list silently returns nothing.

---

## 6. Verified facts — do not re-derive

Established by reading the actual repositories on 2026-09-20.

- **`lead-platform-digital_heroes` is the strongest codebase**, not MaxRead.
  15 real Django test files with factories, type annotations and explicit
  RBAC permission tests. No CI. Demo URL 404s.
- **`maxread-api`** is the only repo with a CI gate. TypeScript, Zod driving
  both validation and generated OpenAPI docs, Supertest against in-memory
  MongoDB. Only 3 endpoints and 1 test file.
- **`dj-starter-skyset`'s four "test files" are empty `__init__.py`.**
  It has zero real tests.
- **`xoanime` does have a README** (7,988 chars). Its default branch is
  `master`, not `main` — an earlier check on `main` wrongly concluded it had
  none. It is still marked not-worth-expanding because it aggregates piracy
  sources.
- **13 of 34 repos are duplicates or superseded** — four ShoppyGlobe, three
  yt-clone, four XO variants, two school APIs.
- **Akash has 8+ years of total experience**, including trainee/intern work
  omitted from the listed employment timeline (confirmed 25 September 2026).
  The profile, metadata, manifest and Markdown drafts use this wording.
  Existing job dates are unchanged; the public PDFs were replaced at go-live on 27 September.

Full detail, with per-project expansion plans, is in
`docs/project-audit.xlsx`.

---

## 7. Outstanding work, in priority order

1. **Populate `lib/projects.ts`: started 26 September.** The section is now
   called "Projects" (renamed from "Case studies", which overstated personal
   work). The CRM, Akash's main product, leads the grid as a full-width
   "Coming soon" card from the separate `upcoming` list (no page, no sitemap
   entry; it is still in planning). bharat-post-dir (formerly Bharat) is
   the first write-up, with `public/bharat-post-dir.png` and its live demo,
   which ends 26 December 2026: drop the `demo` link then. Its write-up
   uses a 2:1 `cover` (`public/bharat-post-dir-social.png`) as the article
   and share image; the card keeps the screenshot. The shape is narrative —
   problem, constraint, approach, outcome — not a feature list.

   **Go-live gate (Akash, 26 September):** `v2` merges to `main` only after
   2–3 entries beyond bharat-post-dir exist, alongside the CRM card. Two
   exist as of 27 September (Lead Management Platform, Operations API), so
   the minimum is met. Merged and deployed on 27 September at Akash's request.
   - **Done: Lead Management Platform** (`code-kasha/lead-platform`, renamed
     from `lead-platform-digital_heroes`). Released as v1.0.0 on 26 September
     with 99 backend and 74 frontend tests, CI, a GHCR image and a Render +
     Neon demo until 26 December 2026 (drop the `demo` link then). The
     write-up leads the grid (Akash, 26 September), keeping the résumé's name and its
     "qualification task" line. `public/lead-platform.png` is the top of the
     repo's `screenshots/leads.png`; the 2:1 `cover` is
     `public/lead-platform-social.png`, styled like bharat-post-dir's. CI runs
     the tests on SQLite, not PostgreSQL, by decision (Akash, 26 September):
     running CI against Neon's free tier is a hassle and not needed, and
     SQLite shows the behaviour. The earlier "CI against real PostgreSQL"
     plan item is dropped; don't reopen it.
   - **Then two new projects (decided 26 September), replacing maxread-api:**
     - **Done: Operations API** (`code-kasha/operations-api`). Released as
       v1.0.0 on 27 September 2026 with the shared core and the office
       module (schools and clinics not built); 346 tests, CI, a GHCR image
       and a Render + Neon demo until 27 December 2026 (drop the `demo` link
       then). Demo accounts share the published password
       `Explore-Operations-2026`. `public/operations-api.png` is the repo's
       Swagger screenshot; the 2:1 `cover` is `public/operations-api-social.png`,
       styled like the other two. It sits second in the grid. The one-page
       résumé now lists only the first two projects (`ONE_PAGE_PROJECTS` in
       `scripts/build-resumes.mjs`, Akash, 27 September): a third did not fit
       even with fewer highlights, so bharat-post-dir is on the site and the
       long résumé only. The project's own handoff moved out of its public
       repo to `../operations-api-notes/agent-start.md`.
     - **Operations APIs** (original plan, now shipped as above) for schools, clinics and small businesses/offices:
       Django, one repository and one entry, not one per sector. A shared
       core (employees, attendance, payroll, reporting) with a module per
       sector. This is the public evidence for the résumé's headline claim
       (Django CRM systems for 27+ clients across schools, clinics and small
       businesses). Built from scratch with fictional data; say so, since the
       client code is private. Keep to staff operations, not patient
       records, and don't claim statutory payroll compliance unless built.
       **Next up (Akash, 27 September).** Choices so far: API only (Swagger,
       ReDoc and the Django admin are the demo), one company per install.
       Whether the three sectors ship together or one at a time is still
       open. Estimated 9–11 working days. MaxRead comes after it.
     - **A Node/TypeScript service that serves the CRM**, such as
       notification or webhook delivery (retries, signed payloads, a queue
       for failing deliveries). It carries the Node/TS side of the résumé;
       React/TS frontends need no separate highlight. Django backend stays
       the main positioning.
     Each project starts in its own thread, started by Akash. Nothing of
     these exists yet: no site card until each ships.
   - **Go-live: done, 27 September.** `v2` pushed, `main` fast-forwarded to it.
   - **After go-live:** bharat-post-dir's README links the write-up at
     `localhost:3000`; its task 17 swaps in the public URL.
2. **`robots.txt` and `sitemap.xml`: complete locally, 25 September.**
   Typed metadata routes use `contact.site`; the sitemap follows `projects`.
3. **OG image: complete locally, 25 September.** `app/opengraph-image.tsx`
   renders a 1200×630 PNG using profile content and the existing AD favicon.
   Open Graph and Twitter metadata reference it. Live since 27 September.
4. **Dead demos: none left.** `lead-platform`'s demo works since v1.0.0.
   NorthPeak was scrapped on 26 September: Akash deleted the repo and its
   deployment, and it was removed from the résumé. Don't bring it back.
5. **Private repos are not linked** (Akash, 26 September).
   `dj-starter-skyset` and `school_management_api` are private and backed
   up, so their résumé entries were removed; their skills stay listed under
   Skills. Only link public repos.
   **Résumé PDFs: done, 27 September.** `pnpm resume` generates both; the
   site offers "Résumé · 1 page" and "Résumé · full" in the contact section.
6. **Next config: done, 25 September.** `next.config.js` (which Next loads
   first) was merged into `next.config.ts` and deleted.
7. **Orphaned screenshots: removed, 27 September** (`xo.png`,
   `shoppy-globe.png`, `online-library.png`, `yt-clone.png`).
8. **Visual review deferred.** Current design is accepted; do not redesign.
9. **Blog: live since 25 September** (main `4c32be9`, Vercel deploy verified). The
   local AI article is live at `/blog/local-ai-on-a-12gb-gpu` with share
   buttons, BlogPosting JSON-LD
   and a per-post share card. **Likes and comments** need a store before they
   appear; without one the section is not rendered and the API answers 503.
   To enable on Vercel: add Upstash for Redis from the Marketplace (free tier;
   the code reads `KV_REST_API_URL`/`KV_REST_API_TOKEN` or the
   `UPSTASH_REDIS_REST_URL`/`_TOKEN` names), plus env vars
   `MODERATION_TOKEN` (long random string) and `ENGAGEMENT_SALT` (random),
   then redeploy. `next dev` uses `.data/engagement.json` (gitignored).
   Comment rules (`lib/engagement/comments.ts`): 12+ words, 6+ specific
   words, no all-caps or repeated runs, 2 links max, no exact duplicates,
   honeypot, 4 s minimum fill time, 3 per sender per 10 min. Comments with
   links or promotional terms wait for review; `COMMENTS_MODERATION=review`
   holds every comment. Moderate with:
   `curl -H "Authorization: Bearer $MODERATION_TOKEN" https://www.akashdamle.in/api/blog/moderation`
   and POST `{"id":"...","action":"publish"|"hide"}` to the same URL.
10. **Lockfile: done, 26 September.** pnpm only. `package-lock.json` is
    deleted; `pnpm-lock.yaml` is the only lockfile. `package.json` pins
    `packageManager: pnpm@12.3.4`, and `pnpm-workspace.yaml` allows the
    install scripts of `sharp`, `unrs-resolver` and `msw`. Use pnpm only;
    `npm install` would recreate `package-lock.json`. Vercel's install
    command is the default, not overridden (checked 26 September), so it
    always uses pnpm. Vercel only honours `packageManager` when the project
    has the env var `ENABLE_EXPERIMENTAL_COREPACK=1`, which Akash added on
    26 September, so Vercel uses pnpm 12.3.4 through Corepack. Keep it:
    without it Vercel may pick pnpm 9, which rejects both pnpm 12's
    multi-document lockfile and a `pnpm-workspace.yaml` without `packages`.

---

## 8. Checks before you commit

```bash
pnpm build              # must compile and type-check
pnpm exec eslint .      # must be silent
```

Both were clean at `60b693a`. `react-hooks/set-state-in-effect` is enforced —
use `useSyncExternalStore` to read DOM state rather than mirroring it into
state inside an effect.

Verify visual claims by measurement, not assumption: computed styles, element
geometry, canvas ink bounds. Several confident visual diagnoses in this
project's history turned out to be wrong, and measuring is what caught them.

## 9. Verification — 25 September 2026

Production build and TypeScript passed. Local production HTTP checks passed for
robots, sitemap, PNG dimensions/content type, OG/Twitter image metadata and
8+ total-experience text. The social image was visually inspected. New route
files pass ESLint with zero warnings; full-repo ESLint has 49 pre-existing
JSDoc warnings and zero errors. No push, merge to main or deployment.
