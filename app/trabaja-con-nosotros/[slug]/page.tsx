import { SiteNavbar } from "@/components/layout/site-navbar"
import { Footer } from "@/components/layout/footer"
import { Section } from "@/components/ui/section"
import Link from "next/link"
import { notFound } from "next/navigation"
import { supabasePublic } from "@/lib/supabase/public"
import {
  ArrowLeft,
  BriefcaseBusiness,
  Globe2,
  MapPin,
  Sparkles,
  Tags,
  CheckCircle2,
  Clock,
  Clock3,
  Wifi,
  Building2,
} from "lucide-react"
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

async function getJob(slug: string) {
  const { data, error } = await supabasePublic
    .from("jobs")
    .select(
      "id, slug, title, summary, description, location, modality, seniority, tags, apply_linkedin_url, apply_notion_url, published_at, created_at, responsibilities, benefits, requirements, employment_type"
    )
    .eq("slug", slug)
    .eq("status", "published")
    .single()

  if (error || !data) {
    return null
  }
  return data
}

export default async function JobDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const job = await getJob(slug)
  if (!job) return notFound()

  const respItems = (job.responsibilities || "").split("\n").map((i: string) => i.trim()).filter(Boolean)
  const benefitItems = (job.benefits || "").split("\n").map((i: string) => i.trim()).filter(Boolean)
  const requirementsItems = (job.requirements || "").split("\n").map((i: string) => i.trim()).filter(Boolean)
  const publishedLabel = job.published_at
    ? format(new Date(job.published_at), "d 'de' MMMM 'de' yyyy", { locale: es })
    : job.created_at
      ? format(new Date(job.created_at), "d 'de' MMMM 'de' yyyy", { locale: es })
      : ""

  return (
    <div className="min-h-screen flex flex-col">
      <SiteNavbar />

      <div className="bg-gray-50 py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <Link href="/trabaja-con-nosotros" className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-dark text-sm">
            <ArrowLeft size={16} /> Volver a posiciones
          </Link>

          <div className="rounded-3xl bg-white border border-gray-200 p-6 sm:p-8 shadow-lg space-y-5">
            <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
              {badgeMeta("seniority", job.seniority) ? (() => {
                const meta = badgeMeta("seniority", job.seniority)!
                const palette = badgePalette[meta.palette]
                const Icon = meta.Icon
                return (
                  <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full border font-semibold ${palette.light}`}>
                    <Icon size={12} /> {meta.label}
                  </span>
                )
              })() : (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gray-100 border border-gray-200 text-gray-700 font-semibold">
                  <BriefcaseBusiness size={12} /> {job.seniority || "Abierto"}
                </span>
              )}
              {publishedLabel && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gray-100 border border-gray-200 text-gray-700">
                  <Clock size={12} /> Publicado el {publishedLabel}
                </span>
              )}
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-blue-dark">{job.title}</h1>
            {job.summary && (
              <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">{job.summary}</p>
            )}
            <div className="flex flex-wrap gap-3 text-sm text-gray-700">
              {job.location && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gray-100 border border-gray-200">
                  <MapPin size={14} /> {job.location}
                </span>
              )}
              {badgeMeta("modality", job.modality) && (() => {
                const meta = badgeMeta("modality", job.modality)!
                const palette = badgePalette[meta.palette]
                const Icon = meta.Icon
                return (
                  <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full border ${palette.light}`}>
                    <Icon size={14} /> {meta.label}
                  </span>
                )
              })()}
              {badgeMeta("employment", job.employment_type) && (() => {
                const meta = badgeMeta("employment", job.employment_type)!
                const palette = badgePalette[meta.palette]
                const Icon = meta.Icon
                return (
                  <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full border ${palette.light}`}>
                    <Icon size={14} /> {meta.label}
                  </span>
                )
              })()}
              {job.tags?.length ? (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gray-100 border border-gray-200">
                  <Tags size={14} /> {job.tags.join(", ")}
                </span>
              ) : null}
            </div>
            <div className="flex flex-wrap gap-3">
              {job.apply_linkedin_url && (
                <Link
                  href={job.apply_linkedin_url}
                  target="_blank"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-coral text-white font-semibold shadow-[0_10px_28px_rgba(255,90,95,0.3)] hover:shadow-[0_12px_36px_rgba(255,90,95,0.35)]"
                >
                  Aplicar por LinkedIn
                </Link>
              )}
              {job.apply_notion_url && (
                <Link
                  href={job.apply_notion_url}
                  target="_blank"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-gray-200 text-blue-dark font-semibold hover:bg-gray-50"
                >
                  Completar formulario
                </Link>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-6">
            <div className="space-y-5">
              {respItems.length > 0 && (
                <div className="rounded-3xl bg-white border border-gray-200 p-5 shadow">
                  <div className="flex items-center gap-2 mb-3 text-blue-dark">
                    <Sparkles size={16} />
                    <h3 className="font-display font-bold text-xl">Responsabilidades</h3>
                  </div>
                  <ul className="space-y-2 text-gray-700">
                    {respItems.map((item) => (
                      <li key={item} className="flex gap-2">
                        <CheckCircle2 size={16} className="text-emerald-500 mt-1" />
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {requirementsItems.length > 0 && (
                <div className="rounded-3xl bg-white border border-gray-200 p-5 shadow">
                  <div className="flex items-center gap-2 mb-3 text-blue-dark">
                    <Sparkles size={16} />
                    <h3 className="font-display font-bold text-xl">Requisitos</h3>
                  </div>
                  <ul className="space-y-2 text-gray-700">
                    {requirementsItems.map((item) => (
                      <li key={item} className="flex gap-2">
                        <CheckCircle2 size={16} className="text-emerald-500 mt-1" />
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {job.description && (
                <div className="rounded-3xl bg-white border border-gray-200 p-5 shadow">
                  <div className="flex items-center gap-2 mb-3 text-blue-dark">
                    <Sparkles size={16} />
                    <h3 className="font-display font-bold text-xl">Descripción</h3>
                  </div>
                  <p className="text-gray-700 whitespace-pre-line leading-relaxed">{job.description}</p>
                </div>
              )}
            </div>

            <div className="space-y-4">
              {benefitItems.length > 0 && (
                <div className="rounded-3xl bg-white border border-gray-200 p-5 shadow">
                  <div className="flex items-center gap-2 mb-3 text-blue-dark">
                    <Sparkles size={16} />
                    <h3 className="font-display font-bold text-xl">Beneficios</h3>
                  </div>
                  <ul className="space-y-2 text-gray-700">
                    {benefitItems.map((item) => (
                      <li key={item} className="flex gap-2">
                        <CheckCircle2 size={16} className="text-emerald-500 mt-1" />
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="rounded-3xl bg-white border border-gray-200 p-5 shadow space-y-3 text-center">
                <h3 className="font-display text-xl font-bold text-blue-dark">¿Te interesa esta posición?</h3>
                <p className="text-gray-700">Aplica con tu perfil y conversemos.</p>
                <div className="flex flex-col gap-2">
                  {job.apply_linkedin_url && (
                    <Link
                      href={job.apply_linkedin_url}
                      target="_blank"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-coral text-white font-semibold shadow-[0_10px_28px_rgba(255,90,95,0.3)] hover:shadow-[0_12px_34px_rgba(255,90,95,0.35)]"
                    >
                      Aplicar por LinkedIn
                    </Link>
                  )}
                  {job.apply_notion_url && (
                    <Link
                      href={job.apply_notion_url}
                      target="_blank"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-gray-200 text-blue-dark font-semibold hover:bg-gray-50"
                    >
                      Completar formulario
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
