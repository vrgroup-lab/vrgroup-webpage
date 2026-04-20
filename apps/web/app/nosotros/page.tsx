import type { Metadata } from "next"
import Link from "next/link"
import { SiteNavbar } from "@/components/layout/site-navbar"
import { Footer } from "@/components/layout/footer"
import { HeroRotator } from "@/components/ui/hero-rotator"
import { Section } from "@/components/ui/section"
import { CTABanner } from "@/components/ui/cta-banner"
import { AnimatedCounter } from "@/components/ui/animated-counter"
import { ClientsMarquee } from "@/components/ui/clients-marquee"
import { CheckCircle2, Sparkles, Workflow, Users, Rocket } from "lucide-react"
import { toOptimizedAssetPath } from "@/lib/assets"
import { getHeroImages } from "@/lib/hero-images"
import { getLogosFromFolder } from "@/lib/logos"
import { careersPath, marketingSiteSettings } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "Sobre VR Group | Consultora boutique en transformación digital e IA",
  description:
    "Desde 2017, VR Group acompaña a empresas en Chile y Latinoamérica en transformación digital, automatización de procesos e inteligencia artificial aplicada. Más de 150 proyectos y un equipo multidisciplinario de 75 colaboradores.",
  alternates: {
    canonical: "/nosotros",
  },
  openGraph: {
    type: "website",
    locale: "es_CL",
    url: "https://vrgroup.cl/nosotros",
    siteName: "VR Group",
    title: "Sobre VR Group | Consultora boutique en transformación digital e IA",
    description:
      "Consultora boutique con foco en automatización, low-code e IA aplicada. +150 proyectos ejecutados desde 2017 en Chile y Latinoamérica.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sobre VR Group | Consultora boutique en transformación digital e IA",
    description:
      "Consultora boutique con foco en automatización, low-code e IA aplicada. +150 proyectos ejecutados desde 2017.",
  },
}

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "VR Group",
  legalName: "VR Group Chile",
  url: "https://vrgroup.cl",
  logo: "https://vrgroup.cl" + toOptimizedAssetPath("/logos/brand/logo_vrgroup_cuadrado.png"),
  foundingDate: "2017",
  numberOfEmployees: {
    "@type": "QuantitativeValue",
    value: 75,
  },
  description:
    "Consultora boutique en transformación digital, automatización de procesos e inteligencia artificial aplicada.",
  address: {
    "@type": "PostalAddress",
    addressCountry: "CL",
  },
  areaServed: ["CL", "Latinoamérica"],
  sameAs: ["https://cl.linkedin.com/company/vr-group-chile"],
}

