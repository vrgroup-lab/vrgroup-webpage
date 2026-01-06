import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Hero } from "@/components/ui/hero"
import { Section } from "@/components/ui/section"
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
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <Hero
        title="Nuestro Portafolio"
        subtitle="Proyectos en producción con arquitectura sólida, automatización y experiencias digitales."
        alignment="left"
        minHeight="520px"
      />

      <Section className="bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => {
            const primaryMedia =
              project.portfolio_media?.find((m) => m.is_primary) ??
              project.portfolio_media?.sort((a, b) => (a.order_index || 0) - (b.order_index || 0))[0]

            return (
              <Link
                key={project.id}
                href={`/portafolio/${project.slug}`}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-coral hover:shadow-xl transition-all"
              >
                <div className="w-full aspect-video bg-gradient-to-br from-coral to-blue-dark flex items-center justify-center text-4xl text-white">
                  {primaryMedia?.url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={primaryMedia.url} alt={primaryMedia.alt_text || project.title} className="w-full h-full object-cover" />
                  ) : (
                    <span>{project.client_display?.[0] ?? "🚀"}</span>
                  )}
                </div>

                <div className="p-6">
                  <p className="text-coral text-sm font-semibold mb-2">{project.client_display}</p>
                  <h3 className="font-display font-bold text-lg text-blue-dark mb-2 line-clamp-2">{project.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{project.summary}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {(project.tags ?? []).slice(0, 3).map((tag, idx) => (
                      <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-lg">
                        {tag}
                      </span>
                    ))}
                  </div>

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

      <Section className="bg-gray-50">
        <div className="bg-white rounded-2xl p-8 md:p-12 text-center max-w-3xl mx-auto">
          <h2 className="font-display font-bold text-3xl mb-4 text-blue-dark">¿Tu proyecto es el siguiente?</h2>
          <p className="text-gray-600 mb-6">
            Contáctanos para discutir cómo podemos ayudarte a llevar tu operación a producción con excelencia.
          </p>
          <Link
            href="/contacto"
            className="inline-flex px-6 py-3 bg-coral text-white rounded-lg font-semibold hover:bg-coral-dark transition-colors"
          >
            Iniciar proyecto
          </Link>
        </div>
      </Section>

      <Footer />
    </div>
  )
}
