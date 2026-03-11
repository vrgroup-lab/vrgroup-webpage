"use client"

import { useEffect, useMemo, useState } from "react"
import { ConfirmDialog } from "@/components/admin/confirm-dialog"

type ContactSubmission = {
  id: string
  created_at: string
  nombre: string
  empresa: string | null
  email: string
  telefono: string | null
  industria: string | null
  asunto: string | null
  mensaje: string
  status: string
  email_provider_id: string | null
  error: string | null
  ip: string | null
  user_agent: string | null
}

const statusOptions = ["received", "pendiente", "en-progreso", "calificado", "cerrado", "error"]

export default function AdminContactsPage() {
  const [contacts, setContacts] = useState<ContactSubmission[]>([])
  const [loading, setLoading] = useState(false)
  const [updatingId, setUpdatingId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [selected, setSelected] = useState<ContactSubmission | null>(null)
  const [confirmState, setConfirmState] = useState<{ open: boolean; id: string | null; name: string | null }>({
    open: false,
    id: null,
    name: null,
  })

  const orderedContacts = useMemo(() => contacts, [contacts])

  async function fetchContacts() {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/admin/contact-submissions")
      const payload = await response.json()
      if (!response.ok) throw new Error(payload.error || "No se pudieron cargar los contactos.")
      setContacts(payload.data || [])
      setSelected((current) => current ?? payload.data?.[0] ?? null)
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudieron cargar los contactos.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchContacts()
  }, [])

  async function updateStatus(id: string, status: string) {
    setUpdatingId(id)
    setError(null)

    try {
      const response = await fetch(`/api/admin/contact-submissions/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      })
      const payload = await response.json()
      if (!response.ok) throw new Error(payload.error || "No se pudo actualizar el estado.")
      setContacts((current) => current.map((item) => (item.id === id ? { ...item, status } : item)))
      setSelected((current) => (current?.id === id ? { ...current, status } : current))
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo actualizar el estado.")
    } finally {
      setUpdatingId(null)
    }
  }

  async function deleteSubmission(id: string) {
    setError(null)

    try {
      const response = await fetch(`/api/admin/contact-submissions/${id}`, { method: "DELETE" })
      const payload = await response.json()
      if (!response.ok) throw new Error(payload.error || "No se pudo eliminar el contacto.")
      const next = contacts.filter((item) => item.id !== id)
      setContacts(next)
      setSelected((current) => (current?.id === id ? next[0] ?? null : current))
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo eliminar el contacto.")
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
        <p style={{ margin: 0, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.16em", color: "#ff5a5f" }}>
          Contactos
        </p>
        <h1 style={{ margin: "10px 0 0", fontSize: 40 }}>Leads y submissions</h1>
        <p style={{ margin: "10px 0 0", color: "#4f5d75", lineHeight: 1.6 }}>
          Bandeja operativa sobre <code>contact_submissions</code> para revisar mensajes del formulario del sitio.
        </p>
      </div>

      {error ? (
        <div style={{ borderRadius: 20, border: "1px solid #fecaca", background: "#fef2f2", color: "#b91c1c", padding: 16 }}>{error}</div>
      ) : null}

      <div
        style={{
          display: "grid",
          gap: 20,
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
        }}
      >
        <section
          style={{
            background: "#fff",
            border: "1px solid #d8e0ea",
            borderRadius: 28,
            padding: 20,
            boxShadow: "0 18px 45px rgba(15, 23, 42, 0.05)",
            alignSelf: "start",
          }}
        >
          <h2 style={{ marginTop: 0, fontSize: 24 }}>Bandeja</h2>
          <div style={{ display: "grid", gap: 12 }}>
            {loading ? (
              <div style={{ color: "#4f5d75" }}>Cargando contactos...</div>
            ) : orderedContacts.length === 0 ? (
              <div style={{ border: "1px dashed #cbd5e1", borderRadius: 20, padding: 20, color: "#4f5d75" }}>No hay contactos registrados.</div>
            ) : (
              orderedContacts.map((contact) => (
                <button
                  key={contact.id}
                  type="button"
                  onClick={() => setSelected(contact)}
                  style={{
                    textAlign: "left",
                    width: "100%",
                    borderRadius: 20,
                    border: selected?.id === contact.id ? "1px solid #0b1b33" : "1px solid #d8e0ea",
                    background: selected?.id === contact.id ? "#f8fafc" : "#fff",
                    padding: 16,
                    cursor: "pointer",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                    <strong>{contact.nombre}</strong>
                    <span style={{ color: "#5b6b82", fontSize: 13 }}>{contact.status || "received"}</span>
                  </div>
                  <p style={{ margin: "8px 0 0", color: "#4f5d75" }}>{contact.email}</p>
                  {contact.empresa ? <p style={{ margin: "6px 0 0", color: "#5b6b82", fontSize: 14 }}>{contact.empresa}</p> : null}
                </button>
              ))
            )}
          </div>
        </section>

        <section
          style={{
            background: "#fff",
            border: "1px solid #d8e0ea",
            borderRadius: 28,
            padding: 24,
            boxShadow: "0 18px 45px rgba(15, 23, 42, 0.05)",
          }}
        >
          {!selected ? (
            <div style={{ color: "#4f5d75" }}>Selecciona un contacto para revisar su detalle.</div>
          ) : (
            <div style={{ display: "grid", gap: 18 }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
                <div>
                  <h2 style={{ margin: 0, fontSize: 30 }}>{selected.nombre}</h2>
                  <p style={{ margin: "8px 0 0", color: "#4f5d75" }}>{selected.email}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setConfirmState({ open: true, id: selected.id, name: selected.nombre })}
                  style={{
                    borderRadius: 999,
                    border: "1px solid #fecaca",
                    background: "#fff1f2",
                    color: "#be123c",
                    padding: "10px 14px",
                    fontSize: 14,
                    fontWeight: 700,
                    cursor: "pointer",
                    alignSelf: "start",
                  }}
                >
                  Eliminar contacto
                </button>
              </div>

              <div style={{ display: "grid", gap: 14, gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
                {[
                  ["Empresa", selected.empresa],
                  ["Telefono", selected.telefono],
                  ["Industria", selected.industria],
                  ["Asunto", selected.asunto],
                  ["IP", selected.ip],
                  ["Proveedor email", selected.email_provider_id],
                ].map(([label, value]) => (
                  <div key={label} style={{ border: "1px solid #d8e0ea", borderRadius: 18, padding: 14 }}>
                    <div style={{ color: "#5b6b82", fontSize: 13, textTransform: "uppercase", letterSpacing: "0.1em" }}>{label}</div>
                    <div style={{ marginTop: 8, fontWeight: 700 }}>{value || "Sin dato"}</div>
                  </div>
                ))}
              </div>

              <label style={{ display: "grid", gap: 8, maxWidth: 320 }}>
                <span style={{ fontWeight: 700 }}>Estado</span>
                <select
                  value={selected.status}
                  onChange={(event) => updateStatus(selected.id, event.target.value)}
                  disabled={updatingId === selected.id}
                  style={{
                    borderRadius: 14,
                    border: "1px solid #d8e0ea",
                    padding: "12px 14px",
                    fontSize: 14,
                  }}
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </label>

              <div style={{ border: "1px solid #d8e0ea", borderRadius: 20, padding: 18 }}>
                <div style={{ color: "#5b6b82", fontSize: 13, textTransform: "uppercase", letterSpacing: "0.1em" }}>Mensaje</div>
                <p style={{ margin: "10px 0 0", color: "#334155", lineHeight: 1.7, whiteSpace: "pre-line" }}>{selected.mensaje}</p>
              </div>

              {selected.error ? (
                <div style={{ borderRadius: 20, border: "1px solid #fecaca", background: "#fef2f2", color: "#b91c1c", padding: 16 }}>
                  {selected.error}
                </div>
              ) : null}
            </div>
          )}
        </section>
      </div>

      <ConfirmDialog
        open={confirmState.open}
        title="Eliminar contacto"
        description={`Se eliminara ${confirmState.name || "este contacto"} de forma permanente.`}
        confirmLabel="Eliminar contacto"
        onCancel={() => setConfirmState({ open: false, id: null, name: null })}
        onConfirm={async () => {
          if (!confirmState.id) return
          await deleteSubmission(confirmState.id)
          setConfirmState({ open: false, id: null, name: null })
        }}
      />
    </section>
  )
}
