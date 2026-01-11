import { SiteNavbar } from "@/components/layout/site-navbar"
import { Footer } from "@/components/layout/footer"
import { Hero } from "@/components/ui/hero"
import { Section } from "@/components/ui/section"
import { LogoCarousel } from "@/components/ui/logo-carousel"
import { MetricCounter } from "@/components/ui/metric-counter"
import { AppianHighlight } from "@/components/ui/appian-highlight"
import { IAHighlight } from "@/components/ui/ia-highlight"
import { ServicesSection } from "@/components/ui/services-section"
import { CTABanner } from "@/components/ui/cta-banner"
import { RotatingWord } from "@/components/ui/rotating-word"
import { getLogosFromFolder } from "@/lib/logos"
import Image from "next/image"
import Link from "next/link"
import { Check, Brain, Workflow, Sparkles } from "lucide-react"

export default function Home() {
  const clientLogos = getLogosFromFolder("clients")
  const providerLogos = getLogosFromFolder("ai-providers")

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

  const ctaBase =
    "w-full sm:w-[280px] h-[56px] rounded-xl font-display font-semibold transition-all inline-flex items-center justify-center gap-2 whitespace-nowrap"

  return (
    <div className="min-h-screen flex flex-col">
      <SiteNavbar />

      {/* Hero Section */}
      <Hero
        eyebrow="Consultoría Tecnologíca"
        title={
          <>
            <span className="block text-3xl sm:text-5xl lg:text-6xl leading-[1.1]">
              <span className="block sm:hidden">Diseñamos y operamos</span>
              <span className="hidden sm:block">Diseñamos, construimos y operamos</span>
            </span>
            <span className="block text-3xl sm:text-5xl lg:text-6xl leading-[1.1]">
              <span className="block sm:hidden">soluciones que escalan tu</span>
              <span className="hidden sm:block">soluciones digitales que escalan tu</span>
            </span>
            <span className="block text-3xl sm:text-5xl lg:text-6xl leading-[1.1]">
              <RotatingWord
                words={[
                  "operación",
                  "productividad",
                  "time-to-market",
                  "experiencia digital",
                  "backoffice",
                  "continuidad",
                  "cumplimiento",
                  "crecimiento",
                ]}
                fallback="operación"
                className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF7A7F] via-[#FF5A5F] to-[#FF3C48]"
                containerClassName="whitespace-nowrap"
              />
            </span>
          </>
        }
        subtitle="De estrategia a producción: arquitectura sólida, seguridad y gobierno claro para entornos críticos."
        subtitleClassName="text-base sm:text-xl leading-relaxed max-w-[22rem] sm:max-w-3xl"
        alignment="center"
        minHeight="calc(100vh + 50px)"
        className="pt-8 sm:pt-12 lg:pt-16 pb-4 sm:pb-6 lg:pb-8"
        variant="default"
      >
        <div className="flex flex-col items-center gap-6 mt-8">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
            Atención ejecutiva
          </span>
          <div className="flex flex-col sm:flex-row items-center gap-5 w-full sm:w-auto">
            <Link
              href="/contacto"
              className={`${ctaBase} px-8 border-2 border-transparent text-white bg-[#FF5A5F] hover:bg-[#FF6A6F] shadow-none hover:shadow-none hover:scale-[1.05] active:scale-[0.99]`}
            >
              Agenda una reunión
              <span>→</span>
            </Link>
            <Link
              href="/servicios"
              className={`${ctaBase} px-8 bg-white text-[#0B1B33] hover:bg-gray-100 hover:scale-[1.05] active:scale-[0.99]`}
            >
              Explora nuestros servicios
            </Link>
          </div>
        </div>
        <div className="mt-12 w-full">
          <LogoCarousel
            logos={clientLogos}
            className="py-3"
            logoClassName="brightness-0 invert opacity-80"
            showFades={false}
          />
        </div>
      </Hero>

      {/* Differentiators Section */}
      <Section
        title="Por qué VR Group"
        subtitle="Low-code, IA aplicada y delivery boutique para resultados medibles"
        className="bg-white"
        variant="light"
        paddingClass="py-12 sm:py-14 lg:py-16"
      >
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 lg:gap-4 xl:gap-5">
          {differentiators.map((item, idx) => {
            const Icon = item.icon
            return (
              <div
                key={idx}
                className="rounded-2xl border border-gray-200 p-6 lg:p-7 bg-white hover:shadow-lg transition-all group"
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
      <IAHighlight providerLogos={providerLogos} />

      {/* Services Section */}
      <ServicesSection
        heading="Nuestras soluciones para tu negocio"
        subheading="Portafolio completo de VR Group: automatización, IA aplicada, analítica, desarrollo y gobierno operativo."
        variant="dark"
        paddingClass="py-12 sm:py-14 lg:py-16"
      />

      {/* Testimonial / Case Highlight */}
      <Section
        title="Casos con impacto"
        subtitle="Resultados medibles en automatización, IA y experiencia digital"
        className="bg-white"
        variant="light"
        paddingClass="py-12 sm:py-14 lg:py-16"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          <div className="rounded-2xl bg-gradient-to-r from-[#0B1B33] via-[#0a1730] to-[#05060b] p-8 text-white shadow-xl h-full">
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
          <div className="rounded-2xl border border-gray-200 bg-white shadow-sm h-full overflow-hidden">
            <div className="grid grid-cols-[120px_1fr] sm:grid-cols-[160px_1fr] lg:grid-cols-[34%_1fr] h-full">
              <div className="relative h-full min-h-[160px] sm:min-h-[180px] bg-gray-100">
                <Image
                  src="/images/root/manager.jpg"
                  alt="Gerente de Operaciones"
                  fill
                  sizes="(min-width: 1024px) 280px, 90vw"
                  className="object-contain object-center"
                />
              </div>
              <div className="flex flex-col justify-center gap-3 p-5 sm:p-6 lg:p-8">
                <h4 className="font-display text-xl font-bold text-blue-dark">Lo que dicen</h4>
                <p className="text-gray-700">
                  “VR Group nos ayudó a llevar a producción en semanas, con gobierno claro y mejoras continuas sin fricción.”
                </p>
                <p className="text-gray-500 text-sm">Gerente de Operaciones, Banca</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <CTABanner
        eyebrow="Contacto"
        title="🚀 Hablemos de tu próximo release"
        subtitle="Agenda una reunión y revisamos cómo escalar tu operación con arquitectura, automatización e IA."
        buttonLabel="Agenda una reunión"
        buttonHref="/contacto"
      />

      <Footer />
    </div>
  )
}
