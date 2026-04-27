"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Image from "next/image"

export default function Portfolio() {
	const projects = [
		{
			title: "XO Anime",
			desc: "Multi-source anime platform aggregating 6 APIs with optimized backend handling 2000+ users and custom M3U8 streaming.",
			link: "https://github.com/code-kasha/xoanime",
			image: "/xo.png",
		},
		{
			title: "Shoppy Globe",
			desc: "E-commerce backend with product management, cart, orders, and scalable API design.",
			link: "https://github.com/code-kasha/is_shoppy_globe",
			image: "/shoppy-globe.png",
		},
		{
			title: "Online Library",
			desc: "Backend system for managing books, users, and borrowing workflows with clean architecture.",
			link: "https://github.com/code-kasha/online-library",
			image: "/online-library.png",
		},
		{
			title: "Youtube Clone",
			desc: "A full-stack YouTube clone built with Django REST Framework and React, featuring video uploads, user authentication, and real-time comments.",
			link: "https://github.com/code-kasha/yt-clone",
			image: "/yt-clone.png",
		},
	]

	return (
		<div className="min-h-screen bg-linear-to-br from-black via-zinc-900 to-black text-white p-6">
			<div className="max-w-6xl mx-auto">
				{/* Hero */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					className="mb-16"
				>
					<h1 className="text-5xl font-bold mb-4 tracking-tight">
						Akash Damle
					</h1>
					<p className="text-lg text-zinc-400 max-w-2xl">
						Backend Developer (Django, Node.js) with 6+ years of experience
						building scalable APIs and high-performance systems.
					</p>
					<div className="mt-6 flex gap-4">
						<Button asChild className="rounded-xl">
							<a href="https://github.com/code-kasha" target="_blank">
								GitHub
							</a>
						</Button>
					</div>
				</motion.div>

				{/* Projects */}
				<div className="grid md:grid-cols-2 gap-8">
					{projects.map((p, i) => (
						<motion.div
							key={i}
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: i * 0.1 }}
						>
							<Card className="rounded-3xl overflow-hidden bg-zinc-900/70 backdrop-blur border border-zinc-800 hover:border-zinc-700 transition-all duration-300 shadow-xl hover:shadow-2xl">
								{/* Image */}
								<div className="overflow-hidden">
									<Image
										src={p.image}
										alt={p.title}
										width={800}
										height={400}
										className="w-full h-56 object-cover hover:scale-105 transition-transform duration-500"
									/>
								</div>

								<CardContent className="p-6">
									<h2 className="text-2xl font-semibold mb-2 text-gray-200">
										{p.title}
									</h2>
									<p className="text-gray-100 mb-4 leading-relaxed">{p.desc}</p>
									<a
										href={p.link}
										target="_blank"
										className="text-blue-400 hover:text-blue-300 transition-colors"
									>
										View Project →
									</a>
								</CardContent>
							</Card>
						</motion.div>
					))}
				</div>

				{/* Footer */}
				<div className="mt-20 text-center text-zinc-300">
					<p>2026, Akash Damle - akash.damle@outlook.com</p>
				</div>
			</div>
		</div>
	)
}
