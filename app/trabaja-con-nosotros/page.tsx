import { SiteNavbar } from "@/components/layout/site-navbar"
import { Footer } from "@/components/layout/footer"
import { Hero } from "@/components/ui/hero"
import { Section } from "@/components/ui/section"
import { CTABanner } from "@/components/ui/cta-banner"
import Link from "next/link"
import {
  Shield,
  Calendar,
  BookOpen,
  Home,
  MapPin,
  Globe2,
  BriefcaseBusiness,
  Clock,
  Clock3,
  Wifi,
  Building2,
  Sparkles,
} from "lucide-react"
import { supabasePublic } from "@/lib/supabase/public"
import { format } from "date-fns"
import { es } from "date-fns/locale"

export const revalidate = 60

const badgePalette = {
  emerald: { light: "bg-emerald-50 text-emerald-700 border-emerald-200", dark: "bg-emerald-500/10 text-emerald-100 border-emerald-400/40" },
  amber: { light: "bg-amber-50 text-amber-700 border-amber-200", dark: "bg-amber-500/10 text-amber-100 border-amber-400/40" },
  rose: { light: "bg-rose-50 text-rose-700 border-rose-200", dark: "bg-rose-500/10 text-rose-100 border-rose-400/40" },
  sky: { light: "bg-sky-50 text-sky-700 border-sky-200", dark: "bg-sky-500/10 text-sky-100 border-sky-400/40" },
  indigo: { light: "bg-indigo-50 text-indigo-700 border-indigo-200", dark: "bg-indigo-500/10 text-indigo-100 border-indigo-400/40" },
  purple: { light: "bg-purple-50 text-purple-700 border-purple-200", dark: "bg-purple-500/10 text-purple-100 border-purple-400/40" },
  cyan: { light: "bg-cyan-50 text-cyan-700 border-cyan-200", dark: "bg-cyan-500/10 text-cyan-100 border-cyan-400/40" },
  slate: { light: "bg-slate-100 text-slate-700 border-slate-200", dark: "bg-slate-500/10 text-slate-100 border-slate-400/40" },
}

function badgeMeta(kind: "employment" | "modality" | "seniority", value?: string) {
  const val = value?.toLowerCase()
  if (!val) return null
  if (kind === "employment") {
    if (val === "full time") return { Icon: BriefcaseBusiness, palette: "emerald" as const, label: value }
    if (val === "part time") return { Icon: Clock3, palette: "amber" as const, label: value }
    if (val === "freelance") return { Icon: Sparkles, palette: "purple" as const, label: value }
  }
  if (kind === "modality") {
    if (val === "remoto") return { Icon: Wifi, palette: "sky" as const, label: value }
    if (val === "híbrido" || val === "hibrido") return { Icon: Globe2, palette: "indigo" as const, label: value }
    if (val === "presencial") return { Icon: Building2, palette: "rose" as const, label: value }
  }
  if (kind === "seniority") {
    if (val === "junior") return { Icon: Sparkles, palette: "cyan" as const, label: value }
    if (val === "semi-senior" || val === "semisenior" || val === "semi senior") return { Icon: Sparkles, palette: "amber" as const, label: value }
    if (val === "senior") return { Icon: Sparkles, palette: "rose" as const, label: value }
  }
  return { Icon: BriefcaseBusiness, palette: "slate" as const, label: value }
}

async function getJobs() {
  const { data, error } = await supabasePublic
    .from("jobs")
    .select("id, slug, title, summary, location, modality, seniority, tags, created_at, published_at, employment_type")
    .eq("status", "published")
    .order("published_at", { ascending: false, nullsFirst: false })
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching jobs", error)
    return []
  }
  return data || []
}

