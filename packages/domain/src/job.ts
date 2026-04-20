export type JobStatus = "draft" | "published" | "archived"

export type Job = {
  id: string
  slug: string
  title: string
  summary: string | null
  description: string | null
  status: JobStatus | string
  location: string | null
  modality: string | null
  seniority: string | null
  employmentType: string | null
  tags: string[]
  responsibilities: string[]
  benefits: string[]
  requirements: string[]
  applyUrl: string | null
  applyEmail: string | null
  applyLinkedInUrl: string | null
  applyNotionUrl: string | null
  salaryMin: number | null
  salaryMax: number | null
  currency: string | null
  createdAt: string | null
  publishedAt: string | null
}

export type JobRow = {
  id: string
  slug: string
  title: string
  summary: string | null
  description: string | null
  status: string
  location: string | null
  modality: string | null
  seniority: string | null
  employment_type: string | null
  tags: string[] | null
  responsibilities: string | null
  benefits: string | null
  requirements: string | null
  apply_url: string | null
  apply_email: string | null
  apply_linkedin_url: string | null
  apply_notion_url: string | null
  salary_min: number | null
  salary_max: number | null
  currency: string | null
  created_at: string
  published_at: string | null
}
