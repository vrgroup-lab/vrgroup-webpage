"use client"

import { useEffect, useMemo, useState } from "react"
import { BriefcaseBusiness, Globe2, MapPin, PenLine, Plus, Tags, Trash2 } from "lucide-react"
import { getSupabaseBrowser } from "@/lib/supabase/client"

type Job = {
  id: string
  slug: string
  title: string
  summary: string | null
  status: string
  location: string | null
  modality: string | null
  seniority: string | null
  employment_type: string | null
  tags: string[] | null
  salary_min: number | null
  salary_max: number | null
  apply_linkedin_url: string | null
  apply_notion_url: string | null
  responsibilities?: string | null
  benefits?: string | null
  requirements?: string | null
  created_at: string
}

const statuses = ["draft", "published", "archived"]
const locationOptions = ["Santiago de Chile", "Chile", "Global"]
const modalityOptions = ["Remoto", "Híbrido", "Presencial"]
const seniorityOptions = ["Junior", "Semi-Senior", "Senior"]
const salaryMinRange = 0
const salaryMaxRange = 5000000
const salaryStep = 50000
const salaryDefaults = { min: 1000000, max: 1400000 }
const employmentTypes = ["Full time", "Part time", "Freelance"]

export default function AdminJobsPage() {
  useMemo(() => getSupabaseBrowser(), [])
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({
    slug: "",
    title: "",
    summary: "",
    status: "draft",
    location: "",
    modality: "",
    seniority: "",
    employment_type: "",
    tags: "",
    salary_min: salaryDefaults.min.toString(),
    salary_max: salaryDefaults.max.toString(),
    apply_linkedin_url: "",
    apply_notion_url: "",
    responsibilities: "",
    benefits: "",
    requirements: "",
  })

  const parsedMin = Number(form.salary_min)
  const parsedMax = Number(form.salary_max)
  const salaryMinValue = Math.min(
    Math.max(Number.isFinite(parsedMin) ? parsedMin : salaryDefaults.min, salaryMinRange),
    salaryMaxRange
  )
  const salaryMaxValueRaw = Math.min(
    Math.max(Number.isFinite(parsedMax) ? parsedMax : salaryDefaults.max, salaryMinRange),
    salaryMaxRange
  )
  const salaryMaxValue = Math.max(salaryMinValue, salaryMaxValueRaw)

  const fetchJobs = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch("/api/admin/jobs")
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || "Error al cargar ofertas")
      setJobs(json.data || [])
    } catch (err: any) {
      setError(err?.message || "No se pudieron cargar las ofertas")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchJobs()
  }, [])

  const resetForm = () => {
    setForm({
      slug: "",
      title: "",
      summary: "",
      status: "draft",
      location: "",
      modality: "",
      seniority: "",
      tags: "",
      salary_min: salaryDefaults.min.toString(),
      salary_max: salaryDefaults.max.toString(),
      apply_linkedin_url: "",
      apply_notion_url: "",
      responsibilities: "",
      benefits: "",
      requirements: "",
    })
    setEditingId(null)
  }

  const upsertJob = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError(null)
    const payload = {
      slug: form.slug,
      title: form.title,
      summary: form.summary,
      status: form.status,
      location: form.location,
      modality: form.modality,
      seniority: form.seniority,
      employment_type: form.employment_type,
      tags: form.tags ? form.tags.split(",").map((t) => t.trim()).filter(Boolean) : [],
      salary_min: salaryMinValue,
      salary_max: salaryMaxValue,
      apply_linkedin_url: form.apply_linkedin_url,
      apply_notion_url: form.apply_notion_url,
      responsibilities: form.responsibilities,
      benefits: form.benefits,
      requirements: form.requirements,
    }
    try {
      const endpoint = editingId ? `/api/admin/jobs/${editingId}` : "/api/admin/jobs"
      const method = editingId ? "PUT" : "POST"
      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || "Error al guardar oferta")
      resetForm()
      fetchJobs()
    } catch (err: any) {
      setError(err?.message || "No se pudo guardar la oferta")
    } finally {
      setSaving(false)
    }
  }

  const editJob = (job: Job) => {
    setEditingId(job.id)
    setForm({
      slug: job.slug,
      title: job.title,
      summary: job.summary ?? "",
      status: job.status,
      location: job.location ?? "",
      modality: job.modality ?? "",
      seniority: job.seniority ?? "",
      employment_type: job.employment_type ?? "",
      tags: job.tags?.join(", ") ?? "",
      salary_min: job.salary_min?.toString() ?? "",
      salary_max: job.salary_max?.toString() ?? "",
      apply_linkedin_url: job.apply_linkedin_url ?? "",
      apply_notion_url: job.apply_notion_url ?? "",
      responsibilities: job.responsibilities ?? "",
      benefits: job.benefits ?? "",
      requirements: job.requirements ?? "",
    })
  }

  const deleteJob = async (id: string) => {
    setError(null)
    try {
      const res = await fetch(`/api/admin/jobs/${id}`, { method: "DELETE" })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || "Error al eliminar oferta")
      setJobs((prev) => prev.filter((job) => job.id !== id))
    } catch (err: any) {
      setError(err?.message || "No se pudo eliminar la oferta")
    }
  }

  return (
    <div className="space-y-6">
      <header className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-gray-500">Ofertas</p>
          <h1 className="font-display text-3xl font-bold text-gray-900">Administración de ofertas</h1>
          <p className="text-gray-600">Publica, edita o archiva vacantes.</p>
        </div>
        <button
          type="button"
          onClick={() => {
            setShowForm((v) => !v)
            if (!showForm) resetForm()
          }}
          className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-600 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 transition-all"
        >
          <Plus size={14} />
          {showForm ? "Cerrar" : "Nueva oferta"}
        </button>
      </header>

      {error && <div className="rounded-xl border border-red-200 bg-red-50 text-red-700 px-4 py-3 text-sm">{error}</div>}

      <section className="rounded-xl border border-gray-200 bg-white p-4 sm:p-5 space-y-3 shadow-sm">
        <div className="flex items-center gap-2">
          <BriefcaseBusiness className="w-4 h-4 text-gray-500" />
          <h2 className="font-display text-xl font-semibold text-gray-900">Listado</h2>
        </div>
        {loading ? (
          <p className="text-gray-600 text-sm">Cargando...</p>
        ) : (
          <div className="space-y-3">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-lg border border-gray-200 bg-white px-4 py-3 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gray-100 text-gray-900 flex items-center justify-center font-semibold">
                    {job.title?.[0]?.toUpperCase() || "J"}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{job.title}</p>
                    <p className="text-xs text-gray-500">{job.slug}</p>
                    <p className="text-xs text-gray-600 flex items-center gap-2">
                      {job.location && (
                        <span className="inline-flex items-center gap-1">
                          <MapPin size={12} /> {job.location}
                        </span>
                      )}
                      {job.modality && (
                        <span className="inline-flex items-center gap-1">
                          <Globe2 size={12} /> {job.modality}
                        </span>
                      )}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <select
                    className="bg-white border border-gray-200 text-gray-900 text-sm rounded-lg px-3 py-2"
                    value={job.status}
                    onChange={(e) => updateJobStatus(job.id, e.target.value)}
                  >
                    {statuses.map((s) => (
                      <option key={s} value={s} className="text-blue-dark">
                        {s}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={() => {
                      editJob(job)
                      setShowForm(true)
                    }}
                    className="text-gray-600 hover:text-gray-800"
                    title="Editar"
                  >
                    <PenLine size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteJob(job.id)}
                    className="text-red-500 hover:text-red-600"
                    title="Eliminar"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
            {jobs.length === 0 && <p className="text-gray-500 text-sm">No hay ofertas cargadas.</p>}
          </div>
        )}
      </section>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 backdrop-blur-sm px-4 py-8 overflow-y-auto">
          <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white border border-gray-200 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Plus className="w-4 h-4 text-gray-500" />
                <h2 className="font-display text-xl font-semibold text-gray-900">{editingId ? "Editar oferta" : "Nueva oferta"}</h2>
              </div>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="text-gray-500 hover:text-gray-800"
              >
                ✕
              </button>
            </div>
            <form className="space-y-3" onSubmit={upsertJob}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Título</label>
                  <input
                    type="text"
                    required
                    value={form.title}
                    onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-600"
                    placeholder="Ej: Backend Engineer"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Slug</label>
                  <input
                    type="text"
                    required
                    value={form.slug}
                    onChange={(e) => setForm((prev) => ({ ...prev, slug: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-600"
                    placeholder="backend-engineer"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Resumen</label>
                <textarea
                  value={form.summary}
                  onChange={(e) => setForm((prev) => ({ ...prev, summary: e.target.value }))}
                  rows={10}
                  className="w-full px-3 py-3 rounded-lg bg-white border border-gray-200 text-gray-900 text-sm leading-relaxed placeholder:text-gray-400 focus:outline-none focus:border-blue-600 resize-none"
                  placeholder="Descripción breve de la vacante y su impacto"
                ></textarea>
              </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm text-gray-700 mb-1">Ubicación</label>
                <select
                  value={form.location}
                    onChange={(e) => setForm((prev) => ({ ...prev, location: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-gray-200 text-gray-900 focus:outline-none focus:border-blue-600"
                  >
                    <option value="" className="text-blue-dark">
                      Selecciona
                    </option>
                    {locationOptions.map((opt) => (
                      <option key={opt} value={opt} className="text-blue-dark">
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Modalidad</label>
                <select
                  value={form.modality}
                    onChange={(e) => setForm((prev) => ({ ...prev, modality: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-gray-200 text-gray-900 focus:outline-none focus:border-blue-600"
                  >
                    <option value="" className="text-blue-dark">
                      Selecciona
                    </option>
                    {modalityOptions.map((opt) => (
                      <option key={opt} value={opt} className="text-blue-dark">
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Tipo de empleo</label>
                <select
                  value={form.employment_type}
                  onChange={(e) => setForm((prev) => ({ ...prev, employment_type: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-gray-200 text-gray-900 focus:outline-none focus:border-blue-600"
                >
                  <option value="" className="text-blue-dark">
                    Selecciona
                  </option>
                  {employmentTypes.map((opt) => (
                    <option key={opt} value={opt} className="text-blue-dark">
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Responsabilidades</label>
                  <textarea
                    value={form.responsibilities}
                    onChange={(e) => setForm((prev) => ({ ...prev, responsibilities: e.target.value }))}
                    rows={4}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-gray-200 text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none focus:border-blue-600"
                    placeholder="Escribe cada línea como un ítem"
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Requisitos</label>
                  <textarea
                    value={form.requirements}
                    onChange={(e) => setForm((prev) => ({ ...prev, requirements: e.target.value }))}
                    rows={4}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-gray-200 text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none focus:border-blue-600"
                    placeholder="Escribe cada línea como un ítem"
                  ></textarea>
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Beneficios</label>
                <textarea
                  value={form.benefits}
                  onChange={(e) => setForm((prev) => ({ ...prev, benefits: e.target.value }))}
                  rows={4}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-gray-200 text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none focus:border-blue-600"
                  placeholder="Escribe cada línea como un ítem"
                ></textarea>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Seniority</label>
                  <select
                    value={form.seniority}
                    onChange={(e) => setForm((prev) => ({ ...prev, seniority: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-gray-200 text-gray-900 focus:outline-none focus:border-blue-600"
                  >
                    <option value="" className="text-blue-dark">
                      Selecciona
                    </option>
                    {seniorityOptions.map((opt) => (
                      <option key={opt} value={opt} className="text-blue-dark">
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Estado</label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm((prev) => ({ ...prev, status: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-gray-200 text-gray-900 focus:outline-none focus:border-blue-600"
                  >
                    {statuses.map((s) => (
                      <option key={s} value={s} className="text-blue-dark">
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1 flex items-center gap-1">
                  <Tags size={14} /> Tags (separadas por coma)
                </label>
                <input
                  type="text"
                  value={form.tags}
                  onChange={(e) => setForm((prev) => ({ ...prev, tags: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-600"
                  placeholder="react, node, agile"
                />
              </div>
              <div className="space-y-3">
                <label className="block text-sm text-gray-700">Pretensión de renta</label>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Mín: {salaryMinValue.toLocaleString("es-CL")}</span>
                  <span>Máx: {Math.max(salaryMinValue, salaryMaxValue).toLocaleString("es-CL")}</span>
                </div>
                <div className="w-full h-2 rounded-full bg-gray-100 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-600 to-blue-400"
                    style={{
                      width: `${((Math.max(salaryMinValue, salaryMaxValue) - salaryMinRange) / (salaryMaxRange - salaryMinRange)) * 100}%`,
                      marginLeft: `${((salaryMinValue - salaryMinRange) / (salaryMaxRange - salaryMinRange)) * 100}%`,
                    }}
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Mínimo</label>
                    <input
                      type="number"
                      min={salaryMinRange}
                      max={salaryMaxRange}
                      step={salaryStep}
                    value={form.salary_min}
                      onChange={(e) => {
                        const val = e.target.value
                        setForm((prev) => ({ ...prev, salary_min: val }))
                      }}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-600"
                    placeholder="Mínimo"
                  />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Máximo</label>
                    <input
                      type="number"
                      min={salaryMinRange}
                      max={salaryMaxRange}
                      step={salaryStep}
                      value={form.salary_max}
                      onChange={(e) => {
                        const val = e.target.value
                        setForm((prev) => ({ ...prev, salary_max: val }))
                      }}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-600"
                    placeholder="Máximo"
                  />
                </div>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Link oferta en LinkedIn</label>
                  <input
                    type="url"
                    value={form.apply_linkedin_url}
                    onChange={(e) => setForm((prev) => ({ ...prev, apply_linkedin_url: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-600"
                    placeholder="https://www.linkedin.com/..."
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Link formulario (Notion)</label>
                  <input
                    type="url"
                    value={form.apply_notion_url}
                    onChange={(e) => setForm((prev) => ({ ...prev, apply_notion_url: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-600"
                    placeholder="https://www.notion.so/..."
                  />
                </div>
              </div>
              <div className="flex items-center gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => {
                    resetForm()
                    setShowForm(false)
                  }}
                  className="text-gray-600 hover:text-gray-800 text-sm"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-semibold text-white bg-blue-600 shadow-sm hover:bg-blue-700 transition-all disabled:opacity-60"
                >
                  <Plus size={16} />
                  {saving ? "Guardando..." : editingId ? "Actualizar" : "Crear oferta"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )

  async function updateJobStatus(id: string, status: string) {
    setError(null)
    try {
      const res = await fetch(`/api/admin/jobs/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || "Error al actualizar estado")
      fetchJobs()
    } catch (err: any) {
      setError(err?.message || "No se pudo actualizar la oferta")
    }
  }
}
