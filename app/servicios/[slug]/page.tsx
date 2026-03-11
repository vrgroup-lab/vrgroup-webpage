import { SiteNavbar } from "@/components/layout/site-navbar"
import { Footer } from "@/components/layout/footer"
import { Hero } from "@/components/ui/hero"
import { Section } from "@/components/ui/section"
import { OfferingsSection } from "@/components/ui/offerings-section"
import { SubservicesGrid } from "@/components/ui/subservices-grid"
import { CTABanner } from "@/components/ui/cta-banner"
import { OptimizedAnimation } from "@/components/ui/optimized-animation"
import { toBackgroundImage, toOptimizedAssetPath } from "@/lib/assets"
import { getLogosFromFolder } from "@/lib/logos"
import { marketingSiteSettings } from "@/lib/site-config"
import Link from "next/link"
import {
  Check,
  ArrowRight,
  TrendingUp,
  Wrench,
  ArrowRightFromLine,
  Zap,
} from "lucide-react"

export const dynamic = "force-static"

interface ServiceDetailPageProps {
  params: Promise<{
    slug: string
  }>
}

function WhyChooseSection({
  reasons,
  highlights,
  className,
}: {
  reasons: string[]
  highlights?: string[]
  className?: string
}) {
  if (!reasons?.length) return null

  return (
    <div className={className ? `bg-black ${className}` : "bg-black"}>
      <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1.35fr_0.65fr] gap-8 items-stretch min-h-[360px] lg:min-h-[460px]">
          <div className="flex flex-col justify-center py-10 sm:py-12">
            <h4 className="font-display text-xl sm:text-2xl font-semibold text-white mb-4">¿Por qué elegir nuestro servicio?</h4>
            <div className="space-y-4 text-white/90">
              {reasons.map((paragraph) => (
                <div key={paragraph} className="flex items-start gap-3">
                  <span className="mt-2 h-2.5 w-2.5 rounded-full bg-white flex-shrink-0" />
                  <p className="text-sm leading-relaxed">{paragraph}</p>
                </div>
              ))}
            </div>
          </div>
          <div
            className="h-full min-h-[360px] lg:min-h-[460px] bg-cover bg-center self-stretch"
            style={{ backgroundImage: toBackgroundImage("/images/why-choose/corporate.jpg"), backgroundPosition: "70% center" }}
            aria-label="Equipo corporativo"
            role="img"
          />
        </div>
        {highlights?.length ? (
          <div className="mt-8 pt-6 border-t border-white/10">
            <p className="text-[11px] uppercase tracking-[0.3em] text-white/60 mb-3">Beneficios principales</p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 list-disc list-inside text-sm text-white/90">
              {highlights.map((item) => (
                <li key={item} className="leading-relaxed">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  )
}

const subserviceImagePool = [
  "/images/subservices/uxui.png",
  "/images/subservices/web.png",
  "/images/subservices/mobile.jpg",
  "/images/subservices/performance.jpg",
]

const withSubserviceImages = (items: { title: string; description: string }[], offset = 0) =>
  items.map((item, idx) => ({
    ...item,
    image: subserviceImagePool[(idx + offset) % subserviceImagePool.length],
  }))

const experienceDigitalSubservices = [
  {
    title: "UX/UI y Research",
    description: "Journeys, prototipos navegables y validación con usuarios para reducir riesgo y acelerar adopción.",
  },
  {
    title: "Diseño y Desarrollo Web",
    description: "Sitios públicos, portales privados e intranets rápidos, accesibles y listos para medir conversión.",
  },
  {
    title: "Diseño y Desarrollo Mobile",
    description: "Apps iOS/Android con React Native o Ionic, publicación en stores y monitoreo in-app.",
  },
  {
    title: "Performance Digital & Analítica",
    description: "SEO, tagging, dashboards y experimentación continua para mejorar velocidad y conversión.",
  },
]

const unifiedProcess = [
  {
    step: "01",
    title: "Discovery",
    description: "Objetivos, alcance, usuarios y viabilidad; definición de criterios de éxito.",
  },
  {
    step: "02",
    title: "Diseño",
    description: "Experiencia/arquitectura, blueprint técnico-funcional, datos e integraciones.",
  },
  {
    step: "03",
    title: "Build",
    description: "Desarrollo, implementación y QA con estándares, pruebas y quality gates.",
  },
  {
    step: "04",
    title: "Lanzamiento",
    description: "Salida a producción, pruebas finales e integración (UAT), estabilización y soporte inicial (hypercare).",
  },
  {
    step: "05",
    title: "Evolución",
    description: "Operación, métricas (KPIs/SLAs), optimización continua y nuevos releases.",
  },
]

const reasonP1 =
  "Partimos por entender objetivos, contexto y restricciones para definir una solución clara, priorizada y medible, alineada a resultados de negocio."
const reasonP3 =
  "Operamos con rigor y profesionalismo: especialistas, gobierno claro, documentación y métricas para ejecutar y evolucionar sin fricción, sosteniendo resultados en el tiempo."

const engineeringSubservices = [
  {
    title: "Arquitectura & Diseño de Solución",
    description: "Decisiones técnicas, seguridad, escalabilidad y costos.",
    image: "/images/subservices/architecture.png",
  },
  {
    title: "Backends & APIs",
    description: "Lógica de negocio, microservicios cuando aplica y contratos claros.",
    image: "/images/subservices/backend.jpg",
  },
  {
    title: "Integración de Sistemas",
    description: "APIs, middleware, eventos y resiliencia ante fallas.",
    image: "/images/subservices/integration.jpg",
  },
  {
    title: "Infraestructura & Cloud",
    description: "Arquitectura cloud, seguridad, redes y observabilidad para ambientes críticos con alta disponibilidad.",
    image: "/images/subservices/cloud.jpg",
  },
  {
    title: "Modernización & Refactor",
    description: "Desacople, performance y reducción de deuda técnica.",
    image: "/images/subservices/refactor.jpg",
  },
]

const gestionYRiesgoSubservices = [
  {
    title: "Control de gestión",
    description: "Indicadores, seguimiento y control interno.",
    image: "/images/subservices/kpi.jpg",
  },
  {
    title: "Gestión de riesgos y cumplimiento",
    description: "Riesgos clave y cumplimiento normativo.",
    image: "/images/subservices/risk.png",
  },
  {
    title: "Auditoría y fortalecimiento de controles",
    description: "Revisión, ajustes y evidencias trazables.",
    image: "/images/subservices/audit.jpg",
  },
  {
    title: "PMO y gobernanza de iniciativas",
    description: "Seguimiento ejecutivo cuando se requiere.",
    image: "/images/subservices/pmo.jpg",
  },
]

const iaAgentesSubservices = [
  {
    title: "Agentes, chatbots y copilots",
    description: "Asistentes por rol (ventas, soporte, operaciones) con límites, aprobaciones y traspaso a humano.",
  },
  {
    title: "Workflows con IA",
    description: "Pasos de IA en procesos para clasificar, enrutar, extraer y validar, con revisión humana cuando aplica.",
  },
  {
    title: "Integración en sistemas",
    description: "APIs, conectores y middleware; tools para agentes (MCP) y auditoría en sistemas corporativos.",
  },
  {
    title: "Búsqueda empresarial & RAG",
    description: "Respuestas desde conocimiento interno con permisos, vigencia de fuentes y citas verificables.",
  },
  {
    title: "Prompt engineering y evaluación",
    description: "Prompts versionados, pruebas de calidad y control de regresión para mantener resultados estables.",
  },
  {
    title: "Adopción operativa y cambio",
    description: "Capacitación, guías de uso, roles y monitoreo para pasar de piloto a operación.",
  },
]

const serviceContent: Record<string, any> = {
  "experiencia-digital": {
    title: "Experiencia Digital.",
    intro: "Soluciones integrales web y mobile.",
    offeringsIntro:
      "Combinamos research, UX/UI, desarrollo web/mobile y performance digital para entregar canales que se lanzan rápido, se usan sin fricción y evolucionan con datos.",
    services: withSubserviceImages(experienceDigitalSubservices, 0),
    benefits: [
      "Experiencias intuitivas y consistentes en cada canal.",
      "Performance web/mobile optimizada para velocidad y estabilidad.",
      "Time-to-market con design systems y componentes reutilizables.",
      "Decisiones guiadas por métricas de uso, adopción y conversión.",
      "Evolución continua con backlog priorizado y releases frecuentes.",
      "Implementaciones alineadas a negocio con UX validado.",
      "QA, accesibilidad y seguridad considerados desde el diseño.",
      "SEO y analítica configurados desde el lanzamiento.",
    ],
    specializations: [
      "Experiencia digital y desarrollo de proyectos",
      "Diseño y desarrollo web",
      "Diseño y desarrollo mobile",
      "Evolución y optimización de canal digital",
      "Performance digital (SEO/Analítica)",
    ],
    includesPillars: [
      {
        title: "Discovery & Diseño",
        items: [
          "Research, entrevistas y validación con usuarios",
          "Journeys, user flows y prototipos navegables",
          "Design system y librería de componentes",
          "Backlog priorizado con foco en adopción",
        ],
      },
      {
        title: "Desarrollo & Implementación",
        items: [
          "Web y mobile sobre APIs existentes",
          "QA funcional/visual y accesibilidad",
          "Performance y estabilidad desde el build",
          "Integraciones y handoff con equipos internos",
        ],
      },
      {
        title: "Lanzamiento & Adopción",
        items: ["SEO técnico y on-page", "Seteo de GA4 y Tag Manager", "UAT y gestión de release", "Plan de comunicación y soporte"],
      },
      {
        title: "Evolución & Performance",
        items: [
          "Monitoreo de métricas de uso y conversión",
          "A/B testing y experimentos",
          "Mejoras continuas de UX y performance",
          "Roadmap de releases iterativos",
        ],
      },
    ],
    technologiesCards: [
      { name: "Figma", hint: "Design systems y prototipos", logo: "/logos/technologies/figma_logo.png" },
      { name: "Next.js", hint: "Web apps SSR/SSG", logo: "/logos/technologies/next_logo.png" },
      { name: "React", hint: "Interfaces dinámicas", logo: "/logos/technologies/react_logo.png" },
      { name: "React Native", hint: "Apps iOS/Android" },
      { name: "Ionic", hint: "Apps híbridas" },
      { name: "TypeScript", hint: "Tipado y robustness", logo: "/logos/technologies/typescripts_logo.png" },
      { name: "Node.js", hint: "Integraciones y APIs" },
      { name: "GraphQL", hint: "APIs eficientes" },
      { name: "REST", hint: "Integración con sistemas" },
      { name: "Headless CMS", hint: "Contenido desacoplado" },
      { name: "WordPress", hint: "Sitios corporativos", logo: "/logos/technologies/wordpress_logo.png" },
      { name: "Shopify", hint: "Ecommerce", logo: "/logos/technologies/shopify_logo.png" },
      { name: "GA4 / Tag Manager", hint: "Métricas y tagging" },
      { name: "Core Web Vitals", hint: "Performance web" },
    ],
    useCases: [
      { title: "Portal transaccional", desc: "Evolución con foco en performance, conversión y estabilidad." },
      { title: "App mobile de atención/operación", desc: "Experiencia móvil con adopción y métricas in-app." },
      { title: "Intranets y portales privados", desc: "Canales internos con identidad, seguridad y analítica de uso." },
      { title: "Landings y funnels", desc: "Campañas y captación con pruebas A/B y SEO técnico." },
      { title: "Ecommerce y catálogos", desc: "Checkout optimizado y medición completa del funnel." },
      { title: "Replatforming web / PWA", desc: "Migración a stack moderno con rendimiento y offline cuando aplica." },
    ],
    process: [
      ...unifiedProcess,
    ],
    reasons: [
      reasonP1,
      "Diseñamos y construimos canales web y mobile con foco en UX/UI, performance y analítica, optimizando adopción, conversión y evolución continua del producto.",
      reasonP3,
    ],
  },
  "software-factory": {
    title: "Ingeniería de Software.",
    intro: "Soluciones integradas y a medida.",
    offeringsIntro: "Diseñamos, construimos y operamos backends, APIs e integraciones con estándares enterprise y entregas continuas.",
    services: engineeringSubservices,
    benefits: [
      "Soluciones productivas con resiliencia y seguridad enterprise.",
      "Entregas frecuentes con CI/CD, pruebas y control de cambios.",
      "Integraciones gobernadas con trazabilidad y manejo de errores.",
      "Reducción de deuda técnica y mejora de performance.",
      "Visibilidad con monitoreo de logs, métricas y alertas.",
      "Equipos extendidos y servicio gestionado con SLAs.",
    ],
    includes: [
      "Decisiones de arquitectura, disponibilidad, performance, seguridad y costos.",
      "Modelos de datos, reglas de negocio y migraciones para consistencia.",
      "APIs versionadas con autenticación, autorización y documentación.",
      "Integración con legacy y terceros con reintentos, trazabilidad y manejo de errores.",
      "Automatización CI/CD, QA automatizado y control de cambios.",
      "Monitoreo técnico base: logs, métricas y alertas.",
    ],
    deliverables: [
      "Documento de diseño de solución (arquitectura, decisiones, riesgos, plan).",
      "APIs/servicios productivos con documentación y controles de seguridad.",
      "Integraciones operativas con trazabilidad de fallas y métricas básicas.",
      "Pipelines CI/CD y suite de pruebas (unitarias e integración) según criticidad.",
    ],
    useCases: [
      { title: "Capa de integración", desc: "Conectar sistemas core con canales y plataformas (BPM/IA)." },
      { title: "Backend transaccional", desc: "Modelo de datos, performance y controles de seguridad." },
      { title: "Modernización y desacople", desc: "Refactor a servicios/APIs y mejora de performance." },
      { title: "Data & eventos", desc: "Mensajería/event-driven con resiliencia y trazabilidad." },
    ],
    modalities: [
      { title: "Build", desc: "Diseño y construcción end-to-end con handoff documentado." },
      { title: "Run", desc: "Operación y soporte con SLAs, monitoreo y mejora continua." },
      { title: "Enable", desc: "Acompañamiento y coaching a tu equipo para acelerar delivery." },
    ],
    process: [
      ...unifiedProcess,
    ],
    reasons: [
      reasonP1,
      "Desarrollamos backends, APIs e integraciones con estándares enterprise, CI/CD y observabilidad, asegurando escalabilidad, mantenibilidad y operación confiable.",
      reasonP3,
    ],
  },
  "automatizacion-de-procesos": {
    title: "Automatización de procesos.",
    intro: "Optimiza procesos, impulsa eficiencia.",
    offeringsIntro:
      "Appian es nuestro core. Equipo dedicado y certificado para discovery, diseño y delivery en la plataforma. Integramos RPA, Data Fabric y APIs para automatizar procesos end-to-end con gobierno y operación continua.",
    offeringsCards: [
      {
        title: "Diseño de automatización",
        description: "Blueprint funcional, definición de integraciones y arquitectura de procesos.",
        image: "/images/subservices/design_process.png",
      },
      {
        title: "Implementación BPM/low-code",
        description: "Ejecución en Appian como referencia, con calidad, pruebas y gobierno de cambios.",
        image: "/images/subservices/automatizacion.png",
      },
      {
        title: "Monitoreo y mejora continua",
        description: "Operación, métricas y optimización iterativa de procesos automatizados.",
        image: "/images/subservices/monitoring.jpg",
      },
    ],
    benefits: [
      "Time-to-market acelerado con Appian low-code.",
      "Reducción de TAT y costos operativos con automatización end-to-end.",
      "Trazabilidad, auditoría y compliance integrados en cada flujo.",
      "Orquestación de humanos, bots y sistemas desde una sola plataforma.",
    ],
    services: [
      { title: "Discovery & Pipeline", description: "Identificación y priorización de casos." },
      { title: "Laboratorio de Automatización", description: "Prototipos rápidos y validaciones." },
      { title: "Implementaciones Appian / iBPMS", description: "Diseño, desarrollo y QA especializado." },
      { title: "RPA & Orquestación", description: "Bots, APIs y humanos en un solo flujo." },
      { title: "Servicios Gestionados", description: "Soporte, mejoras y operación continua." },
    ],
    process: [
      ...unifiedProcess,
    ],
    reasons: [
      reasonP1,
      "Implementamos automatización end-to-end con Appian, BPM/low-code y RPA, incorporando gobierno, trazabilidad y métricas para escalar con control y sin deuda técnica.",
      reasonP3,
    ],
  },
  "gestion-y-riesgo": {
    title: "Gestión & Riesgo.",
    intro: "Excelencia en procesos clave.",
    offeringsIntro:
      "Diseñamos modelos de gestión, control y cumplimiento para operar procesos críticos con trazabilidad, métricas accionables y gobierno claro.",
    benefits: [
      "Modelos operativos alineados a la estrategia",
      "Control y mitigación de riesgos clave",
      "Cumplimiento normativo con evidencias",
      "Dashboards de gestión y reporting ejecutivo",
    ],
    services: gestionYRiesgoSubservices,
    process: [
      ...unifiedProcess,
    ],
    reasons: [
      reasonP1,
      "Implementamos marcos de GRC, cumplimiento y continuidad con controles, evidencias y reporting ejecutivo para fortalecer resiliencia operacional y toma de decisiones.",
      reasonP3,
    ],
  },
  "ia-y-agentes": {
    title: "Inteligencia Artificial Aplicada.",
    intro: "Agentes inteligentes para mayor eficiencia.",
    offeringsIntro:
      "Diseñamos agentes, copilots y workflows inteligentes conectados a datos empresariales con seguridad, evaluación continua y adopción guiada.",
    benefits: [],
    services: withSubserviceImages(iaAgentesSubservices, 3),
    process: [
      ...unifiedProcess,
    ],
    reasons: [
      reasonP1,
      "Diseñamos e integramos agentes, copilots y RAG conectados a tus datos y sistemas, con seguridad, guardrails y gobierno; además, capacitamos a tus equipos para adopción efectiva y uso responsable.",
      reasonP3,
    ],
  },
  "staffing-y-celulas": {
    title: "Staffing & Células Ágiles",
    intro: "Soluciones digitales con equipos ágiles a demanda.",
    heroEyebrow: "Staffing digital",
    offeringsIntro:
      "Proveemos células ágiles y talento especializado para activar, escalar o reforzar iniciativas digitales sin fricción. Equipos listos para integrarse a tu operación con onboarding express, gobierno liviano y herramientas ágiles que aseguran entrega continua y calidad.",
    pillars: [
      {
        title: "Equipos ágiles.",
        description: "Células flexibles conformadas por perfiles expertos para escalar tus proyectos rápidamente y sin burocracia.",
        shape: "square",
        image: "/images/staffing/equipos-agiles.jpg",
      },
      {
        title: "Staffing digital.",
        description: "Provisión inmediata de talento IT especializado, en modalidad on-demand y con rápida integración a tu operación.",
        shape: "circle",
        image: "/images/staffing/staffing-digital.jpg",
      },
      {
        title: "Procesos eficientes.",
        description: "Implementamos metodologías ágiles y herramientas colaborativas que aseguran entregas veloces y eficaces.",
        shape: "triangle",
        image: "/images/staffing/procesos-eficientes.jpg",
      },
    ],
    differentiators: [
      { title: "Onboarding Express", icon: ArrowRightFromLine },
      { title: "Escalabilidad real", icon: TrendingUp },
      { title: "Toolbox propio", icon: Wrench },
      { title: "Entrega rápida", icon: Zap },
    ],
    profiles: [
      {
        name: "Ingenieros de software",
        description: "Full-stack con enfoque en buenas prácticas, rendimiento y despliegues confiables.",
      },
      {
        name: "Desarrolladores backend",
        description: "APIs, microservicios y servicios robustos, seguros y escalables.",
      },
      {
        name: "Desarrolladores frontend web",
        description: "Experiencias web modernas, accesibles y optimizadas para performance.",
      },
      {
        name: "Desarrolladores frontend mobile",
        description: "Apps nativas/híbridas con UX cuidada, estabilidad y métricas en producción.",
      },
      {
        name: "Consultores",
        description: "Interfaz negocio-tecnología para levantar requerimientos y priorizar entregas.",
      },
      {
        name: "Analistas QA",
        description: "Calidad end-to-end: pruebas funcionales, automatizadas y regresiones.",
      },
      {
        name: "Analistas de Business Intelligence",
        description: "Modelado de datos, dashboards accionables y reporting para decisión.",
      },
      {
        name: "Desarrolladores low-code",
        description: "Implementación acelerada en Appian/low-code con gobierno y standards.",
      },
      {
        name: "Arquitectos de software",
        description: "Definen arquitectura, seguridad y escalabilidad alineadas a negocio.",
      },
      {
        name: "Project Managers",
        description: "Gestión ágil, riesgos y coordinación de equipos para liberar valor continuo.",
      },
    ],
    reasons: [
      reasonP1,
      "Conformamos equipos on-demand alineados a tu cultura y objetivos, con onboarding y gestión de capacidad para acelerar ejecución y escalar según demanda.",
      reasonP3,
    ],
  },
}

// Aliases para slugs antiguos que puedan seguir enlazados en la UI
const slugAliases: Record<string, string> = {
  appian: "automatizacion-de-procesos",
  ia: "ia-y-agentes",
  transformacion: "experiencia-digital",
  "soluciones-ti": "software-factory",
  "gestion-riesgo": "gestion-y-riesgo",
  "analitica-ml": "staffing-y-celulas",
  "transformacion-digital-desarrollo": "experiencia-digital",
  "soluciones-ti-proyectos": "software-factory",
  "automatizacion-procesos": "automatizacion-de-procesos",
  "gestion-operaciones-riesgo": "gestion-y-riesgo",
  "ia-agentes-inteligentes": "ia-y-agentes",
  "staffing-celulas-agiles": "staffing-y-celulas",
}

export async function generateStaticParams() {
  return Object.keys(serviceContent).map((slug) => ({ slug }))
}

export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const { slug } = await params
  const normalizedSlug = slugAliases[slug] || slug
  const content = serviceContent[normalizedSlug]
  const isAppian = normalizedSlug === "automatizacion-de-procesos"
  const isIAService = normalizedSlug === "ia-y-agentes"
  const isTransformacion = normalizedSlug === "experiencia-digital"
  const isSoftwareFactory = normalizedSlug === "software-factory"
  const isStaffing = normalizedSlug === "staffing-y-celulas"
  const showBenefits = normalizedSlug !== "gestion-y-riesgo" && normalizedSlug !== "ia-y-agentes"
  const heroBackground = isAppian ? undefined : undefined
  const providerLogos = isIAService ? getLogosFromFolder("ai-providers") : []
  const iaProvidersFallback = ["OpenAI", "Anthropic", "Google Gemini", "Azure OpenAI", "AWS Bedrock", "DeepSeek", "Cohere", "Meta Llama"]
  const siteSettings = marketingSiteSettings

  if (!content) {
    return (
      <div className="min-h-screen flex flex-col">
        <SiteNavbar settings={siteSettings} />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Servicio no encontrado</h1>
            <Link href="/servicios" className="text-coral hover:text-coral-dark">
              Volver a servicios
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  const offeringsEyebrow = content.offeringsEyebrow ?? content.heroEyebrow ?? "Servicios"

  if (isAppian) {
    const useCases = content.useCases ?? []

    return (
      <div className="min-h-screen flex flex-col">
        <SiteNavbar settings={siteSettings} />

        <Hero title={content.title} subtitle={content.intro} variant="services" />

        <SubservicesGrid intro={content.offeringsIntro} items={content.offeringsCards ?? []} />

        <section className="bg-white pb-8">
          <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-6 items-center rounded-2xl border border-blue-800/40 bg-[#0B2A5B] px-6 py-6 text-white shadow-[0_20px_50px_rgba(11,42,91,0.35)]">
              <div className="space-y-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={toOptimizedAssetPath("/logos/partners/letter_appian.png", { width: 256 })}
                  alt="Appian"
                  className="h-7 sm:h-8 object-contain"
                />
                <h3 className="font-display text-lg sm:text-xl font-semibold">Plataforma líder en automatización de procesos</h3>
                <p className="text-sm text-white/85 leading-relaxed">
                  Implementamos Appian como referencia para orquestar procesos end-to-end con gobierno, trazabilidad y escalabilidad.
                </p>
              </div>
              <div className="flex lg:justify-end">
                <a
                  href="https://appian.com/es"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-coral transition-colors"
                >
                  Conocer más sobre Appian
                  <ArrowRight size={14} />
                </a>
              </div>
            </div>
          </div>
        </section>

        <Section className="bg-white" variant="light" paddingClass="py-8 sm:py-10 lg:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="text-center lg:text-left">
                <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-2">BPMN</p>
                <h3 className="font-display text-lg sm:text-xl font-semibold text-[#0b1b33]">Automatización con modelos BPMN</h3>
                <details className="group mt-3 text-sm text-gray-600">
                  <summary className="flex items-center justify-center lg:justify-start gap-2 cursor-pointer list-none font-semibold text-coral">
                    Leer descripción
                    <span className="text-xs group-open:rotate-90 transition-transform">→</span>
                  </summary>
                  <p className="mt-3 leading-relaxed">
                    Modelamos procesos en BPMN dentro de Appian para visualizar flujos, detectar cuellos de botella y acelerar la automatización con reglas
                    claras y reutilizables.
                  </p>
                </details>
              </div>
              <div className="rounded-3xl overflow-hidden border border-gray-200 shadow-[0_18px_55px_rgba(0,0,0,0.12)]">
                <OptimizedAnimation
                  src="/images/appian/process-automation-animation.gif"
                  label="Automatización en acción"
                  preload="none"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="text-center lg:text-left">
                <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-2">Data Fabric</p>
                <h3 className="font-display text-lg sm:text-xl font-semibold text-[#0b1b33]">Gobierno y unificación de datos</h3>
                <details className="group mt-3 text-sm text-gray-600">
                  <summary className="flex items-center justify-center lg:justify-start gap-2 cursor-pointer list-none font-semibold text-coral">
                    Leer descripción
                    <span className="text-xs group-open:rotate-90 transition-transform">→</span>
                  </summary>
                  <p className="mt-3 leading-relaxed">
                    Appian Data Fabric unifica fuentes de datos para asegurar gobernanza, consistencia y una automatización correcta de procesos sin duplicar
                    información.
                  </p>
                </details>
              </div>
              <div className="rounded-3xl overflow-hidden border border-gray-200 shadow-[0_18px_55px_rgba(0,0,0,0.12)]">
                <OptimizedAnimation
                  src="/images/appian/data-fabric-animation.gif"
                  label="Appian Data Fabric en acción"
                  preload="none"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </Section>

        <WhyChooseSection reasons={content.reasons} highlights={content.benefits} className="mt-6" />

        {useCases.length > 0 && (
          <Section title="Casos y ejemplos" className="bg-white" variant="light">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {useCases.map((item: any) => (
                <div key={item.title} className="rounded-2xl bg-gray-50 border border-gray-200 p-4 shadow-sm">
                  <h4 className="font-display font-semibold text-lg text-blue-dark mb-2">{item.title}</h4>
                  <p className="text-gray-700 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </Section>
        )}

        <Section title="Nuestro proceso" className="bg-gray-50" variant="light">
          <div className="relative">
            <div className="pointer-events-none hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-coral transform -translate-x-1/2"></div>
            <div className="pointer-events-none md:hidden absolute left-6 top-6 bottom-6 w-0.5 bg-coral"></div>
            <div className="space-y-12">
              {content.process.map((item: any, idx: number) => (
                <div key={item.title} className={`flex gap-6 items-start ${idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                  <div className="hidden md:block flex-1"></div>
                  <div className="flex-shrink-0 relative z-10">
                    <div className="w-12 h-12 bg-coral rounded-full flex items-center justify-center shadow-md">
                      <span className="text-white font-display font-bold">{item.step}</span>
                    </div>
                  </div>
                  <div className="flex-1 md:py-2">
                    <h3 className="font-display font-bold text-lg mb-1 text-blue-dark">{item.title}</h3>
                    <p className="text-gray-700">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Section>

        <CTABanner
          eyebrow="Contacto"
          title="¿Listo para implementar esta solución?"
          subtitle="Agendemos una sesión para revisar tu caso y activar un plan con entrega a producción."
          buttonLabel="Agenda una reunión"
          buttonHref="/contacto"
        />

        <Footer />
      </div>
    )
  }

  if (isStaffing) {
    const staffingItems = (content.pillars ?? []).map((pillar: any) => ({
      title: pillar.title,
      description: pillar.description,
      image: pillar.image,
    }))

    return (
      <div className="min-h-screen flex flex-col bg-white text-gray-900">
        <SiteNavbar settings={siteSettings} />

        <Hero
          title={content.title}
          subtitle={content.intro}
          alignment="center"
          className="pt-16"
          minHeight="520px"
          variant="services"
        />

        <SubservicesGrid intro={content.offeringsIntro} items={staffingItems} />

        <section className="bg-white py-10 sm:py-12">
          <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-display text-lg sm:text-xl font-semibold text-black">Diferenciadores clave</h4>
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-500">Staffing on-demand</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {content.differentiators.map((diff: any) => {
                const Icon = diff.icon
                return (
                  <div
                    key={diff.title}
                    className="flex flex-col items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-5 text-center shadow-sm"
                  >
                    <Icon size={20} className="text-gray-700" />
                    <p className="font-semibold text-gray-800 text-sm">{diff.title}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <WhyChooseSection reasons={content.reasons} className="mt-12" />

        <section className="bg-white py-10 sm:py-12">
          <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-display text-lg sm:text-xl font-semibold text-black">Roles disponibles</h4>
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-500">Staffing on-demand</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {content.profiles.map((profile: any, idx: number) => (
                <div key={profile.name} className="group relative h-48 bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                  <div className="absolute inset-0 rounded-xl transition-all duration-500 group-hover:translate-y-[-100%] p-4 flex flex-col items-center justify-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 text-lg">
                      {idx + 1}
                    </div>
                    <p className="font-display font-semibold text-center text-gray-900 text-sm sm:text-base">{profile.name}</p>
                  </div>
                  <div className="absolute inset-0 rounded-xl bg-white border border-gray-200 p-4 flex items-center justify-center text-center text-sm text-gray-700 leading-relaxed translate-y-full transition-all duration-500 group-hover:translate-y-0">
                    <p>{profile.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <CTABanner
          eyebrow="Contacto"
          title="¿Listo para armar tu célula ágil?"
          subtitle="Cuéntanos perfiles, plazos y objetivos. Te proponemos un equipo en días."
          buttonLabel="Agenda una reunión"
          buttonHref="/contacto"
        />

        <Footer />
      </div>
    )
  }

  if (isSoftwareFactory) {
    return (
      <div className="min-h-screen flex flex-col">
        <SiteNavbar settings={siteSettings} />

        <Hero title={content.title} subtitle={content.intro} variant="services" />

        <SubservicesGrid intro={content.offeringsIntro} items={content.services} />

        <WhyChooseSection reasons={content.reasons} className="mt-12" />

        <Section title="Nuestro proceso" className="bg-gray-50" variant="light">
          <div className="relative">
            <div className="pointer-events-none hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-coral transform -translate-x-1/2"></div>
            <div className="pointer-events-none md:hidden absolute left-6 top-6 bottom-6 w-0.5 bg-coral"></div>
            <div className="space-y-12">
              {content.process.map((item: any, idx: number) => (
                <div key={item.title} className={`flex gap-6 items-start ${idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                  <div className="hidden md:block flex-1"></div>
                  <div className="flex-shrink-0 relative z-10">
                    <div className="w-12 h-12 bg-coral rounded-full flex items-center justify-center shadow-md">
                      <span className="text-white font-display font-bold">{item.step}</span>
                    </div>
                  </div>
                  <div className="flex-1 md:py-2">
                    <h3 className="font-display font-bold text-lg mb-1 text-blue-dark">{item.title}</h3>
                    <p className="text-gray-700">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Section>

        <CTABanner
          eyebrow="Contacto"
          title="¿Listo para construir tu software con nosotros?"
          subtitle="Cuéntanos tu objetivo y diseñamos un plan de desarrollo con hitos claros, calidad y entrega continua."
          buttonLabel="Solicita una reunión"
          buttonHref="/contacto"
        />

        <Footer />
      </div>
    )
  }

  if (isTransformacion) {
    return (
      <div className="min-h-screen flex flex-col">
        <SiteNavbar settings={siteSettings} />

        <Hero title={content.title} subtitle={content.intro} variant="services" />

        <SubservicesGrid intro={content.offeringsIntro} items={content.services} />

        <WhyChooseSection reasons={content.reasons} className="mt-12" />

        <Section title="Nuestro proceso" className="bg-gray-50" variant="light">
          <div className="relative">
            <div className="pointer-events-none hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-coral transform -translate-x-1/2"></div>
            <div className="pointer-events-none md:hidden absolute left-6 top-6 bottom-6 w-0.5 bg-coral"></div>
            <div className="space-y-12">
              {content.process.map((item: any, idx: number) => (
                <div key={item.title} className={`flex gap-6 items-start ${idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                  <div className="hidden md:block flex-1"></div>
                  <div className="flex-shrink-0 relative z-10">
                    <div className="w-12 h-12 bg-coral rounded-full flex items-center justify-center shadow-md">
                      <span className="text-white font-display font-bold">{item.step}</span>
                    </div>
                  </div>
                  <div className="flex-1 md:py-2">
                    <h3 className="font-display font-bold text-lg mb-1 text-blue-dark">{item.title}</h3>
                    <p className="text-gray-700">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Section>

        <CTABanner
          eyebrow="Contacto"
          title="¿Listo para lanzar o evolucionar tu canal digital?"
          subtitle="Conversemos tu caso y te compartimos un plan con próximos pasos, hitos y métricas accionables."
          buttonLabel="Solicita una reunión"
          buttonHref="/contacto"
        />

        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SiteNavbar settings={siteSettings} />

      <Hero title={content.title} subtitle={content.intro} backgroundImage={heroBackground} variant="services" />

      {/* Benefits Section */}
      {showBenefits && (
        <Section
          title="Beneficios principales"
          className={isAppian ? "bg-[linear-gradient(130deg,#10244e,#1f3d8f,#12a0c6)]" : "bg-white"}
          variant={isAppian ? "dark" : "light"}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {content.benefits.map((benefit: string, idx: number) => (
              <div key={idx} className="flex gap-3 items-start">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1 ${isAppian ? "bg-white/20" : "bg-coral"}`}>
                  <Check size={16} className={`${isAppian ? "text-white" : "text-white"}`} />
                </div>
                <p className={`${isAppian ? "text-white/90" : "text-gray-700"}`}>{benefit}</p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Services Offered */}
      <SubservicesGrid intro={content.offeringsIntro} items={content.services} />

      <WhyChooseSection reasons={content.reasons} className="mt-12" />

      {isTransformacion && (
        <>
          <Section title="¿Qué incluye el servicio?" className="bg-white" variant="light">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {content.includes.map((item: string, idx: number) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 shadow-sm"
                >
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mt-0.5">
                    <Check size={16} />
                  </div>
                  <p className="text-gray-800">{item}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section title="Qué ofrecemos" className="bg-gray-50" variant="light">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {content.offering.map((block: any, idx: number) => (
                <div key={idx} className="rounded-2xl bg-white border border-gray-200 p-4 shadow-sm">
                  <h4 className="font-display font-semibold text-blue-dark mb-2">{block.title}</h4>
                  <ul className="space-y-1 text-gray-700 text-sm">
                    {block.items.map((it: string) => (
                      <li key={it} className="flex gap-2">
                        <Check size={14} className="text-emerald-500 mt-1" />
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Section>

          <Section title="Áreas de especialización" className="bg-white" variant="light">
            <div className="flex flex-wrap gap-3">
              {content.specializations.map((item: string) => (
                <span
                  key={item}
                  className="px-4 py-2 rounded-full bg-gray-100 text-blue-dark font-semibold text-sm border border-gray-200"
                >
                  {item}
                </span>
              ))}
            </div>
          </Section>

          <Section title="Tecnologías que dominamos" className="bg-gray-50" variant="light">
            <div className="flex flex-wrap gap-3 justify-center">
              {content.technologies.map((tech: string) => (
                <span
                  key={tech}
                  className="px-4 py-2 rounded-full bg-white border border-gray-200 text-sm font-semibold text-blue-dark shadow-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </Section>

          <Section title="Capacidades técnicas" className="bg-white" variant="light">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {content.technical.map((block: any, idx: number) => (
                <div key={idx} className="rounded-2xl bg-gray-50 border border-gray-200 p-4 shadow-sm">
                  <h4 className="font-display font-semibold text-blue-dark mb-2">{block.title}</h4>
                  <ul className="space-y-1 text-gray-700 text-sm">
                    {block.items.map((it: string) => (
                      <li key={it} className="flex gap-2">
                        <Check size={14} className="text-emerald-500 mt-1" />
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Section>

          <Section title="Casos de uso típicos" className="bg-white" variant="light">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {content.useCases.map((item: any, idx: number) => (
                <div key={idx} className="rounded-2xl border border-gray-200 bg-gray-50 p-4 shadow-sm">
                  <h4 className="font-display font-semibold text-blue-dark mb-2">{item.title}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </Section>
        </>
      )}

      {isIAService && (
        <Section title="Partners IA" subtitle="Trabajamos con múltiples modelos y plataformas" className="bg-white" variant="light">
          {providerLogos.length > 0 ? (
            <div className="relative overflow-hidden h-14">
              <div className="flex items-center gap-6 animate-[marquee_18s_linear_infinite]" style={{ width: "max-content" }}>
                {[...providerLogos, ...providerLogos].map((logo, idx) => (
                  <div key={`${logo}-${idx}`} className="h-10 flex items-center justify-center">
                    <img src={toOptimizedAssetPath(logo)} alt={logo} className="h-8 w-auto object-contain" />
                  </div>
                ))}
              </div>
              <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-white to-transparent" />
              <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-white to-transparent" />
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {iaProvidersFallback.map((p) => (
                <span key={p} className="px-3 py-2 rounded-full border border-gray-200 bg-gray-50 text-sm text-gray-700">
                  {p}
                </span>
              ))}
            </div>
          )}
        </Section>
      )}

      {/* Process Timeline */}
      <Section
        title="Nuestro proceso"
        className={isAppian ? "bg-[linear-gradient(130deg,#10244e,#1f3d8f,#12a0c6)]" : "bg-white"}
        variant={isAppian ? "dark" : "light"}
      >
        <div className="relative">
          {/* Timeline line */}
          <div
            className={`hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 ${isAppian ? "bg-white/40" : "bg-coral"} transform -translate-x-1/2`}
          ></div>
          <div className={`pointer-events-none md:hidden absolute left-6 top-6 bottom-6 w-0.5 ${isAppian ? "bg-white/40" : "bg-coral"}`}></div>

          <div className="space-y-12">
            {content.process.map((item: any, idx: number) => (
              <div
                key={idx}
                className={`flex gap-6 items-start ${idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
              >
                <div className="hidden md:block flex-1"></div>
                <div className="flex-shrink-0 relative z-10">
                  <div className={`w-12 h-12 ${isAppian ? "bg-white/15" : "bg-coral"} rounded-full flex items-center justify-center`}>
                    <span className="text-white font-display font-bold">{item.step}</span>
                  </div>
                </div>
                <div className="flex-1 md:py-2">
                  <h3 className={`font-display font-bold text-lg mb-1 ${isAppian ? "text-white" : "text-blue-dark"}`}>{item.title}</h3>
                  <p className={`${isAppian ? "text-white/80" : "text-gray-600"}`}>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <CTABanner
        eyebrow="Contacto"
        title="¿Listo para implementar esta solución?"
        subtitle="Agendemos una sesión para revisar tu caso y activar un plan con entrega a producción."
        buttonLabel="Agenda una reunión"
        buttonHref="/contacto"
      />

      <Footer />
    </div>
  )
}
