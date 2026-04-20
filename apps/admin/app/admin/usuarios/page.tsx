"use client"

import { useEffect, useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { formatDistanceToNow } from "date-fns"
import { es } from "date-fns/locale"
import { Eye, EyeOff, MoreHorizontal, Pencil, Plus, Search, Trash2, Users } from "lucide-react"
import { toast } from "sonner"
import { ConfirmDialog } from "@/components/admin/confirm-dialog"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
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
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"

type UserProfile = {
  id: string
  full_name: string | null
  role: string
  created_at: string
  email: string | null
  last_sign_in_at: string | null
}

const ROLES = ["admin", "editor", "viewer"] as const

const createUserSchema = z.object({
  full_name: z.string().min(1, "El nombre es obligatorio"),
  email: z.string().email("Email inválido"),
  password: z.string().min(8, "Mínimo 8 caracteres"),
  role: z.enum(ROLES),
})

const editUserSchema = z.object({
  full_name: z.string().min(1, "El nombre es obligatorio"),
  role: z.enum(ROLES),
})

type CreateUserValues = z.infer<typeof createUserSchema>
type EditUserValues = z.infer<typeof editUserSchema>

function initials(name: string | null, email: string | null) {
  const source = name?.trim() || email?.split("@")[0] || "?"
  const parts = source.split(/\s+/).filter(Boolean)
  if (parts.length === 0) return "?"
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
}

function roleBadge(role: string) {
  if (role === "admin") return <Badge variant="coral">Admin</Badge>
  if (role === "editor") return <Badge variant="warning">Editor</Badge>
  if (role === "viewer") return <Badge variant="secondary">Viewer</Badge>
  return <Badge variant="outline">{role}</Badge>
}

type SheetMode = { mode: "create" } | { mode: "edit"; user: UserProfile } | null

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserProfile[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [roleFilter, setRoleFilter] = useState<string>("all")
  const [sheet, setSheet] = useState<SheetMode>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState<{ open: boolean; user: UserProfile | null; loading: boolean }>({
    open: false,
    user: null,
    loading: false,
  })

  const createForm = useForm<CreateUserValues>({
    resolver: zodResolver(createUserSchema),
    defaultValues: { full_name: "", email: "", password: "", role: "editor" },
  })

  const editForm = useForm<EditUserValues>({
    resolver: zodResolver(editUserSchema),
    defaultValues: { full_name: "", role: "editor" },
  })

  async function fetchUsers() {
    setLoading(true)
    try {
      const res = await fetch("/api/admin/users")
      const payload = await res.json()
      if (!res.ok) throw new Error(payload.error || "Error al cargar usuarios")
      setUsers(payload.data ?? [])
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Error al cargar usuarios")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void fetchUsers()
  }, [])

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return users.filter((u) => {
      if (roleFilter !== "all" && u.role !== roleFilter) return false
      if (!q) return true
      return (
        (u.full_name?.toLowerCase().includes(q) ?? false) ||
        (u.email?.toLowerCase().includes(q) ?? false)
      )
    })
  }, [users, search, roleFilter])

  function openCreate() {
    createForm.reset({ full_name: "", email: "", password: "", role: "editor" })
    setShowPassword(false)
    setSheet({ mode: "create" })
  }

  function openEdit(user: UserProfile) {
    editForm.reset({
      full_name: user.full_name ?? "",
      role: (ROLES as readonly string[]).includes(user.role) ? (user.role as (typeof ROLES)[number]) : "editor",
    })
    setSheet({ mode: "edit", user })
  }

  function closeSheet() {
    setSheet(null)
    setShowPassword(false)
    createForm.reset()
    editForm.reset()
  }

  async function submitCreate(values: CreateUserValues) {
    setSubmitting(true)
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })
      const payload = await res.json()
      if (!res.ok) throw new Error(payload.error || "No se pudo crear el usuario")
      toast.success("Usuario creado")
      closeSheet()
      await fetchUsers()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "No se pudo crear el usuario")
    } finally {
      setSubmitting(false)
    }
  }

  async function submitEdit(values: EditUserValues) {
    if (!sheet || sheet.mode !== "edit") return
    const userId = sheet.user.id
    setSubmitting(true)
    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ full_name: values.full_name, role: values.role }),
      })
      const payload = await res.json()
      if (!res.ok) throw new Error(payload.error || "No se pudo actualizar el usuario")
      setUsers((list) =>
        list.map((u) => (u.id === userId ? { ...u, full_name: values.full_name, role: values.role } : u)),
      )
      toast.success("Usuario actualizado")
      closeSheet()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "No se pudo actualizar el usuario")
    } finally {
      setSubmitting(false)
    }
  }

  async function applyDelete() {
    if (!confirmDelete.user) return
    setConfirmDelete((c) => ({ ...c, loading: true }))
    try {
      const res = await fetch(`/api/admin/users/${confirmDelete.user.id}`, { method: "DELETE" })
      const payload = await res.json()
      if (!res.ok) throw new Error(payload.error || "No se pudo eliminar el usuario")
      const userId = confirmDelete.user.id
      setUsers((list) => list.filter((u) => u.id !== userId))
      toast.success("Usuario eliminado")
      setConfirmDelete({ open: false, user: null, loading: false })
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "No se pudo eliminar el usuario")
      setConfirmDelete((c) => ({ ...c, loading: false }))
    }
  }

  const totals = useMemo(
    () => ({
      total: users.length,
      admin: users.filter((u) => u.role === "admin").length,
      editor: users.filter((u) => u.role === "editor").length,
      viewer: users.filter((u) => u.role === "viewer").length,
    }),
    [users],
  )

  const isEdit = sheet?.mode === "edit"
  const editingUser = sheet?.mode === "edit" ? sheet.user : null

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-[var(--coral)]">Usuarios</p>
          <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight md:text-4xl">Equipo del panel</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Gestioná quién puede acceder al backoffice y con qué nivel de permiso.
          </p>
        </div>
        <Button variant="coral" onClick={openCreate}>
          <Plus /> Nuevo usuario
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        <Badge variant="outline" className="gap-1">
          <Users className="h-3 w-3" /> {totals.total} totales
        </Badge>
        <Badge variant="coral">{totals.admin} admin</Badge>
        <Badge variant="warning">{totals.editor} editor</Badge>
        <Badge variant="secondary">{totals.viewer} viewer</Badge>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar nombre o email..."
            className="pl-9"
          />
        </div>
        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="sm:w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los roles</SelectItem>
            {ROLES.map((r) => (
              <SelectItem key={r} value={r}>
                {r}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-xl border bg-card">
        {loading ? (
          <div className="flex flex-col gap-2 p-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-14 w-full" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <EmptyState
            icon={<Users />}
            title={users.length === 0 ? "Sin usuarios" : "Sin resultados"}
            description={
              users.length === 0
                ? "Creá el primer usuario del equipo."
                : "Probá otra búsqueda o filtro de rol."
            }
          />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Usuario</TableHead>
                <TableHead>Rol</TableHead>
                <TableHead>Último acceso</TableHead>
                <TableHead>Creado</TableHead>
                <TableHead className="w-12" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((user) => (
                <TableRow key={user.id} className="cursor-pointer" onClick={() => openEdit(user)}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>{initials(user.full_name, user.email)}</AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium">{user.full_name || "Sin nombre"}</p>
                        <p className="truncate text-xs text-muted-foreground">{user.email || "—"}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{roleBadge(user.role)}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {user.last_sign_in_at
                      ? formatDistanceToNow(new Date(user.last_sign_in_at), { addSuffix: true, locale: es })
                      : "Nunca"}
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(user.created_at), { addSuffix: true, locale: es })}
                  </TableCell>
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => openEdit(user)}>
                          <Pencil /> Editar
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-destructive focus:bg-destructive/10 focus:text-destructive"
                          onClick={() => setConfirmDelete({ open: true, user, loading: false })}
                        >
                          <Trash2 /> Eliminar usuario
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      <Sheet
        open={sheet !== null}
        onOpenChange={(o) => {
          if (!o) closeSheet()
        }}
      >
        <SheetContent className="flex flex-col gap-0 p-0 sm:max-w-lg">
          <SheetHeader className="border-b px-6 py-4">
            <SheetTitle>{isEdit ? "Editar usuario" : "Nuevo usuario"}</SheetTitle>
            <SheetDescription>
              {isEdit
                ? "Actualizá el nombre y el rol del usuario. El email no se puede modificar desde acá."
                : "Creá un acceso al panel con rol asignado."}
            </SheetDescription>
          </SheetHeader>

          {isEdit && editingUser ? (
            <form onSubmit={editForm.handleSubmit(submitEdit)} className="flex flex-1 flex-col gap-4 overflow-y-auto p-6">
              <div className="flex items-center gap-3 rounded-lg border bg-muted/30 p-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback>{initials(editingUser.full_name, editingUser.email)}</AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{editingUser.email || "—"}</p>
                  <p className="text-[11px] text-muted-foreground">
                    Último acceso:{" "}
                    {editingUser.last_sign_in_at
                      ? formatDistanceToNow(new Date(editingUser.last_sign_in_at), { addSuffix: true, locale: es })
                      : "nunca"}
                  </p>
                </div>
              </div>

              <Field label="Nombre completo" error={editForm.formState.errors.full_name?.message} required>
                <Input {...editForm.register("full_name")} placeholder="Maxi Tombolini" />
              </Field>
              <Field label="Rol" error={editForm.formState.errors.role?.message} required>
                <Select
                  value={editForm.watch("role")}
                  onValueChange={(v) => editForm.setValue("role", v as (typeof ROLES)[number], { shouldValidate: true })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {ROLES.map((r) => (
                      <SelectItem key={r} value={r}>
                        {r}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>

              <div className="mt-auto flex justify-end gap-2 border-t bg-background pt-4">
                <Button type="button" variant="outline" onClick={closeSheet} disabled={submitting}>
                  Cancelar
                </Button>
                <Button type="submit" variant="coral" disabled={submitting}>
                  {submitting ? "Guardando..." : "Guardar cambios"}
                </Button>
              </div>
            </form>
          ) : (
            <form onSubmit={createForm.handleSubmit(submitCreate)} className="flex flex-1 flex-col gap-4 overflow-y-auto p-6">
              <Field label="Nombre completo" error={createForm.formState.errors.full_name?.message} required>
                <Input {...createForm.register("full_name")} placeholder="Maxi Tombolini" />
              </Field>
              <Field label="Email" error={createForm.formState.errors.email?.message} required>
                <Input type="email" {...createForm.register("email")} placeholder="persona@vrgroup.cl" />
              </Field>
              <Field label="Contraseña" error={createForm.formState.errors.password?.message} hint="Mínimo 8 caracteres" required>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    {...createForm.register("password")}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((p) => !p)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-muted-foreground hover:text-foreground"
                    aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </Field>
              <Field label="Rol" error={createForm.formState.errors.role?.message} required>
                <Select
                  value={createForm.watch("role")}
                  onValueChange={(v) => createForm.setValue("role", v as (typeof ROLES)[number], { shouldValidate: true })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {ROLES.map((r) => (
                      <SelectItem key={r} value={r}>
                        {r}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>

              <div className="mt-auto flex justify-end gap-2 border-t bg-background pt-4">
                <Button type="button" variant="outline" onClick={closeSheet} disabled={submitting}>
                  Cancelar
                </Button>
                <Button type="submit" variant="coral" disabled={submitting}>
                  {submitting ? "Creando..." : "Crear usuario"}
                </Button>
              </div>
            </form>
          )}
        </SheetContent>
      </Sheet>

      <ConfirmDialog
        open={confirmDelete.open}
        title="Eliminar usuario"
        description={`Se eliminará ${confirmDelete.user?.full_name || confirmDelete.user?.email || "este usuario"} de auth y de user_profiles. Esta acción no se puede deshacer.`}
        confirmLabel="Eliminar usuario"
        loading={confirmDelete.loading}
        onCancel={() => setConfirmDelete({ open: false, user: null, loading: false })}
        onConfirm={applyDelete}
      />
    </div>
  )
}

function Field({
  label,
  error,
  hint,
  required,
  children,
}: {
  label: string
  error?: string
  hint?: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label className={cn("text-xs font-medium", error && "text-destructive")}>
        {label}
        {required && <span className="ml-0.5 text-destructive">*</span>}
      </Label>
      {children}
      {hint && !error && <p className="text-[11px] text-muted-foreground">{hint}</p>}
      {error && <p className="text-[11px] text-destructive">{error}</p>}
    </div>
  )
}
