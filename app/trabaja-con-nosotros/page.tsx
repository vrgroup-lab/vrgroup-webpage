import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Hero } from "@/components/ui/hero"
import { Section } from "@/components/ui/section"
import Link from "next/link"
import { Shield, Calendar, BookOpen, Home } from "lucide-react"

export default function CareersPage() {
  const benefits = [
    {
      icon: Shield,
      title: "Seguro complementario",
      description: "Cobertura integral de salud para ti y tu familia.",
    },
    {
      icon: Calendar,
      title: "Día libre mensual",
      description: "Un día adicional cada mes para descanso y bienestar.",
    },
    {
      icon: BookOpen,
      title: "Capacitación continua",
      description: "Inversión en tu desarrollo profesional y certificaciones.",
    },
    {
      icon: Home,
      title: "Trabajo híbrido",
      description: "Flexibilidad para trabajar desde donde prefieras.",
    },
  ]

  const positions = [
    {
      id: 1,
      title: "Desarrollador Full Stack Senior",
      experience: "Senior",
      description: "Buscamos desarrollador con experiencia en Next.js, Node.js y bases de datos modernas.",
    },
    {
      id: 2,
      title: "Consultor Appian",
      experience: "Mid-Senior",
      description: "Experto en automatización de procesos y arquitectura de soluciones Appian.",
    },
    {
      id: 3,
      title: "Diseñador UX/UI",
      experience: "Mid-Senior",
      description: "Creador de experiencias digitales con portafolio destacado.",
    },
    {
      id: 4,
      title: "Especialista en IA",
      experience: "Senior",
      description: "Experto en implementación de soluciones de IA y machine learning.",
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <Hero
        title="Trabaja con nosotros"
        subtitle="Somos un equipo boutique en crecimiento. Si te apasiona la innovación y la transformación digital, esta es tu oportunidad."
      />

      {/* Benefits Section */}
      <Section title="Beneficios VR Group" className="bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {benefits.map((benefit, idx) => {
            const Icon = benefit.icon
            return (
              <div key={idx} className="flex gap-4">
                <div className="w-16 h-16 bg-coral rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon size={28} className="text-white" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-blue-dark mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </Section>

      {/* Positions Section */}
      <Section title="Posiciones Abiertas" className="bg-gray-50">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {positions.map((position) => (
            <div
              key={position.id}
              className="bg-white rounded-xl p-6 border border-gray-200 hover:border-coral transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-display font-bold text-lg text-blue-dark flex-1">{position.title}</h3>
                <span className="px-3 py-1 bg-coral text-white text-xs font-semibold rounded-full flex-shrink-0">
                  {position.experience}
                </span>
              </div>
              <p className="text-gray-600 mb-4">{position.description}</p>
              <Link
                href="/contacto"
                className="inline-flex text-coral font-semibold hover:text-coral-dark transition-colors text-sm"
              >
                Postular →
              </Link>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="bg-gradient-to-r from-coral to-blue-dark text-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-display font-bold text-3xl mb-4">¿Tu posición ideal no está listada?</h2>
          <p className="text-lg mb-8 opacity-90">Envíanos tu CV y cuéntanos por qué te gustaría unirte a VR Group.</p>
          <Link
            href="/contacto"
            className="inline-flex px-8 py-3 bg-white text-coral rounded-lg font-display font-semibold hover:bg-gray-100 transition-colors"
          >
            Enviar candidatura
          </Link>
        </div>
      </Section>

      <Footer />
    </div>
  )
}
