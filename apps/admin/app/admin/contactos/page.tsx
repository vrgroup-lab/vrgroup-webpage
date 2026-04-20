"use client"

import { useEffect, useMemo, useState } from "react"
import { formatDistanceToNow, format } from "date-fns"
import { es } from "date-fns/locale"
import { Copy, Inbox, Mail, Search, Trash2 } from "lucide-react"
import { toast } from "sonner"
import { ConfirmDialog } from "@/components/admin/confirm-dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { EmptyState } from "@/components/ui/empty-state"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

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

const STATUS_OPTIONS = ["received", "pendiente", "en-progreso", "calificado", "cerrado", "error"] as const

function statusBadge(status: string) {
  if (status === "received") return <Badge variant="coral">Nuevo</Badge>
  if (status === "pendiente" || status === "en-progreso") return <Badge variant="warning">{status}</Badge>
  if (status === "calificado") return <Badge variant="success">Calificado</Badge>
  if (status === "cerrado") return <Badge variant="secondary">Cerrado</Badge>
  if (status === "error") return <Badge variant="destructive">Error</Badge>
  return <Badge variant="outline">{status}</Badge>
}

export default function AdminContactsPage() {
  const [contacts, setContacts] = useState<ContactSubmission[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [updating, setUpdating] = useState(false)
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [confirm, setConfirm] = useState<{ open: boolean; id: string | null; loading: boolean }>({
    open: false,
    id: null,
    loading: false,
  })

  async function fetchContacts() {
    setLoading(true)
    try {
      const res = await fetch("/api/admin/contact-submissions")
      const payload = await res.json()
      if (!res.ok) throw new Error(payload.error || "Error al cargar contactos")
      const list: ContactSubmission[] = payload.data ?? []
      setContacts(list)
      setSelectedId((prev) => prev ?? list[0]?.id ?? null)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Error al cargar contactos")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void fetchContacts()
  }, [])

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return contacts.filter((c) => {
      if (statusFilter !== "all" && c.status !== statusFilter) return false
      if (!q) return true
      return (
        c.nombre.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        (c.empresa?.toLowerCase().includes(q) ?? false) ||
        (c.asunto?.toLowerCase().includes(q) ?? false)
      )
    })
  }, [contacts, search, statusFilter])

  const selected = useMemo(
    () => contacts.find((c) => c.id === selectedId) ?? null,
    [contacts, selectedId],
  )

  async function updateStatus(id: string, status: string) {
    setUpdating(true)
    try {
      const res = await fetch(`/api/admin/contact-submissions/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      })
      const payload = await res.json()
      if (!res.ok) throw new Error(payload.error || "Error al actualizar")
      setContacts((c) => c.map((item) => (item.id === id ? { ...item, status } : item)))
      toast.success("Estado actualizado")
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Error al actualizar")
    } finally {
      setUpdating(false)
    }
  }

  async function handleDelete() {
    if (!confirm.id) return
    setConfirm((c) => ({ ...c, loading: true }))
    try {
      const res = await fetch(`/api/admin/contact-submissions/${confirm.id}`, { method: "DELETE" })
      const payload = await res.json()
      if (!res.ok) throw new Error(payload.error || "Error al eliminar")
      const next = contacts.filter((c) => c.id !== confirm.id)
      setContacts(next)
      setSelectedId((prev) => (prev === confirm.id ? next[0]?.id ?? null : prev))
      toast.success("Contacto eliminado")
      setConfirm({ open: false, id: null, loading: false })
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Error al eliminar")
      setConfirm((c) => ({ ...c, loading: false }))
    }
  }

  function copyEmail(email: string) {
    void navigator.clipboard.writeText(email)
    toast.success("Email copiado")
  }

  const newCount = contacts.filter((c) => c.status === "received").length

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-xs uppercase tracking-[0.18em] text-[var(--coral)]">Contactos</p>
        <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Leads
          {newCount > 0 && (
            <Badge variant="coral" className="ml-3 align-middle">
              {newCount} nuevo{newCount === 1 ? "" : "s"}
            </Badge>
          )}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Bandeja del formulario del sitio. Actualizá estado y gestioná mensajes comerciales.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
        <div className="flex flex-col gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar nombre, email, empresa..."
              className="pl-9"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              {STATUS_OPTIONS.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex max-h-[calc(100vh-20rem)] flex-col gap-2 overflow-y-auto pr-1">
            {loading ? (
              Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-20 w-full" />)
            ) : filtered.length === 0 ? (
              <EmptyState
                icon={<Inbox />}
                title={contacts.length === 0 ? "Sin contactos" : "Sin resultados"}
                description={
                  contacts.length === 0
                    ? "Los mensajes del formulario van a aparecer acá."
                    : "Probá otra búsqueda o filtro."
                }
              />
            ) : (
              filtered.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setSelectedId(c.id)}
                  className={cn(
                    "group rounded-lg border bg-card p-3 text-left transition-all hover:border-[var(--coral)]/40",
                    selectedId === c.id && "border-[var(--coral)] bg-[var(--coral)]/5 shadow-sm",
                  )}
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="truncate text-sm font-medium">{c.nombre}</p>
                    {statusBadge(c.status)}
                  </div>
                  <p className="mt-1 truncate text-xs text-muted-foreground">{c.email}</p>
                  {c.empresa && <p className="truncate text-xs text-muted-foreground">{c.empresa}</p>}
                  <p className="mt-2 text-[11px] text-muted-foreground">
                    {formatDistanceToNow(new Date(c.created_at), { addSuffix: true, locale: es })}
                  </p>
                </button>
              ))
            )}
          </div>
        </div>

        {selected ? (
          <Card className="self-start">
            <CardContent className="flex flex-col gap-6 p-6">
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="truncate font-display text-2xl font-semibold">{selected.nombre}</h2>
                    {statusBadge(selected.status)}
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {format(new Date(selected.created_at), "d 'de' MMMM yyyy · HH:mm", { locale: es })}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <a href={`mailto:${selected.email}`}>
                      <Mail /> Responder
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => copyEmail(selected.email)}>
                    <Copy /> Copiar email
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => setConfirm({ open: true, id: selected.id, loading: false })}
                  >
                    <Trash2 /> Eliminar
                  </Button>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                <MetaField label="Email" value={selected.email} />
                <MetaField label="Empresa" value={selected.empresa} />
                <MetaField label="Teléfono" value={selected.telefono} />
                <MetaField label="Industria" value={selected.industria} />
                <MetaField label="Asunto" value={selected.asunto} />
                <MetaField label="IP" value={selected.ip} />
              </div>

              <div className="flex flex-col gap-2">
                <Label className="text-xs font-medium">Estado</Label>
                <Select
                  value={selected.status}
                  onValueChange={(v) => updateStatus(selected.id, v)}
                  disabled={updating}
                >
                  <SelectTrigger className="max-w-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {STATUS_OPTIONS.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-xs font-medium">Mensaje</Label>
                <div className="mt-2 whitespace-pre-line rounded-lg border bg-muted/30 p-4 text-sm leading-relaxed">
                  {selected.mensaje}
                </div>
              </div>

              {selected.error && (
                <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">
                  <span className="font-medium">Error: </span>
                  {selected.error}
                </div>
              )}
            </CardContent>
          </Card>
        ) : (
          !loading && (
            <EmptyState
              icon={<Inbox />}
              title="Seleccioná un contacto"
              description="Elegí un item de la izquierda para ver el detalle."
              className="self-start"
            />
          )
        )}
      </div>

      <ConfirmDialog
        open={confirm.open}
        title="Eliminar contacto"
        description="Esta acción eliminará el contacto permanentemente."
        confirmLabel="Eliminar"
        loading={confirm.loading}
        onCancel={() => setConfirm({ open: false, id: null, loading: false })}
        onConfirm={handleDelete}
      />
    </div>
  )
}

function MetaField({ label, value }: { label: string; value: string | null }) {
  return (
    <div className="rounded-lg border bg-muted/20 p-3">
      <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="mt-1 truncate text-sm font-medium">{value || <span className="text-muted-foreground">—</span>}</p>
    </div>
  )
}
