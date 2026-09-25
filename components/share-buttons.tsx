"use client"

import * as React from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import {
	Link01Icon,
	Linkedin01Icon,
	NewTwitterIcon,
	Share08Icon,
	Tick02Icon,
} from "@hugeicons/core-free-icons"
import { Button } from "@/components/ui/button"

type ShareButtonsProps = {
	/** Absolute canonical URL of the post. */
	url: string
	title: string
}

/**
 * Share controls for a post: the device's share sheet where supported,
 * then copy link, LinkedIn and X. No third-party scripts are loaded.
 * @param props - Component props.
 * @param props.url - Absolute canonical URL of the post.
 * @param props.title - Post title, used as the share text.
 * @returns The share button row.
 */
export function ShareButtons({ url, title }: ShareButtonsProps) {
	const [copied, setCopied] = React.useState(false)
	const [canShare, setCanShare] = React.useState(false)

	React.useEffect(() => {
		// Decided after mount: navigator does not exist during prerendering.
		// eslint-disable-next-line react-hooks/set-state-in-effect
		setCanShare(typeof navigator.share === "function")
	}, [])

	async function share() {
		try {
			await navigator.share({ title, url })
		} catch {
			// Closing the share sheet rejects; nothing to do.
		}
	}

	async function copy() {
		try {
			await navigator.clipboard.writeText(url)
			setCopied(true)
			window.setTimeout(() => setCopied(false), 2000)
		} catch {
			window.prompt("Copy this link:", url)
		}
	}

	const encodedUrl = encodeURIComponent(url)
	const encodedTitle = encodeURIComponent(title)
	const pill = "h-9 rounded-full px-4 font-mono text-xs tracking-wider uppercase"

	return (
		<div className="flex flex-wrap items-center gap-2">
			{canShare && (
				<Button type="button" variant="outline" className={pill} onClick={share}>
					<HugeiconsIcon icon={Share08Icon} strokeWidth={2} />
					Share
				</Button>
			)}
			<Button type="button" variant="outline" className={pill} onClick={copy}>
				<HugeiconsIcon icon={copied ? Tick02Icon : Link01Icon} strokeWidth={2} />
				<span aria-live="polite">{copied ? "Copied" : "Copy link"}</span>
			</Button>
			<Button asChild variant="outline" className={pill}>
				<a
					href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
					target="_blank"
					rel="noopener noreferrer"
				>
					<HugeiconsIcon icon={Linkedin01Icon} strokeWidth={2} />
					LinkedIn
				</a>
			</Button>
			<Button asChild variant="outline" className={pill}>
				<a
					href={`https://x.com/intent/post?url=${encodedUrl}&text=${encodedTitle}`}
					target="_blank"
					rel="noopener noreferrer"
				>
					<HugeiconsIcon icon={NewTwitterIcon} strokeWidth={2} />
					Post on X
				</a>
			</Button>
		</div>
	)
}
