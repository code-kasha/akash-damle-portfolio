"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Image from "next/image"

export default function Portfolio() {
	const projects = [
		{
			title: "XO Anime",
			desc: "Streaming platform aggregating 6 APIs with custom HLS player and unified search. Optimized for 2000+ concurrent users.",
			link: "https://github.com/code-kasha/xoanime",
			image: "/xo.png",
			tags: ["Django", "HLS Streaming", "API Integration"],
		},
		{
			title: "Shoppy Globe",
			desc: "E-commerce backend with Node.js/Express and MongoDB. Features product management, cart, orders, and RESTful APIs.",
			link: "https://github.com/code-kasha/is_shoppy_globe",
			image: "/shoppy-globe.png",
			tags: ["Node.js", "MongoDB", "Express"],
		},
		{
			title: "Online Library",
			desc: "Full-stack library system with React and Django. Manages books, users, and borrowing workflows with clean architecture.",
			link: "https://github.com/code-kasha/online-library",
			image: "/online-library.png",
			tags: ["React", "Django", "Redux"],
		},
		{
			title: "YouTube Clone",
			desc: "Complete MERN stack application with video uploads, JWT authentication, comments, and real-time interactions.",
			link: "https://github.com/code-kasha/yt-clone",
			image: "/yt-clone.png",
			tags: ["MERN", "JWT", "Media Handling"],
		},
	]

	const skills = [
		{
			category: "Backend",
			emoji: "⚙️",
			items: ["Django", "DRF", "Node.js", "Express", "REST APIs"],
		},
		{
			category: "Frontend",
			emoji: "🎨",
			items: ["React", "JavaScript", "Tailwind CSS", "Redux"],
		},
		{
			category: "Database",
			emoji: "🗄️",
			items: ["PostgreSQL", "MongoDB", "Query Optimization"],
		},
		{
			category: "DevOps & Tools",
			emoji: "⚡",
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

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white">
			{/* Navigation */}
			<nav className="sticky top-0 z-50 backdrop-blur-md border-b border-slate-800/50">
				<div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
					<motion.div
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5 }}
						className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"
					>
						AD
					</motion.div>
					<div className="hidden md:flex gap-8 text-sm">
						{["About", "Skills", "Projects", "Experience", "Contact"].map(
							(item) => (
								<a
									key={item}
									href={`#${item.toLowerCase()}`}
									className="text-slate-300 hover:text-cyan-400 transition-colors"
								>
									{item}
								</a>
							),
						)}
					</div>
				</div>
			</nav>

			{/* Hero Section */}
			<section
				id="about"
				className="min-h-screen flex items-center justify-center px-6 py-20"
			>
				<div className="max-w-4xl mx-auto text-center">
					{/* Avatar */}
					<motion.div
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.6 }}
						className="mb-8 inline-block"
					>
						<div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 via-cyan-500 to-blue-400 p-1">
							<div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center text-4xl">
								💻
							</div>
						</div>
					</motion.div>

					{/* Title */}
					<motion.h1
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.1 }}
						className="text-6xl md:text-7xl font-bold mb-4 tracking-tight"
					>
						Akash Damle
					</motion.h1>

					{/* Subtitle */}
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.2 }}
						className="text-2xl text-cyan-400 mb-6 font-light"
					>
						Backend Engineer & Full-Stack Developer
					</motion.p>

					{/* Description */}
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.3 }}
						className="text-lg text-slate-300 max-w-2xl mx-auto mb-12 leading-relaxed"
					>
						Building scalable systems with Django, Node.js, and React. 6+ years
						of experience designing and deploying production applications
						serving 2000+ users. Passionate about clean code, performance
						optimization, and solving complex problems.
					</motion.p>

					{/* CTA Buttons */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.4 }}
						className="flex flex-wrap gap-4 justify-center mb-16"
					>
						<Button
							asChild
							className="bg-cyan-500 hover:bg-cyan-600 text-black font-semibold px-8 py-6 rounded-lg"
						>
							<a href="#projects">View My Work</a>
						</Button>
						<Button
							asChild
							variant="outline"
							className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 px-8 py-6 rounded-lg"
						>
							<a href="#contact">Get In Touch</a>
						</Button>
					</motion.div>

					{/* Stats */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.6, delay: 0.5 }}
						className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
					>
						{stats.map((stat, i) => (
							<motion.div
								key={i}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: 0.5 + i * 0.1 }}
								className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 backdrop-blur"
							>
								<div className="text-3xl font-bold text-cyan-400 mb-2">
									{stat.number}
								</div>
								<div className="text-sm text-slate-400">{stat.label}</div>
							</motion.div>
						))}
					</motion.div>

					{/* Scroll Down */}
					<motion.div
						animate={{ y: [0, 10, 0] }}
						transition={{ duration: 2, repeat: Infinity }}
						className="inline-block text-2xl"
					>
						⬇️
					</motion.div>
				</div>
			</section>

			{/* Skills Section */}
			<section
				id="skills"
				className="py-20 px-6 bg-slate-900/50 border-y border-slate-800"
			>
				<div className="max-w-6xl mx-auto">
					<motion.h2
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						viewport={{ once: true, margin: "-100px" }}
						className="text-4xl md:text-5xl font-bold mb-16 text-center bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent"
					>
						Technical Skills
					</motion.h2>

					<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
						{skills.map((skill, i) => (
							<motion.div
								key={i}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: i * 0.1 }}
								viewport={{ once: true, margin: "-100px" }}
								whileHover={{ y: -5 }}
								className="bg-slate-800/50 border border-slate-700 hover:border-cyan-500/50 rounded-xl p-6 backdrop-blur transition-all duration-300"
							>
								<div className="flex items-center gap-3 mb-4">
									<span className="text-2xl">{skill.emoji}</span>
									<h3 className="text-lg font-semibold">{skill.category}</h3>
								</div>
								<div className="flex flex-wrap gap-2">
									{skill.items.map((item, j) => (
										<span
											key={j}
											className="text-xs bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-full border border-cyan-500/30"
										>
											{item}
										</span>
									))}
								</div>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* Projects Section */}
			<section id="projects" className="py-20 px-6">
				<div className="max-w-6xl mx-auto">
					<motion.h2
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						viewport={{ once: true, margin: "-100px" }}
						className="text-4xl md:text-5xl font-bold mb-16 text-center bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent"
					>
						Featured Projects
					</motion.h2>

					<div className="grid md:grid-cols-2 gap-8">
						{projects.map((p, i) => (
							<motion.div
								key={i}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: i * 0.1 }}
								viewport={{ once: true, margin: "-100px" }}
								whileHover={{ y: -8 }}
								className="group"
							>
								<Card className="rounded-2xl overflow-hidden bg-slate-800/50 border border-slate-700 hover:border-cyan-500/50 transition-all duration-300 backdrop-blur h-full flex flex-col shadow-xl hover:shadow-2xl hover:shadow-cyan-500/20">
									{/* Image */}
									<div className="relative overflow-hidden h-56 bg-gradient-to-br from-slate-700 to-slate-900">
										{p.image ? (
											<Image
												src={p.image}
												alt={p.title}
												width={800}
												height={400}
												className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
											/>
										) : (
											<div className="w-full h-full flex items-center justify-center text-6xl opacity-20">
												{p.title.charAt(0)}
											</div>
										)}
									</div>

									<CardContent className="p-6 flex flex-col flex-grow">
										<h3 className="text-2xl font-bold mb-3 text-white">
											{p.title}
										</h3>
										<p className="text-slate-300 mb-4 flex-grow text-sm leading-relaxed">
											{p.desc}
										</p>

										{/* Tags */}
										<div className="flex flex-wrap gap-2 mb-4">
											{p.tags.map((tag, j) => (
												<span
													key={j}
													className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded border border-blue-500/30"
												>
													{tag}
												</span>
											))}
										</div>

										<a
											href={p.link}
											target="_blank"
											rel="noopener noreferrer"
											className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-semibold transition-colors group/link"
										>
											View Project →
										</a>
									</CardContent>
								</Card>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* Experience Section */}
			<section
				id="experience"
				className="py-20 px-6 bg-slate-900/50 border-y border-slate-800"
			>
				<div className="max-w-4xl mx-auto">
					<motion.h2
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						viewport={{ once: true, margin: "-100px" }}
						className="text-4xl md:text-5xl font-bold mb-16 text-center bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent"
					>
						Professional Experience
					</motion.h2>

					<div className="space-y-6">
						{experience.map((exp, i) => (
							<motion.div
								key={i}
								initial={{ opacity: 0, x: -20 }}
								whileInView={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.6, delay: i * 0.1 }}
								viewport={{ once: true, margin: "-100px" }}
								whileHover={{ x: 10 }}
								className="bg-slate-800/50 border border-slate-700 hover:border-cyan-500/50 rounded-xl p-8 backdrop-blur transition-all duration-300"
							>
								<div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-4">
									<div>
										<h3 className="text-xl font-bold text-white">{exp.role}</h3>
										<p className="text-slate-300">{exp.company}</p>
									</div>
									<span className="text-cyan-400 font-semibold whitespace-nowrap">
										{exp.period}
									</span>
								</div>
								<p className="text-slate-300 leading-relaxed">
									{exp.description}
								</p>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* Contact Section */}
			<section id="contact" className="py-20 px-6">
				<div className="max-w-4xl mx-auto text-center">
					<motion.h2
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						viewport={{ once: true, margin: "-100px" }}
						className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent"
					>
						Let's Connect
					</motion.h2>

					<motion.p
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.1 }}
						viewport={{ once: true, margin: "-100px" }}
						className="text-lg text-slate-300 mb-12 max-w-2xl mx-auto"
					>
						I'm always interested in hearing about exciting projects and
						opportunities. Whether you have a question or just want to say
						hello, feel free to reach out!
					</motion.p>

					<motion.div
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						transition={{ duration: 0.6, delay: 0.2 }}
						viewport={{ once: true, margin: "-100px" }}
						className="flex flex-wrap gap-4 justify-center"
					>
						<Button
							asChild
							className="bg-slate-800 hover:bg-slate-700 border border-slate-600 text-white px-6 py-3 rounded-lg"
						>
							<a href="mailto:akashdamle07@gmail.com">📧 Email</a>
						</Button>
						<Button
							asChild
							className="bg-slate-800 hover:bg-slate-700 border border-slate-600 text-white px-6 py-3 rounded-lg"
						>
							<a
								href="https://github.com/code-kasha"
								target="_blank"
								rel="noopener noreferrer"
							>
								💻 GitHub
							</a>
						</Button>
						<Button
							asChild
							className="bg-slate-800 hover:bg-slate-700 border border-slate-600 text-white px-6 py-3 rounded-lg"
						>
							<a
								href="https://www.linkedin.com/in/akash-damle-58a808258/"
								target="_blank"
								rel="noopener noreferrer"
							>
								💼 LinkedIn
							</a>
						</Button>
						<Button
							asChild
							className="bg-cyan-500 hover:bg-cyan-600 text-black font-semibold px-6 py-3 rounded-lg"
						>
							<a href="/Resume.pdf" target="_blank">
								📄 Resume
							</a>
						</Button>
					</motion.div>
				</div>
			</section>

			{/* Footer */}
			<motion.footer
				initial={{ opacity: 0 }}
				whileInView={{ opacity: 1 }}
				viewport={{ once: true }}
				className="border-t border-slate-800 py-8 px-6 text-center text-slate-400 text-sm"
			>
				<p>
					© 2026 Akash Damle. All rights reserved. Built with passion for clean
					code.
				</p>
			</motion.footer>
		</div>
	)
}
