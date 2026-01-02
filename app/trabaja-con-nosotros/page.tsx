import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Hero } from "@/components/ui/hero"
import { Section } from "@/components/ui/section"
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
  Tags,
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
      <Navbar />

      <Hero
        title="🚀 Trabaja con nosotros"
        subtitle="Somos un equipo boutique en crecimiento. Si te apasiona la innovación y la transformación digital, esta es tu oportunidad."
      />

      <Section
        title="Posiciones Abiertas"
        subtitle="Explora roles abiertos y postula por LinkedIn o nuestro formulario."
        className="bg-white"
      >
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-5">
          <div className="rounded-2xl bg-gray-50 border border-gray-200 p-4 text-blue-dark space-y-3 shadow-sm">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <BriefcaseBusiness size={16} /> Filtros
            </div>
            <div className="text-xs text-gray-600">Total: {jobs.length} empleo(s) publicado(s)</div>
            <div className="space-y-2 text-sm text-gray-700">
              <div className="rounded-xl bg-white border border-gray-200 px-3 py-2 flex items-center justify-between">
                <span>Departamento</span>
                <span className="text-xs text-gray-500">Todos</span>
              </div>
              <div className="rounded-xl bg-white border border-gray-200 px-3 py-2 flex items-center justify-between">
                <span>Ubicación</span>
                <span className="text-xs text-gray-500">Todas</span>
              </div>
              <div className="rounded-xl bg-white border border-gray-200 px-3 py-2 flex items-center justify-between">
                <span>Tipo</span>
                <span className="text-xs text-gray-500">Todos</span>
              </div>
              <div className="rounded-xl bg-white border border-gray-200 px-3 py-2 flex items-center justify-between">
                <span>Nivel</span>
                <span className="text-xs text-gray-500">Todos</span>
              </div>
            </div>
          </div>

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
                  <h3 className="font-display font-bold text-lg text-blue-dark mb-2">{job.title}</h3>
                  {job.summary && (
                    <p className="text-gray-700 mb-3 text-sm leading-relaxed line-clamp-4 whitespace-pre-line">{job.summary}</p>
                  )}
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
                  {job.tags?.length ? (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {job.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 border border-gray-200">
                          {tag}
                        </span>
                      ))}
                      {job.tags.length > 3 && (
                        <span className="px-3 py-1 rounded-full bg-gray-50 text-gray-700 border border-gray-200">
                          +{job.tags.length - 3} más
                        </span>
                      )}
                    </div>
                  ) : null}
                  <div className="inline-flex items-center gap-2 text-coral font-semibold text-sm">
                    Ver detalles →
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </Section>

      <Section className="relative overflow-hidden text-white">
        <div
          className="absolute inset-0"
          aria-hidden="true"
          style={{
            backgroundImage:
              "radial-gradient(circle at 18% 22%, rgba(255,90,95,0.22), transparent 38%), radial-gradient(circle at 82% 18%, rgba(56,189,248,0.18), transparent 34%), radial-gradient(circle at 50% 78%, rgba(255,90,95,0.12), transparent 42%), linear-gradient(135deg, #0b1224 0%, #0a0f1f 40%, #0b1224 100%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.12]"
          aria-hidden="true"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
        <div className="relative max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white/90 text-xs font-semibold shadow-sm backdrop-blur">
            <Sparkles size={14} /> Únete a VR Group
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl leading-tight">¿Tu posición ideal no está listada?</h2>
          <p className="text-lg sm:text-xl opacity-95 leading-relaxed">
            Envíanos tu CV y cuéntanos por qué te gustaría unirte a VR Group. Siempre estamos buscando talento.
          </p>
          <Link
            href="/contacto"
            className="inline-flex px-8 py-3 bg-white text-coral rounded-xl font-display font-semibold shadow-[0_18px_38px_rgba(0,0,0,0.25)] hover:bg-gray-100 transition-colors"
          >
            Enviar candidatura
          </Link>
        </div>
      </Section>

      <Footer />
    </div>
  )
}
