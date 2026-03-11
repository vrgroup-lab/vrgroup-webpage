export type Job = {
  id: string
  slug: string
  title: string
  summary: string | null
  description: string | null
  status: string
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
