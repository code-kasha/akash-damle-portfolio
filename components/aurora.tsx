/**
 * Ambient background: three drifting colour blobs plus a static grain
 * overlay. Both are driven by per-theme CSS variables (--mesh-*,
 * --grain-opacity), so the mood changes with the palette without any
 * JavaScript. Animation is CSS-only and disabled under reduced-motion.
 */
export function Aurora({ className }: { className?: string }) {
	return (
		<div
			aria-hidden
			className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ""}`}
		>
			<div
				className="aurora-blob absolute -top-1/3 left-[-10%] size-[46rem] rounded-full blur-[110px]"
				style={{ background: "var(--mesh-1)" }}
			/>
			<div
				className="aurora-blob absolute -right-[15%] top-[5%] size-[38rem] rounded-full blur-[120px]"
				style={{ background: "var(--mesh-2)" }}
			/>
			<div
				className="aurora-blob absolute bottom-[-25%] left-[25%] size-[42rem] rounded-full blur-[130px]"
				style={{ background: "var(--mesh-3)" }}
			/>

			<div
				className="absolute inset-0 mix-blend-overlay"
				style={{
					opacity: "var(--grain-opacity)",
					backgroundImage:
						"url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
				}}
			/>
		</div>
	)
}
