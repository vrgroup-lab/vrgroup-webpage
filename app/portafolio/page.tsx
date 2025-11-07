import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Hero } from "@/components/ui/hero"
import { Section } from "@/components/ui/section"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function PortfolioPage() {
  const projects = [
    {
      id: 1,
      title: "Puerto de Ideas - Plataforma de Innovación",
      client: "Puerto de Ideas",
      description: "Transformamos la gestión de ideas innovadoras con una plataforma web escalable y moderna.",
      tags: ["React", "Node.js", "Innovación", "UX/UI"],
      image: "🎨",
    },
    {
      id: 2,
      title: "Automatización de Procesos - Sector Financiero",
      client: "Cliente Financiero",
      description: "Implementación de automatización de procesos con Appian, reduciendo costos operativos en 35%.",
      tags: ["Appian", "Automatización", "Finanzas"],
      image: "🏦",
    },
    {
      id: 3,
      title: "Plataforma de Análisis Predictivo",
      client: "Cliente Retail",
      description: "Solución de IA para análisis predictivo de demanda y optimización de inventarios.",
      tags: ["IA", "Machine Learning", "Retail"],
      image: "📊",
    },
    {
      id: 4,
      title: "Transformación Digital - Operaciones",
      client: "Cliente Logística",
      description: "Rediseño integral de procesos operacionales con implementación de nuevas tecnologías.",
      tags: ["Transformación Digital", "Procesos", "Operaciones"],
      image: "🚀",
    },
    {
      id: 5,
      title: "Portal de Gestión Empresarial",
      client: "Cliente Manufactura",
      description: "Sistema integral de gestión para optimizar operaciones de planta con dashboards en tiempo real.",
      tags: ["Portal Web", "Dashboards", "Manufactura"],
      image: "📈",
    },
    {
      id: 6,
      title: "Sistema de CRM Integrado",
      client: "Cliente Servicios",
      description: "Implementación de CRM integrado con sistemas existentes para mejorar relación con clientes.",
      tags: ["CRM", "Integración", "Servicios"],
      image: "👥",
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <Hero
        title="Nuestro Portafolio"
        subtitle="Proyectos exitosos que demuestran nuestra experiencia en transformación digital, automatización e implementación de soluciones tecnológicas."
      />

      <Section className="bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Link
              key={project.id}
              href="#"
              className="group bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-coral hover:shadow-xl transition-all"
            >
              {/* Project Image */}
              <div className="w-full aspect-video bg-gradient-to-br from-coral to-blue-dark flex items-center justify-center text-6xl">
                {project.image}
              </div>

              {/* Project Content */}
              <div className="p-6">
                <p className="text-coral text-sm font-semibold mb-2">{project.client}</p>
                <h3 className="font-display font-bold text-lg text-blue-dark mb-2 line-clamp-2">{project.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{project.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.slice(0, 2).map((tag, idx) => (
                    <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2 text-coral font-semibold group-hover:gap-3 transition-all">
                  Ver proyecto
                  <ArrowRight size={18} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      <Section className="bg-gray-50">
        <div className="bg-white rounded-2xl p-8 md:p-12 text-center max-w-3xl mx-auto">
          <h2 className="font-display font-bold text-3xl mb-4 text-blue-dark">¿Tu proyecto es el siguiente?</h2>
          <p className="text-gray-600 mb-6">
            Contáctanos para discutir cómo podemos ayudarte a alcanzar tus objetivos de transformación digital.
          </p>
          <Link
            href="/contacto"
            className="inline-flex px-6 py-3 bg-coral text-white rounded-lg font-semibold hover:bg-coral-dark transition-colors"
          >
            Iniciar proyecto
          </Link>
        </div>
      </Section>

      <Footer />
    </div>
  )
}
