import type { Job, JobRow } from "./job"

const dateFormatter = new Intl.DateTimeFormat("es-CL", {
  day: "numeric",
  month: "long",
  year: "numeric",
})

export const JOB_COLUMNS =
  "id, slug, title, summary, description, status, location, modality, seniority, employment_type, tags, responsibilities, benefits, requirements, apply_url, apply_email, apply_linkedin_url, apply_notion_url, salary_min, salary_max, currency, created_at, published_at"

export function normalizeMultiline(value: string | null | undefined): string[] {
  return (value ?? "")
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean)
}

export function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return []
  return value.filter((item): item is string => typeof item === "string")
}

export function mapJob(row: Record<string, unknown>): Job {
  return {
    id: String(row.id),
    slug: String(row.slug),
    title: String(row.title),
    summary: typeof row.summary === "string" ? row.summary : null,
    description: typeof row.description === "string" ? row.description : null,
    status: typeof row.status === "string" ? row.status : "draft",
    location: typeof row.location === "string" ? row.location : null,
    modality: typeof row.modality === "string" ? row.modality : null,
    seniority: typeof row.seniority === "string" ? row.seniority : null,
    employmentType: typeof row.employment_type === "string" ? row.employment_type : null,
    tags: asStringArray(row.tags),
    responsibilities: normalizeMultiline(typeof row.responsibilities === "string" ? row.responsibilities : null),
    benefits: normalizeMultiline(typeof row.benefits === "string" ? row.benefits : null),
    requirements: normalizeMultiline(typeof row.requirements === "string" ? row.requirements : null),
    applyUrl: typeof row.apply_url === "string" ? row.apply_url : null,
    applyEmail: typeof row.apply_email === "string" ? row.apply_email : null,
    applyLinkedInUrl: typeof row.apply_linkedin_url === "string" ? row.apply_linkedin_url : null,
    applyNotionUrl: typeof row.apply_notion_url === "string" ? row.apply_notion_url : null,
    salaryMin: typeof row.salary_min === "number" ? row.salary_min : null,
    salaryMax: typeof row.salary_max === "number" ? row.salary_max : null,
    currency: typeof row.currency === "string" ? row.currency : null,
    createdAt: typeof row.created_at === "string" ? row.created_at : null,
    publishedAt: typeof row.published_at === "string" ? row.published_at : null,
  }
}

export function mapJobRow(row: JobRow): Job {
  return mapJob(row as unknown as Record<string, unknown>)
}

export function formatDateLabel(value: string | null | undefined): string {
  if (!value) return ""
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ""
  return dateFormatter.format(date)
}

export type BadgeKind = "employment" | "modality" | "seniority"

export type JobBadge = {
  label: string
  tone: string
  color: string
}

export function getBadgeLabel(kind: BadgeKind, value?: string | null): JobBadge | null {
  if (!value) return null
  const val = value.toLowerCase()

  if (kind === "employment") {
    if (val === "full time") return { label: value, tone: "#e9f8ef", color: "#1e7a46" }
    if (val === "part time") return { label: value, tone: "#fff5df", color: "#9a6700" }
    if (val === "freelance") return { label: value, tone: "#f4ebff", color: "#6e3cbc" }
  }

  if (kind === "modality") {
    if (val === "remoto") return { label: value, tone: "#e9f5ff", color: "#0d5c8f" }
    if (val === "hibrido" || val === "híbrido") return { label: value, tone: "#eef1ff", color: "#3548a8" }
    if (val === "presencial") return { label: value, tone: "#ffecef", color: "#ab2946" }
  }

  if (kind === "seniority") {
    if (val === "junior") return { label: value, tone: "#e9fbfb", color: "#0e7490" }
    if (val === "semi-senior" || val === "semisenior" || val === "semi senior") {
      return { label: value, tone: "#fff5df", color: "#9a6700" }
    }
    if (val === "senior") return { label: value, tone: "#ffecef", color: "#ab2946" }
  }

  return { label: value, tone: "#eef2f6", color: "#475467" }
}
