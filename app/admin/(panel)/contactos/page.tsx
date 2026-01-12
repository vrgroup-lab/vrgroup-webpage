"use client"

import { useEffect, useState } from "react"
import { Building2, Mail, Phone, MessageCircle, Calendar, BadgeCheck, AlertTriangle, Trash2, X } from "lucide-react"
import { ConfirmDialog } from "@/components/admin/confirm-dialog"

type ContactSubmission = {
  id: string
  created_at: string
  nombre: string
  empresa?: string | null
  email: string
  telefono?: string | null
  industria?: string | null
  asunto?: string | null
  mensaje: string
  status: string
  email_provider_id?: string | null
  error?: string | null
  ip?: string | null
  user_agent?: string | null
}

export default function AdminContactsPage() {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [draggingId, setDraggingId] = useState<string | null>(null)
  const [updatingId, setUpdatingId] = useState<string | null>(null)
  const [selected, setSelected] = useState<ContactSubmission | null>(null)
  const [confirmState, setConfirmState] = useState<{ open: boolean; id: string | null; name: string | null }>({
    open: false,
    id: null,
    name: null,
  })
  const [deleting, setDeleting] = useState(false)

  const columns = [
    {
      key: "pendiente",
      label: "Por contactar",
      statuses: ["pendiente", "nuevo", "pending", "por-contactar", "por contactar"],
      setStatus: "pendiente",
      tone: {
        container: "bg-blue-100/90 border-blue-300",
        bar: "border-blue-500",
        badge: "bg-blue-200 text-blue-800",
        title: "text-blue-900",
      },
    },
    {
      key: "seguimiento",
      label: "En seguimiento",
      statuses: ["en-progreso", "en progreso", "contactado"],
      setStatus: "en-progreso",
      tone: {
        container: "bg-amber-100/90 border-amber-300",
        bar: "border-amber-500",
        badge: "bg-amber-200 text-amber-800",
        title: "text-amber-900",
      },
    },
    {
      key: "calificado",
      label: "Calificados",
      statuses: ["calificado", "qualified"],
      setStatus: "calificado",
      tone: {
        container: "bg-emerald-100/90 border-emerald-300",
        bar: "border-emerald-500",
        badge: "bg-emerald-200 text-emerald-800",
        title: "text-emerald-900",
      },
    },
    {
      key: "cerrado",
      label: "Cerrados",
      statuses: ["cerrado", "closed", "won"],
      setStatus: "cerrado",
      tone: {
        container: "bg-slate-100/90 border-slate-300",
        bar: "border-slate-500",
        badge: "bg-slate-200 text-slate-800",
        title: "text-slate-900",
      },
    },
    {
      key: "error",
      label: "Error",
      statuses: ["error", "fallido", "failed"],
      setStatus: "error",
      tone: {
        container: "bg-red-100/90 border-red-300",
        bar: "border-red-500",
        badge: "bg-red-200 text-red-800",
        title: "text-red-900",
      },
    },
  ]

  const fetchSubmissions = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch("/api/admin/contact-submissions")
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || "Error al cargar contactos")
      setSubmissions(json.data || [])
    } catch (err: any) {
      setError(err?.message || "No se pudieron cargar los contactos")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSubmissions()
  }, [])

  const normalized = (value?: string | null) => (value || "pendiente").toLowerCase().trim()
  const displayStatus = (value?: string | null) => {
    const status = normalized(value)
    if (columns[0].statuses.includes(status)) return "Pendiente"
    if (columns[1].statuses.includes(status)) return "En seguimiento"
    if (columns[2].statuses.includes(status)) return "Calificado"
    if (columns[3].statuses.includes(status)) return "Cerrado"
    if (columns[4].statuses.includes(status)) return "Error"
    return "Pendiente"
  }
  const grouped = submissions.reduce<Record<string, ContactSubmission[]>>((acc, submission) => {
    const status = normalized(submission.status)
    const column = columns.find((col) => col.statuses.includes(status))
    const key = column?.key ?? columns[0].key
    if (!acc[key]) acc[key] = []
    acc[key].push(submission)
    return acc
  }, {})

  const updateStatus = async (id: string, status: string) => {
    setUpdatingId(id)
    setError(null)
    try {
      const res = await fetch(`/api/admin/contact-submissions/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || "No se pudo actualizar el estado")
      setSubmissions((prev) => prev.map((item) => (item.id === id ? { ...item, status } : item)))
    } catch (err: any) {
      setError(err?.message || "No se pudo actualizar el estado")
    } finally {
      setUpdatingId(null)
    }
  }

  const deleteSubmission = async (id: string) => {
    setError(null)
    setDeleting(true)
    try {
      const res = await fetch(`/api/admin/contact-submissions/${id}`, { method: "DELETE" })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || "No se pudo eliminar el lead")
      setSubmissions((prev) => prev.filter((item) => item.id !== id))
    } catch (err: any) {
      setError(err?.message || "No se pudo eliminar el lead")
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div className="space-y-6">
      <header className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-gray-500">Contactos</p>
          <h1 className="font-display text-3xl font-bold text-gray-900">Leads y submissions</h1>
          <p className="text-gray-600">Revisa los mensajes enviados desde el formulario de contacto.</p>
        </div>
      </header>

      {error && <div className="rounded-xl border border-red-200 bg-red-50 text-red-700 px-4 py-3 text-sm">{error}</div>}

      <section className="rounded-xl border border-gray-200 bg-[#f8fafc] p-4 sm:p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <MessageCircle className="w-4 h-4 text-gray-500" />
          <h2 className="font-display text-xl font-semibold text-gray-900">Tablero de leads</h2>
        </div>

        {loading ? (
          <p className="text-gray-600 text-sm">Cargando...</p>
        ) : submissions.length === 0 ? (
          <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-6 text-center text-sm text-gray-600">
            Aún no hay submissions registrados.
          </div>
        ) : (
          <div className="flex gap-4 overflow-x-auto pb-2">
            {columns.map((column) => {
              const items = grouped[column.key] ?? []
              return (
                <div
                  key={column.key}
                  onDragOver={(event) => event.preventDefault()}
                  onDrop={() => {
                    if (!draggingId) return
                    const targetStatus = column.setStatus || "pendiente"
                    updateStatus(draggingId, targetStatus)
                    setDraggingId(null)
                  }}
                  className={`min-w-[260px] max-w-[320px] flex-1 rounded-2xl p-3 space-y-3 transition-colors ${column.tone.container}`}
                >
                  <div className="flex items-center justify-between">
                    <p className={`text-sm font-semibold ${column.tone.title}`}>{column.label}</p>
                    <span className="text-xs font-semibold text-gray-600 bg-white/80 border border-white/80 rounded-full px-2 py-0.5">
                      {items.length}
                    </span>
                  </div>
                  <div className="space-y-3">
                    {items.map((submission) => {
                      const createdAt = new Date(submission.created_at)
                      const hasError = normalized(submission.status) === "error" || Boolean(submission.error)
                      const isUpdating = updatingId === submission.id

                      return (
                        <div
                          key={submission.id}
                          draggable
                          onDragStart={() => setDraggingId(submission.id)}
                          onDragEnd={() => setDraggingId(null)}
                          onClick={() => {
                            if (draggingId) return
                            setSelected(submission)
                          }}
                          className={`rounded-xl border border-gray-200 bg-white p-3 shadow-sm space-y-2 cursor-pointer hover:shadow-md border-l-4 ${column.tone.bar} ${
                            isUpdating ? "opacity-70" : ""
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <div>
                              <p className="text-sm font-semibold text-gray-900">{submission.nombre}</p>
                              <p className="text-xs text-gray-500 break-all whitespace-normal">{submission.email}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <span
                                className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                                  hasError ? "bg-red-100 text-red-700" : column.tone.badge
                                }`}
                              >
                                {hasError ? <AlertTriangle size={11} /> : <BadgeCheck size={11} />}
                                {displayStatus(submission.status)}
                              </span>
                              <button
                                type="button"
                                onClick={(event) => {
                                  event.stopPropagation()
                                  setConfirmState({
                                    open: true,
                                    id: submission.id,
                                    name: submission.nombre || "este lead",
                                  })
                                }}
                                className="text-gray-400 hover:text-red-500"
                                title="Eliminar"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <Calendar size={12} />
                            {createdAt.toLocaleDateString("es-CL", { dateStyle: "medium" })}
                          </div>

                          <div className="space-y-1 text-xs text-gray-600">
                            <div className="flex items-center gap-2">
                              <Building2 size={12} className="text-gray-400" />
                              <span className="break-words">{submission.empresa || "Sin empresa"}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Phone size={12} className="text-gray-400" />
                              <span className="break-all">{submission.telefono || "Sin teléfono"}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Mail size={12} className="text-gray-400" />
                              <span className="break-words">{submission.industria || "Sin industria"}</span>
                            </div>
                          </div>

                          <div className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2">
                            <p className="text-[11px] uppercase tracking-[0.2em] text-gray-500 mb-1">Asunto</p>
                            <p className="text-xs text-gray-700 line-clamp-1">{submission.asunto || "Sin asunto"}</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </section>

      <ConfirmDialog
        open={confirmState.open}
        title="Eliminar lead"
        description={`¿Seguro que quieres eliminar ${confirmState.name || "este lead"}? Esta acción no se puede deshacer.`}
        confirmLabel="Eliminar lead"
        onCancel={() => setConfirmState({ open: false, id: null, name: null })}
        onConfirm={async () => {
          if (!confirmState.id) return
          await deleteSubmission(confirmState.id)
          setConfirmState({ open: false, id: null, name: null })
        }}
        loading={deleting}
      />

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="w-full max-w-2xl rounded-2xl border border-gray-200 bg-white shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-gray-500">Detalle del lead</p>
                <h3 className="font-display text-xl font-semibold text-gray-900">{selected.nombre}</h3>
              </div>
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="h-9 w-9 rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50 flex items-center justify-center"
                aria-label="Cerrar"
              >
                <X size={16} />
              </button>
            </div>
            <div className="p-5 space-y-4 text-sm text-gray-700">
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
                  <Calendar size={12} />
                  {new Date(selected.created_at).toLocaleString("es-CL", { dateStyle: "medium", timeStyle: "short" })}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
                  {displayStatus(selected.status)}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-gray-500 mb-1">Email</p>
                  <p className="break-all">{selected.email}</p>
                </div>
                <div className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-gray-500 mb-1">Teléfono</p>
                  <p className="break-all">{selected.telefono || "Sin teléfono"}</p>
                </div>
                <div className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-gray-500 mb-1">Empresa</p>
                  <p className="break-words">{selected.empresa || "Sin empresa"}</p>
                </div>
                <div className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-gray-500 mb-1">Industria</p>
                  <p className="break-words">{selected.industria || "Sin industria"}</p>
                </div>
              </div>

              <div className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2">
                <p className="text-[11px] uppercase tracking-[0.2em] text-gray-500 mb-1">Asunto</p>
                <p className="break-words">{selected.asunto || "Sin asunto"}</p>
              </div>

              <div className="rounded-lg border border-gray-200 bg-white px-3 py-3">
                <p className="text-[11px] uppercase tracking-[0.2em] text-gray-500 mb-2">Mensaje</p>
                <p className="whitespace-pre-line">{selected.mensaje}</p>
              </div>

              {selected.error && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-red-700">
                  Error: {selected.error}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
