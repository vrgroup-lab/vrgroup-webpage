import Link from "next/link"
import type { LucideIcon } from "lucide-react"

type ServiceCardVariant = "light" | "dark"

interface ServiceCardProps {
  title: string
  description: string
  slug: string
  icon: LucideIcon
  variant?: ServiceCardVariant
}

const variantClasses: Record<ServiceCardVariant, Record<string, string>> = {
  light: {
    card: "bg-white border border-gray-200 hover:border-coral shadow-sm hover:shadow-lg",
    title: "text-blue-dark",
    description: "text-gray-600",
    button: "text-coral",
    icon: "bg-coral/10 text-coral",
  },
  dark: {
    card: "bg-[#0b1020] border border-white/5 hover:border-coral/60 shadow-[0_20px_60px_rgba(0,0,0,0.35)] hover:shadow-[0_24px_70px_rgba(255,90,95,0.15)]",
    title: "text-white",
    description: "text-gray-300",
    button: "text-[#FF7A7F]",
    icon: "bg-white/5 text-white",
  },
}

export function ServiceCard({ title, description, slug, icon: Icon, variant = "light" }: ServiceCardProps) {
  const styles = variantClasses[variant]

  return (
    <Link
      href={`/servicios/${slug}`}
      className={`group relative overflow-hidden rounded-2xl p-6 transition-all duration-300 ${styles.card}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/0 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-105 ${styles.icon}`}
      >
        <Icon size={24} />
      </div>

      <h3 className={`font-display font-semibold text-lg mb-2 leading-tight ${styles.title}`}>{title}</h3>
      <p className={`text-sm leading-relaxed mb-4 line-clamp-3 ${styles.description}`}>{description}</p>

      <div className={`inline-flex items-center gap-2 text-sm font-semibold transition-all duration-300 ${styles.button}`}>
        Ver más
        <span className="transition-transform group-hover:translate-x-1">→</span>
      </div>
    </Link>
  )
}
