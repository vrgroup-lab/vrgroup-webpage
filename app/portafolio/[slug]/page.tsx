import { notFound } from "next/navigation"
import { SiteNavbar } from "@/components/layout/site-navbar"
import { Footer } from "@/components/layout/footer"
import { supabasePublic } from "@/lib/supabase/public"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { PortfolioGallery } from "@/components/ui/portfolio-gallery"

export const dynamic = "force-static"

type Media = {
  url: string
  alt_text?: string | null
  caption?: string | null
  is_primary?: boolean
  order_index?: number | null
  type?: string
}

type Project = {
  id: string
  slug: string
  title: string
  client_display: string | null
  summary: string | null
  problem: string | null
  solution: string | null
  outcomes: string | null
  tags: string[]
  highlights: string[]
  portfolio_media?: Media[]
  service_lines?: { id: string; slug: string; name: string } | null
}

export async function generateStaticParams() {
  const { data, error } = await supabasePublic
    .from("portfolio_projects")
    .select("slug")
    .eq("status", "public")

  if (error || !data) {
    return []
  }

  const uniqueSlugs = Array.from(new Set(data.map((item) => item.slug).filter(Boolean)))
  return uniqueSlugs.map((slug) => ({ slug }))
}

async function getProject(slug: string): Promise<Project | null> {
  const { data, error } = await supabasePublic
    .from("portfolio_projects")
    .select("*, portfolio_media(*), service_lines(id, slug, name)")
    .eq("slug", slug)
    .eq("status", "public")
    .maybeSingle()

  if (error) {
    console.error("Error fetching project", error.message)
    return null
  }
  return data
}

export default async function PortfolioDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = await getProject(slug)
  if (!project) {
    notFound()
  }

  const primaryMedia =
    project.portfolio_media?.find((m) => m.is_primary) ??
    project.portfolio_media?.sort((a, b) => (a.order_index || 0) - (b.order_index || 0))[0]

  const tags = Array.isArray(project.tags) ? project.tags : []
  const highlights = Array.isArray(project.highlights) ? project.highlights : []

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#0b1b33]">
      <SiteNavbar />

      <main className="flex-1">
        <section className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-14 space-y-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-10 items-center">
            <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-gray-50 shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
              {primaryMedia?.url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={primaryMedia.url}
                  alt={primaryMedia.alt_text || project.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="h-full min-h-[320px] flex items-center justify-center text-6xl">🚀</div>
              )}
            </div>

            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-200 bg-gray-50 text-xs font-semibold uppercase tracking-[0.12em] text-[#0b1b33]">
                Portafolio · {project.client_display || "Cliente"}
              </div>
              <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#0b1b33]">{project.title}</h1>
              <p className="text-gray-700 text-lg leading-relaxed">{project.summary}</p>

              <div className="flex flex-wrap gap-2">
                {project.service_lines?.name && (
                  <span className="px-3 py-1.5 rounded-lg bg-[#0b1b33]/5 border border-[#0b1b33]/10 text-[#0b1b33] text-xs font-semibold">
                    {project.service_lines.name}
                  </span>
                )}
                {tags.map((tag) => (
                  <span key={tag} className="px-3 py-1.5 rounded-lg bg-gray-100 border border-gray-200 text-gray-700 text-xs">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {project.problem && (
              <div className="rounded-2xl border border-gray-200 bg-white p-5 space-y-2 shadow-sm">
                <h3 className="font-display text-xl font-semibold text-[#0b1b33]">Reto</h3>
                <p className="text-gray-700 leading-relaxed">{project.problem}</p>
              </div>
            )}
            {project.solution && (
              <div className="rounded-2xl border border-gray-200 bg-white p-5 space-y-2 shadow-sm">
                <h3 className="font-display text-xl font-semibold text-[#0b1b33]">Solución</h3>
                <p className="text-gray-700 leading-relaxed">{project.solution}</p>
              </div>
            )}
          </div>

          {highlights.length ? (
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <h3 className="font-display text-xl font-semibold text-[#0b1b33] mb-3">Highlights</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {highlights.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-coral mt-1" />
                    <p className="text-gray-700 text-sm leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {project.outcomes && (
            <div className="rounded-2xl border border-gray-200 bg-white p-5 space-y-2 shadow-sm">
              <h3 className="font-display text-xl font-semibold text-[#0b1b33]">Resultados</h3>
              <p className="text-gray-700 leading-relaxed">{project.outcomes}</p>
            </div>
          )}

          {project.portfolio_media && project.portfolio_media.length > 1 && (
            <PortfolioGallery media={project.portfolio_media} />
          )}

          <div className="rounded-2xl border border-gray-200 bg-white p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 shadow-sm">
            <div>
              <p className="text-gray-600 text-sm uppercase tracking-[0.16em]">¿Tu proyecto es el siguiente?</p>
              <h4 className="font-display text-xl text-[#0b1b33]">Hablemos de cómo llevarlo a producción</h4>
            </div>
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#0b1b33] text-white font-semibold text-sm hover:bg-[#0d2345] transition"
            >
              Agenda una reunión <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
