# Akash Damle

**Backend Engineer** · Dombivli, India · Open to remote

akashdamle07@gmail.com · +91 98333 58619
[akashdamle.in](https://www.akashdamle.in) · [github.com/code-kasha](https://github.com/code-kasha) · [linkedin.com/in/akash-damle-58a808258](https://www.linkedin.com/in/akash-damle-58a808258/)

---

## Summary

Backend engineer with 8 years building and operating production systems in
Django and Node/TypeScript. Most of that time as the only engineer on the
project, which means I have owned schema design, API surface, deployment and
support rather than one slice of it.

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

### Lead Management Platform

*2026 · [Repository](https://github.com/code-kasha/lead-platform-digital_heroes)*

Full-stack lead management, built to a short deadline as a qualification task.

- **Django REST Framework backend** with a service-oriented structure
  separating HTTP handling from business rules.
- **Role-based access control** across the lead lifecycle — creation,
  assignment, status transitions, notes and activity history — with
  permissions enforced server-side rather than hidden in the UI.
- **API-first.** The OpenAPI specification generates the TypeScript models the
  React frontend consumes, so a backend change surfaces as a type error rather
  than a runtime bug.
- **JWT authentication** with refresh tokens.

### NorthPeak Digital — agency site with enquiry API

*2026 · [Repository](https://github.com/code-kasha/northpeak-digital-dh)*

- Responsive marketing site in Vite, backed by a Django REST Framework API
  handling contact enquiries.
- **Separate CI pipelines** for frontend and backend, each running on its own
  workflow.
- Lighthouse results captured in the repository as part of the deliverable.

### Django Starter Template

*2026 · [Repository](https://github.com/code-kasha/dj-starter-skyset)*

- Production-oriented Django starter encoding the settings layout,
  environment handling and project structure I had been rebuilding by hand on
  each client engagement.

### School Management API

*2026 · [Repository](https://github.com/code-kasha/school_management_api)*

- REST API in Node.js, Express and MySQL for managing school records,
  including proximity search returning nearby schools sorted by distance.

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
