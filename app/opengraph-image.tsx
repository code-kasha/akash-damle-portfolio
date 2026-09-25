import { ImageResponse } from "next/og"
import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { contact, identity, summary } from "@/lib/profile"

export const alt = `${identity.name} — ${identity.title}`
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

/**
 * Render the shared portfolio card using the existing favicon and profile facts.
 * @returns The portfolio card as a PNG response.
 */
export default async function OpenGraphImage() {
	const icon = await readFile(join(process.cwd(), "public/icon.svg"))
	const iconUrl = `data:image/svg+xml;base64,${icon.toString("base64")}`

	return new ImageResponse(
		(
			<div
				style={{
					width: "100%", height: "100%", display: "flex",
					flexDirection: "column", justifyContent: "space-between",
					padding: "56px 64px", background: "#F4F3F0", color: "#263331",
					borderTop: "12px solid #567A65", fontFamily: "sans-serif",
				}}
			>
				<div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
					{/* ImageResponse embeds the existing SVG without a network request. */}
					{/* eslint-disable-next-line @next/next/no-img-element */}
					<img src={iconUrl} width={76} height={76} alt="" />
					<div style={{ fontSize: 24, color: "#567A65" }}>{new URL(contact.site).hostname.replace(/^www\./, "")}</div>
				</div>
				<div style={{ display: "flex", flexDirection: "column" }}>
					<div style={{ fontSize: 88, fontWeight: 700, letterSpacing: -4, lineHeight: 1.1 }}>{identity.name}</div>
					<div style={{ fontSize: 38, color: "#567A65", marginTop: 16 }}>{identity.title}</div>
					<div style={{ fontSize: 28, lineHeight: 1.45, maxWidth: 920, marginTop: 28 }}>{summary}</div>
				</div>
				<div style={{ display: "flex", borderTop: "1px solid #CBD3CB", paddingTop: 22, fontSize: 22 }}>
					{identity.availability}
				</div>
			</div>
		),
		size,
	)
}
