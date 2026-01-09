import { ServiceCard } from "@/components/ui/service-card"
import type { LucideIcon } from "lucide-react"
import { Bot, Layers, ShieldCheck, Sparkles, Users, Workflow } from "lucide-react"

export type ServiceVariant = "light" | "dark"

export interface ServiceItem {
  slug: string
  title: string
  description: string
  shortDescription?: string
  icon: LucideIcon
}

export const servicesData: ServiceItem[] = [
  {
    slug: "experiencia-digital",
    title: "Experiencia Digital",
    description:
      "UX/UI, web y mobile con foco en experiencia, performance y evolución continua de canales.",
    shortDescription: "UX/UI, web y mobile con foco en performance.",
    icon: Sparkles,
  },
  {
    slug: "software-factory",
    title: "Software Factory",
    description:
      "Full-stack, APIs, integraciones y DevOps con estándares enterprise y equipos Build | Run | Enable.",
    shortDescription: "Full-stack, APIs e integraciones.",
    icon: Layers,
  },
  {
    slug: "automatizacion-de-procesos",
    title: "Automatización de Procesos",
    description:
      "Appian, BPM/low-code y RPA para automatización end-to-end con gobierno, métricas y escalabilidad.",
    shortDescription: "Appian, BPM/low-code y RPA.",
    icon: Workflow,
  },
  {
    slug: "gestion-y-riesgo",
    title: "Gestión y Riesgo",
    description:
      "GRC, cumplimiento, continuidad y gobierno para operar con control y resiliencia.",
    shortDescription: "GRC, cumplimiento y continuidad.",
    icon: ShieldCheck,
  },
  {
    slug: "ia-y-agentes",
    title: "IA & Agentes",
    description:
      "Agentes, RAG y copilots para automatización inteligente con seguridad y gobierno.",
    shortDescription: "Agentes, RAG y copilots.",
    icon: Bot,
  },
  {
    slug: "staffing-y-celulas",
    title: "Staffing y Células",
    description: "Equipos especializados on-demand para ejecutar y escalar con velocidad y foco.",
    shortDescription: "Equipos on-demand para delivery.",
    icon: Users,
  },
]

const variantWrapper: Record<ServiceVariant, string> = {
  light: "bg-white text-[#1C1F26]",
  dark: "bg-[radial-gradient(circle_at_top,_#0b1b33,_#05060b_65%)] text-white",
}

const variantSubtitle: Record<ServiceVariant, string> = {
  light: "text-gray-600",
  dark: "text-gray-300",
}

export function ServicesSection({
  heading = "Nuestros Servicios",
  subheading = "Soluciones especializadas para acelerar tu transformación digital con impacto medible.",
  variant = "light",
  services = servicesData,
  paddingClass,
}: {
  heading?: string
  subheading?: string
  variant?: ServiceVariant
  services?: ServiceItem[]
  paddingClass?: string
}) {
  const padding = paddingClass ?? "py-16 sm:py-20 lg:py-24"

  return (
    <section className={`${padding} ${variantWrapper[variant]}`}>
      <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <p className="text-coral font-semibold text-sm uppercase tracking-[0.12em] mb-2">Servicios</p>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl mb-4">{heading}</h2>
          <p className={`text-lg mx-auto ${variantSubtitle[variant]}`}>{subheading}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <ServiceCard
              key={service.slug}
              title={service.title}
              description={service.description}
              slug={service.slug}
              icon={service.icon}
              variant={variant}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
