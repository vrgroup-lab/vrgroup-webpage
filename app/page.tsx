import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Hero } from "@/components/ui/hero"
import { Section } from "@/components/ui/section"
import { LogoCarousel } from "@/components/ui/logo-carousel"
import { MetricCounter } from "@/components/ui/metric-counter"
import { AppianHighlight } from "@/components/ui/appian-highlight"
import { getLogosFromFolder } from "@/lib/logos"
import Link from "next/link"
import { Check, Brain, Workflow, Sparkles } from "lucide-react"

export default function Home() {
  const clientLogos = getLogosFromFolder("clients")
  const heroImage = "/images/hero/banner_1.png"

  const services = [
    {
      id: "transformacion-digital-desarrollo",
      title: "Transformación Digital & Desarrollo Tecnológico",
      description: "Experiencias web/mobile, UX/UI y células ágiles para escalar productos digitales.",
      icon: "✨",
    },
    {
      id: "soluciones-ti-proyectos",
      title: "Soluciones Tecnológicas & Proyectos TI",
      description: "Desarrollo a medida, integraciones, PMO y servicios gestionados.",
      icon: "🛠️",
    },
    {
      id: "automatizacion-procesos",
      title: "Automatización Digital de Procesos",
      description: "Appian, RPA e iBPMS para automatizar end-to-end con rapidez.",
      icon: "⚡",
    },
    {
      id: "gestion-operaciones-riesgo",
      title: "Gestión, Operaciones, Riesgo & Cumplimiento",
      description: "Modelos de gestión, BPM, control y cumplimiento normativo.",
      icon: "🛡️",
    },
    {
      id: "ia-agentes-inteligentes",
      title: "IA Aplicada & Agentes Inteligentes",
      description: "Copilots, chatbots corporativos e integración de IA en workflows.",
      icon: "🤖",
    },
    {
      id: "analitica-ml",
      title: "Analítica Avanzada & ML Aplicado",
      description: "Modelos predictivos, dashboards y RAG corporativo.",
      icon: "📊",
    },
  ]

  const stats = [
    { value: 8, suffix: "+", label: "Años de trayectoria" },
    { value: 150, suffix: "+", label: "Proyectos en producción" },
    { value: 58, suffix: "", label: "Colaboradores expertos" },
  ]

  const differentiators = [
    {
      title: "Appian & low-code de clase mundial",
      description: "Arquitecturas escalables, gobierno claro y entregas rápidas en Appian/iBPMS.",
      icon: Workflow,
    },
    {
      title: "IA aplicada a procesos",
      description: "Copilots, bots corporativos y RAG integrados a sistemas core y flujos de negocio.",
      icon: Brain,
    },
    {
      title: "Equipos boutique senior",
      description: "Squads multidisciplinares con UX, dev, QA y delivery para acelerar time-to-value.",
      icon: Sparkles,
    },
    {
      title: "Entrega con resultados medibles",
      description: "KPIs claros: TAT, productividad, adopción y confiabilidad en producción.",
      icon: Check,
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <Hero
        title="Automatizamos, construimos y operamos tus productos digitales"
        subtitle="Consultora boutique con foco en low-code, IA aplicada y delivery ágil. Aceleramos tu time-to-value con soluciones listas para producción."
        backgroundImage={heroImage}
      >
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/contacto"
            className="px-6 py-3 rounded-lg font-display font-semibold transition-all inline-flex items-center justify-center gap-2 text-white bg-gradient-to-r from-[#FF5A5F] to-[#FF7A7F] shadow-[0_14px_40px_rgba(255,90,95,0.4)] hover:shadow-[0_18px_50px_rgba(255,90,95,0.45)]"
          >
            Agenda una reunión
            <span>→</span>
          </Link>
          <Link
            href="/servicios"
            className="px-6 py-3 border-2 border-white text-white rounded-lg font-display font-semibold hover:bg-white hover:text-coral transition-colors inline-flex items-center justify-center"
          >
            Explora nuestros servicios
          </Link>
        </div>
      </Hero>

      {/* Differentiators Section */}
      <Section
        title="Por qué VR Group"
        subtitle="Low-code, IA aplicada y delivery boutique para resultados medibles"
        className="bg-white"
        variant="light"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {differentiators.map((item, idx) => {
            const Icon = item.icon
            return (
              <div
                key={idx}
                className="rounded-2xl border border-gray-200 p-6 bg-white hover:shadow-lg transition-all group"
              >
                <div className="w-11 h-11 rounded-xl bg-[#FF5A5F]/10 flex items-center justify-center text-coral mb-4 group-hover:scale-105 transition-transform">
                  <Icon size={22} />
                </div>
                <h3 className="font-display font-semibold text-lg text-blue-dark mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
              </div>
            )
          })}
        </div>
      </Section>

      {/* Appian Highlight */}
      <AppianHighlight />

      {/* IA Highlight */}
      <Section
        title="IA aplicada a procesos y agentes inteligentes"
        subtitle="Copilots, bots y RAG corporativo conectados a tus datos y sistemas, con seguridad y guardrails."
        className="bg-[#f3f5fa]"
        variant="light"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {["Chatbots corporativos con contexto de negocio", "Agentes que orquestan flujos con personas y sistemas", "RAG y búsqueda empresarial con seguridad"].map((point, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-white border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all"
            >
              <h4 className="font-display font-semibold text-lg text-blue-dark mb-2">{point}</h4>
              <p className="text-gray-600 text-sm">Implementación con gobierno, métricas y adopción.</p>
            </div>
          ))}
        </div>
        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/servicios/ia-agentes-inteligentes"
            className="px-5 py-3 rounded-lg bg-coral text-white font-semibold text-center hover:bg-coral-dark transition-colors"
          >
            Ver IA aplicada
          </Link>
          <Link
            href="/contacto"
            className="px-5 py-3 rounded-lg border border-coral text-coral font-semibold text-center hover:bg-coral/10 transition-colors"
          >
            Hablemos de tu caso
          </Link>
        </div>
      </Section>

      {/* Services Section */}
      <Section title="Nuestras soluciones para tu negocio" className="bg-gray-50">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service) => (
            <Link
              key={service.id}
              href={`/servicios/${service.id}`}
              className="group bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <div className="w-12 h-12 bg-coral rounded-lg flex items-center justify-center mb-4 group-hover:bg-coral-dark transition-colors text-xl">
                {service.icon}
              </div>
              <h3 className="font-display font-bold text-xl mb-3 text-blue-dark">{service.title}</h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <div className="flex items-center gap-2 text-coral font-semibold group-hover:gap-3 transition-all">
                Ver detalle
                <span>→</span>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* Testimonial / Case Highlight */}
      <Section
        title="Casos con impacto"
        subtitle="Resultados medibles en automatización, IA y experiencia digital"
        className="bg-white"
        variant="light"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="rounded-2xl bg-gradient-to-r from-[#FF5A5F]/85 to-[#0B1B33]/85 p-8 text-white shadow-xl">
            <p className="text-sm uppercase tracking-[0.15em] mb-3 opacity-80">Caso destacado</p>
            <h3 className="font-display text-2xl font-bold mb-3">Automatización de onboarding en banca</h3>
            <p className="text-white/90 mb-4">
              Redujimos el TAT en 45% y mejoramos el NPS en +12 puntos con un flujo Appian + RPA integrado a core.
            </p>
            <div className="flex flex-wrap gap-2 text-sm">
              {["Appian", "RPA", "Integraciones core", "Reporting"].map((tag) => (
                <span key={tag} className="px-3 py-1 bg-white/15 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-gray-200 p-6 bg-white shadow-sm">
            <h4 className="font-display text-xl font-bold text-blue-dark mb-3">Lo que dicen</h4>
            <p className="text-gray-700 mb-4">
              “VR Group nos ayudó a llevar a producción en semanas, con gobierno claro y mejoras continuas sin fricción.”
            </p>
            <p className="text-gray-500 text-sm">Gerente de Operaciones, Banca</p>
          </div>
        </div>
      </Section>

      {/* Clients Section */}
      <Section
        title="Confían en nosotros"
        subtitle="Equipos de banca, retail, consumo masivo y tecnología ya trabajan con VR Group."
        className="bg-[#f3f5fa]"
        variant="light"
      >
        <LogoCarousel logos={clientLogos} fadeColor="#f3f5fa" />
        <div className="text-center mt-8">
          <Link
            href="/clientes"
            className="inline-flex items-center gap-2 text-coral font-semibold hover:text-blue-dark transition-colors"
          >
            Ver todos los clientes
            <span>→</span>
          </Link>
        </div>
      </Section>

      <Section className="bg-gradient-to-br from-coral via-coral-dark to-blue-dark relative overflow-hidden">
        {/* Overlay for better text contrast */}
        <div className="absolute inset-0 bg-black/15 pointer-events-none"></div>

        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <h2 className="font-display font-bold text-3xl sm:text-5xl mb-6 text-white drop-shadow-xl">
            ¿Listo para transformar tu negocio?
          </h2>
          <p className="text-lg sm:text-xl mb-8 text-white drop-shadow-lg opacity-95">
            Contáctanos hoy y descubre cómo podemos ayudarte a alcanzar tus objetivos digitales.
          </p>
          <Link
            href="/contacto"
            className="inline-flex px-8 py-4 bg-white text-coral rounded-lg font-display font-bold text-lg hover:bg-gray-50 hover:shadow-xl transition-all duration-300"
          >
            Solicita una reunión
          </Link>
        </div>
      </Section>

      <Footer />
    </div>
  )
}
