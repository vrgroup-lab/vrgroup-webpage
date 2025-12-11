import { ServiceCard } from "@/components/ui/service-card"
import type { LucideIcon } from "lucide-react"
import { Bot, Layers, LineChart, ShieldCheck, Sparkles, Workflow } from "lucide-react"

export type ServiceVariant = "light" | "dark"

export interface ServiceItem {
  slug: string
  title: string
  description: string
  icon: LucideIcon
}

export const servicesData: ServiceItem[] = [
  {
    slug: "transformacion-digital-desarrollo",
    title: "Transformación Digital & Desarrollo Tecnológico",
    description:
      "Diseño y desarrollo de soluciones digitales, experiencia web/mobile, UX/UI, performance digital y células de desarrollo para escalar productos tecnológicos.",
    icon: Sparkles,
  },
  {
    slug: "soluciones-ti-proyectos",
    title: "Soluciones Tecnológicas & Proyectos TI",
    description:
      "Desarrollo a medida, integración de sistemas, servicios gestionados, PMO y staffing TI para ejecutar proyectos tecnológicos con calidad y velocidad.",
    icon: Layers,
  },
  {
    slug: "automatizacion-procesos",
    title: "Automatización Digital de Procesos (ADP / Appian / RPA)",
    description:
      "Discovery, roadmap, laboratorio de automatización, implementaciones Appian, RPA e iBPMS. Automatización end-to-end con enfoque low-code.",
    icon: Workflow,
  },
  {
    slug: "gestion-operaciones-riesgo",
    title: "Gestión, Operaciones, Riesgo & Cumplimiento",
    description:
      "Modelos de gestión, mejora de procesos BPM, control de gestión, riesgos, cumplimiento normativo, auditoría y PMO.",
    icon: ShieldCheck,
  },
  {
    slug: "ia-agentes-inteligentes",
    title: "IA Aplicada a Procesos & Agentes Inteligentes",
    description:
      "Diseño e integración de agentes inteligentes para procesos, chatbots corporativos, automatización cognitiva y uso de modelos avanzados dentro de workflows empresariales.",
    icon: Bot,
  },
  {
    slug: "analitica-ml",
    title: "Analítica Avanzada & Machine Learning Aplicado",
    description:
      "Modelos predictivos, dashboards inteligentes, RAG corporativo, análisis avanzado y machine learning aplicado a problemas reales de negocio.",
    icon: LineChart,
  },
]

const variantWrapper: Record<ServiceVariant, string> = {
  light: "bg-white text-[#1C1F26]",
  dark: "bg-[#050711] text-white",
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
}: {
  heading?: string
  subheading?: string
  variant?: ServiceVariant
  services?: ServiceItem[]
}) {
  return (
    <section className={`py-16 sm:py-20 lg:py-24 ${variantWrapper[variant]}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <p className="text-coral font-semibold text-sm uppercase tracking-[0.12em] mb-2">Servicios</p>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl mb-4">{heading}</h2>
          <p className={`text-lg max-w-3xl mx-auto ${variantSubtitle[variant]}`}>{subheading}</p>
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
