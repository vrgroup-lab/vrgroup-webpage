import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { es } from "date-fns/locale"
import { ArrowRight, Briefcase, Inbox, Plus, Users } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { loadDashboardData } from "@/lib/dashboard"

export const dynamic = "force-dynamic"

function StatCard({
  title,
  value,
  icon: Icon,
  breakdown,
  href,
}: {
  title: string
  value: number
  icon: React.ElementType
  breakdown: string
  href: string
}) {
  return (
    <Link href={href} className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-xl">
      <Card className="transition-all hover:border-[var(--coral)]/40 hover:shadow-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--coral)]/10 text-[var(--coral-dark)]">
            <Icon className="h-4 w-4" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="font-display text-3xl font-semibold">{value}</div>
          <p className="mt-1 text-xs text-muted-foreground">{breakdown}</p>
        </CardContent>
      </Card>
    </Link>
  )
}

function jobStatusBadge(status: string) {
  if (status === "published") return <Badge variant="success">Publicada</Badge>
  if (status === "draft") return <Badge variant="warning">Borrador</Badge>
  if (status === "archived") return <Badge variant="secondary">Archivada</Badge>
  return <Badge variant="outline">{status}</Badge>
}

function contactStatusBadge(status: string) {
  if (status === "received") return <Badge variant="coral">Nuevo</Badge>
  if (status === "en-progreso" || status === "pendiente") return <Badge variant="warning">{status}</Badge>
  if (status === "calificado") return <Badge variant="success">Calificado</Badge>
  if (status === "cerrado") return <Badge variant="secondary">Cerrado</Badge>
  if (status === "error") return <Badge variant="destructive">Error</Badge>
  return <Badge variant="outline">{status}</Badge>
}

export default async function AdminDashboardPage() {
  const data = await loadDashboardData()

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-[var(--coral)]">Backoffice</p>
          <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight md:text-4xl">Resumen operativo</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Un vistazo rápido al estado de vacantes, leads y accesos del equipo.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button asChild variant="outline">
            <Link href="/admin/contactos">
              <Inbox /> Ver inbox
            </Link>
          </Button>
          <Button asChild variant="coral">
            <Link href="/admin/ofertas">
              <Plus /> Nueva oferta
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Ofertas"
          value={data.jobs.total}
          icon={Briefcase}
          breakdown={`${data.jobs.published} publicadas · ${data.jobs.draft} borradores · ${data.jobs.archived} archivadas`}
          href="/admin/ofertas"
        />
        <StatCard
          title="Contactos"
          value={data.contacts.total}
          icon={Inbox}
          breakdown={`${data.contacts.received} nuevos · ${data.contacts.last7days} esta semana`}
          href="/admin/contactos"
        />
        <StatCard
          title="Usuarios"
          value={data.users.total}
          icon={Users}
          breakdown={`${data.users.admin} admin · ${data.users.editor} editor · ${data.users.viewer} viewer`}
          href="/admin/usuarios"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle>Últimas ofertas</CardTitle>
              <p className="text-sm text-muted-foreground">Las 5 más recientes.</p>
            </div>
            <Button asChild variant="ghost" size="sm">
              <Link href="/admin/ofertas">
                Ver todas <ArrowRight />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            {data.recentJobs.length === 0 ? (
              <p className="py-6 text-center text-sm text-muted-foreground">No hay ofertas aún.</p>
            ) : (
              <ul className="divide-y">
                {data.recentJobs.map((job) => (
                  <li key={job.id} className="flex items-center justify-between gap-3 py-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">{job.title}</p>
                      <p className="truncate text-xs text-muted-foreground">
                        {job.slug} · {formatDistanceToNow(new Date(job.created_at), { addSuffix: true, locale: es })}
                      </p>
                    </div>
                    {jobStatusBadge(job.status)}
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle>Últimos contactos</CardTitle>
              <p className="text-sm text-muted-foreground">Los 5 más recientes.</p>
            </div>
            <Button asChild variant="ghost" size="sm">
              <Link href="/admin/contactos">
                Ver todos <ArrowRight />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            {data.recentContacts.length === 0 ? (
              <p className="py-6 text-center text-sm text-muted-foreground">No hay contactos aún.</p>
            ) : (
              <ul className="divide-y">
                {data.recentContacts.map((contact) => (
                  <li key={contact.id} className="flex items-center justify-between gap-3 py-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">{contact.nombre}</p>
                      <p className="truncate text-xs text-muted-foreground">
                        {contact.email}
                        {contact.empresa ? ` · ${contact.empresa}` : ""} ·{" "}
                        {formatDistanceToNow(new Date(contact.created_at), { addSuffix: true, locale: es })}
                      </p>
                    </div>
                    {contactStatusBadge(contact.status)}
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
