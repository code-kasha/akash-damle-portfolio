import type { Metadata, Viewport } from "next"
import { Geist_Mono, Inter, Space_Grotesk } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { SiteHeader } from "@/components/site-header"
import { DEFAULT_THEME, THEME_INIT_SCRIPT } from "@/lib/themes"

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

// Display face for the two light themes. Geometric sans, deliberately not
// a calligraphic/serif face.
const displayAlt = Space_Grotesk({
	subsets: ["latin"],
	variable: "--font-display-alt",
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
}

export const viewport: Viewport = {
	// Matches the default (acid) theme's canvas.
	themeColor: "#000000",
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html
			lang="en"
			data-theme={DEFAULT_THEME}
			suppressHydrationWarning
			className={`${inter.variable} ${geistMono.variable} ${displayAlt.variable}`}
		>
			<head>
				{/* Applies the stored theme before first paint, so switching
				    themes survives a reload without a flash of the default. */}
				<script
					dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }}
				/>
			</head>
			<body className="min-h-svh">
				<ThemeProvider>
					<a
						href="#main"
						className="bg-primary text-primary-foreground focus:ring-ring sr-only rounded-b-lg px-4 py-2 text-sm font-semibold focus:not-sr-only focus:absolute focus:left-1/2 focus:top-0 focus:z-[70] focus:-translate-x-1/2"
					>
						Skip to content
					</a>
					<SiteHeader />
					{children}
				</ThemeProvider>
			</body>
		</html>
	)
}
