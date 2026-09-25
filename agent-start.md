# Agent start here

Context handoff for this repository. Read this first, then `AGENTS.md`.

Last updated: **2026-09-25** · SEO and experience corrections verified locally on `v2`; not deployed.

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
app/globals.css             Tailwind import, theme tokens, keyframes, utilities

lib/profile.ts              SINGLE SOURCE OF TRUTH for stated facts
lib/projects.ts             case-study data — CURRENTLY AN EMPTY ARRAY
lib/posts.ts                blog post metadata; drafts are never listed or routed
content/blog/<slug>.mdx     blog post bodies (no renderer or route yet)
lib/themes.ts               theme ids, storage key, pre-paint init script
lib/utils.ts                shadcn cn()

components/site-header.tsx  sticky header, nav, theme toggle
components/theme-provider.tsx  useSyncExternalStore over <html data-theme>
components/theme-toggle.tsx    light/dark button
components/motion-primitives.tsx  Reveal, Stagger, SplitText, Parallax, Magnetic
components/aurora.tsx       CSS-only animated background mesh
components/ui/*             shadcn, style "radix-mira"

docs/resume-short.md        one-page résumé draft
docs/resume-long.md         long CV draft
docs/project-audit.xlsx     audit of all 34 GitHub repos, with expansion plans
```

**`lib/profile.ts` is the important one.** The site, the résumé and the CV had
drifted into stating different facts about the same career. Anything asserted
as fact — job title, years, client counts, contact details — belongs there and
nowhere else. Do not restate a fact inline in a component.

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

---

## 5. Gotchas that cost real time

**The dev server serves stale CSS after structural changes.** Hit three times.
Symptoms: the palette does not apply, CSS custom properties read as `""`, the
body background is transparent, or selectors you deleted are still being
served. Clearing `.next/static` and `.next/cache` is **not** enough:

```bash
# stop the server, then
rm -rf .next
npm run dev
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
  Existing job dates are unchanged; old public PDFs still need replacement.

Full detail, with per-project expansion plans, is in
`docs/project-audit.xlsx`.

---

## 7. Outstanding work, in priority order

1. **Populate `lib/projects.ts`.** It is an empty array, so the work section
   renders a "Case studies in progress" placeholder. This is the single
   biggest gap. Start with `lead-platform`, then `maxread-api`. The shape is
   narrative — problem, constraint, approach, outcome — not a feature list.
2. **`robots.txt` and `sitemap.xml`: complete locally, 25 September.**
   Typed metadata routes use `contact.site`; the sitemap follows `projects`.
3. **OG image: complete locally, 25 September.** `app/opengraph-image.tsx`
   renders a 1200×630 PNG using profile content and the existing AD favicon.
   Open Graph and Twitter metadata reference it. Publication is pending.
4. **Fix the two dead demos** on `lead-platform` and `northpeak` (both 404).
   A dead demo link reads worse than no link.
5. **Regenerate the résumé PDFs** from `docs/resume-*.md` and replace
   `public/Resume.pdf` and `public/Resume(Long).pdf`. Decide whether the long
   one should stay publicly reachable — anything in `public/` is served even
   if nothing links it.
6. **Delete `next.config.js` or `next.config.ts`.** Both exist; one is
   silently ignored.
7. **Remove orphaned screenshots** — `public/xo.png`, `shoppy-globe.png`,
   `online-library.png`, `yt-clone.png` belong to projects no longer shown.
8. **Visual review deferred.** Current design is accepted; do not redesign.
9. **Blog section: data only, 25 September.** `lib/posts.ts` holds one draft
   post; its body is `content/blog/local-ai-on-a-12gb-gpu.mdx` (copied from the
   owner's fact-checked draft). Not rendered yet: needs `@next/mdx` with
   `remark-gfm` (the post has tables), `mdx-components.tsx`, `app/blog` routes
   using `getPublishedPosts()`, sitemap entries and table/code styling that
   fits the current design. Publish only after the owner approves the text.

---

## 8. Checks before you commit

```bash
npm run build      # must compile and type-check
npx eslint .       # must be silent
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
