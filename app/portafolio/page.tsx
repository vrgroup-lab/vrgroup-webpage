import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Hero } from "@/components/ui/hero"
import { Section } from "@/components/ui/section"
import { CTABanner } from "@/components/ui/cta-banner"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { supabasePublic } from "@/lib/supabase/public"

type PortfolioMedia = {
  url: string
  thumbnail_url?: string | null
  alt_text?: string | null
  caption?: string | null
  is_primary?: boolean
  order_index?: number | null
  type?: string
}

type PortfolioProject = {
  id: string
  slug: string
  title: string
  status: string
  is_featured: boolean
  display_order: number
  client_display?: string | null
  summary?: string | null
  tags?: string[] | null
  highlights?: string[] | null
  portfolio_media?: PortfolioMedia[]
}

async function getProjects(): Promise<PortfolioProject[]> {
  const { data, error } = await supabasePublic
    .from("portfolio_projects")
    .select("*, portfolio_media(*)")
    .eq("status", "public")
    .order("display_order", { ascending: true })
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching portfolio projects", error.message)
    return []
  }
  return data ?? []
}

export default async function PortfolioPage() {
  const projects = await getProjects()

  return (
    <div className="min-h-screen flex flex-col bg-white text-blue-dark">
      <Navbar />

      <Hero
        title="Nuestro Portafolio"
        subtitle="Proyectos en producción con arquitectura sólida, automatización y experiencias digitales."
        alignment="left"
        minHeight="520px"
        overlayImage="/images/hero/portafolio/hero-overlay.gif"
        overlayClassName="opacity-40"
      />

      <Section className="bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => {
            const primaryMedia =
              project.portfolio_media?.find((m) => m.is_primary) ??
              project.portfolio_media?.sort((a, b) => (a.order_index || 0) - (b.order_index || 0))[0]
            const tags = (project.tags ?? []).slice(0, 2)

            return (
              <Link
                key={project.id}
                href={`/portafolio/${project.slug}`}
                className="group relative rounded-3xl overflow-hidden border border-gray-200 bg-white shadow-[0_18px_50px_rgba(0,0,0,0.12)] hover:-translate-y-1 hover:shadow-[0_28px_70px_rgba(0,0,0,0.2)] transition-all"
              >
                <div className="w-full aspect-[4/3] bg-gray-100 relative">
                  {primaryMedia?.url && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={primaryMedia.url} alt={primaryMedia.alt_text || project.title} className="w-full h-full object-cover" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
                  <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
                    {tags.length ? (
                      tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center px-3 py-1 rounded-full bg-white/80 text-blue-dark text-xs font-semibold backdrop-blur"
                        >
                          {tag}
                        </span>
                      ))
                    ) : (
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/80 text-blue-dark text-xs font-semibold backdrop-blur">
                        Proyecto
                      </span>
                    )}
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 space-y-1">
                    <h3 className="font-display text-2xl font-bold text-white drop-shadow-lg">{project.title}</h3>
                    <p className="text-white/90 text-sm font-semibold">{project.client_display}</p>
                  </div>
                </div>

                <div className="p-5 bg-white border-t border-gray-200">
                  <p className="text-gray-700 text-sm mb-2 line-clamp-2">{project.summary}</p>
                  <div className="flex items-center gap-2 text-coral font-semibold group-hover:gap-3 transition-all">
                    Ver proyecto
                    <ArrowRight size={18} />
                  </div>
                </div>
              </Link>
            )
          })}
          {!projects.length && (
            <div className="col-span-full text-center text-gray-500 border border-dashed border-gray-200 rounded-2xl p-10">
              No hay proyectos publicados aún.
            </div>
          )}
        </div>
      </Section>

      <CTABanner
        eyebrow="Portafolio"
        title="📂 ¿Tu proyecto es el siguiente?"
        subtitle="Conversemos cómo llevar tu operación a producción con arquitectura, automatización y datos."
        buttonLabel="Iniciar proyecto"
        buttonHref="/contacto"
      />

      <Footer />
    </div>
  )
}
