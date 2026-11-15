"use client"

import * as React from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import { Copy01Icon, Tick02Icon } from "@hugeicons/core-free-icons"

type CopyCommandProps = {
	/** The shell command shown and copied, without the prompt sign. */
	command: string
}

/**
 * A one-line shell command in a terminal-style box with a copy button.
 * @param props - Component props.
 * @param props.command - The command to show and copy.
 * @returns The command box.
 */
export function CopyCommand({ command }: CopyCommandProps) {
	const [copied, setCopied] = React.useState(false)

	async function copy() {
		try {
			await navigator.clipboard.writeText(command)
			setCopied(true)
			window.setTimeout(() => setCopied(false), 2000)
		} catch {
			window.prompt("Copy this command:", command)
		}
	}

	return (
		<div className="flex w-full max-w-md items-center justify-between gap-4 rounded-2xl border border-white/10 bg-[#0d1117] py-3 pr-3 pl-5 font-mono text-sm text-[#e6edf3] shadow-lg">
			<code className="truncate">
				<span aria-hidden className="mr-3 text-[#7d8590] select-none">
					$
				</span>
				{command}
			</code>
			<button
				type="button"
				onClick={copy}
				aria-label={copied ? "Copied" : `Copy: ${command}`}
				className="inline-flex h-9 shrink-0 items-center gap-2 rounded-full px-3 text-xs tracking-wider text-[#7d8590] uppercase transition-colors hover:bg-white/10 hover:text-[#e6edf3]"
			>
				<HugeiconsIcon icon={copied ? Tick02Icon : Copy01Icon} size={16} strokeWidth={1.8} />
				<span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
			</button>
		</div>
	)
}
