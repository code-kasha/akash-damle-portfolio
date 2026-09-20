import type { Metadata, Viewport } from "next"
import { Geist_Mono, Inter } from "next/font/google"
import "./globals.css"
import { SiteHeader } from "@/components/site-header"

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-sans",
	display: "swap",
})

const geistMono = Geist_Mono({
	subsets: ["latin"],
	variable: "--font-mono",
	display: "swap",
})

export const metadata: Metadata = {
	metadataBase: new URL("https://www.akashdamle.in"),
	title: {
		default: "Akash Damle — Backend Engineer",
		template: "%s — Akash Damle",
	},
	description:
		"Backend engineer with 6+ years building scalable systems in Django, Node.js and TypeScript. Case studies, experience and contact.",
	alternates: { canonical: "/" },
	openGraph: {
		type: "website",
		url: "/",
		siteName: "Akash Damle",
		title: "Akash Damle — Backend Engineer",
		description:
			"Backend engineer with 6+ years building scalable systems in Django, Node.js and TypeScript.",
	},
	twitter: {
		card: "summary_large_image",
		title: "Akash Damle — Backend Engineer",
		description:
			"Backend engineer with 6+ years building scalable systems in Django, Node.js and TypeScript.",
	},
	robots: { index: true, follow: true },
	manifest: "/site.webmanifest",
	// One palette, so one icon: no media queries and no script needed.
	// favicon.ico is the fallback for anything that will not take the SVG.
	icons: {
		icon: [
			{ url: "/favicon.ico", sizes: "32x32" },
			{ url: "/icon.svg", type: "image/svg+xml" },
		],
		apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
	},
}

export const viewport: Viewport = {
	// Matches the paper canvas; there is only one palette now.
	themeColor: "#F3F3F0",
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en" className={`${inter.variable} ${geistMono.variable}`}>
			<body className="min-h-svh">
				<a
					href="#main"
					className="bg-primary text-primary-foreground focus:ring-ring sr-only rounded-b-lg px-4 py-2 text-sm font-semibold focus:not-sr-only focus:absolute focus:left-1/2 focus:top-0 focus:z-[70] focus:-translate-x-1/2"
				>
					Skip to content
				</a>
				<SiteHeader />
				{children}
			</body>
		</html>
	)
}
