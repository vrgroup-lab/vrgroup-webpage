import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Hero } from "@/components/ui/hero"
import { Section } from "@/components/ui/section"
import Link from "next/link"
import { ArrowRight, Zap, Brain, Sparkles, Cog, Shield } from "lucide-react"

export default function ServicesPage() {
  const services = [
    {
      id: "appian",
      title: "Automatización Digital con Appian",
      description: "Transformamos procesos complejos en soluciones automatizadas de alto impacto mediante iBPMS y RPA.",
      icon: Zap,
      topics: ["Estrategia de automatización", "Implementación iBPMS/RPA", "Integraciones", "Servicios gestionados"],
    },
    {
      id: "ia",
      title: "Inteligencia Artificial Aplicada",
      description: "Implementamos soluciones de IA para optimizar operaciones y potenciar la toma de decisiones.",
      icon: Brain,
      topics: ["Copilots IA", "Análisis predictivo", "Automatización inteligente", "Training y adopción"],
    },
    {
      id: "transformacion",
      title: "Transformación Digital & Experiencia Digital",
      description: "Diseñamos y ejecutamos estrategias integrales de transformación digital y experiencia de usuario.",
      icon: Sparkles,
      topics: ["Estrategia digital", "Diseño UX/UI", "Implementación", "Change management"],
    },
    {
      id: "soluciones-ti",
      title: "Soluciones Tecnológicas & Proyectos TI",
      description: "Desarrollamos soluciones tecnológicas personalizadas alineadas con tus objetivos de negocio.",
      icon: Cog,
      topics: ["Desarrollo de software", "Integración de sistemas", "Cloud", "Infraestructura"],
    },
    {
      id: "gestion-riesgo",
      title: "Gestión, Operaciones, Riesgo y Cumplimiento",
      description: "Fortalecemos la gestión operativa y garantizamos el cumplimiento normativo.",
      icon: Shield,
      topics: ["Auditoría y control", "Gestión de riesgos", "Cumplimiento normativo", "Operaciones"],
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <Hero
        title="Nuestras soluciones para tu negocio"
        subtitle="Ofrecemos servicios especializados diseñados para impulsar la transformación digital de tu organización."
      />

      <Section className="bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service) => {
            const Icon = service.icon
            return (
              <Link
                key={service.id}
                href={`/servicios/${service.id}`}
                className="group bg-white rounded-2xl p-8 border border-gray-200 hover:border-coral hover:shadow-xl transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-16 h-16 bg-coral rounded-xl flex items-center justify-center group-hover:bg-coral-dark transition-colors">
                    <Icon size={32} className="text-white" />
                  </div>
                </div>
                <h3 className="font-display font-bold text-xl mb-2 text-blue-dark">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {service.topics.slice(0, 3).map((topic, idx) => (
                    <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                      {topic}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-2 text-coral font-semibold group-hover:gap-3 transition-all">
                  Explorar servicio
                  <ArrowRight size={20} />
                </div>
              </Link>
            )
          })}
        </div>
      </Section>

      <Section className="bg-gray-50">
        <div className="bg-white rounded-2xl p-8 md:p-12 text-center max-w-3xl mx-auto">
          <h2 className="font-display font-bold text-3xl mb-4 text-blue-dark">¿No encuentras lo que buscas?</h2>
          <p className="text-gray-600 mb-6">
            Contáctanos para explorar soluciones personalizadas adaptadas a tus necesidades específicas.
          </p>
          <Link
            href="/contacto"
            className="inline-flex px-6 py-3 bg-coral text-white rounded-lg font-semibold hover:bg-coral-dark transition-colors"
          >
            Solicita una consulta
          </Link>
        </div>
      </Section>

      <Footer />
    </div>
  )
}
