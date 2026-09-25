import { mkdir, readFile, writeFile } from "node:fs/promises"
import { dirname, join } from "node:path"
import type { StoredComment } from "@/lib/engagement/comments"

/**
 * Where likes and comments live. Server-only: import it from route handlers
 * and server components, never from client components.
 *
 * - Production uses Upstash Redis over its REST API (free tier via the Vercel
 *   Marketplace). It is enabled by UPSTASH_REDIS_REST_URL/TOKEN or the
 *   KV_REST_API_URL/TOKEN names that the Vercel integration sets.
 * - `next dev` without those variables uses a JSON file in .data/ so the
 *   feature can be exercised locally.
 * - Otherwise there is no store, and the UI is not rendered.
 */
export type EngagementStore = {
	getLikes(slug: string): Promise<number>
	addLike(slug: string): Promise<number>
	listComments(slug: string): Promise<StoredComment[]>
	addComment(comment: StoredComment): Promise<void>
	getComment(id: string): Promise<StoredComment | null>
	setStatus(id: string, status: StoredComment["status"]): Promise<StoredComment | null>
	listPending(): Promise<StoredComment[]>
	/** Counts one hit against `key`; returns the count within the current window. */
	hit(key: string, windowSeconds: number): Promise<number>
}

const redisUrl = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN

/**
 * Picks the store for this environment.
 * @returns The Redis store, the local file store under `next dev`, or `null` when neither is available.
 */
export function getStore(): EngagementStore | null {
	if (redisUrl && redisToken) return redisStore(redisUrl, redisToken)
	if (process.env.NODE_ENV !== "production") return fileStore
	return null
}

/**
 * Reports whether likes and comments can work here; pages use it to decide whether to render them.
 * @returns `true` when a store is available.
 */
export function isEngagementEnabled(): boolean {
	return getStore() !== null
}

// ---------------------------------------------------------------------------
// Upstash Redis (REST)

const key = {
	likes: (slug: string) => `blog:likes:${slug}`,
	commentIds: (slug: string) => `blog:comments:${slug}`,
	comment: (id: string) => `blog:comment:${id}`,
	pending: "blog:pending",
	hits: (name: string) => `blog:hits:${name}`,
}

function redisStore(url: string, token: string): EngagementStore {
	async function run<T>(...command: (string | number)[]): Promise<T> {
		const response = await fetch(url, {
			method: "POST",
			headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
			body: JSON.stringify(command),
			cache: "no-store",
		})
		const data = (await response.json()) as { result?: T; error?: string }
		if (!response.ok || data.error) {
			throw new Error(`Redis ${command[0]} failed: ${data.error ?? response.status}`)
		}
		return data.result as T
	}

	async function readComments(ids: string[]): Promise<StoredComment[]> {
		if (ids.length === 0) return []
		const values = await run<(string | null)[]>("MGET", ...ids.map(key.comment))
		return values.filter((v): v is string => v !== null).map((v) => JSON.parse(v) as StoredComment)
	}

	return {
		async getLikes(slug) {
			return Number((await run<string | null>("GET", key.likes(slug))) ?? 0)
		},
		async addLike(slug) {
			return run<number>("INCR", key.likes(slug))
		},
		async listComments(slug) {
			return readComments(await run<string[]>("LRANGE", key.commentIds(slug), 0, -1))
		},
		async addComment(comment) {
			await run("SET", key.comment(comment.id), JSON.stringify(comment))
			await run("RPUSH", key.commentIds(comment.slug), comment.id)
			if (comment.status === "pending") await run("SADD", key.pending, comment.id)
		},
		async getComment(id) {
			const value = await run<string | null>("GET", key.comment(id))
			return value ? (JSON.parse(value) as StoredComment) : null
		},
		async setStatus(id, status) {
			const comment = await this.getComment(id)
			if (!comment) return null
			const updated = { ...comment, status }
			await run("SET", key.comment(id), JSON.stringify(updated))
			await run(status === "pending" ? "SADD" : "SREM", key.pending, id)
			return updated
		},
		async listPending() {
			return readComments(await run<string[]>("SMEMBERS", key.pending))
		},
		async hit(name, windowSeconds) {
			const count = await run<number>("INCR", key.hits(name))
			if (count === 1) await run("EXPIRE", key.hits(name), windowSeconds)
			return count
		},
	}
}

// ---------------------------------------------------------------------------
// Local JSON file (next dev only)

type FileData = { likes: Record<string, number>; comments: StoredComment[] }

const filePath = join(process.cwd(), ".data", "engagement.json")
const fileHits = new Map<string, { count: number; resetAt: number }>()

async function readFileData(): Promise<FileData> {
	try {
		return JSON.parse(await readFile(filePath, "utf8")) as FileData
	} catch {
		return { likes: {}, comments: [] }
	}
}

async function writeFileData(data: FileData): Promise<void> {
	await mkdir(dirname(filePath), { recursive: true })
	await writeFile(filePath, JSON.stringify(data, null, 2))
}

const fileStore: EngagementStore = {
	async getLikes(slug) {
		return (await readFileData()).likes[slug] ?? 0
	},
	async addLike(slug) {
		const data = await readFileData()
		data.likes[slug] = (data.likes[slug] ?? 0) + 1
		await writeFileData(data)
		return data.likes[slug]
	},
	async listComments(slug) {
		return (await readFileData()).comments.filter((c) => c.slug === slug)
	},
	async addComment(comment) {
		const data = await readFileData()
		data.comments.push(comment)
		await writeFileData(data)
	},
	async getComment(id) {
		return (await readFileData()).comments.find((c) => c.id === id) ?? null
	},
	async setStatus(id, status) {
		const data = await readFileData()
		const comment = data.comments.find((c) => c.id === id)
		if (!comment) return null
		comment.status = status
		await writeFileData(data)
		return comment
	},
	async listPending() {
		return (await readFileData()).comments.filter((c) => c.status === "pending")
	},
	async hit(name, windowSeconds) {
		const now = Date.now()
		const entry = fileHits.get(name)
		if (!entry || entry.resetAt <= now) {
			fileHits.set(name, { count: 1, resetAt: now + windowSeconds * 1000 })
			return 1
		}
		entry.count += 1
		return entry.count
	},
}
