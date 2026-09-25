import { ImageResponse } from "next/og"
import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { contact, identity } from "@/lib/profile"
import type { Post } from "@/lib/posts"

export const postCardSize = { width: 1200, height: 630 }

/**
 * Renders a post's social card in the same palette and layout as the site card.
 * @param post - The post to show, or `undefined` for a plain site card.
 * @returns The card as a PNG response.
 */
export async function renderPostCard(post: Post | undefined): Promise<ImageResponse> {
	const icon = await readFile(join(process.cwd(), "public/icon.svg"))
	const iconUrl = `data:image/svg+xml;base64,${icon.toString("base64")}`
	const host = new URL(contact.site).hostname.replace(/^www\./, "")

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
					{/* eslint-disable-next-line @next/next/no-img-element */}
					<img src={iconUrl} width={64} height={64} alt="" />
					<div style={{ fontSize: 24, color: "#567A65" }}>{`${host}/blog`}</div>
				</div>
				<div style={{ display: "flex", flexDirection: "column" }}>
					<div style={{ fontSize: post && post.title.length > 60 ? 60 : 72, fontWeight: 700, letterSpacing: -2, lineHeight: 1.12 }}>
						{post?.title ?? identity.name}
					</div>
					{post && (
						<div style={{ fontSize: 28, lineHeight: 1.45, maxWidth: 1000, marginTop: 24, color: "#4A5A57" }}>
							{post.description}
						</div>
					)}
				</div>
				<div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid #CBD3CB", paddingTop: 22, fontSize: 22 }}>
					<div>{identity.name}</div>
					{post && <div style={{ color: "#567A65" }}>{`${post.readingMinutes} min read`}</div>}
				</div>
			</div>
		),
		postCardSize,
	)
}
