import { JOB_COLUMNS, mapJob, type Job } from "@vrgroup/domain"
import { getSupabasePublic } from "@/lib/supabase/public"

export async function listPublishedJobs(): Promise<Job[]> {
  const client = getSupabasePublic()
  if (!client) return []

  const { data, error } = await client
    .from("jobs")
    .select(JOB_COLUMNS)
    .eq("status", "published")
    .order("published_at", { ascending: false, nullsFirst: false })
    .order("created_at", { ascending: false })

  if (error || !data) {
    if (error) console.error("Error fetching published jobs", error)
    return []
  }

  return data.map((row) => mapJob(row as Record<string, unknown>))
}

export async function getPublishedJobBySlug(slug: string): Promise<Job | null> {
  const client = getSupabasePublic()
  if (!client) return null

  const { data, error } = await client
    .from("jobs")
    .select(JOB_COLUMNS)
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle()

  if (error || !data) {
    return null
  }

  return mapJob(data as Record<string, unknown>)
}
