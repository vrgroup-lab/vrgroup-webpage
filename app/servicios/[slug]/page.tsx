import { SiteNavbar } from "@/components/layout/site-navbar"
import { Footer } from "@/components/layout/footer"
import { Hero } from "@/components/ui/hero"
import { Section } from "@/components/ui/section"
import { OfferingsSection } from "@/components/ui/offerings-section"
import { CTABanner } from "@/components/ui/cta-banner"
import { getLogosFromFolder } from "@/lib/logos"
import { supabasePublic } from "@/lib/supabase/public"
import { getSiteSettings } from "@/lib/site-settings"
import Link from "next/link"
import {
  Check,
  ArrowRight,
  TrendingUp,
  Wrench,
  ArrowRightFromLine,
  Zap,
} from "lucide-react"

interface ServiceDetailPageProps {
  params: Promise<{
    slug: string
  }>
}

type PortfolioMedia = {
  url: string
  alt_text?: string | null
  is_primary?: boolean
  order_index?: number | null
  type?: string
}

type PortfolioProject = {
  id: string
  slug: string
  title: string
  client_display?: string | null
  summary?: string | null
  portfolio_media?: PortfolioMedia[]
}

async function getPortfolioProjects(serviceLineSlug: string): Promise<PortfolioProject[]> {
  if (!serviceLineSlug) return []
  const { data, error } = await supabasePublic
    .from("portfolio_projects")
    .select("id, slug, title, client_display, summary, portfolio_media(*), service_lines!inner(slug)")
    .eq("status", "public")
    .eq("service_lines.slug", serviceLineSlug)
    .order("display_order", { ascending: true })
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching portfolio projects", error.message)
    return []
  }
  return data ?? []
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
      <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-8 items-center">
          <div>
            <h4 className="font-display text-xl sm:text-2xl font-semibold text-white mb-4">¿Por qué elegir nuestro servicio?</h4>
            <div className="space-y-4 text-white/90">
              {reasons.map((paragraph) => (
                <p key={paragraph} className="text-sm leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 via-white/0 to-white/10 p-3 sm:p-4 shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
            <div className="aspect-[4/3] w-full rounded-xl border border-dashed border-white/20 bg-white/5 flex items-center justify-center">
              <span className="text-[11px] uppercase tracking-[0.3em] text-white/60">Imagen</span>
            </div>
          </div>
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

const serviceContent: Record<string, any> = {
  "experiencia-digital": {
    title: "Experiencia Digital.",
    intro: "Soluciones integrales web y mobile.",
    offeringsIntro:
      "Combinamos research, UX/UI, desarrollo web/mobile y performance digital para entregar canales que se lanzan rápido, se usan sin fricción y evolucionan con datos.",
    showcase: [
      {
        title: "UX/UI y Research",
        description: "Journeys, prototipos navegables y validación con usuarios para reducir riesgo y acelerar adopción.",
        tags: ["Research", "Wireframes", "Prototipos", "Testing"],
      },
      {
        title: "Diseño y Desarrollo Web",
        description: "Sitios públicos, portales privados e intranets rápidos, accesibles y listos para medir conversión.",
        tags: ["Next.js", "React", "SEO técnico", "Core Web Vitals"],
      },
      {
        title: "Diseño y Desarrollo Mobile",
        description: "Apps iOS/Android con React Native o Ionic, publicación en stores y monitoreo in-app.",
        tags: ["React Native", "Ionic", "UX mobile", "App Stores"],
      },
      {
        title: "Performance Digital & Analítica",
        description: "SEO, tagging, dashboards y experimentación continua para mejorar velocidad y conversión.",
        tags: ["GA4", "GTM", "SEO", "A/B testing"],
      },
    ],
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
    services: [
      {
        title: "Diseño UX/UI y experiencia",
        description: "Flujos, pantallas, contenido y research con usuarios para validar la propuesta digital.",
      },
      { title: "Desarrollo Web & Frontend", description: "Sitios públicos/privados, intranets, landings y ecommerce con React/Next.js." },
      { title: "Desarrollo Mobile", description: "Apps iOS/Android con React Native o Ionic; experiencia móvil y publicación en stores." },
      {
        title: "Evolución, Performance & Calidad",
        description: "Nuevas funcionalidades, optimización de velocidad, estabilidad, accesibilidad y SEO.",
      },
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
      { step: "01", title: "Discovery & Research", description: "Objetivos, usuarios y definición de experiencia" },
      { step: "02", title: "UX/UI & Prototipo", description: "Wireframes, prototipos y validación con usuarios" },
      { step: "03", title: "Build Web/Mobile", description: "Implementación frontend/mobile consumiendo APIs existentes" },
      { step: "04", title: "Lanzamiento & Medición", description: "Go-live con SEO, analítica y performance instrumentada" },
      { step: "05", title: "Evolución Continua", description: "Backlog, releases y optimización guiada por métricas" },
    ],
    reasons: [
      "Diseñamos canales digitales con foco en usuarios y objetivos de negocio, para maximizar adopción y conversión.",
      "Entregamos rápido con design systems, componentes reutilizables y un roadmap priorizado por impacto.",
      "Medimos performance, SEO y uso real para iterar con datos y mejorar resultados continuamente.",
    ],
  },
  "software-factory": {
    title: "Ingeniería de Software.",
    intro: "Soluciones integradas y a medida.",
    offeringsIntro: "Diseñamos, construimos y operamos backends, APIs e integraciones con estándares enterprise y entregas continuas.",
    services: [
      { title: "Arquitectura & Diseño de Solución", description: "Decisiones técnicas, seguridad, escalabilidad y costos." },
      { title: "Backends & APIs", description: "Lógica de negocio, microservicios cuando aplica y contratos claros." },
      { title: "Integración de Sistemas", description: "APIs, middleware, eventos y resiliencia ante fallas." },
      {
        title: "Infraestructura & Cloud",
        description: "Arquitectura cloud, seguridad, redes y observabilidad para ambientes críticos con alta disponibilidad.",
      },
      { title: "Modernización & Refactor", description: "Desacople, performance y reducción de deuda técnica." },
    ],
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
      { step: "01", title: "Discovery & Arquitectura", description: "Alcance, riesgos y decisiones técnicas clave" },
      { step: "02", title: "Diseño Técnico", description: "Modelos de datos, APIs y estándares de desarrollo" },
      { step: "03", title: "Build & QA", description: "Implementación con pruebas y quality gates" },
      { step: "04", title: "Integración & UAT", description: "Conexión a sistemas, validación y hardening" },
      { step: "05", title: "Operación & Mejora", description: "SLAs, observabilidad y optimización continua" },
    ],
    reasons: [
      "Definimos arquitectura y estándares desde el inicio para asegurar performance, seguridad y escalabilidad.",
      "Construimos APIs e integraciones con observabilidad y documentación clara para operar sin fricción.",
      "Operamos con CI/CD y QA continuo para reducir riesgos y acelerar releases.",
    ],
  },
  "automatizacion-de-procesos": {
    title: "Automatización digital.",
    intro: "Optimiza procesos, impulsa eficiencia.",
    offeringsIntro:
      "Appian es nuestro core. Equipo dedicado y certificado para discovery, diseño y delivery en la plataforma. Integramos RPA, Data Fabric y APIs para automatizar procesos end-to-end con gobierno y operación continua.",
    offeringsCards: [
      {
        title: "Core Appian.",
        description: "Equipo dedicado y certificado, con experiencia en casos complejos y entregas enterprise.",
      },
      {
        title: "Delivery low-code.",
        description: "Apps y procesos en semanas con componentes reutilizables y mejores prácticas Appian.",
      },
      {
        title: "Data Fabric & integraciones.",
        description: "Unificamos datos y conectamos sistemas con Appian Data Fabric, RPA y APIs.",
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
      { step: "01", title: "Discovery", description: "Assessment y selección de procesos" },
      { step: "02", title: "Diseño", description: "Arquitectura y blueprint de automatización" },
      { step: "03", title: "Build", description: "Configuración, desarrollo y QA" },
      { step: "04", title: "Hypercare", description: "Acompañamiento post go-live" },
      { step: "05", title: "Optimización", description: "Monitoreo y mejora continua" },
    ],
    reasons: [
      "Appian es nuestro core: contamos con un equipo dedicado y certificado que vive la plataforma día a día.",
      "Implementamos Appian con gobierno, CI/CD y estándares para escalar sin deuda técnica.",
      "Acompañamos el ciclo completo con mejora continua, soporte y roadmap de automatización.",
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
    services: [
      { title: "Modelos de Gestión y BPM", description: "Rediseño y optimización de procesos." },
      { title: "Risk & Compliance", description: "Matriz de riesgos, controles y monitoreo." },
      { title: "Auditoría y Control Interno", description: "Revisión de controles y SOX-ready." },
      { title: "PMO & Gobierno", description: "Oficina de proyectos y seguimiento integral." },
    ],
    process: [
      { step: "01", title: "Diagnóstico", description: "Assessment de madurez y brechas" },
      { step: "02", title: "Roadmap", description: "Plan de acción y quick wins" },
      { step: "03", title: "Implementación", description: "Ejecución y adopción en equipos" },
      { step: "04", title: "Control", description: "KPIs, riesgos y cumplimiento" },
      { step: "05", title: "Optimización", description: "Ciclos de mejora y auditoría" },
    ],
    reasons: [
      "Alineamos procesos y controles a la estrategia para mejorar la gestión y la toma de decisiones.",
      "Diseñamos matrices de riesgo y evidencia trazable para cumplimiento y auditoría.",
      "Implementamos KPIs y reporting ejecutivo para monitorear y corregir a tiempo.",
    ],
  },
  "ia-y-agentes": {
    title: "IA Aplicada a Procesos.",
    intro: "Agentes inteligentes para mayor eficiencia.",
    offeringsIntro:
      "Diseñamos agentes, copilots y workflows inteligentes conectados a datos empresariales con seguridad, evaluación continua y adopción guiada.",
    benefits: [
      "Agentes integrados a sistemas y datos empresariales",
      "Automatización cognitiva de tareas repetitivas",
      "Governance, seguridad y trazabilidad de prompts",
      "Mejora de experiencia para clientes y equipos",
    ],
    services: [
      { title: "Diseño de Agentes & Copilots", description: "Discovery, casos de uso y UX conversacional." },
      { title: "Chatbots Corporativos", description: "Bots multicanal con contexto de negocio." },
      { title: "Integración en Workflows", description: "Orquestación con procesos y sistemas core." },
      { title: "Evaluación y Monitoreo", description: "Guardrails, métricas y mejora de modelos." },
      { title: "Adopción & Training", description: "Capacitación y change management." },
    ],
    process: [
      { step: "01", title: "Discovery", description: "Identificación de casos y viabilidad" },
      { step: "02", title: "Prototipo", description: "MVP funcional y validación rápida" },
      { step: "03", title: "Integración", description: "Conexión a datos y sistemas" },
      { step: "04", title: "Validación", description: "Seguridad, compliance y guardrails" },
      { step: "05", title: "Escalado", description: "Despliegue y monitoreo continuo" },
    ],
    reasons: [
      "Aterrizamos casos de uso con datos reales e integración a sistemas críticos.",
      "Aplicamos guardrails, seguridad y métricas para un uso responsable y confiable.",
      "Integramos agentes en workflows para aumentar productividad y mejorar experiencia.",
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
      "Seleccionamos profesionales que se adaptan a tu cultura y objetivos, formando equipos cohesionados que impulsan la innovación y aceleran resultados.",
      "Acompañamos desde la definición de perfiles hasta la puesta en marcha, gestionando la evolución y resolución de obstáculos para que el talento siempre esté alineado con tus metas.",
      "Reducimos el tiempo de contratación y minimizamos riesgos, ofreciendo flexibilidad contractual y la posibilidad de escalar según la demanda de tu negocio.",
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

const serviceLineByServiceSlug: Record<string, string> = {
  "experiencia-digital": "experiencia-digital",
  "software-factory": "software-factory",
  "automatizacion-de-procesos": "automatizacion-de-procesos",
  "gestion-y-riesgo": "gestion-y-riesgo",
  "ia-y-agentes": "ia-y-agentes",
  "staffing-y-celulas": "staffing-y-celulas",
}

function PortfolioProjectsSection({
  projects,
  serviceLineSlug,
}: {
  projects: PortfolioProject[]
  serviceLineSlug: string
}) {
  if (!projects.length) return null

  return (
    <Section
      title="Proyectos en portafolio"
      subtitle="Casos reales en producción para esta línea de servicio."
      className="bg-white"
      variant="light"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.slice(0, 6).map((project) => {
          const primaryMedia =
            project.portfolio_media?.find((m) => m.is_primary) ??
            project.portfolio_media?.sort((a, b) => (a.order_index || 0) - (b.order_index || 0))[0]
          return (
            <Link
              key={project.id}
              href={`/portafolio/${project.slug}`}
              className="group rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all"
            >
              <div className="aspect-[4/3] bg-gray-100 relative">
                {primaryMedia?.url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={primaryMedia.url} alt={primaryMedia.alt_text || project.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-4xl">📌</div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="font-display text-lg font-semibold text-white drop-shadow">{project.title}</h3>
                  {project.client_display && <p className="text-white/85 text-xs">{project.client_display}</p>}
                </div>
              </div>
              <div className="p-4 border-t border-gray-200">
                <p className="text-sm text-gray-600 line-clamp-2">{project.summary}</p>
                <span className="mt-3 inline-flex items-center gap-2 text-coral font-semibold text-sm">
                  Ver proyecto <ArrowRight size={16} />
                </span>
              </div>
            </Link>
          )
        })}
      </div>
      <div className="text-center mt-8">
        <Link
          href={`/portafolio?servicio=${serviceLineSlug}`}
          className="inline-flex items-center gap-2 text-coral font-semibold hover:text-blue-dark transition-colors"
        >
          Ver todos los proyectos
          <ArrowRight size={16} />
        </Link>
      </div>
    </Section>
  )
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
  const heroBackground = isAppian ? undefined : undefined
  const providerLogos = isIAService ? getLogosFromFolder("ai-providers") : []
  const iaProvidersFallback = ["OpenAI", "Anthropic", "Google Gemini", "Azure OpenAI", "AWS Bedrock", "DeepSeek", "Cohere", "Meta Llama"]
  const siteSettings = await getSiteSettings()
  const serviceLineSlug = serviceLineByServiceSlug[normalizedSlug] ?? ""
  const portfolioProjects = siteSettings.showPortfolioInServices ? await getPortfolioProjects(serviceLineSlug) : []
  const portfolioSection = siteSettings.showPortfolioInServices ? (
    <PortfolioProjectsSection projects={portfolioProjects} serviceLineSlug={serviceLineSlug} />
  ) : null

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

  const offeringsEyebrow = content.offeringsEyebrow ?? content.heroEyebrow ?? "Propuesta de valor"

  if (isAppian) {
    const useCases = content.useCases ?? []

    return (
      <div className="min-h-screen flex flex-col">
        <SiteNavbar settings={siteSettings} />

        <Hero title={content.title} subtitle={content.intro} variant="services" />

        <OfferingsSection eyebrow={offeringsEyebrow} intro={content.offeringsIntro} items={content.offeringsCards ?? []} />

        <section className="bg-gradient-to-r from-[#0B1B33] via-[#12345a] to-[#0B1B33] text-white">
          <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-5 sm:px-8 sm:py-6 text-center shadow-[0_18px_55px_rgba(0,0,0,0.35)]">
              <p className="text-[11px] uppercase tracking-[0.3em] text-white/70 mb-2">Partner oficial</p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <span className="font-display text-2xl sm:text-3xl font-semibold text-white">Somos partners</span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/logos/partners/letter_appian.png" alt="Appian" className="h-9 sm:h-10 object-contain" />
                <span className="font-display text-2xl sm:text-3xl font-semibold text-white">, pioneros en Chile.</span>
              </div>
              <p className="mt-2 text-sm text-white/85">
                Lideramos implementaciones y equipos dedicados para acelerar la adopción de Appian en empresas de alto impacto.
              </p>
              <a
                href="https://appian.com/es"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold text-white/90 hover:text-coral transition-colors mt-3"
              >
                Conocer más sobre Appian
                <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </section>

        <Section className="bg-white" variant="light" paddingClass="py-8 sm:py-10 lg:py-12">
          <div className="max-w-4xl mx-auto mb-6 text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-2">BPMN</p>
            <h3 className="font-display text-lg sm:text-xl font-semibold text-[#0b1b33]">Automatización con modelos BPMN</h3>
            <details className="group mt-3 text-sm text-gray-600">
              <summary className="flex items-center justify-center gap-2 cursor-pointer list-none font-semibold text-coral">
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
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/appian/process-automation-animation.gif"
              alt="Automatización en acción"
              className="w-full h-full object-cover"
            />
          </div>
        </Section>

        <Section className="bg-white" variant="light" paddingClass="py-8 sm:py-10 lg:py-12">
          <div className="max-w-4xl mx-auto mb-6 text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-2">Data Fabric</p>
            <h3 className="font-display text-lg sm:text-xl font-semibold text-[#0b1b33]">Gobierno y unificación de datos</h3>
            <details className="group mt-3 text-sm text-gray-600">
              <summary className="flex items-center justify-center gap-2 cursor-pointer list-none font-semibold text-coral">
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
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/appian/data-fabric-animation.gif"
              alt="Appian Data Fabric en acción"
              className="w-full h-full object-cover"
            />
          </div>
        </Section>

        <WhyChooseSection reasons={content.reasons} highlights={content.benefits} className="mt-6" />

        <Section className="bg-white" variant="light" paddingClass="py-8 sm:py-10 lg:py-12">
          <div className="max-w-4xl mx-auto space-y-3">
            <h3 className="font-display text-lg font-semibold text-[#0b1b33]">De la detección al éxito</h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              Comenzamos con discovery para identificar procesos críticos y objetivos claros. Nos enfocamos en comprender tus desafíos y alinearlos con tus
              metas.
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              Diseñamos soluciones personalizadas integrando automatización, IA y optimización digital para un despliegue eficiente y sin fricciones.
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              Monitoreamos y mejoramos continuamente lo implementado para que el valor se multiplique y se mantenga en el tiempo.
            </p>
          </div>
        </Section>

        <Section
          title="¿Qué incluye el servicio?"
          subtitle="Desde discovery y laboratorio de automatización hasta operación y mejora continua."
          className="bg-gray-50"
          variant="light"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {content.services.map((service: any) => (
              <div key={service.title} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all">
                <h3 className="font-display font-semibold text-lg text-blue-dark mb-2">{service.title}</h3>
                <p className="text-gray-700 text-sm leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </Section>

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
            <div className="pointer-events-none hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-coral/60 transform -translate-x-1/2"></div>
            <div className="pointer-events-none md:hidden absolute left-6 top-6 bottom-6 w-px bg-coral/60"></div>
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

        {portfolioSection}

        <CTABanner
          eyebrow="Contacto"
          title="🤝 ¿Listo para implementar esta solución?"
          subtitle="Agendemos una sesión para revisar tu caso y activar un plan con entrega a producción."
          buttonLabel="Agenda una reunión"
          buttonHref="/contacto"
        />

        <Footer />
      </div>
    )
  }

  if (isStaffing) {
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

        <OfferingsSection eyebrow={offeringsEyebrow} intro={content.offeringsIntro} items={content.pillars} />

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

        {portfolioSection}

        <CTABanner
          eyebrow="Contacto"
          title="🤝 ¿Listo para armar tu célula ágil?"
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

        <OfferingsSection eyebrow={offeringsEyebrow} intro={content.offeringsIntro} items={content.services} />

        <Section
          title="Beneficios principales"
          className="bg-gray-50"
          variant="light"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {content.benefits.map((benefit: string) => (
              <div key={benefit} className="flex gap-3 items-start rounded-xl bg-white border border-gray-200 px-4 py-3 shadow-sm">
                <div className="w-8 h-8 rounded-full bg-[#FF5A5F]/10 text-[#FF5A5F] flex items-center justify-center mt-1">
                  <Check size={16} />
                </div>
                <p className="text-gray-700">{benefit}</p>
              </div>
            ))}
          </div>
        </Section>

        <WhyChooseSection reasons={content.reasons} className="mt-12" />

        <Section
          title="Qué incluye normalmente"
          className="bg-white"
          variant="light"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {content.includes.map((item: string) => (
              <div key={item} className="rounded-2xl bg-gray-50 border border-gray-200 p-4 shadow-sm flex gap-3 items-start">
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mt-0.5">
                  <Check size={16} />
                </div>
                <p className="text-gray-800 text-sm">{item}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Entregables típicos" className="bg-gray-50" variant="light">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {content.deliverables.map((item: string) => (
              <div key={item} className="rounded-2xl bg-white border border-gray-200 p-5 shadow-sm flex gap-3">
                <div className="w-8 h-8 rounded-full bg-[#0B1B33]/10 text-[#0B1B33] flex items-center justify-center mt-0.5">
                  <Check size={16} />
                </div>
                <p className="text-gray-800 text-sm leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Modalidades de trabajo" className="bg-white" variant="light">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {content.modalities.map((item: any) => (
              <div key={item.title} className="rounded-2xl border border-gray-200 bg-gradient-to-br from-white to-gray-50 p-5 shadow-sm">
                <h3 className="font-display font-semibold text-lg text-blue-dark mb-2">{item.title}</h3>
                <p className="text-gray-700 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section
          title="Casos y ejemplos"
          className="bg-gradient-to-br from-[#0B1B33] via-[#0D1933] to-[#0B1B33]"
          variant="dark"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {content.useCases.map((item: any) => (
              <div key={item.title} className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-lg backdrop-blur">
                <h4 className="font-display font-semibold text-lg text-white mb-2">{item.title}</h4>
                <p className="text-gray-200 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Nuestro proceso" className="bg-gray-50" variant="light">
          <div className="relative">
            <div className="pointer-events-none hidden md:block absolute left-1/2 top-6 bottom-6 w-px bg-coral/60 transform -translate-x-1/2"></div>
            <div className="pointer-events-none md:hidden absolute left-6 top-6 bottom-6 w-px bg-coral/60"></div>
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

        {portfolioSection}

        <Section className="bg-gradient-to-r from-coral to-blue-dark text-white">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-display font-bold text-3xl mb-4">¿Listo para escalar tu fábrica de software?</h2>
            <p className="text-lg mb-8 opacity-90">
              Conversemos tu roadmap y te proponemos un modelo Build | Run | Enable con hitos claros.
            </p>
            <Link
              href="/contacto"
              className="inline-flex px-8 py-3 bg-white text-coral rounded-lg font-display font-semibold hover:bg-gray-100 transition-colors items-center gap-2"
            >
              Solicita una reunión
              <ArrowRight size={20} />
            </Link>
          </div>
        </Section>

        <Footer />
      </div>
    )
  }

  if (isTransformacion) {
    const technologies = content.technologiesCards ?? content.technologies?.map((name: string) => ({ name }))
    const showcaseItems =
      content.showcase?.filter((item: any) => !item.title.toLowerCase().includes("células") && !item.title.toLowerCase().includes("staffing")) ??
      []

    return (
      <div className="min-h-screen flex flex-col">
        <SiteNavbar settings={siteSettings} />

        <Hero title={content.title} subtitle={content.intro} variant="services" />

        <OfferingsSection eyebrow={offeringsEyebrow} intro={content.offeringsIntro} items={showcaseItems} cardVariant="title-only" />

        <Section
          title="¿Qué incluye el servicio?"
          subtitle="Desde research y prototipos hasta lanzamiento medible y evolución continua del canal."
          className="bg-gray-50"
          variant="light"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {content.includesPillars.map((block: any) => (
              <div key={block.title} className="rounded-2xl bg-white border border-gray-200 p-5 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 rounded-xl bg-[#FF5A5F]/10 text-[#FF5A5F] flex items-center justify-center font-display font-semibold">
                    {block.title.slice(0, 2).toUpperCase()}
                  </div>
                  <h3 className="font-display font-semibold text-lg text-blue-dark">{block.title}</h3>
                </div>
                <ul className="space-y-2 text-sm text-gray-700">
                  {block.items.map((item: string) => (
                    <li key={item} className="flex gap-2">
                      <Check size={16} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Beneficios principales" className="bg-white" variant="light">
          <details className="group rounded-2xl border border-gray-200 bg-gray-50 p-5 shadow-sm">
            <summary className="flex items-center justify-between cursor-pointer list-none">
              <span className="font-display font-semibold text-blue-dark">Ver beneficios</span>
              <span className="text-sm text-coral group-open:rotate-90 transition-transform">→</span>
            </summary>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
              {content.benefits.map((benefit: string) => (
                <div
                  key={benefit}
                  className="flex gap-3 items-start rounded-xl bg-white border border-gray-200 px-4 py-3 shadow-sm"
                >
                  <div className="w-8 h-8 rounded-full bg-[#FF5A5F]/10 text-[#FF5A5F] flex items-center justify-center mt-1">
                    <Check size={16} />
                  </div>
                  <p className="text-gray-700">{benefit}</p>
                </div>
              ))}
            </div>
          </details>
        </Section>

        <WhyChooseSection reasons={content.reasons} className="mt-12" />

        <Section title="Áreas de especialización" className="bg-white" variant="light">
          <div className="flex flex-wrap gap-3 justify-center">
            {content.specializations.map((item: string) => (
              <span
                key={item}
                className="px-4 py-2 rounded-full bg-gray-100 text-blue-dark font-semibold text-sm border border-gray-200 shadow-sm"
              >
                {item}
              </span>
            ))}
          </div>
        </Section>

        <Section title="Tecnologías que dominamos" className="bg-gray-50" variant="light">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {technologies?.map((tech: any) => {
              const name = tech.name ?? tech
              const hint = tech.hint ?? ""
              const initials = name.slice(0, 2).toUpperCase()
              const logo = tech.logo as string | undefined
              return (
                <div key={name} className="rounded-2xl bg-white border border-gray-200 p-4 shadow-sm flex items-center gap-3">
                  {logo ? (
                    <div className="h-12 w-12 rounded-full border border-gray-200 bg-white flex items-center justify-center overflow-hidden">
                      <img src={logo} alt={name} className="h-9 w-9 object-contain" />
                    </div>
                  ) : (
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-[#0B1B33] to-[#FF5A5F] text-white flex items-center justify-center font-bold text-sm">
                      {initials}
                    </div>
                  )}
                  <div>
                    <p className="font-display font-semibold text-blue-dark leading-tight">{name}</p>
                    {hint && <p className="text-xs text-gray-500">{hint}</p>}
                  </div>
                </div>
              )
            })}
          </div>
        </Section>

        <Section
          title="Casos de uso típicos"
          subtitle="Ejemplos de cómo llevamos canal y experiencia a producción con métricas."
          className="bg-gradient-to-br from-[#0B1B33] via-[#0D1933] to-[#0B1B33]"
          variant="dark"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {content.useCases.map((item: any) => (
              <div key={item.title} className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-lg backdrop-blur">
                <h4 className="font-display font-semibold text-lg text-white mb-2">{item.title}</h4>
                <p className="text-gray-200 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/portafolio?servicio=transformacion-digital"
              className="inline-flex items-center gap-2 text-white font-semibold hover:text-coral transition-colors"
            >
              Ver casos del portafolio
              <ArrowRight size={16} />
            </Link>
          </div>
        </Section>

        <Section title="Nuestro proceso" className="bg-gray-50" variant="light">
          <div className="relative">
            <div className="pointer-events-none hidden md:block absolute left-1/2 top-6 bottom-6 w-px bg-coral/60 transform -translate-x-1/2"></div>
            <div className="pointer-events-none md:hidden absolute left-6 top-6 bottom-6 w-px bg-coral/60"></div>
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

        {portfolioSection}

        <Section className="relative overflow-hidden text-white bg-gradient-to-br from-[#0B1B33] via-[#10254d] to-[#FF5A5F]">
          <div className="absolute -left-16 -top-16 w-64 h-64 bg-white/10 blur-3xl rounded-full pointer-events-none"></div>
          <div className="absolute right-10 bottom-10 w-40 h-40 bg-coral/20 blur-3xl rounded-full pointer-events-none"></div>
          <div className="relative max-w-3xl mx-auto text-center space-y-5">
            <h2 className="font-display font-bold text-3xl sm:text-4xl leading-snug">
              ¿Listo para lanzar o evolucionar tu canal digital? 🚀
            </h2>
            <p className="text-lg sm:text-xl opacity-90">
              Conversemos tu caso y te compartimos un plan con próximos pasos, hitos y métricas accionables. 📈
            </p>
            <Link
              href="/contacto"
              className="inline-flex px-8 py-3 bg-white text-coral rounded-lg font-display font-semibold hover:bg-gray-100 transition-colors items-center gap-2 shadow-lg shadow-black/20"
            >
              Solicita una reunión
              <ArrowRight size={20} />
            </Link>
          </div>
        </Section>

        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SiteNavbar settings={siteSettings} />

      <Hero title={content.title} subtitle={content.intro} backgroundImage={heroBackground} variant="services" />

      {/* Benefits Section */}
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

      {/* Services Offered */}
      <OfferingsSection eyebrow={offeringsEyebrow} intro={content.offeringsIntro} items={content.services} />

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
            <div className="text-center mt-8">
              <Link
                href="/portafolio?servicio=transformacion-digital"
                className="inline-flex items-center gap-2 text-coral font-semibold hover:text-blue-dark transition-colors"
              >
                Ver casos del portafolio
                <ArrowRight size={16} />
              </Link>
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
                    <img src={logo} alt={logo} className="h-8 w-auto object-contain" />
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
            className={`hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 ${isAppian ? "bg-white/30" : "bg-coral"} transform -translate-x-1/2`}
          ></div>

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

      {portfolioSection}

      {/* CTA Section */}
      <CTABanner
        eyebrow="Contacto"
        title="🤝 ¿Listo para implementar esta solución?"
        subtitle="Agendemos una sesión para revisar tu caso y activar un plan con entrega a producción."
        buttonLabel="Agenda una reunión"
        buttonHref="/contacto"
      />

      <Footer />
    </div>
  )
}
