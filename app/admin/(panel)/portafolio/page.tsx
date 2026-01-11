"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { FolderKanban, Pencil, Plus, Trash2 } from "lucide-react"
import { getSupabaseBrowser } from "@/lib/supabase/client"
import { ConfirmDialog } from "@/components/admin/confirm-dialog"

type MediaPayload = {
  url: string
  alt_text?: string | null
  is_primary?: boolean
}

type PortfolioProject = {
  id: string
  slug: string
  title: string
  status: string
  is_featured: boolean
  display_order: number
  client_display: string | null
  summary: string | null
  tags: string[]
  portfolio_media?: MediaPayload[]
  service_lines?: { id: string; slug: string; name: string } | null
}

export default function AdminPortfolioListPage() {
  useMemo(() => getSupabaseBrowser(), [])
  const [projects, setProjects] = useState<PortfolioProject[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [confirmState, setConfirmState] = useState<{ open: boolean; id: string | null; title: string | null }>({
    open: false,
    id: null,
    title: null,
  })
  const [deleting, setDeleting] = useState(false)

  const fetchProjects = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch("/api/admin/portfolio/projects")
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || "Error al cargar portafolio")
      setProjects(json.data || [])
    } catch (err: any) {
      setError(err?.message || "No se pudieron cargar los proyectos")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  const deleteProject = async (id: string) => {
    setError(null)
    setDeleting(true)
    try {
      const res = await fetch(`/api/admin/portfolio/projects/${id}`, { method: "DELETE" })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || "Error al eliminar proyecto")
      setProjects((prev) => prev.filter((p) => p.id !== id))
    } catch (err: any) {
      setError(err?.message || "No se pudo eliminar el proyecto")
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div className="space-y-6">
      <header className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-gray-500">Portafolio</p>
          <h1 className="font-display text-3xl font-bold text-gray-900">Proyectos</h1>
          <p className="text-gray-600">Publica, ordena y destaca casos.</p>
        </div>
        <Link
          href="/admin/portafolio/nuevo"
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold text-sm shadow-sm hover:bg-blue-700 transition"
        >
          <Plus size={16} />
          Nuevo proyecto
        </Link>
      </header>

      {error && <div className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg p-3">{error}</div>}

      <div className="bg-white border border-gray-200 rounded-xl p-4 space-y-3 shadow-sm">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-lg font-semibold flex items-center gap-2 text-gray-900">
            <FolderKanban size={18} /> Proyectos ({projects.length})
          </h3>
          {loading && <span className="text-xs text-gray-500">Cargando...</span>}
        </div>
        <div className="space-y-3">
          {projects.map((project) => {
            const primaryMedia = project.portfolio_media?.find((m) => m.is_primary) ?? project.portfolio_media?.[0]
            return (
              <div
                key={project.id}
                className="rounded-lg border border-gray-200 bg-white p-4 flex flex-col gap-2 hover:border-gray-300 transition shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs text-gray-500 uppercase tracking-[0.12em]">
                    <span className="px-2 py-0.5 rounded-md bg-gray-100 border border-gray-200 text-gray-700">
                      {project.status}
                    </span>
                    {project.is_featured && (
                      <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 border border-amber-200">Featured</span>
                    )}
                    <span className="px-2 py-0.5 rounded-md bg-gray-100 border border-gray-200 text-gray-700">
                      #{project.display_order}
                    </span>
                    {project.service_lines?.name && (
                      <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-100">
                        {project.service_lines.name}
                      </span>
                    )}
                  </div>
                    <p className="text-sm text-gray-600">{project.client_display}</p>
                    <h4 className="font-display text-lg text-gray-900">{project.title}</h4>
                    <p className="text-xs text-gray-600 line-clamp-2">{project.summary}</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {(Array.isArray(project.tags) ? project.tags : []).slice(0, 3).map((tag) => (
                        <span key={tag} className="px-2 py-1 rounded-md bg-gray-100 border border-gray-200 text-gray-700 text-[11px]">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  {primaryMedia?.url && (
                    <div className="w-24 h-16 rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={primaryMedia.url} alt={primaryMedia.alt_text || project.title} className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Link
                    href={`/admin/portafolio/${project.id}/edit`}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 text-xs font-semibold hover:bg-blue-100 transition border border-blue-100"
                  >
                    <Pencil size={14} /> Editar
                  </Link>
                  <button
                    onClick={() => setConfirmState({ open: true, id: project.id, title: project.title || "este proyecto" })}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-200 text-gray-700 text-xs font-semibold hover:bg-gray-100 transition"
                  >
                    <Trash2 size={14} /> Eliminar
                  </button>
                </div>
              </div>
            )
          })}
          {!projects.length && !loading && (
            <div className="text-sm text-gray-500 border border-dashed border-gray-200 rounded-xl p-6 text-center bg-white">
              No hay proyectos cargados.
            </div>
          )}
        </div>
      </div>

      <ConfirmDialog
        open={confirmState.open}
        title="Eliminar proyecto"
        description={`¿Seguro que quieres eliminar ${confirmState.title || "este proyecto"}? Esta acción no se puede deshacer.`}
        confirmLabel="Eliminar proyecto"
        onCancel={() => setConfirmState({ open: false, id: null, title: null })}
        onConfirm={async () => {
          if (!confirmState.id) return
          await deleteProject(confirmState.id)
          setConfirmState({ open: false, id: null, title: null })
        }}
        loading={deleting}
      />
    </div>
  )
}