export default async function CareersPage() {
  const benefits = [
    {
      icon: Shield,
      title: "Seguro complementario",
      description: "Cobertura integral de salud para ti y tu familia.",
    },
    {
      icon: Calendar,
      title: "Día libre mensual",
      description: "Un día adicional cada mes para descanso y bienestar.",
    },
    {
      icon: BookOpen,
      title: "Capacitación continua",
      description: "Inversión en tu desarrollo profesional y certificaciones.",
    },
    {
      icon: Home,
      title: "Trabajo híbrido",
      description: "Flexibilidad para trabajar desde donde prefieras.",
    },
  ]

  const jobs = await getJobs()

  return (
    <div className="min-h-screen flex flex-col">
      <SiteNavbar />

      <Hero
        title="Trabaja con nosotros"
        subtitle="Somos un equipo boutique en crecimiento. Si te apasiona la innovación y la transformación digital, esta es tu oportunidad."
        backgroundVideo="/videos/hero/mixkit-open-office-space-914-full-hd.mp4"
        minHeight="calc(100vh + 50px)"
      >
        <div className="mt-8 flex flex-col lg:flex-row items-center gap-6 justify-center">
          <div className="bg-white/10 border border-white/15 backdrop-blur-lg rounded-3xl px-6 py-5 text-white shadow-2xl flex flex-col gap-3 w-full max-w-xl">
            <div className="grid grid-cols-3 gap-4 text-center">
              {[
                { value: "2017", label: "Fundada" },
                { value: "150+", label: "Proyectos" },
                { value: "75+", label: "Personas" },
              ].map((item) => (
                <div key={item.label} className="space-y-1">
                  <div className="text-2xl sm:text-3xl font-display font-bold">{item.value}</div>
                  <p className="text-sm text-white/80">{item.label}</p>
                </div>
              ))}
            </div>
            <div className="pt-3 mt-1 border-t border-white/15 flex justify-center">
              <Link
                href="#posiciones"
                className="inline-flex items-center gap-2 rounded-full bg-white text-[#0B1B33] px-5 py-2 text-sm font-semibold hover:bg-gray-100 transition-colors"
              >
                Ver posiciones abiertas
              </Link>
            </div>
          </div>
        </div>
      </Hero>

      <Section
        title="Posiciones Abiertas"
        subtitle="Explora roles abiertos y postula por LinkedIn o nuestro formulario."
        className="bg-white"
        id="posiciones"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {jobs.length === 0 ? (
            <div className="md:col-span-2 rounded-2xl border border-dashed border-gray-300 bg-white p-6 text-center text-gray-600">
              No hay posiciones publicadas en este momento. Vuelve pronto o envíanos tu CV.
            </div>
          ) : (
            jobs.map((job) => (
              <Link
                key={job.id}
                href={`/trabaja-con-nosotros/${job.slug}`}
                className="rounded-2xl bg-white border border-gray-200 p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all"
              >
                <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                  {badgeMeta("seniority", job.seniority) ? (
                    (() => {
                      const meta = badgeMeta("seniority", job.seniority)!
                      const palette = badgePalette[meta.palette]
                      const Icon = meta.Icon
                      return (
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full border text-xs font-semibold ${palette.light}`}>
                          <Icon size={12} /> {meta.label}
                        </span>
                      )
                    })()
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-gray-100 text-gray-700 border border-gray-200">
                      {job.seniority || "Abierto"}
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1">
                    <Clock size={12} /> {job.created_at ? format(new Date(job.created_at), "d MMM", { locale: es }) : ""}
                  </span>
                </div>
                <h3 className="font-display font-bold text-lg text-blue-dark mb-3">{job.title}</h3>
                <div className="flex flex-wrap gap-2 text-xs text-gray-600 mb-3">
                  {job.location && (
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-gray-100 border border-gray-200">
                      <MapPin size={12} /> {job.location}
                    </span>
                  )}
                  {badgeMeta("modality", job.modality) && (() => {
                    const meta = badgeMeta("modality", job.modality)!
                    const palette = badgePalette[meta.palette]
                    const Icon = meta.Icon
                    return (
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full border text-xs ${palette.light}`}>
                        <Icon size={12} /> {meta.label}
                      </span>
                    )
                  })()}
                  {badgeMeta("employment", job.employment_type) && (() => {
                    const meta = badgeMeta("employment", job.employment_type)!
                    const palette = badgePalette[meta.palette]
                    const Icon = meta.Icon
                    return (
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full border text-xs ${palette.light}`}>
                        <Icon size={12} /> {meta.label}
                      </span>
                    )
                  })()}
                </div>
                <div className="inline-flex items-center gap-2 text-coral font-semibold text-sm">
                  Ver detalles →
                </div>
              </Link>
            ))
          )}
        </div>
      </Section>

      <CTABanner
        eyebrow="Talento"
        title="¿Tu posición ideal no está listada?"
        subtitle="Envíanos tu CV y cuéntanos por qué te gustaría unirte a VR Group. Siempre estamos buscando talento."
        buttonLabel="Enviar candidatura"
        buttonHref="/contacto"
      />

      <Footer />
    </div>
  )
}
