# Akash Damle

**Backend Engineer** · Badlapur, India · Open to remote

akashdamle07@gmail.com · +91 98333 58619
[akashdamle.in](https://www.akashdamle.in) · [github.com/code-kasha](https://github.com/code-kasha) · [linkedin.com/in/akash-damle-58a808258](https://www.linkedin.com/in/akash-damle-58a808258/)

---

## Summary

Backend engineer with 8+ years of total experience, building and operating systems in
Django and Node/TypeScript. On client work I own the whole backend, sometimes
as the only engineer and sometimes alongside a frontend developer, which means
I have owned schema design, API surface, deployment and support rather than
one slice of it.

Recent work has focused on making that ownership repeatable: typed API
contracts generated from a single schema definition, integration test suites
that run against a real database in CI, and infrastructure I can rebuild from
scratch.

---

## Experience

### Freelance Software Engineer — Independent, Remote

**Mar 2021 – Present · 5 yr 7 mo**

Django CRM and internal-tooling work for small organisations — schools,
clinics and SMBs — delivered end to end and supported on an ongoing basis.

- Delivered 27+ client systems, each covering some combination of employee
  management, payroll calculation, attendance tracking, performance review
  and reporting.
- Designed the relational schema and REST API for each deployment, and built
  the admin and reporting surfaces on top.
- Provisioned and maintained self-managed Linux servers running PostgreSQL,
  including backups, TLS, and upgrades. Hosting is part of the engagement
  rather than the client's problem.
- Worked directly with non-technical stakeholders to scope requirements,
  agree priorities and run acceptance.
- Also delivered custom websites with Django and Django CMS for clients whose
  needs stopped short of a full system.

**Stack:** Django, Python, PostgreSQL, Django CMS, Linux, Nginx, Gunicorn

### Junior Software Developer — Matalli Infotech, Dombivli

**Aug 2018 – Feb 2021 · 2 yr 7 mo**

First engineering role, on a small team maintaining internal web
applications.

- Built and maintained internal applications on Django 2.2 LTS.
- Wrote unit and database-level tests to keep regressions out of releases.
- Implemented and worked with CI/CD pipelines to shorten the release cycle.
- Managed deployments across Linux servers, AWS and Heroku.
- Delivered production patches and bug fixes with minimal downtime.
- Learned project structure, code organisation and review practice in a team
  setting, and used Git throughout for collaboration.

**Stack:** Django, Python, Git, Linux, AWS, Heroku, CI/CD

---

## Selected Projects

### Lead Management Platform

*2026 · [Repository](https://github.com/code-kasha/lead-platform) · [Live demo](https://lead-platform-c3mw.onrender.com/) (until 26 December 2026)*

Built as a qualification task in two days in July 2026, then brought to a
finished v1.0.0 release in September.

- **Django REST Framework API** that moves leads through a validated pipeline
  (New, Contacted, Qualified, Proposal, Won or Lost). Business rules live in
  one service layer; each service is a single transaction and the only code
  that writes the activity timeline.
- **Role-based access enforced server-side.** The lead queryset is filtered
  by role, so a member asking for someone else's lead gets a 404.
- **API-first.** drf-spectacular generates the OpenAPI schema, the React and
  TypeScript app's types are generated from it, and CI fails if either
  committed copy goes stale.
- **JWT authentication** with rotating, blacklisted refresh tokens, and a
  single-flight token refresh in the browser.
- **99 backend and 74 frontend tests** (pytest, Vitest) in GitHub Actions,
  plus lint, a missing-migrations check and a Docker smoke test.
- **One Docker image** (amd64 and arm64) serving the API, admin and app,
  published to the GitHub Container Registry.

### bharat-post-dir

*2026 · [Repository](https://github.com/code-kasha/bharat-post-dir) · [Live demo](https://bharat-post-dir.onrender.com/) (until 26 December 2026)*

India's postal directory as a lookup page, a JSON API and a one-file
download: 155,599 offices, released as v1.0.0.

- **All-or-nothing imports.** Every import is validated in full, then
  replaces the directory and its metadata in one transaction; offices listed
  more than once are kept and reported, never silently dropped.
- **Provenance on every page.** The page and the API state the data's
  source, date and SHA256 without claiming freshness.
- **A lookup page that costs one HTTP request:** server-rendered, no
  JavaScript, built for keyboard and screen-reader use.
- **Read-only JSON API** with OpenAPI docs, and the whole directory as one
  1.4 MB gzipped download sent with an ETag.
- **119 tests** against synthetic fixtures; Django, SQLite and a public
  Docker image.

### MaxRead — API and reading client

*2026 · [API](https://github.com/code-kasha/maxread-api) · [Frontend](https://github.com/code-kasha/maxread)*

A novel-reading platform, built as two services. The API is the piece worth
reading.

- **Express + TypeScript + Mongoose.** REST endpoints for browsing novels and
  reading chapters in order, with search, genre and tag filtering, and
  paginated listings.
- **One schema, three jobs.** Zod schemas drive request validation, the
  generated OpenAPI document, and the interactive Swagger UI and ReDoc pages —
  so documentation cannot fall out of step with behaviour.
- **Integration tests, not unit theatre.** Vitest and Supertest run against an
  in-memory MongoDB, covering every endpoint plus its error paths: malformed
  parameters return a structured 400, missing resources a 404.
- **CI as a gate.** GitHub Actions runs lint, type-check and the test suite on
  every push and pull request.
- **Operational basics.** Rate limiting at 100 requests per 15 minutes per IP,
  and a single centralised error shape across all responses.
- Frontend is React, TypeScript and Vite, consuming the same API.

### CRM — in research and planning

My main product: a CRM that arrives already set up for how a business works
(sales, agency, real estate or field services) instead of making it
configure everything first.

### XO Anime

*2024 · Personal project, not licensed for distribution*

- Django application aggregating six upstream sources behind one search.
- Custom HLS (m3u8) video player, working around CORS constraints on the
  upstream streams.
- Manga reading interface with multiple view modes, pagination and keyboard
  navigation.

---

## Skills

| | |
|---|---|
| **Backend** | Django, Django REST Framework, Node.js, Express, REST API design |
| **Languages** | Python, TypeScript, JavaScript, SQL |
| **Data** | PostgreSQL, MongoDB, MySQL, schema design, query tuning |
| **Testing** | Vitest, Supertest, Pytest, Zod, OpenAPI, integration testing |
| **Platform** | Linux, Nginx, Docker, GitHub Actions, AWS, Heroku, Vercel |
| **Frontend** | React, Next.js, Redux, Vite, Tailwind CSS |
| **Practice** | Git, code review, CI/CD, self-managed hosting |

---

## Education

**B.Sc, Computer Science** — P V G's College of Science, 2014–2018

---

## Training and Certifications

| Course | Provider | Period |
|---|---|---|
| Full Stack Development | Internshala | Oct 2025 – Apr 2026 |
| Master the Coding Interview: Data Structures + Algorithms | Udemy | Apr 2025 – Jan 2026 |
| The Complete JavaScript Course: From Zero to Expert | Udemy | Jun 2025 – Nov 2025 |
| Microservices with Node.js and React | Udemy | Apr 2024 – Sep 2025 |
| The Complete Full-Stack Web Development Bootcamp | Udemy | Jun 2023 – Feb 2024 |
| Python Django: The Practical Guide | Udemy | Jan 2021 – Aug 2021 |
