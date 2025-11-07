import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Hero } from "@/components/ui/hero"
import { Section } from "@/components/ui/section"
import Link from "next/link"
import { ArrowRight, Zap, Users, TrendingUp } from "lucide-react"

export default function Home() {
  const services = [
    {
      id: "appian",
      title: "Automatización Digital con Appian",
      description: "Transformamos procesos complejos en soluciones automatizadas de alto impacto.",
      icon: Zap,
    },
    {
      id: "ia",
      title: "Inteligencia Artificial Aplicada",
      description: "Implementamos soluciones de IA para optimizar operaciones y decisiones.",
      icon: TrendingUp,
    },
    {
      id: "transformacion",
      title: "Transformación Digital",
      description: "Diseñamos y ejecutamos estrategias de transformación integral.",
      icon: Users,
    },
  ]

  const benefits = ["Resultados medibles", "Entrega ágil", "Expertise en Appian e IA"]

  const stats = [
    { number: "+12K", label: "Horas invertidas" },
    { number: "+1.5K", label: "Usuarios capacitados" },
    { number: "+50", label: "Proyectos completados" },
    { number: "+30", label: "Clientes satisfechos" },
  ]

  const clients = [
    { name: "BancoEstado", logo: "🏦" },
    { name: "Puerto de Ideas", logo: "💡" },
    { name: "BICE Vida", logo: "🛡️" },
    { name: "Unicard", logo: "💳" },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <Hero
        title="Impulsamos la transformación digital"
        subtitle="Somos una consultora boutique experta en automatización de procesos, desarrollo de software, gestión y operaciones. Combinamos tecnología, innovación e inteligencia para crear soluciones de alto impacto."
      >
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/contacto"
            className="px-6 py-3 bg-white text-coral rounded-lg font-display font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center gap-2"
          >
            Hablemos de tu proyecto
            <ArrowRight size={20} />
          </Link>
          <Link
            href="/servicios"
            className="px-6 py-3 border-2 border-white text-white rounded-lg font-display font-semibold hover:bg-white hover:text-coral transition-colors inline-flex items-center justify-center"
          >
            Descubre nuestros servicios
          </Link>
        </div>
      </Hero>

      {/* Benefits Section */}
      <Section className="bg-white">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {benefits.map((benefit, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <div className="w-2 h-2 bg-coral rounded-full flex-shrink-0"></div>
              <p className="text-lg text-gray-700 font-medium">{benefit}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Services Section */}
      <Section title="Nuestras soluciones para tu negocio" className="bg-gray-50">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service) => {
            const Icon = service.icon
            return (
              <Link
                key={service.id}
                href={`/servicios/${service.id}`}
                className="group bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <div className="w-12 h-12 bg-coral rounded-lg flex items-center justify-center mb-4 group-hover:bg-coral-dark transition-colors">
                  <Icon size={24} className="text-white" />
                </div>
                <h3 className="font-display font-bold text-xl mb-3 text-blue-dark">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <div className="flex items-center gap-2 text-coral font-semibold group-hover:gap-3 transition-all">
                  Ver detalle
                  <ArrowRight size={20} />
                </div>
              </Link>
            )
          })}
        </div>
      </Section>

      {/* Stats Section */}
      <Section className="bg-blue-dark text-white">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center">
              <div className="font-display font-bold text-4xl sm:text-5xl text-coral mb-2">{stat.number}</div>
              <p className="text-gray-300 text-sm sm:text-base">{stat.label}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Clients Section */}
      <Section title="Confían en nosotros" className="bg-white">
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {clients.map((client, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 px-6 py-4 rounded-lg border border-gray-200 hover:border-coral transition-colors"
            >
              <span className="text-3xl">{client.logo}</span>
              <span className="font-semibold text-gray-700">{client.name}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="bg-gradient-to-r from-coral to-blue-dark text-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-display font-bold text-3xl sm:text-4xl mb-4">¿Listo para transformar tu negocio?</h2>
          <p className="text-lg mb-8 opacity-90">
            Contáctanos hoy y descubre cómo podemos ayudarte a alcanzar tus objetivos digitales.
          </p>
          <Link
            href="/contacto"
            className="inline-flex px-8 py-3 bg-white text-coral rounded-lg font-display font-semibold hover:bg-gray-100 transition-colors"
          >
            Solicita una reunión
          </Link>
        </div>
      </Section>

      <Footer />
    </div>
  )
}
