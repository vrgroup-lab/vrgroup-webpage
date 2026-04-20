"use client"

import { useEffect, useMemo, useState } from "react"
import { formatDistanceToNow, format } from "date-fns"
import { es } from "date-fns/locale"
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useDraggable,
  useDroppable,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core"
import { Columns3, Copy, Inbox, LayoutList, Mail, Search, Trash2 } from "lucide-react"
import { toast } from "sonner"
import { ConfirmDialog } from "@/components/admin/confirm-dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { EmptyState } from "@/components/ui/empty-state"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
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

type StatusKey = "received" | "pendiente" | "en-progreso" | "calificado" | "cerrado" | "error"

const STATUS_OPTIONS: readonly StatusKey[] = ["received", "pendiente", "en-progreso", "calificado", "cerrado", "error"]

const STATUS_COLUMNS: { key: StatusKey; label: string; tint: string }[] = [
  { key: "received", label: "Nuevos", tint: "bg-[var(--coral)]/10 border-[var(--coral)]/30" },
  { key: "pendiente", label: "Pendientes", tint: "bg-amber-500/10 border-amber-500/30" },
  { key: "en-progreso", label: "En progreso", tint: "bg-blue-500/10 border-blue-500/30" },
  { key: "calificado", label: "Calificados", tint: "bg-emerald-500/10 border-emerald-500/30" },
  { key: "cerrado", label: "Cerrados", tint: "bg-slate-500/10 border-slate-500/30" },
  { key: "error", label: "Errores", tint: "bg-destructive/10 border-destructive/30" },
]

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
  const [detailOpenInKanban, setDetailOpenInKanban] = useState(false)
  const [updating, setUpdating] = useState(false)
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [view, setView] = useState<"list" | "kanban">("list")
  const [draggingId, setDraggingId] = useState<string | null>(null)
  const [confirm, setConfirm] = useState<{ open: boolean; id: string | null; loading: boolean }>({
    open: false,
    id: null,
    loading: false,
  })

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor),
  )

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
      if (view === "list" && statusFilter !== "all" && c.status !== statusFilter) return false
      if (!q) return true
      return (
        c.nombre.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        (c.empresa?.toLowerCase().includes(q) ?? false) ||
        (c.asunto?.toLowerCase().includes(q) ?? false)
      )
    })
  }, [contacts, search, statusFilter, view])

  const selected = useMemo(
    () => contacts.find((c) => c.id === selectedId) ?? null,
    [contacts, selectedId],
  )

  const draggingContact = useMemo(
    () => contacts.find((c) => c.id === draggingId) ?? null,
    [contacts, draggingId],
  )

  async function updateStatus(id: string, status: string, opts?: { silent?: boolean; previous?: string }) {
    if (!opts?.silent) setUpdating(true)
    try {
      const res = await fetch(`/api/admin/contact-submissions/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      })
      const payload = await res.json()
      if (!res.ok) throw new Error(payload.error || "Error al actualizar")
      toast.success("Estado actualizado")
    } catch (err) {
      if (opts?.previous) {
        setContacts((c) => c.map((item) => (item.id === id ? { ...item, status: opts.previous! } : item)))
      }
      toast.error(err instanceof Error ? err.message : "Error al actualizar")
    } finally {
      if (!opts?.silent) setUpdating(false)
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
      setDetailOpenInKanban(false)
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

  function handleDragStart(event: DragStartEvent) {
    setDraggingId(String(event.active.id))
  }

  function handleDragEnd(event: DragEndEvent) {
    setDraggingId(null)
    const overId = event.over?.id
    if (!overId) return
    const targetStatus = String(overId) as StatusKey
    const contactId = String(event.active.id)
    const current = contacts.find((c) => c.id === contactId)
    if (!current || current.status === targetStatus) return
    const previous = current.status
    setContacts((c) => c.map((item) => (item.id === contactId ? { ...item, status: targetStatus } : item)))
    void updateStatus(contactId, targetStatus, { silent: true, previous })
  }

  const newCount = contacts.filter((c) => c.status === "received").length

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
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
        <Tabs value={view} onValueChange={(v) => setView(v as "list" | "kanban")}>
          <TabsList>
            <TabsTrigger value="list" className="gap-2">
              <LayoutList className="h-4 w-4" /> Lista
            </TabsTrigger>
            <TabsTrigger value="kanban" className="gap-2">
              <Columns3 className="h-4 w-4" /> Kanban
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className={cn("flex gap-2", view === "list" ? "flex-col sm:flex-row sm:max-w-lg" : "flex-col sm:flex-row")}>
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar nombre, email, empresa..."
            className="pl-9"
          />
        </div>
        {view === "list" && (
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="sm:w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los estados</SelectItem>
              {STATUS_OPTIONS.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>

      {view === "list" ? (
        <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
          <div className="flex flex-col gap-3">
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
                <ContactDetail
                  contact={selected}
                  updating={updating}
                  onStatusChange={(status) => updateStatus(selected.id, status)}
                  onCopy={() => copyEmail(selected.email)}
                  onDelete={() => setConfirm({ open: true, id: selected.id, loading: false })}
                />
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
      ) : (
        <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
          <div className="flex gap-4 overflow-x-auto pb-4">
            {STATUS_COLUMNS.map((col) => {
              const cards = filtered.filter((c) => c.status === col.key)
              return (
                <KanbanColumn
                  key={col.key}
                  id={col.key}
                  label={col.label}
                  tint={col.tint}
                  count={cards.length}
                >
                  {loading ? (
                    Array.from({ length: 2 }).map((_, i) => <Skeleton key={i} className="h-24 w-full" />)
                  ) : cards.length === 0 ? (
                    <p className="px-1 py-6 text-center text-[11px] text-muted-foreground">Vacío</p>
                  ) : (
                    cards.map((c) => (
                      <KanbanCard
                        key={c.id}
                        contact={c}
                        onClick={() => {
                          setSelectedId(c.id)
                          setDetailOpenInKanban(true)
                        }}
                      />
                    ))
                  )}
                </KanbanColumn>
              )
            })}
          </div>

          <DragOverlay dropAnimation={null}>
            {draggingContact ? (
              <div className="rotate-2 cursor-grabbing opacity-95">
                <KanbanCardVisual contact={draggingContact} />
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      )}

      <Sheet
        open={view === "kanban" && detailOpenInKanban && !!selected}
        onOpenChange={(o) => setDetailOpenInKanban(o)}
      >
        <SheetContent className="flex flex-col gap-0 p-0 sm:max-w-xl">
          <SheetHeader className="sr-only">
            <SheetTitle>Detalle del contacto</SheetTitle>
            <SheetDescription>Información del lead seleccionado</SheetDescription>
          </SheetHeader>
          {selected && (
            <div className="flex flex-col gap-6 overflow-y-auto p-6">
              <ContactDetail
                contact={selected}
                updating={updating}
                onStatusChange={(status) => updateStatus(selected.id, status)}
                onCopy={() => copyEmail(selected.email)}
                onDelete={() => setConfirm({ open: true, id: selected.id, loading: false })}
              />
            </div>
          )}
        </SheetContent>
      </Sheet>

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

function KanbanColumn({
  id,
  label,
  tint,
  count,
  children,
}: {
  id: string
  label: string
  tint: string
  count: number
  children: React.ReactNode
}) {
  const { setNodeRef, isOver } = useDroppable({ id })
  return (
    <div
      ref={setNodeRef}
      className={cn(
        "flex min-h-[400px] w-72 shrink-0 flex-col rounded-xl border bg-muted/30 transition-colors",
        tint,
        isOver && "ring-2 ring-[var(--coral)] ring-offset-2",
      )}
    >
      <div className="flex items-center justify-between border-b border-current/10 px-3 py-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-foreground/80">{label}</span>
        <Badge variant="outline" className="border-current/20 bg-background/70 text-[10px]">
          {count}
        </Badge>
      </div>
      <div className="flex flex-1 flex-col gap-2 overflow-y-auto p-2">{children}</div>
    </div>
  )
}

function KanbanCard({ contact, onClick }: { contact: ContactSubmission; onClick: () => void }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({ id: contact.id })
  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      onClick={(e) => {
        if (isDragging) return
        e.preventDefault()
        onClick()
      }}
      className={cn(
        "cursor-grab active:cursor-grabbing",
        isDragging && "opacity-0",
      )}
    >
      <KanbanCardVisual contact={contact} />
    </div>
  )
}

function KanbanCardVisual({ contact }: { contact: ContactSubmission }) {
  return (
    <div className="rounded-lg border bg-card p-3 shadow-sm transition-shadow hover:shadow-md">
      <p className="truncate text-sm font-medium">{contact.nombre}</p>
      <p className="mt-1 truncate text-xs text-muted-foreground">{contact.email}</p>
      {contact.empresa && (
        <p className="mt-0.5 truncate text-xs text-muted-foreground">{contact.empresa}</p>
      )}
      {contact.asunto && (
        <p className="mt-2 line-clamp-2 text-[11px] text-foreground/70">{contact.asunto}</p>
      )}
      <p className="mt-2 text-[10px] text-muted-foreground">
        {formatDistanceToNow(new Date(contact.created_at), { addSuffix: true, locale: es })}
      </p>
    </div>
  )
}

function ContactDetail({
  contact,
  updating,
  onStatusChange,
  onCopy,
  onDelete,
}: {
  contact: ContactSubmission
  updating: boolean
  onStatusChange: (status: string) => void
  onCopy: () => void
  onDelete: () => void
}) {
  return (
    <>
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="truncate font-display text-2xl font-semibold">{contact.nombre}</h2>
            {statusBadge(contact.status)}
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            {format(new Date(contact.created_at), "d 'de' MMMM yyyy · HH:mm", { locale: es })}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" asChild>
            <a href={`mailto:${contact.email}`}>
              <Mail /> Responder
            </a>
          </Button>
          <Button variant="outline" size="sm" onClick={onCopy}>
            <Copy /> Copiar email
          </Button>
          <Button variant="destructive" size="sm" onClick={onDelete}>
            <Trash2 /> Eliminar
          </Button>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <MetaField label="Email" value={contact.email} />
        <MetaField label="Empresa" value={contact.empresa} />
        <MetaField label="Teléfono" value={contact.telefono} />
        <MetaField label="Industria" value={contact.industria} />
        <MetaField label="Asunto" value={contact.asunto} />
        <MetaField label="IP" value={contact.ip} />
      </div>

      <div className="flex flex-col gap-2">
        <Label className="text-xs font-medium">Estado</Label>
        <Select value={contact.status} onValueChange={onStatusChange} disabled={updating}>
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
          {contact.mensaje}
        </div>
      </div>

      {contact.error && (
        <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">
          <span className="font-medium">Error: </span>
          {contact.error}
        </div>
      )}
    </>
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
