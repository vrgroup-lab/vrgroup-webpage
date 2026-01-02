import Link from "next/link"
import { BriefcaseBusiness, FolderKanban, Users } from "lucide-react"

const quickLinks = [
  { title: "Usuarios", href: "/admin/usuarios", icon: Users, desc: "Gestiona accesos y roles (admin/editor/viewer)." },
  { title: "Ofertas de empleo", href: "/admin/ofertas", icon: BriefcaseBusiness, desc: "Publica, edita y archiva vacantes." },
  { title: "Portafolio", href: "/admin/portafolio", icon: FolderKanban, desc: "Casos y proyectos destacados." },
]

export default function AdminOverviewPage() {
  return (
    <div className="space-y-5">
      <header className="flex flex-col gap-2">
        <p className="text-xs uppercase tracking-[0.22em] text-white/60">Panel</p>
        <h1 className="font-display text-3xl sm:text-4xl font-bold">Administración</h1>
        <p className="text-white/75 max-w-3xl">
          Accede a los módulos clave: usuarios, ofertas y portafolio. Más secciones se podrán agregar luego.
        </p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {quickLinks.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.title}
              href={item.href}
              className="group rounded-2xl bg-white/5 border border-white/10 p-5 hover:border-white/20 hover:-translate-y-1 transition-all shadow-[0_12px_30px_rgba(6,12,30,0.35)]"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm text-white/60">Ir a</p>
                  <h3 className="font-display text-xl font-semibold text-white">{item.title}</h3>
                </div>
                <div className="h-10 w-10 rounded-xl bg-white/10 text-white flex items-center justify-center">
                  <Icon size={18} />
                </div>
              </div>
              <p className="text-sm text-white/70 mt-3">{item.desc}</p>
            </Link>
          )
        })}
      </section>
    </div>
  )
}
