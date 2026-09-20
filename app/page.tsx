import Image from "next/image"
import styles from "./page.module.css"

type Project = {
	title: string
	desc: string
	link: string
	image: string
	tags: string[]
}

const projects: Project[] = []

const skills = [
	{
		category: "Backend",
		items: ["Django", "DRF", "Node.js", "Express", "REST APIs"],
	},
	{
		category: "Frontend",
		items: ["React", "JavaScript", "Tailwind CSS", "Redux"],
	},
	{
		category: "Database",
		items: ["PostgreSQL", "MongoDB", "Query Optimization"],
	},
	{
		category: "DevOps & Tools",
		items: ["Docker", "Linux", "Git", "CI/CD", "AWS"],
	},
]

const stats = [
	{ number: "6+", label: "Years Experience" },
	{ number: "30+", label: "Projects Delivered" },
	{ number: "2000+", label: "Active Users" },
	{ number: "20-35%", label: "Performance Boost" },
]

const experience = [
	{
		period: "Mar 2021 – Present",
		role: "Freelance Software Engineer",
		company: "Virtual",
		description:
			"Built and deployed 30+ production applications across schools, clinics, and SMBs. Designed scalable backend systems, implemented REST APIs, and improved system performance by 20-35% through optimization.",
	},
	{
		period: "Aug 2018 – Feb 2021",
		role: "Junior Software Developer",
		company: "Matalli Infotech, Dombivli",
		description:
			"Developed Django-based internal systems, implemented CI/CD pipelines, wrote unit/integration tests, and managed deployments on AWS and Heroku with minimal downtime.",
	},
]

const navItems = ["About", "Skills", "Projects", "Experience", "Contact"]

export default function Portfolio() {
	return (
		<>
			<a className={styles.skipLink} href="#main">
				Skip to content
			</a>

			<header className={styles.header}>
				<div className={styles.headerInner}>
					<span className={styles.logo}>AD</span>
					<nav aria-label="Primary">
						<ul className={styles.navList}>
							{navItems.map((item) => (
								<li key={item}>
									<a
										className={styles.navLink}
										href={`#${item.toLowerCase()}`}
									>
										{item}
									</a>
								</li>
							))}
						</ul>
					</nav>
				</div>
			</header>

			<main id="main">
				{/* Hero */}
				<section id="about" className={styles.hero}>
					<div className={styles.heroInner}>
						<h1 className={styles.heroName}>Akash Damle</h1>
						<p className={styles.heroRole}>
							Backend Engineer &amp; Full-Stack Developer
						</p>
						<p className={styles.heroBio}>
							Building scalable systems with Django, Node.js, and React. 6+
							years of experience designing and deploying production
							applications serving 2000+ users. Passionate about clean code,
							performance optimization, and solving complex problems.
						</p>

						<div className={styles.heroActions}>
							<a
								className={`${styles.button} ${styles.buttonPrimary}`}
								href="#projects"
							>
								View My Work
							</a>
							<a
								className={`${styles.button} ${styles.buttonOutline}`}
								href="#contact"
							>
								Get In Touch
							</a>
						</div>

						<dl className={styles.stats}>
							{stats.map((stat) => (
								<div key={stat.label} className={styles.stat}>
									<dt className={styles.statValue}>{stat.number}</dt>
									<dd className={styles.statLabel}>{stat.label}</dd>
								</div>
							))}
						</dl>
					</div>
				</section>

				{/* Skills */}
				<section
					id="skills"
					className={`${styles.section} ${styles.sectionAlt}`}
				>
					<div className={styles.sectionInner}>
						<h2 className={styles.sectionTitle}>Technical Skills</h2>
						<ul className={styles.skillGrid}>
							{skills.map((skill) => (
								<li key={skill.category} className={styles.skillCard}>
									<h3 className={styles.skillTitle}>{skill.category}</h3>
									<ul className={styles.tagList}>
										{skill.items.map((item) => (
											<li key={item} className={styles.tag}>
												{item}
											</li>
										))}
									</ul>
								</li>
							))}
						</ul>
					</div>
				</section>

				{/* Projects */}
				<section id="projects" className={styles.section}>
					<div className={styles.sectionInner}>
						<h2 className={styles.sectionTitle}>Featured Projects</h2>

						{projects.length > 0 ? (
							<ul className={styles.projectGrid}>
								{projects.map((project) => (
									<li key={project.title}>
										<article className={styles.projectCard}>
											<div className={styles.projectMedia}>
												<Image
													className={styles.projectImage}
													src={project.image}
													alt={`${project.title} screenshot`}
													width={800}
													height={450}
													sizes="(min-width: 64rem) 33vw, (min-width: 40rem) 50vw, 100vw"
												/>
											</div>
											<div className={styles.projectBody}>
												<h3 className={styles.projectTitle}>
													{project.title}
												</h3>
												<p className={styles.projectDesc}>{project.desc}</p>
												<ul className={styles.tagList}>
													{project.tags.map((tag) => (
														<li
															key={tag}
															className={`${styles.tag} ${styles.tagTech}`}
														>
															{tag}
														</li>
													))}
												</ul>
												<a
													className={styles.projectLink}
													href={project.link}
													target="_blank"
													rel="noopener noreferrer"
												>
													View Project →
												</a>
											</div>
										</article>
									</li>
								))}
							</ul>
						) : (
							<p className={styles.emptyState}>
								New case studies are on the way.
							</p>
						)}
					</div>
				</section>

				{/* Experience */}
				<section
					id="experience"
					className={`${styles.section} ${styles.sectionAlt}`}
				>
					<div className={styles.sectionInnerNarrow}>
						<h2 className={styles.sectionTitle}>Professional Experience</h2>
						<ol className={styles.timeline}>
							{experience.map((job) => (
								<li key={job.role} className={styles.role}>
									<div className={styles.roleHead}>
										<div>
											<h3 className={styles.roleTitle}>{job.role}</h3>
											<p className={styles.roleCompany}>{job.company}</p>
										</div>
										<p className={styles.rolePeriod}>{job.period}</p>
									</div>
									<p className={styles.roleDesc}>{job.description}</p>
								</li>
							))}
						</ol>
					</div>
				</section>

				{/* Contact */}
				<section id="contact" className={styles.section}>
					<div className={styles.sectionInnerNarrow}>
						<h2 className={styles.sectionTitle}>Let&apos;s Connect</h2>
						<p className={styles.contactText}>
							I&apos;m always interested in hearing about exciting projects and
							opportunities. Whether you have a question or just want to say
							hello, feel free to reach out!
						</p>

						<div className={styles.contactActions}>
							<a
								className={`${styles.button} ${styles.buttonSubtle}`}
								href="mailto:akashdamle07@gmail.com"
							>
								Email
							</a>
							<a
								className={`${styles.button} ${styles.buttonSubtle}`}
								href="https://github.com/code-kasha"
								target="_blank"
								rel="noopener noreferrer"
							>
								GitHub
							</a>
							<a
								className={`${styles.button} ${styles.buttonSubtle}`}
								href="https://www.linkedin.com/in/akash-damle-58a808258/"
								target="_blank"
								rel="noopener noreferrer"
							>
								LinkedIn
							</a>
							<a
								className={`${styles.button} ${styles.buttonPrimary}`}
								href="/Resume.pdf"
								target="_blank"
								rel="noopener noreferrer"
							>
								Resume
							</a>
						</div>
					</div>
				</section>
			</main>

			<footer className={styles.footer}>
				<p>© 2026 Akash Damle. All rights reserved.</p>
			</footer>
		</>
	)
}
