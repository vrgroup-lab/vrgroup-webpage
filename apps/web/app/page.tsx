import type { CSSProperties } from "react"
import { SiteNavbar } from "@/components/layout/site-navbar"
import { Footer } from "@/components/layout/footer"
import { Hero } from "@/components/ui/hero"
import { VantaCloudsBackground } from "@/components/ui/vanta-clouds-background"
import { Section } from "@/components/ui/section"
import { HomeDeferredSections } from "@/components/ui/home-deferred-sections"
import { ServicesSection } from "@/components/ui/services-section"
import { CTABanner } from "@/components/ui/cta-banner"
import { RotatingWord } from "@/components/ui/rotating-word"
import { ClientsMarquee } from "@/components/ui/clients-marquee"
import { toOptimizedAssetPath } from "@/lib/assets"
import { getLogosFromFolder } from "@/lib/logos"
import Image from "next/image"
import Link from "next/link"
import { Check, Brain, Workflow, Sparkles } from "lucide-react"

export default function Home() {
  const clientLogos = getLogosFromFolder("clients")
  const providerLogos = getLogosFromFolder("ai-providers")
  const deferredSectionStyle: CSSProperties = {
    contentVisibility: "auto",
    containIntrinsicSize: "1000px",
  }

  const differentiators = [
    {
      title: "Appian & low-code de clase mundial",
      description: "Plataformas líderes con arquitecturas escalables y entregas rápidas.",
      icon: Workflow,
    },
    {
      title: "IA aplicada a procesos",
      description: "Copilots y asistentes integrados a tus sistemas core para acelerar la operación.",
      icon: Brain,
    },
    {
      title: "Equipos senior end-to-end",
      description: "UX, desarrollo, QA y delivery en un solo equipo que acompaña todo el ciclo.",
      icon: Sparkles,
    },
    {
      title: "Resultados medibles",
      description: "KPIs claros: time-to-market, productividad, adopción y confiabilidad.",
      icon: Check,
    },
  ]

  const ctaBase =
    "w-full sm:w-[240px] lg:w-[260px] h-12 sm:h-[52px] lg:h-14 text-sm sm:text-base rounded-xl font-display font-semibold transition-all inline-flex items-center justify-center gap-2 whitespace-nowrap"

  return (
    <div className="min-h-screen flex flex-col">
      <SiteNavbar />

      {/* Hero Section */}
      <Hero
        eyebrow="Consultoría Tecnológica"
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
                className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff7a7f] via-[#ff5a5f] to-[#ff3c48]"
                containerClassName="whitespace-nowrap"
              />
            </span>
          </>
        }
        alignment="center"
        minHeight="calc(100vh + 50px)"
        className="pt-8 sm:pt-12 lg:pt-16 pb-4 sm:pb-6 lg:pb-8"
        variant="default"
        dimOverlay={false}
        backgroundEffect={
          <VantaCloudsBackground
            backgroundColor={0x1a2f45}
            skyColor={0x5aa8cc}
            cloudColor={0xd46a55}
            cloudShadowColor={0x1a2040}
            sunColor={0xc04530}
            sunGlareColor={0xd87055}
            sunlightColor={0xc05540}
            speed={1}
            cameraHeight={0.9}
          />
        }
      >
        <p className="mt-7 font-display text-white/90 text-lg sm:text-xl lg:text-2xl max-w-2xl mx-auto leading-snug drop-shadow">
          Estrategia, ingeniería y operación en un solo equipo.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto mx-auto">
          <Link
            href="/contacto"
            className={`${ctaBase} border-2 border-transparent text-white bg-[#FF5A5F] hover:bg-[#FF6A6F] shadow-none hover:shadow-none hover:scale-[1.05] active:scale-[0.99]`}
          >
            Agenda una reunión
            <span>→</span>
          </Link>
          <Link
            href="/servicios"
            className={`${ctaBase} bg-white text-[#0B1B33] hover:bg-gray-100 hover:scale-[1.05] active:scale-[0.99]`}
          >
            Explora nuestros servicios
          </Link>
        </div>
      </Hero>

      {/* Clients + Differentiators unified dark block */}
      <section className="bg-gradient-to-b from-[#050711] to-[#070a1a]">
        {/* Clients */}
        <div className="pt-12 sm:pt-16 lg:pt-20">
          <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-10">
            <h2 className="font-display text-white text-3xl sm:text-4xl lg:text-5xl">
              <span className="font-normal">Nuestros</span>{" "}
              <span className="font-bold">clientes</span>
            </h2>
          </div>
          <ClientsMarquee logos={clientLogos} />
        </div>

        {/* Differentiators */}
        <div className="pt-16 sm:pt-20 lg:pt-24 pb-12 sm:pb-16 lg:pb-20">
          <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8 sm:mb-10">
              <h2 className="font-display text-white text-3xl sm:text-4xl lg:text-5xl">
                <span className="font-normal">Por qué</span>{" "}
                <span className="font-bold">VR Group</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 lg:gap-4 xl:gap-5">
              {differentiators.map((item, idx) => {
                const Icon = item.icon
                return (
                  <div
                    key={idx}
                    className="rounded-2xl border border-white/10 p-6 lg:p-7 bg-white/[0.04] hover:bg-white/[0.07] hover:border-white/20 transition-all group"
                  >
                    <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white mb-4 group-hover:scale-105 group-hover:bg-white/15 transition-all">
                      <Icon size={22} />
                    </div>
                    <h3 className="font-display font-semibold text-lg text-white mb-2">{item.title}</h3>
                    <p className="text-white/70 text-sm leading-relaxed">{item.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <div style={deferredSectionStyle}>
        <HomeDeferredSections providerLogos={providerLogos} />
      </div>

      {/* Services Section */}
      <div style={deferredSectionStyle}>
        <ServicesSection
          heading="Nuestras soluciones para tu negocio"
          subheading="Portafolio completo de VR Group: automatización, IA aplicada, analítica, desarrollo y gobierno operativo."
          variant="dark"
          paddingClass="min-h-screen py-16 sm:py-20 lg:py-24 flex flex-col justify-center"
        />
      </div>

      {/* Testimonial / Case Highlight */}
      <div style={deferredSectionStyle}>
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
                    src={toOptimizedAssetPath("/images/root/manager.jpg")}
                    alt="Gerente de Operaciones"
                    fill
                    sizes="(min-width: 1024px) 280px, 90vw"
                    className="object-cover object-center"
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
      </div>

      <div style={deferredSectionStyle}>
        <CTABanner
          eyebrow="Contacto"
          title="Hablemos de tu próximo release"
          subtitle="Agenda una reunión y revisamos cómo escalar tu operación con arquitectura, automatización e IA."
          buttonLabel="Agenda una reunión"
          buttonHref="/contacto"
        />
      </div>

      <Footer />
    </div>
  )
}
