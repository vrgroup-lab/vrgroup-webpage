import { getSupabaseAdmin } from "@/lib/supabase/server"

export type JobSummary = {
  id: string
  title: string
  slug: string
  status: string
  created_at: string
}

export type ContactSummary = {
  id: string
  nombre: string
  email: string
  empresa: string | null
  status: string
  created_at: string
}

export type DashboardData = {
  jobs: { total: number; published: number; draft: number; archived: number }
  contacts: { total: number; received: number; last7days: number }
  users: { total: number; admin: number; editor: number; viewer: number }
  recentJobs: JobSummary[]
  recentContacts: ContactSummary[]
}

export async function loadDashboardData(): Promise<DashboardData> {
  const supabase = getSupabaseAdmin()

  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()

  const [jobsAll, jobsPublished, jobsDraft, jobsArchived, contactsAll, contactsReceived, contactsRecent, users, recentJobs, recentContacts] =
    await Promise.all([
      supabase.from("jobs").select("id", { count: "exact", head: true }),
      supabase.from("jobs").select("id", { count: "exact", head: true }).eq("status", "published"),
      supabase.from("jobs").select("id", { count: "exact", head: true }).eq("status", "draft"),
      supabase.from("jobs").select("id", { count: "exact", head: true }).eq("status", "archived"),
      supabase.from("contact_submissions").select("id", { count: "exact", head: true }),
      supabase.from("contact_submissions").select("id", { count: "exact", head: true }).eq("status", "received"),
      supabase
        .from("contact_submissions")
        .select("id", { count: "exact", head: true })
        .gte("created_at", sevenDaysAgo),
      supabase.from("user_profiles").select("role"),
      supabase
        .from("jobs")
        .select("id, title, slug, status, created_at")
        .order("created_at", { ascending: false })
        .limit(5),
      supabase
        .from("contact_submissions")
        .select("id, nombre, email, empresa, status, created_at")
        .order("created_at", { ascending: false })
        .limit(5),
    ])

  const usersRows = (users.data ?? []) as Array<{ role: string }>

  return {
    jobs: {
      total: jobsAll.count ?? 0,
      published: jobsPublished.count ?? 0,
      draft: jobsDraft.count ?? 0,
      archived: jobsArchived.count ?? 0,
    },
    contacts: {
      total: contactsAll.count ?? 0,
      received: contactsReceived.count ?? 0,
      last7days: contactsRecent.count ?? 0,
    },
    users: {
      total: usersRows.length,
      admin: usersRows.filter((u) => u.role === "admin").length,
      editor: usersRows.filter((u) => u.role === "editor").length,
      viewer: usersRows.filter((u) => u.role === "viewer").length,
    },
    recentJobs: (recentJobs.data ?? []) as JobSummary[],
    recentContacts: (recentContacts.data ?? []) as ContactSummary[],
  }
}
