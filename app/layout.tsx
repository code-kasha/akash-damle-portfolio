import type { Metadata, Viewport } from "next"
import { Geist_Mono, Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { SiteHeader } from "@/components/site-header"
import { DEFAULT_THEME, THEME_INIT_SCRIPT } from "@/lib/themes"
import { contact, identity, metaDescription } from "@/lib/profile"

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

const TITLE = `${identity.name} — ${identity.title}`

export const metadata: Metadata = {
	metadataBase: new URL(contact.site),
	title: {
		default: TITLE,
		template: `%s — ${identity.name}`,
	},
	description: `${metaDescription} Projects, experience and contact.`,
	alternates: { canonical: "/" },
	openGraph: {
		type: "website",
		url: "/",
		siteName: identity.name,
		title: TITLE,
		description: metaDescription,
	},
	twitter: {
		card: "summary_large_image",
		title: TITLE,
		description: metaDescription,
		images: [{ url: "/opengraph-image", alt: TITLE }],
	},
	robots: { index: true, follow: true },
	manifest: "/site.webmanifest",
	// One fixed icon. It deliberately does not follow the theme: no `media`
	// on the links and nothing in script touches them.
	icons: {
		icon: [
			{ url: "/favicon.ico", sizes: "32x32" },
			{ url: "/icon.svg", type: "image/svg+xml" },
		],
		apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
	},
}

export const viewport: Viewport = {
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "#F4F3F0" },
		{ media: "(prefers-color-scheme: dark)", color: "#000000" },
	],
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
			className={`${inter.variable} ${geistMono.variable}`}
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
