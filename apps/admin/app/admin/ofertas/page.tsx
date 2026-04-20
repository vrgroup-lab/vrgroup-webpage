"use client"

import { useEffect, useMemo, useState } from "react"
import { ConfirmDialog } from "@/components/admin/confirm-dialog"
import type { JobRow } from "@vrgroup/domain"

type JobRecord = JobRow

const emptyForm = {
  slug: "",
  title: "",
  summary: "",
  description: "",
  status: "draft",
  location: "",
  modality: "",
  seniority: "",
  employment_type: "",
  tags: "",
  salary_min: "",
  salary_max: "",
  currency: "USD",
  apply_url: "",
  apply_email: "",
  apply_linkedin_url: "",
  apply_notion_url: "",
  responsibilities: "",
  benefits: "",
  requirements: "",
}

export default function AdminOffersPage() {
  const [jobs, setJobs] = useState<JobRecord[]>([])
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [confirmState, setConfirmState] = useState<{ open: boolean; id: string | null; title: string | null }>({
    open: false,
    id: null,
    title: null,
  })

  const sortedJobs = useMemo(() => jobs, [jobs])

  async function fetchJobs() {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/admin/jobs")
      const payload = await response.json()
      if (!response.ok) throw new Error(payload.error || "No se pudieron cargar las ofertas.")
      setJobs(payload.data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudieron cargar las ofertas.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchJobs()
  }, [])

  function resetForm() {
    setForm(emptyForm)
    setEditingId(null)
  }

  function startEdit(job: JobRecord) {
    setEditingId(job.id)
    setShowForm(true)
    setForm({
      slug: job.slug,
      title: job.title,
      summary: job.summary ?? "",
      description: job.description ?? "",
      status: job.status,
      location: job.location ?? "",
      modality: job.modality ?? "",
      seniority: job.seniority ?? "",
      employment_type: job.employment_type ?? "",
      tags: job.tags?.join(", ") ?? "",
      salary_min: job.salary_min?.toString() ?? "",
      salary_max: job.salary_max?.toString() ?? "",
      currency: job.currency ?? "USD",
      apply_url: job.apply_url ?? "",
      apply_email: job.apply_email ?? "",
      apply_linkedin_url: job.apply_linkedin_url ?? "",
      apply_notion_url: job.apply_notion_url ?? "",
      responsibilities: job.responsibilities ?? "",
      benefits: job.benefits ?? "",
      requirements: job.requirements ?? "",
    })
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    setSaving(true)
    setError(null)

    const payload = {
      ...form,
      tags: form.tags
        .split(",")
        .map((value) => value.trim())
        .filter(Boolean),
      salary_min: form.salary_min ? Number(form.salary_min) : null,
      salary_max: form.salary_max ? Number(form.salary_max) : null,
      published_at: form.status === "published" ? new Date().toISOString() : null,
    }

    try {
      const response = await fetch(editingId ? `/api/admin/jobs/${editingId}` : "/api/admin/jobs", {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error || "No se pudo guardar la oferta.")
      resetForm()
      setShowForm(false)
      await fetchJobs()
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo guardar la oferta.")
    } finally {
      setSaving(false)
    }
  }

  async function deleteJob(id: string) {
    setError(null)

    try {
      const response = await fetch(`/api/admin/jobs/${id}`, { method: "DELETE" })
      const payload = await response.json()
      if (!response.ok) throw new Error(payload.error || "No se pudo eliminar la oferta.")
      setJobs((current) => current.filter((job) => job.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo eliminar la oferta.")
    }
  }

  return (
    <section style={{ display: "grid", gap: 20 }}>
      <div
        style={{
          background: "#fff",
          border: "1px solid #d8e0ea",
          borderRadius: 28,
          padding: 24,
          boxShadow: "0 18px 45px rgba(15, 23, 42, 0.05)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", gap: 16, alignItems: "end", flexWrap: "wrap" }}>
          <div>
            <p style={{ margin: 0, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.16em", color: "#ff5a5f" }}>
              Ofertas
            </p>
            <h1 style={{ margin: "10px 0 0", fontSize: 40 }}>Administracion de ofertas</h1>
            <p style={{ margin: "10px 0 0", color: "#4f5d75", lineHeight: 1.6 }}>
              Publica, edita o archiva vacantes usando la tabla <code>jobs</code>.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              if (showForm) {
                setShowForm(false)
                resetForm()
              } else {
                setShowForm(true)
                resetForm()
              }
            }}
            style={{
              borderRadius: 999,
              border: "1px solid #ff5a5f",
              background: "#ff5a5f",
              color: "#fff",
              padding: "12px 16px",
              fontSize: 14,
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            {showForm ? "Cerrar formulario" : "Nueva oferta"}
          </button>
        </div>
      </div>

      {error ? (
        <div style={{ borderRadius: 20, border: "1px solid #fecaca", background: "#fef2f2", color: "#b91c1c", padding: 16 }}>{error}</div>
      ) : null}

      {showForm ? (
        <form
          onSubmit={handleSubmit}
          style={{
            display: "grid",
            gap: 18,
            background: "#fff",
            border: "1px solid #d8e0ea",
            borderRadius: 28,
            padding: 24,
            boxShadow: "0 18px 45px rgba(15, 23, 42, 0.05)",
          }}
        >
          <div style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
            {[
              { key: "title", label: "Titulo" },
              { key: "slug", label: "Slug" },
              { key: "location", label: "Ubicacion" },
              { key: "modality", label: "Modalidad" },
              { key: "seniority", label: "Senioridad" },
              { key: "employment_type", label: "Tipo de empleo" },
              { key: "status", label: "Estado" },
              { key: "currency", label: "Moneda" },
              { key: "salary_min", label: "Sueldo minimo" },
              { key: "salary_max", label: "Sueldo maximo" },
              { key: "apply_url", label: "Apply URL" },
              { key: "apply_email", label: "Apply email" },
              { key: "apply_linkedin_url", label: "LinkedIn URL" },
              { key: "apply_notion_url", label: "Notion URL" },
              { key: "tags", label: "Tags (coma separadas)" },
            ].map((field) => (
              <label key={field.key} style={{ display: "grid", gap: 8 }}>
                <span style={{ fontWeight: 700 }}>{field.label}</span>
                <input
                  value={form[field.key as keyof typeof form]}
                  onChange={(event) => setForm((current) => ({ ...current, [field.key]: event.target.value }))}
                  style={{
                    width: "100%",
                    borderRadius: 14,
                    border: "1px solid #d8e0ea",
                    padding: "12px 14px",
                    fontSize: 14,
                  }}
                />
              </label>
            ))}
          </div>

          {[
            { key: "summary", label: "Resumen", rows: 3 },
            { key: "description", label: "Descripcion", rows: 6 },
            { key: "responsibilities", label: "Responsabilidades", rows: 5 },
            { key: "requirements", label: "Requisitos", rows: 5 },
            { key: "benefits", label: "Beneficios", rows: 4 },
          ].map((field) => (
            <label key={field.key} style={{ display: "grid", gap: 8 }}>
              <span style={{ fontWeight: 700 }}>{field.label}</span>
              <textarea
                rows={field.rows}
                value={form[field.key as keyof typeof form]}
                onChange={(event) => setForm((current) => ({ ...current, [field.key]: event.target.value }))}
                style={{
                  width: "100%",
                  borderRadius: 14,
                  border: "1px solid #d8e0ea",
                  padding: "12px 14px",
                  fontSize: 14,
                  resize: "vertical",
                }}
              />
            </label>
          ))}

          <div style={{ display: "flex", justifyContent: "flex-end", gap: 12, flexWrap: "wrap" }}>
            <button
              type="button"
              onClick={() => {
                resetForm()
                setShowForm(false)
              }}
              style={{
                borderRadius: 999,
                border: "1px solid #d8e0ea",
                background: "#fff",
                color: "#0b1b33",
                padding: "12px 16px",
                fontSize: 14,
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={saving}
              style={{
                borderRadius: 999,
                border: "1px solid #0b1b33",
                background: "#0b1b33",
                color: "#fff",
                padding: "12px 16px",
                fontSize: 14,
                fontWeight: 700,
                cursor: "pointer",
                opacity: saving ? 0.7 : 1,
              }}
            >
              {saving ? "Guardando..." : editingId ? "Guardar cambios" : "Crear oferta"}
            </button>
          </div>
        </form>
      ) : null}

      <div style={{ display: "grid", gap: 14 }}>
        {loading ? (
          <div style={{ background: "#fff", border: "1px solid #d8e0ea", borderRadius: 24, padding: 24 }}>Cargando ofertas...</div>
        ) : sortedJobs.length === 0 ? (
          <div style={{ background: "#fff", border: "1px dashed #cbd5e1", borderRadius: 24, padding: 24, color: "#4f5d75" }}>
            No hay ofertas cargadas.
          </div>
        ) : (
          sortedJobs.map((job) => (
            <article
              key={job.id}
              style={{
                background: "#fff",
                border: "1px solid #d8e0ea",
                borderRadius: 24,
                padding: 22,
                display: "grid",
                gap: 10,
                boxShadow: "0 12px 30px rgba(15, 23, 42, 0.05)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
                <div>
                  <h2 style={{ margin: 0, fontSize: 24 }}>{job.title}</h2>
                  <p style={{ margin: "6px 0 0", color: "#4f5d75" }}>{job.slug}</p>
                </div>
                <span
                  style={{
                    alignSelf: "start",
                    borderRadius: 999,
                    background: job.status === "published" ? "#ecfdf3" : job.status === "archived" ? "#f3f4f6" : "#fff7ed",
                    color: job.status === "published" ? "#166534" : job.status === "archived" ? "#475467" : "#9a3412",
                    padding: "8px 12px",
                    fontWeight: 700,
                    fontSize: 12,
                    textTransform: "uppercase",
                  }}
                >
                  {job.status}
                </span>
              </div>
              {job.summary ? <p style={{ margin: 0, color: "#334155", lineHeight: 1.6 }}>{job.summary}</p> : null}
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", color: "#5b6b82", fontSize: 14 }}>
                {job.location ? <span>{job.location}</span> : null}
                {job.modality ? <span>{job.modality}</span> : null}
                {job.seniority ? <span>{job.seniority}</span> : null}
                {job.employment_type ? <span>{job.employment_type}</span> : null}
              </div>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <button
                  type="button"
                  onClick={() => startEdit(job)}
                  style={{
                    borderRadius: 999,
                    border: "1px solid #d8e0ea",
                    background: "#fff",
                    color: "#0b1b33",
                    padding: "10px 14px",
                    fontSize: 14,
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  Editar
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmState({ open: true, id: job.id, title: job.title })}
                  style={{
                    borderRadius: 999,
                    border: "1px solid #fecaca",
                    background: "#fff1f2",
                    color: "#be123c",
                    padding: "10px 14px",
                    fontSize: 14,
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  Eliminar
                </button>
              </div>
            </article>
          ))
        )}
      </div>

      <ConfirmDialog
        open={confirmState.open}
        title="Eliminar oferta"
        description={`Se eliminara ${confirmState.title || "esta oferta"} de forma permanente.`}
        confirmLabel="Eliminar oferta"
        onCancel={() => setConfirmState({ open: false, id: null, title: null })}
        onConfirm={async () => {
          if (!confirmState.id) return
          await deleteJob(confirmState.id)
          setConfirmState({ open: false, id: null, title: null })
        }}
      />
    </section>
  )
}
