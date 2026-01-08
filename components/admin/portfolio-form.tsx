"use client"

import { useEffect, useRef, useState } from "react"
import { CheckSquare, Image as ImageIcon, Star, Upload, X } from "lucide-react"

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
  service_line_id?: string | null
  tags: string[]
  highlights: string[]
  portfolio_media?: MediaPayload[]
  service_lines?: { id: string; slug: string; name: string } | null
}

type ServiceLine = {
  id: string
  slug: string
  name: string
  display_order?: number
  is_active?: boolean
}

const statusOptions = [
  { value: "draft", label: "Draft" },
  { value: "public", label: "Public" },
  { value: "hidden", label: "Hidden" },
]

const inputClass =
  "w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-600"
const labelClass = "text-sm text-gray-700 space-y-1"
const mutedButton =
  "px-3 py-1.5 rounded-lg border border-gray-200 text-gray-700 text-xs font-semibold hover:bg-gray-100 transition"

export function PortfolioForm({ projectId }: { projectId?: string }) {
  const uploadInputRef = useRef<HTMLInputElement | null>(null)
  const [projects, setProjects] = useState<PortfolioProject[]>([])
  const [serviceLines, setServiceLines] = useState<ServiceLine[]>([])
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [mediaSaving, setMediaSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [step, setStep] = useState<1 | 2>(1)
  const [editingId, setEditingId] = useState<string | null>(projectId ?? null)
  const [uploadFile, setUploadFile] = useState<File | null>(null)
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
    service_line_id: "",
  })
  const [mediaForm, setMediaForm] = useState({
    url: "",
    type: "image",
    is_primary: false,
  })
  const [showMediaForm, setShowMediaForm] = useState(false)

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

  const fetchServiceLines = async () => {
    try {
      const res = await fetch("/api/admin/service-lines")
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || "Error al cargar líneas de servicio")
      const lines = (json.data || []).filter((line: ServiceLine) => line.is_active !== false)
      setServiceLines(lines)
    } catch {
      setServiceLines([])
    }
  }

  useEffect(() => {
    fetchProjects()
    fetchServiceLines()
  }, [])

  useEffect(() => {
    if (!projectId) return
    const project = projects.find((p) => p.id === projectId)
    if (!project) return
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
      tags: Array.isArray(project.tags) ? project.tags.join(", ") : "",
      highlights: Array.isArray(project.highlights) ? project.highlights.join("\n") : "",
      service_line_id: project.service_line_id ?? "",
    })
    setMediaForm({
      url: primaryMedia?.url ?? "",
      type: primaryMedia?.type ?? "image",
      is_primary: true,
    })
  }, [projectId, projects])

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
      service_line_id: "",
    })
    setEditingId(null)
    setStep(1)
    setMediaForm({ url: "", type: "image", is_primary: false })
    setUploadFile(null)
  }

  const currentProject = projects.find((p) => p.id === editingId) || null
  const currentMedia = currentProject?.portfolio_media ?? []

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
      service_line_id: form.service_line_id || null,
      tags: form.tags ? form.tags.split(",").map((t) => t.trim()).filter(Boolean) : [],
      highlights: form.highlights ? form.highlights.split("\n").map((t) => t.trim()).filter(Boolean) : [],
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
        fetchProjects()
      } else {
        fetchProjects()
      }
    } catch (err: any) {
      setError(err?.message || "No se pudo guardar el proyecto")
    } finally {
      setSaving(false)
    }
  }

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
    <div className="space-y-4 text-gray-900">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setStep(1)}
            className={`px-3 py-2 rounded-lg text-sm font-semibold border transition ${
              step === 1 ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
            }`}
          >
            Paso 1 · Detalles
          </button>
          <button
            onClick={() => editingId && setStep(2)}
            disabled={!editingId}
            className={`px-3 py-2 rounded-lg text-sm font-semibold border transition ${
              step === 2 ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
            } ${!editingId ? "opacity-60 cursor-not-allowed" : ""}`}
          >
            Paso 2 · Media
          </button>
        </div>
        <button
          onClick={resetForm}
          className="p-2 rounded-lg bg-white text-gray-600 hover:text-gray-800 border border-gray-200"
          aria-label="Cerrar"
          type="button"
        >
          <X size={16} />
        </button>
      </div>

      {error && <div className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg p-3">{error}</div>}

      <div className="border border-gray-200 rounded-xl p-4 bg-white space-y-3 shadow-sm">
        <div className="flex items-center justify-between">
          {step === 1 ? (
            <h3 className="font-display text-lg font-semibold flex items-center gap-2 text-gray-900">
              <CheckSquare size={18} /> {editingId ? "Editar proyecto" : "Nuevo proyecto"}
            </h3>
          ) : (
            <h3 className="font-display text-lg font-semibold flex items-center gap-2 text-gray-900">
              <ImageIcon size={18} /> Media y portada
            </h3>
          )}
        </div>

        {step === 1 ? (
          <form className="space-y-3" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className={labelClass}>
                <span>Slug</span>
                <input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className={inputClass} required />
              </label>
              <label className={labelClass}>
                <span>Título</span>
                <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className={inputClass} required />
              </label>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <label className={labelClass}>
                <span>Estado</span>
                <select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                  className={`${inputClass} pr-10`}
                >
                  {statusOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </label>
              <label className={labelClass}>
                <span>Orden</span>
                <input
                  type="number"
                  value={form.display_order}
                  onChange={(e) => setForm({ ...form, display_order: Number(e.target.value) })}
                  className={inputClass}
                />
              </label>
              <label className="text-sm text-gray-700 flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={form.is_featured}
                  onChange={(e) => setForm({ ...form, is_featured: e.target.checked })}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600"
                />
                Destacado
              </label>
            </div>
            <label className={labelClass}>
              <span>Cliente (display)</span>
              <input
                value={form.client_display}
                onChange={(e) => setForm({ ...form, client_display: e.target.value })}
                className={inputClass}
                required
              />
            </label>
            <label className={labelClass}>
              <span>Línea de servicio</span>
              <select
                value={form.service_line_id}
                onChange={(e) => setForm({ ...form, service_line_id: e.target.value })}
                className={`${inputClass} pr-10`}
                required={serviceLines.length > 0}
              >
                <option value="">Selecciona una línea</option>
                {serviceLines.map((line) => (
                  <option key={line.id} value={line.id}>
                    {line.name}
                  </option>
                ))}
              </select>
            </label>
            <label className={labelClass}>
              <span>Resumen</span>
              <textarea
                value={form.summary}
                onChange={(e) => setForm({ ...form, summary: e.target.value })}
                className={`${inputClass} h-24`}
                rows={3}
              />
            </label>
            <label className={labelClass}>
              <span>Tags (separados por coma)</span>
              <input value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} className={inputClass} />
            </label>
            <label className={labelClass}>
              <span>Highlights (una por línea)</span>
              <textarea
                value={form.highlights}
                onChange={(e) => setForm({ ...form, highlights: e.target.value })}
                className={`${inputClass} h-24`}
                rows={3}
              />
            </label>
            <div className="flex items-center gap-2">
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 transition disabled:opacity-60"
              >
                {saving ? "Guardando..." : editingId ? "Actualizar" : "Guardar"}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-gray-700 text-sm hover:bg-gray-100 transition"
                >
                  Ir a media
                </button>
              )}
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="space-y-2">
              {currentMedia.map((media) => (
                <div key={media.url} className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-3 shadow-sm">
                  <div className="w-16 h-12 rounded-lg overflow-hidden border border-gray-200 bg-gray-50 flex items-center justify-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={media.url} alt={media.alt_text || media.caption || "media"} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900 truncate max-w-[360px]">{media.url}</p>
                    <p className="text-xs text-gray-500 capitalize truncate max-w-[360px]">{media.type}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {media.is_primary ? (
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-blue-50 text-blue-700 text-xs border border-blue-100">
                        <Star size={12} /> Portada
                      </span>
                    ) : (
                      <button onClick={() => media?.id && setPrimary(media.id)} className={mutedButton}>
                        Hacer portada
                      </button>
                    )}
                    <button onClick={() => media?.id && deleteMedia(media.id)} className={mutedButton}>
                      <X size={14} />
                    </button>
                  </div>
                </div>
              ))}
              {!currentMedia.length && (
                <div className="text-sm text-gray-500 border border-dashed border-gray-200 rounded-xl p-4 text-center bg-gray-50">
                  Sin media. Agrega una URL o sube un archivo.
                </div>
              )}
            </div>

            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 space-y-3">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setShowMediaForm((v) => !v)}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-200 text-gray-700 text-sm hover:bg-white transition"
                >
                  {showMediaForm ? "Ocultar" : "+ Agregar media"}
                </button>
                <p className="text-sm text-gray-700">{showMediaForm ? "Carga una URL o archivo" : "URL o archivo (opcional)"}</p>
              </div>

              {showMediaForm && (
                <div className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <label className={labelClass}>
                      <span>URL</span>
                      <input
                        value={mediaForm.url}
                        onChange={(e) => setMediaForm({ ...mediaForm, url: e.target.value })}
                        className={inputClass}
                        placeholder="https://..."
                      />
                    </label>
                    <label className={labelClass}>
                      <span>Tipo media</span>
                      <select
                        value={mediaForm.type}
                        onChange={(e) => setMediaForm({ ...mediaForm, type: e.target.value })}
                        className={`${inputClass} pr-10`}
                      >
                        <option value="image">image</option>
                        <option value="video">video</option>
                        <option value="pdf">pdf</option>
                        <option value="link">link</option>
                      </select>
                    </label>
                  </div>
                  <label className="text-sm text-gray-700 inline-flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={mediaForm.is_primary}
                      onChange={(e) => setMediaForm({ ...mediaForm, is_primary: e.target.checked })}
                      className="h-4 w-4 rounded border-gray-300 text-blue-600"
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
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-gray-700 text-sm hover:bg-white transition"
                    >
                      Elegir archivo
                    </button>
                    {uploadFile && <span className="text-gray-700 text-xs truncate max-w-[200px]">{uploadFile.name}</span>}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleUpload}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 transition disabled:opacity-60"
                      disabled={mediaSaving || (!mediaForm.url && !uploadFile)}
                    >
                      <Upload size={16} /> {uploadFile ? "Subir y agregar" : "Agregar URL"}
                    </button>
                    <button
                      onClick={() => {
                        setMediaForm({ url: "", type: "image", is_primary: false })
                        setUploadFile(null)
                      }}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-gray-700 text-sm hover:bg-white transition"
                    >
                      Limpiar
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
