 "use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { BriefcaseBusiness, FolderKanban, MessageCircle, Gauge, ArrowRight } from "lucide-react"

export default function AdminOverviewPage() {
  const [stats, setStats] = useState({ contactsPending: 0, jobsPublished: 0, projectsPublic: 0, loading: true })

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [contactsRes, jobsRes, portfolioRes] = await Promise.all([
          fetch("/api/admin/contact-submissions"),
          fetch("/api/admin/jobs"),
          fetch("/api/admin/portfolio/projects"),
        ])
        const [contactsJson, jobsJson, portfolioJson] = await Promise.all([
          contactsRes.json(),
          jobsRes.json(),
          portfolioRes.json(),
        ])
        const pendingStatuses = new Set(["pendiente", "nuevo", "pending", "por-contactar", "por contactar"])
        const nonPendingStatuses = new Set([
          "en-progreso",
          "en progreso",
          "contactado",
          "calificado",
          "qualified",
          "cerrado",
          "closed",
          "won",
          "error",
          "fallido",
          "failed",
        ])
        const contactsPending = Array.isArray(contactsJson?.data)
          ? contactsJson.data.filter((c: any) => {
              const status = String(c.status || "").toLowerCase().trim()
              if (!status) return true
              if (pendingStatuses.has(status)) return true
              return !nonPendingStatuses.has(status)
            }).length
          : 0
        const jobsPublished = Array.isArray(jobsJson?.data)
          ? jobsJson.data.filter((j: any) => j.status === "published").length
          : 0
        const projectsPublic = Array.isArray(portfolioJson?.data)
          ? portfolioJson.data.filter((p: any) => p.status === "public").length
          : 0
        setStats({ contactsPending, jobsPublished, projectsPublic, loading: false })
      } catch (e) {
        setStats((prev) => ({ ...prev, loading: false }))
      }
    }
    fetchStats()
  }, [])

  const cards = [
    {
      title: "Leads por contactar",
      value: stats.loading ? "—" : stats.contactsPending,
      subtitle: "Pendientes de atención",
      href: "/admin/contactos",
      icon: <MessageCircle size={18} />,
      text: "text-[#0B1B33]",
      accent: "text-[#0B1B33]",
      stripe: "#0B1B33",
    },
    {
      title: "Ofertas publicadas",
      value: stats.loading ? "—" : stats.jobsPublished,
      subtitle: "Vacantes en vivo",
      href: "/admin/ofertas",
      icon: <BriefcaseBusiness size={18} />,
      text: "text-emerald-900",
      accent: "text-emerald-800",
      stripe: "#1f7a4d",
    },
    {
      title: "Proyectos públicos",
      value: stats.loading ? "—" : stats.projectsPublic,
      subtitle: "Portafolio visible",
      href: "/admin/portafolio",
      icon: <Gauge size={18} />,
      text: "text-[#7a1f3a]",
      accent: "text-[#7a1f3a]",
      stripe: "#b58534",
    },
  ]

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-2">
        <p className="text-xs uppercase tracking-[0.22em] text-gray-500">Panel</p>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-gray-900">Administración</h1>
        <p className="text-gray-600 max-w-3xl">
          Accede a los módulos clave: contactos, ofertas y portafolio. Gestiona los leads desde el tablero.
        </p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {cards.map((card) => (
          <Link
            key={card.title}
            href={card.href}
            className="group rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg border-t-4"
            style={{ borderTopColor: card.stripe }}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className={`text-sm font-semibold ${card.accent}`}>{card.title}</p>
                <p className={`mt-2 text-4xl font-bold ${card.text}`}>{card.value}</p>
                <p className={`text-sm mt-1 ${card.accent}`}>{card.subtitle}</p>
              </div>
              <div className="h-10 w-10 rounded-lg bg-white/70 text-black/70 flex items-center justify-center border border-white/50 shadow-sm">
                {card.icon}
              </div>
            </div>
            <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-black/70">
              Ir al módulo
              <ArrowRight size={16} className="transition group-hover:translate-x-1" />
            </div>
          </Link>
        ))}
      </section>
    </div>
  )
}
