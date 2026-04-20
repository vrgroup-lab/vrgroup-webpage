"use client"

import { useEffect, useMemo, useState } from "react"
import { formatDistanceToNow } from "date-fns"
import { es } from "date-fns/locale"
import { Briefcase, Copy, ExternalLink, MoreHorizontal, Pencil, Plus, Search, Trash2 } from "lucide-react"
import { toast } from "sonner"
import type { JobRow } from "@vrgroup/domain"
import { ConfirmDialog } from "@/components/admin/confirm-dialog"
import { JobForm, type JobFormValues } from "@/components/ofertas/job-form"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { EmptyState } from "@/components/ui/empty-state"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Skeleton } from "@/components/ui/skeleton"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const PUBLIC_BASE = process.env.NEXT_PUBLIC_SITE_URL || "https://vrgroup.cl"

function statusBadge(status: string) {
  if (status === "published") return <Badge variant="success">Publicada</Badge>
  if (status === "draft") return <Badge variant="warning">Borrador</Badge>
  if (status === "archived") return <Badge variant="secondary">Archivada</Badge>
  return <Badge variant="outline">{status}</Badge>
}

export default function AdminOffersPage() {
  const [jobs, setJobs] = useState<JobRow[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<"all" | "draft" | "published" | "archived">("all")

  const [sheetOpen, setSheetOpen] = useState(false)
  const [editing, setEditing] = useState<JobRow | null>(null)
  const [saving, setSaving] = useState(false)

  const [confirm, setConfirm] = useState<{ open: boolean; job: JobRow | null; loading: boolean }>({
    open: false,
    job: null,
    loading: false,
  })

  async function fetchJobs() {
    setLoading(true)
    try {
      const res = await fetch("/api/admin/jobs")
      const payload = await res.json()
      if (!res.ok) throw new Error(payload.error || "Error al cargar ofertas")
      setJobs(payload.data || [])
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Error al cargar ofertas")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void fetchJobs()
  }, [])

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return jobs.filter((job) => {
      if (statusFilter !== "all" && job.status !== statusFilter) return false
      if (!q) return true
      return (
        job.title.toLowerCase().includes(q) ||
        job.slug.toLowerCase().includes(q) ||
        (job.location?.toLowerCase().includes(q) ?? false)
      )
    })
  }, [jobs, search, statusFilter])

  function openNew() {
    setEditing(null)
    setSheetOpen(true)
  }

  function openEdit(job: JobRow) {
    setEditing(job)
    setSheetOpen(true)
  }

  async function handleSubmit(values: JobFormValues) {
    setSaving(true)
    const payload = {
      ...values,
      tags: values.tags
        ? values.tags.split(",").map((s) => s.trim()).filter(Boolean)
        : [],
      salary_min: values.salary_min ? Number(values.salary_min) : null,
      salary_max: values.salary_max ? Number(values.salary_max) : null,
      published_at: values.status === "published" ? new Date().toISOString() : null,
      apply_url: values.apply_url || null,
      apply_email: values.apply_email || null,
      apply_linkedin_url: values.apply_linkedin_url || null,
      apply_notion_url: values.apply_notion_url || null,
    }

    try {
      const url = editing ? `/api/admin/jobs/${editing.id}` : "/api/admin/jobs"
      const method = editing ? "PUT" : "POST"
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      const result = await res.json()
      if (!res.ok) throw new Error(result.error || "Error al guardar")
      toast.success(editing ? "Oferta actualizada" : "Oferta creada")
      setSheetOpen(false)
      setEditing(null)
      await fetchJobs()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Error al guardar")
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete() {
    if (!confirm.job) return
    setConfirm((c) => ({ ...c, loading: true }))
    try {
      const res = await fetch(`/api/admin/jobs/${confirm.job.id}`, { method: "DELETE" })
      const payload = await res.json()
      if (!res.ok) throw new Error(payload.error || "Error al eliminar")
      toast.success("Oferta eliminada")
      setJobs((c) => c.filter((j) => j.id !== confirm.job!.id))
      setConfirm({ open: false, job: null, loading: false })
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Error al eliminar")
      setConfirm((c) => ({ ...c, loading: false }))
    }
  }

  function copyLink(slug: string) {
    const url = `${PUBLIC_BASE}/trabaja-con-nosotros?job=${slug}`
    void navigator.clipboard.writeText(url)
    toast.success("Link copiado", { description: url })
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-[var(--coral)]">Ofertas</p>
          <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight md:text-4xl">Vacantes</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Las ofertas publicadas se sirven en vivo a{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 text-xs">/trabaja-con-nosotros</code>.
          </p>
        </div>
        <Button variant="coral" onClick={openNew}>
          <Plus /> Nueva oferta
        </Button>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por título, slug o ubicación..."
            className="pl-9"
          />
        </div>
        <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as typeof statusFilter)}>
          <SelectTrigger className="sm:w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los estados</SelectItem>
            <SelectItem value="published">Publicadas</SelectItem>
            <SelectItem value="draft">Borradores</SelectItem>
            <SelectItem value="archived">Archivadas</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-xl border bg-card shadow-sm">
        {loading ? (
          <div className="flex flex-col gap-2 p-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-14 w-full" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <EmptyState
            icon={<Briefcase />}
            title={jobs.length === 0 ? "Sin ofertas todavía" : "Sin resultados"}
            description={
              jobs.length === 0
                ? "Crea la primera vacante y se sincroniza al instante con el sitio público."
                : "Probá ajustar la búsqueda o el filtro."
            }
            action={
              jobs.length === 0 ? (
                <Button variant="coral" onClick={openNew}>
                  <Plus /> Crear primera oferta
                </Button>
              ) : undefined
            }
          />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Oferta</TableHead>
                <TableHead className="hidden md:table-cell">Ubicación</TableHead>
                <TableHead className="hidden lg:table-cell">Modalidad</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="hidden md:table-cell">Creada</TableHead>
                <TableHead className="w-10" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((job) => (
                <TableRow key={job.id}>
                  <TableCell>
                    <button
                      type="button"
                      onClick={() => openEdit(job)}
                      className="text-left transition-colors hover:text-[var(--coral)]"
                    >
                      <div className="font-medium">{job.title}</div>
                      <div className="text-xs text-muted-foreground">{job.slug}</div>
                    </button>
                  </TableCell>
                  <TableCell className="hidden text-muted-foreground md:table-cell">
                    {job.location || "—"}
                  </TableCell>
                  <TableCell className="hidden text-muted-foreground lg:table-cell">
                    {job.modality || "—"}
                  </TableCell>
                  <TableCell>{statusBadge(job.status)}</TableCell>
                  <TableCell className="hidden text-xs text-muted-foreground md:table-cell">
                    {job.created_at
                      ? formatDistanceToNow(new Date(job.created_at), { addSuffix: true, locale: es })
                      : "—"}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" aria-label="Acciones">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onSelect={() => openEdit(job)}>
                          <Pencil /> Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => copyLink(job.slug)}>
                          <Copy /> Copiar link público
                        </DropdownMenuItem>
                        {job.status === "published" && (
                          <DropdownMenuItem asChild>
                            <a
                              href={`${PUBLIC_BASE}/trabaja-con-nosotros?job=${job.slug}`}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <ExternalLink /> Ver publicada
                            </a>
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onSelect={() => setConfirm({ open: true, job, loading: false })}
                        >
                          <Trash2 /> Eliminar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
        {!loading && filtered.length > 0 && (
          <div className="border-t px-4 py-2 text-xs text-muted-foreground">
            {filtered.length} {filtered.length === 1 ? "oferta" : "ofertas"}
            {filtered.length !== jobs.length && ` de ${jobs.length}`}
          </div>
        )}
      </div>

      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent className="w-full sm:max-w-2xl">
          <SheetHeader>
            <SheetTitle>{editing ? "Editar oferta" : "Nueva oferta"}</SheetTitle>
            <SheetDescription>
              {editing ? "Actualizá los campos de la vacante." : "Creá una nueva vacante. Se publica al cambiar a 'Publicada'."}
            </SheetDescription>
          </SheetHeader>
          <div className="mt-6">
            <JobForm
              key={editing?.id ?? "new"}
              job={editing}
              submitting={saving}
              onSubmit={handleSubmit}
              onCancel={() => setSheetOpen(false)}
            />
          </div>
        </SheetContent>
      </Sheet>

      <ConfirmDialog
        open={confirm.open}
        title="Eliminar oferta"
        description={`Se eliminará "${confirm.job?.title || ""}" permanentemente. Esta acción no se puede deshacer.`}
        confirmLabel="Eliminar oferta"
        loading={confirm.loading}
        onCancel={() => setConfirm({ open: false, job: null, loading: false })}
        onConfirm={handleDelete}
      />
    </div>
  )
}
