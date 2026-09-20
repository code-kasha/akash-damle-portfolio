import type { Metadata } from "next"
import { Geist, Geist_Mono, Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
	display: "swap",
})

const geistSans = Geist({
	subsets: ["latin"],
	variable: "--font-geist-sans",
	display: "swap",
})

const geistMono = Geist_Mono({
	subsets: ["latin"],
	variable: "--font-geist-mono",
	display: "swap",
})

export const metadata: Metadata = {
	title: "Akash Damle",
	description:
		"Backend Developer Portfolio showcasing projects and experience in Django and Node.js.",
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html
			lang="en"
			className={`${inter.variable} ${geistSans.variable} ${geistMono.variable}`}
		>
			<body>{children}</body>
		</html>
	)
}