export default function AboutPage() {
  const clientLogos = getLogosFromFolder("clients")
  const siteSettings = marketingSiteSettings
  const pillars = [
    {
      icon: Sparkles,
      title: "Simplicidad con impacto",
      description: "Soluciones claras y escalables, orientadas a resultados medibles sin sobrecomplejidad.",
    },
    {
      icon: Workflow,
      title: "Tecnología al servicio del negocio",
      description: "Ingeniería, diseño y automatización con foco en habilitar decisiones, eficiencia y crecimiento.",
    },
    {
      icon: Users,
      title: "Equipos expertos y cercanos",
      description: "Trabajamos como un solo equipo con nuestros clientes, impulsando entrega continua y evolución.",
    },
    {
      icon: Rocket,
      title: "Innovación aplicada",
      description: "IA, low-code y automatización inteligente para acelerar la ejecución de iniciativas digitales.",
    },
  ]

  const heroBackgrounds = getHeroImages("nosotros")

  return (
    <div className="min-h-screen flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <SiteNavbar settings={siteSettings} />

      <HeroRotator
        title={
          <>
            Somos <span className="text-[#FF5A5F]">VR Group</span>, una consultora boutique en transformación digital, automatización e IA
          </>
        }
        subtitle="Acompañamos a organizaciones a diseñar, construir y escalar capacidades tecnológicas con impacto real."
        images={heroBackgrounds}
        minHeight="calc(100vh + 50px)"
      >
        <div className="mt-6 flex flex-col lg:flex-row items-center gap-6 justify-center">
          <div className="bg-white/10 border border-white/15 backdrop-blur-lg rounded-3xl px-6 py-5 text-white shadow-2xl flex flex-col gap-3 w-full max-w-xl">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="space-y-1">
                <div className="text-2xl sm:text-3xl font-display font-bold">2017</div>
                <p className="text-sm text-white/80">Fundada</p>
              </div>
              <div className="space-y-1">
                <AnimatedCounter
                  end={150}
                  suffix="+"
                  durationMs={1600}
                  className="text-2xl sm:text-3xl font-display font-bold"
                />
                <p className="text-sm text-white/80">Proyectos</p>
              </div>
              <div className="space-y-1">
                <AnimatedCounter
                  end={75}
                  durationMs={1400}
                  className="text-2xl sm:text-3xl font-display font-bold"
                />
                <p className="text-sm text-white/80">Colaboradores</p>
              </div>
            </div>
            <div className="pt-3 mt-1 border-t border-white/15 flex justify-center">
              <Link
                href={careersPath}
                className="inline-flex items-center gap-2 rounded-full bg-white text-[#0B1B33] px-5 py-2 text-sm font-semibold hover:bg-gray-100 transition-colors"
              >
                Trabaja con nosotros
              </Link>
            </div>
          </div>
        </div>
      </HeroRotator>

      {/* Historia */}
      <section className="relative bg-[#0B1B33] text-white overflow-hidden min-h-screen flex items-center py-20 sm:py-24">
        {/* Giant year — solid watermark, no blur */}
        <div className="absolute -bottom-6 sm:-bottom-10 lg:-bottom-16 -right-4 sm:-right-6 lg:-right-8 pointer-events-none select-none leading-none">
          <span className="font-display font-bold text-[220px] sm:text-[360px] lg:text-[520px] text-white/[0.035] tracking-tighter">
            2017
          </span>
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <p className="text-xs uppercase tracking-[0.25em] text-coral font-semibold mb-8 text-center">
            Nuestra historia
          </p>
          <div className="space-y-6 text-lg sm:text-xl leading-relaxed text-white/90">
            <p>
              Fundada en 2017, VR Group nació con la convicción de que la transformación digital
              debe ser práctica, medible y centrada en las personas. A lo largo de estos años,
              hemos ejecutado más de 150 proyectos, impulsado la modernización tecnológica de
              múltiples industrias y construido un equipo multidisciplinario de 75 colaboradores en
              consultoría, desarrollo, automatización e inteligencia artificial.
            </p>
            <p>
              Hoy acompañamos a compañías en Chile y Latinoamérica a evolucionar sus procesos,
              adoptar tecnologías de última generación y construir experiencias digitales que
              generan valor de negocio.
            </p>
          </div>
        </div>
      </section>

      {/* Principios + Stats (bloque negro continuo) */}
      <Section
        title="Los principios que nos guían"
        subtitle="Valores que definen cómo trabajamos, decidimos y colaboramos con nuestros clientes."
        className="bg-black"
        variant="dark"
        paddingClass="pt-16 sm:pt-20 lg:pt-24 pb-0"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {pillars.map((value, idx) => {
            const Icon = value.icon
            return (
              <div
                key={idx}
                className="rounded-2xl bg-white/[0.04] border border-white/10 px-5 py-7 text-white hover:bg-white/[0.07] hover:border-white/20 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-coral/15 text-coral flex items-center justify-center mb-4">
                  <Icon size={24} />
                </div>
                <h3 className="font-display font-bold text-lg mb-2">{value.title}</h3>
                <p className="text-white/75 text-sm">{value.description}</p>
              </div>
            )
          })}
        </div>
      </Section>

      {/* Stats — texto limpio, sin cuadros */}
      <section className="bg-black text-white pt-12 sm:pt-14 lg:pt-16 pb-16 sm:pb-20 lg:pb-24">
        <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
            {[
              { end: 8, numSuffix: "", labelSuffix: "años", duration: 1200 },
              { end: 150, numSuffix: "+", labelSuffix: "proyectos", duration: 1600 },
              { end: 75, numSuffix: "", labelSuffix: "colaboradores", duration: 1400 },
            ].map((stat) => (
              <div key={stat.labelSuffix} className="flex items-baseline gap-3 leading-none">
                <AnimatedCounter
                  end={stat.end}
                  suffix={stat.numSuffix}
                  durationMs={stat.duration}
                  className="font-display font-bold text-5xl sm:text-6xl lg:text-7xl text-coral"
                />
                <span className="text-white/90 text-xl sm:text-2xl font-display font-semibold">
                  {stat.labelSuffix}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Metodología */}
      <Section title="Nuestra forma de trabajar" className="bg-white">
        <div className="space-y-10">
          <div className="flex flex-col gap-6">
            <p className="font-semibold text-blue-dark text-lg">Metodología centrada en valor</p>
            <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-r from-white to-gray-50 px-4 py-5">
              <div className="hidden md:block absolute top-1/2 left-8 right-8 h-px bg-gray-200" aria-hidden />
              <div className="grid grid-cols-1 md:grid-cols-5 gap-3 relative">
                {[
                  { label: "Descubrimiento", desc: "Entendimiento profundo del negocio" },
                  { label: "Priorización", desc: "Impacto y factibilidad primero" },
                  { label: "Diseño integral", desc: "Estrategia, tecnología y UX" },
                  { label: "Ejecución iterativa", desc: "Squads multidisciplinares" },
                  { label: "Adopción continua", desc: "Operación y mejora permanente" },
                ].map((step) => (
                  <div key={step.label} className="flex md:flex-col items-start md:items-center gap-2 text-center md:text-center">
                    <div className="flex items-center justify-center w-9 h-9 rounded-full bg-coral text-white shadow-md shrink-0">
                      <CheckCircle2 size={18} />
                    </div>
                    <div className="space-y-1 md:space-y-1">
                      <p className="font-semibold text-blue-dark text-sm">{step.label}</p>
                      <p className="text-sm text-gray-600 md:text-xs">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </Section>

      {/* Confían en nosotros */}
      <section className="relative bg-white py-16 sm:py-20 lg:py-24 overflow-hidden">
        <div className="relative max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 sm:mb-12 text-center">
            <p className="text-xs uppercase tracking-[0.25em] text-coral font-semibold mb-3">
              Clientes
            </p>
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-blue-dark">
              Confían en nosotros
            </h2>
            <p className="text-gray-600 text-base sm:text-lg mt-4 max-w-2xl mx-auto">
              Organizaciones líderes en banca, retail, industria y sector público que nos eligieron
              como partner estratégico.
            </p>
          </div>
        </div>
        <ClientsMarquee logos={clientLogos} variant="minimal" rows={1} speedMs={120000} fadeEdges />
      </section>

      {/* CTA */}
      <CTABanner
        eyebrow="Contacto"
        title="Llevemos tu próxima iniciativa a producción"
        subtitle="Conversemos sobre tu operación, tus prioridades y cómo podemos acompañarte con arquitectura, automatización e IA aplicada."
        buttonLabel="Agenda una reunión"
        buttonHref="/contacto"
      />

      <Footer />
    </div>
  )
}
