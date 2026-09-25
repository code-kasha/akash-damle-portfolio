import type { MDXComponents } from "mdx/types"
import Image from "next/image"
import { cn } from "@/lib/utils"

/**
 * Typography for blog bodies in content/blog. Uses the same tokens, mono
 * labels and border-t section rhythm as the case-study pages, so posts read
 * as part of the site rather than a separate theme.
 */
const components: MDXComponents = {
	h2: ({ className, ...props }) => (
		<h2
			className={cn(
				"font-display mt-16 mb-6 border-t pt-10 text-2xl leading-snug font-bold tracking-tight text-balance sm:text-3xl",
				className,
			)}
			{...props}
		/>
	),
	h3: ({ className, ...props }) => (
		<h3
			className={cn("mt-10 mb-4 text-lg font-semibold tracking-tight", className)}
			{...props}
		/>
	),
	p: ({ className, ...props }) => (
		<p className={cn("my-5 text-lg leading-relaxed", className)} {...props} />
	),
	a: ({ className, ...props }) => (
		<a
			className={cn(
				"decoration-primary hover:text-primary underline underline-offset-4 transition-colors",
				className,
			)}
			{...props}
		/>
	),
	ul: ({ className, ...props }) => (
		<ul
			className={cn(
				"marker:text-primary my-5 list-disc space-y-3 pl-6 text-lg leading-relaxed",
				className,
			)}
			{...props}
		/>
	),
	ol: ({ className, ...props }) => (
		<ol
			className={cn(
				"marker:text-muted-foreground my-5 list-decimal space-y-3 pl-6 text-lg leading-relaxed marker:font-mono",
				className,
			)}
			{...props}
		/>
	),
	strong: ({ className, ...props }) => (
		<strong className={cn("text-foreground font-semibold", className)} {...props} />
	),
	em: ({ className, ...props }) => (
		<em className={cn("text-muted-foreground", className)} {...props} />
	),
	hr: ({ className, ...props }) => (
		<hr className={cn("my-12 border-t", className)} {...props} />
	),
	blockquote: ({ className, ...props }) => (
		<blockquote
			className={cn(
				"border-primary text-muted-foreground my-6 border-l-2 pl-5 italic",
				className,
			)}
			{...props}
		/>
	),
	code: ({ className, ...props }) => (
		<code
			className={cn(
				"bg-muted rounded-md px-1.5 py-0.5 font-mono text-[0.85em] break-words",
				className,
			)}
			{...props}
		/>
	),
	pre: ({ className, ...props }) => (
		<pre
			className={cn(
				"bg-muted my-6 overflow-x-auto rounded-2xl border p-5 font-mono text-sm leading-relaxed",
				"[&_code]:rounded-none [&_code]:bg-transparent [&_code]:p-0 [&_code]:text-[length:inherit]",
				className,
			)}
			{...props}
		/>
	),
	// Tables scroll sideways on narrow screens instead of squeezing the page.
	table: ({ className, ...props }) => (
		<div className="my-8 overflow-x-auto rounded-2xl border">
			<table className={cn("w-full border-collapse text-left text-sm [&_tr:last-child_td]:border-b-0", className)} {...props} />
		</div>
	),
	th: ({ className, ...props }) => (
		<th
			className={cn(
				"text-muted-foreground border-b px-4 py-3 font-mono text-xs font-normal tracking-widest uppercase",
				className,
			)}
			{...props}
		/>
	),
	td: ({ className, ...props }) => (
		<td className={cn("border-b px-4 py-3 align-top leading-relaxed", className)} {...props} />
	),
	// Markdown images sit inside a <p>, so the figure is built from spans; the
	// markdown title becomes the caption. The width and height only reserve
	// space: h-auto lets the file's own aspect ratio win once it loads.
	img: ({ src, alt, title }) => (
		<span className="my-8 block">
			<Image
				src={typeof src === "string" ? src : ""}
				alt={alt ?? ""}
				width={1200}
				height={675}
				sizes="(min-width: 48rem) 48rem, 100vw"
				className="bg-muted h-auto w-full rounded-2xl border"
			/>
			{title && (
				<span className="text-muted-foreground mt-3 block text-sm leading-relaxed">{title}</span>
			)}
		</span>
	),
}

/**
 * Supplies the site's styled elements to every MDX file (required by `@next/mdx`).
 * @returns The component map for MDX rendering.
 */
export function useMDXComponents(): MDXComponents {
	return components
}
