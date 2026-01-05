"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { CheckSquare, FolderKanban, Image as ImageIcon, Pencil, Plus, Trash2, Upload, Star } from "lucide-react"
import { getSupabaseBrowser } from "@/lib/supabase/client"

type MediaPayload = {
  id?: string
  project_id?: string
  url: string
  type: string
  thumbnail_url?: string
  alt_text?: string
  caption?: string
  is_primary?: boolean
  order_index?: number
}

type PortfolioProject = {
  id: string
  slug: string
  title: string
  status: string
  is_featured: boolean
  display_order: number
  client_display: string | null
  client_name: string | null
  client_logo_url: string | null
  summary: string | null
  problem: string | null
  solution: string | null
  outcomes: string | null
  tags: string[]
  highlights: string[]
  portfolio_media?: MediaPayload[]
}

const statusOptions = [
  { value: "draft", label: "Draft" },
  { value: "public", label: "Public" },
  { value: "hidden", label: "Hidden" },
]

export default function AdminPortfolioPage() {
  const supabase = useMemo(() => getSupabaseBrowser(), [])
  const uploadInputRef = useRef<HTMLInputElement | null>(null)
  const [projects, setProjects] = useState<PortfolioProject[]>([])
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [step, setStep] = useState<1 | 2>(1)
  const [mediaSaving, setMediaSaving] = useState(false)
  const [uploadFile, setUploadFile] = useState<File | null>(null)
  const [view, setView] = useState<"list" | "form">("list")
  const [form, setForm] = useState({
    slug: "",
    title: "",
    status: "draft",
    is_featured: false,
    display_order: 0,
    client_display: "",
    summary: "",
    tags: "",
    highlights: "",
  })
  const [mediaForm, setMediaForm] = useState({
    url: "",
    type: "image",
    is_primary: false,
  })

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

  const resetForm = () => {
    setForm({
      slug: "",
      title: "",
      status: "draft",
      is_featured: false,
      display_order: 0,
      client_display: "",
      summary: "",
      tags: "",
      highlights: "",
    })
    setEditingId(null)
    setStep(1)
    setMediaForm({ url: "", type: "image", is_primary: false })
    setUploadFile(null)
    setView("list")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError(null)

    const payload: any = {
      slug: form.slug,
      title: form.title,
      status: form.status,
      is_featured: form.is_featured,
      display_order: Number(form.display_order) || 0,
      client_display: form.client_display || null,
      summary: form.summary || null,
      tags: form.tags ? form.tags.split(",").map((t) => t.trim()).filter(Boolean) : [],
      highlights: form.highlights
        ? form.highlights.split("\n").map((t) => t.trim()).filter(Boolean)
        : [],
    }

    if (form.media_url) {
      payload.media = {
        url: form.media_url,
        type: form.media_type || "image",
        is_primary: true,
        order_index: 0,
      } satisfies MediaPayload
    }

    try {
      const endpoint = editingId ? `/api/admin/portfolio/projects/${editingId}` : "/api/admin/portfolio/projects"
      const method = editingId ? "PUT" : "POST"
      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || "Error al guardar proyecto")
      if (!editingId && json?.data?.id) {
        setEditingId(json.data.id)
        setStep(2)
      }
      fetchProjects()
      if (editingId) setStep(1)
    } catch (err: any) {
      setError(err?.message || "No se pudo guardar el proyecto")
    } finally {
      setSaving(false)
    }
  }

  const editProject = (project: PortfolioProject) => {
    const primaryMedia = project.portfolio_media?.find((m) => m.is_primary) ?? project.portfolio_media?.[0]
    setEditingId(project.id)
    setForm({
      slug: project.slug,
      title: project.title,
      status: project.status || "draft",
      is_featured: project.is_featured,
      display_order: project.display_order ?? 0,
      client_display: project.client_display ?? "",
      summary: project.summary ?? "",
      tags: project.tags?.join(", ") ?? "",
      highlights: project.highlights?.join("\n") ?? "",
    })
    setMediaForm({
      url: primaryMedia?.url ?? "",
      type: primaryMedia?.type ?? "image",
      is_primary: true,
    })
    setStep(1)
    setView("form")
  }

  const deleteProject = async (id: string) => {
    setError(null)
    try {
      const res = await fetch(`/api/admin/portfolio/projects/${id}`, { method: "DELETE" })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || "Error al eliminar proyecto")
      setProjects((prev) => prev.filter((p) => p.id !== id))
    } catch (err: any) {
      setError(err?.message || "No se pudo eliminar el proyecto")
    }
  }

  const currentProject = projects.find((p) => p.id === editingId) || null
  const currentMedia = currentProject?.portfolio_media ?? []

  const addMedia = async (url: string, type: string, is_primary?: boolean) => {
    if (!editingId) {
      setError("Primero guarda el proyecto (Paso 1)")
      return
    }
    setMediaSaving(true)
    setError(null)
    try {
      const res = await fetch(`/api/admin/portfolio/projects/${editingId}/media`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, type, is_primary }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || "Error al guardar media")
      setMediaForm({ url: "", type: "image", is_primary: false })
      setUploadFile(null)
      fetchProjects()
    } catch (err: any) {
      setError(err?.message || "No se pudo guardar media")
    } finally {
      setMediaSaving(false)
    }
  }

  const handleUpload = async () => {
    if (!uploadFile) {
      if (mediaForm.url) {
        addMedia(mediaForm.url, mediaForm.type, mediaForm.is_primary)
      }
      return
    }
    if (!editingId) {
      setError("Primero guarda el proyecto (Paso 1)")
      return
    }
    setMediaSaving(true)
    setError(null)
    try {
      const fd = new FormData()
      fd.append("file", uploadFile)
      fd.append("projectId", editingId)
      const res = await fetch("/api/admin/portfolio/upload", { method: "POST", body: fd })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || "No se pudo subir media")
      await addMedia(json.url, mediaForm.type || "image", mediaForm.is_primary)
      if (uploadInputRef.current) uploadInputRef.current.value = ""
    } catch (err: any) {
      setError(err?.message || "No se pudo subir media")
    } finally {
      setMediaSaving(false)
    }
  }

  const setPrimary = async (mediaId: string) => {
    if (!editingId) return
    setMediaSaving(true)
    setError(null)
    try {
      const res = await fetch(`/api/admin/portfolio/projects/${editingId}/media`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ media_id: mediaId }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || "No se pudo marcar portada")
      fetchProjects()
    } catch (err: any) {
      setError(err?.message || "No se pudo actualizar portada")
    } finally {
      setMediaSaving(false)
    }
  }

  const deleteMedia = async (mediaId: string) => {
    if (!editingId) return
    setMediaSaving(true)
    setError(null)
    try {
      const res = await fetch(`/api/admin/portfolio/projects/${editingId}/media?media_id=${mediaId}`, { method: "DELETE" })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || "No se pudo eliminar media")
      fetchProjects()
    } catch (err: any) {
      setError(err?.message || "No se pudo eliminar media")
    } finally {
      setMediaSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <header className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-white/60">Portafolio</p>
          <h1 className="font-display text-3xl font-bold">Proyectos</h1>
          <p className="text-white/70">Publica, ordena y destaca casos.</p>
        </div>
        <button
          onClick={() => {
            resetForm()
            setView("form")
          }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-white text-blue-dark rounded-lg font-semibold text-sm hover:bg-gray-100 transition"
        >
          <Plus size={16} />
          Nuevo proyecto
        </button>
      </header>

      {error && <div className="text-sm text-red-300 bg-red-500/10 border border-red-500/30 rounded-lg p-3">{error}</div>}

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setView("list")}
          className={`px-3 py-2 rounded-lg text-sm font-semibold border ${
            view === "list" ? "bg-white text-blue-dark border-white" : "bg-white/5 border-white/10 text-white/80"
          }`}
        >
          Listado
        </button>
        <button
          onClick={() => setView("form")}
          className={`px-3 py-2 rounded-lg text-sm font-semibold border ${
            view === "form" ? "bg-white text-blue-dark border-white" : "bg-white/5 border-white/10 text-white/80"
          }`}
        >
          Crear / editar
        </button>
      </div>

      {view === "list" && (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-lg font-semibold flex items-center gap-2">
              <FolderKanban size={18} /> Proyectos ({projects.length})
            </h3>
            {loading && <span className="text-xs text-white/60">Cargando...</span>}
          </div>
          <div className="space-y-3">
            {projects.map((project) => {
              const primaryMedia = project.portfolio_media?.find((m) => m.is_primary) ?? project.portfolio_media?.[0]
              return (
                <div
                  key={project.id}
                  className="rounded-xl border border-white/10 bg-white/5 p-4 flex flex-col gap-2 hover:border-white/20 transition"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs text-white/60 uppercase tracking-[0.12em]">
                        <span className="px-2 py-0.5 rounded-md bg-white/10 border border-white/10">
                          {project.status}
                        </span>
                        {project.is_featured && (
                          <span className="px-2 py-0.5 rounded-md bg-coral/20 text-coral border border-coral/30">Featured</span>
                        )}
                        <span className="px-2 py-0.5 rounded-md bg-white/10 border border-white/10">#{project.display_order}</span>
                      </div>
                      <p className="text-sm text-white/70">{project.client_display}</p>
                      <h4 className="font-display text-lg text-white">{project.title}</h4>
                      <p className="text-xs text-white/60 line-clamp-2">{project.summary}</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {project.tags?.slice(0, 3).map((tag) => (
                          <span key={tag} className="px-2 py-1 rounded-md bg-white/5 border border-white/10 text-white/70 text-[11px]">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    {primaryMedia?.url && (
                      <div className="w-24 h-16 rounded-lg overflow-hidden border border-white/10 bg-white/5">
                        <img src={primaryMedia.url} alt={primaryMedia.alt_text || project.title} className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => editProject(project)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/10 text-white text-xs font-semibold hover:bg-white/15 transition"
                    >
                      <Pencil size={14} /> Editar
                    </button>
                    <button
                      onClick={() => deleteProject(project.id)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-white/20 text-white text-xs font-semibold hover:bg-white/10 transition"
                    >
                      <Trash2 size={14} /> Eliminar
                    </button>
                  </div>
                </div>
              )
            })}
            {!projects.length && !loading && (
              <div className="text-sm text-white/60 border border-dashed border-white/15 rounded-xl p-6 text-center">
                No hay proyectos cargados.
              </div>
            )}
          </div>
        </div>
      )}

      {view === "form" && (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setStep(1)}
              className={`px-3 py-2 rounded-lg text-sm font-semibold border ${
                step === 1 ? "bg-white text-blue-dark border-white" : "bg-white/5 border-white/10 text-white/80"
              }`}
            >
              Paso 1 · Detalles
            </button>
            <button
              onClick={() => editingId && setStep(2)}
              disabled={!editingId}
              className={`px-3 py-2 rounded-lg text-sm font-semibold border ${
                step === 2 ? "bg-white text-blue-dark border-white" : "bg-white/5 border-white/10 text-white/80"
              } ${!editingId ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              Paso 2 · Media
            </button>
          </div>

          <div className="border border-white/10 rounded-xl p-4 bg-white/5 space-y-3">
          <div className="flex items-center justify-between">
            {step === 1 ? (
              <h3 className="font-display text-lg font-semibold flex items-center gap-2">
                <CheckSquare size={18} /> {editingId ? "Editar proyecto" : "Nuevo proyecto"}
              </h3>
            ) : (
              <h3 className="font-display text-lg font-semibold flex items-center gap-2">
                <ImageIcon size={18} /> Media y portada
              </h3>
            )}
          </div>
          {step === 1 ? (
            <form className="space-y-3" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label className="text-sm text-white/80 space-y-1">
                  Slug
                  <input
                    value={form.slug}
                    onChange={(e) => setForm({ ...form, slug: e.target.value })}
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white text-sm"
                    required
                  />
                </label>
                <label className="text-sm text-white/80 space-y-1">
                  Título
                  <input
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white text-sm"
                    required
                  />
                </label>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <label className="text-sm text-white/80 space-y-1">
                  Estado
                  <select
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white text-sm"
                  >
                    {statusOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="text-sm text-white/80 space-y-1">
                  Orden
                  <input
                    type="number"
                    value={form.display_order}
                    onChange={(e) => setForm({ ...form, display_order: Number(e.target.value) })}
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white text-sm"
                  />
                </label>
                <label className="text-sm text-white/80 flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={form.is_featured}
                    onChange={(e) => setForm({ ...form, is_featured: e.target.checked })}
                    className="h-4 w-4 rounded border-white/20 bg-white/10"
                  />
                  Destacado
                </label>
              </div>
              <label className="text-sm text-white/80 space-y-1">
                Cliente (display)
                <input
                  value={form.client_display}
                  onChange={(e) => setForm({ ...form, client_display: e.target.value })}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white text-sm"
                  required
                />
              </label>
              <label className="text-sm text-white/80 space-y-1">
                Resumen
                <textarea
                  value={form.summary}
                  onChange={(e) => setForm({ ...form, summary: e.target.value })}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white text-sm"
                  rows={3}
                />
              </label>
              <label className="text-sm text-white/80 space-y-1">
                Tags (separados por coma)
                <input
                  value={form.tags}
                  onChange={(e) => setForm({ ...form, tags: e.target.value })}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white text-sm"
                />
              </label>
              <label className="text-sm text-white/80 space-y-1">
                Highlights (una por línea)
                <textarea
                  value={form.highlights}
                  onChange={(e) => setForm({ ...form, highlights: e.target.value })}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white text-sm"
                  rows={3}
                />
              </label>
              <div className="flex items-center gap-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-blue-dark font-semibold text-sm hover:bg-gray-100 transition disabled:opacity-60"
                >
                  {saving ? "Guardando..." : editingId ? "Actualizar" : "Guardar"}
                </button>
                {editingId && (
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/20 text-white text-sm hover:bg-white/10 transition"
                  >
                    Ir a media
                  </button>
                )}
                {editingId && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/20 text-white text-sm hover:bg-white/10 transition"
                  >
                    Cancelar edición
                  </button>
                )}
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-white/80 text-sm">
                  Media del proyecto {currentProject ? `(${currentProject.title})` : ""}
                </h4>
                {mediaSaving && <span className="text-xs text-white/60">Guardando...</span>}
              </div>

              <div className="space-y-2">
                {currentMedia.map((media) => (
                  <div
                    key={media.url}
                    className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3"
                  >
                    <div className="w-16 h-12 rounded-lg overflow-hidden border border-white/10 bg-white/10 flex items-center justify-center">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={media.url} alt={media.alt_text || media.caption || "media"} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm truncate">{media.url}</p>
                      <p className="text-white/60 text-xs capitalize">{media.type}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {media.is_primary ? (
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-coral/20 text-coral text-xs border border-coral/30">
                          <Star size={12} /> Portada
                        </span>
                      ) : (
                        <button
                          onClick={() => media?.id && setPrimary(media.id)}
                          className="px-3 py-1.5 rounded-lg border border-white/20 text-white text-xs hover:bg-white/10 transition"
                        >
                          Hacer portada
                        </button>
                      )}
                      <button
                        onClick={() => media?.id && deleteMedia(media.id)}
                        className="px-3 py-1.5 rounded-lg border border-white/20 text-white text-xs hover:bg-white/10 transition"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
                {!currentMedia.length && (
                  <div className="text-sm text-white/60 border border-dashed border-white/15 rounded-xl p-4 text-center">
                    Sin media. Agrega una URL o sube un archivo.
                  </div>
                )}
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-4 space-y-3">
                <p className="text-sm text-white/80">Agregar media</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label className="text-sm text-white/80 space-y-1">
                    URL
                    <input
                      value={mediaForm.url}
                      onChange={(e) => setMediaForm({ ...mediaForm, url: e.target.value })}
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white text-sm"
                      placeholder="https://..."
                    />
                  </label>
                  <label className="text-sm text-white/80 space-y-1">
                    Tipo media
                    <select
                      value={mediaForm.type}
                      onChange={(e) => setMediaForm({ ...mediaForm, type: e.target.value })}
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white text-sm"
                    >
                      <option value="image">image</option>
                      <option value="video">video</option>
                      <option value="pdf">pdf</option>
                      <option value="link">link</option>
                    </select>
                  </label>
                </div>
                <label className="text-sm text-white/80 inline-flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={mediaForm.is_primary}
                    onChange={(e) => setMediaForm({ ...mediaForm, is_primary: e.target.checked })}
                    className="h-4 w-4 rounded border-white/20 bg-white/10"
                  />
                  Marcar como portada
                </label>
                <div className="flex items-center gap-3">
                  <input
                    ref={uploadInputRef}
                    type="file"
                    accept="image/*,video/*"
                    onChange={(e) => setUploadFile(e.target.files?.[0] || null)}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => uploadInputRef.current?.click()}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/20 text-white text-sm hover:bg-white/10 transition"
                  >
                    Elegir archivo
                  </button>
                  {uploadFile && <span className="text-white/80 text-xs">{uploadFile.name}</span>}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleUpload}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-blue-dark font-semibold text-sm hover:bg-gray-100 transition"
                    disabled={mediaSaving || (!mediaForm.url && !uploadFile)}
                  >
                    <Upload size={16} /> {uploadFile ? "Subir y agregar" : "Agregar URL"}
                  </button>
                  <button
                    onClick={() => {
                      setMediaForm({ url: "", type: "image", is_primary: false })
                      setUploadFile(null)
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/20 text-white text-sm hover:bg-white/10 transition"
                  >
                    Limpiar
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
