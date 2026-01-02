import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Hero } from "@/components/ui/hero"
import { Section } from "@/components/ui/section"
import { InteractiveCardCarousel } from "@/components/ui/interactive-card-carousel"
import { getLogosFromFolder } from "@/lib/logos"
import Link from "next/link"
import { Check, ArrowRight } from "lucide-react"

interface ServiceDetailPageProps {
  params: Promise<{
    slug: string
  }>
}

const serviceContent: Record<string, any> = {
  "transformacion-digital-desarrollo": {
    title: "Experiencia Digital: UX/UI, Web & Mobile",
    intro:
      "Diseñamos y construimos canales y productos digitales (web y mobile) para que sean fáciles de usar, rápidos y medibles en su adopción.",
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
      {
        title: "Células ágiles & staffing digital",
        description: "Equipos multidisciplinarios que mantienen y evolucionan el canal con releases frecuentes.",
        tags: ["PO/UX/FE/QA", "Backlog", "Soporte evolutivo", "Sprints"],
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
      "Células ágiles y staffing",
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
  },
  "soluciones-ti-proyectos": {
    title: "Soluciones Tecnológicas & Proyectos TI",
    intro:
      "Desarrollo a medida, integración de sistemas, servicios gestionados, PMO y staffing TI para ejecutar proyectos tecnológicos con calidad y velocidad.",
    benefits: [
      "Integraciones sin fricción y APIs gobernadas",
      "PMO y gobierno para entregas on-time",
      "Soporte y servicios gestionados con SLAs",
      "Equipos extendidos listos para escalar",
    ],
    services: [
      { title: "Desarrollo a Medida", description: "Aplicaciones empresariales robustas." },
      { title: "Integraciones & APIs", description: "Conectividad segura con sistemas clave." },
      { title: "Cloud & DevOps", description: "Infraestructura y pipelines automatizados." },
      { title: "PMO & Control", description: "Gobernanza de proyectos y reporting ejecutivo." },
      { title: "Servicios Gestionados", description: "Operación continua y soporte especializado." },
    ],
    process: [
      { step: "01", title: "Descubrimiento", description: "Alcance, riesgos y roadmap" },
      { step: "02", title: "Arquitectura", description: "Diseño técnico y estándares" },
      { step: "03", title: "Implementación", description: "Build con control de calidad" },
      { step: "04", title: "Habilitación", description: "UAT, documentación y training" },
      { step: "05", title: "Operación", description: "Soporte, SLAs y optimización" },
    ],
  },
  "automatizacion-procesos": {
    title: "Automatización Digital de Procesos (ADP / Appian / RPA)",
    intro:
      "Discovery, roadmap, laboratorio de automatización, implementaciones Appian, RPA e iBPMS para automatizar end-to-end con enfoque low-code y gobierno claro.",
    benefits: [
      "Time-to-market acelerado con low-code",
      "Reducción de TAT y costos operativos",
      "Trazabilidad y cumplimiento integrado",
      "Orquestación de humanos y bots",
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
  },
  "gestion-operaciones-riesgo": {
    title: "Gestión, Operaciones, Riesgo & Cumplimiento",
    intro:
      "Modelos de gestión, mejora de procesos BPM, control de gestión, riesgos, cumplimiento normativo, auditoría y PMO para operar con eficiencia y control.",
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
  },
  "ia-agentes-inteligentes": {
    title: "IA Aplicada a Procesos & Agentes Inteligentes",
    intro:
      "Diseño e integración de agentes inteligentes y copilots conectados a sistemas core, con seguridad, guardrails y automatización cognitiva en workflows empresariales.",
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
  },
  "analitica-ml": {
    title: "Analítica Avanzada & Machine Learning Aplicado",
    intro:
      "Modelos predictivos, dashboards inteligentes, RAG corporativo, análisis avanzado y machine learning aplicado a problemas reales de negocio.",
    benefits: [
      "Decisiones basadas en datos y modelos",
      "Dashboards accionables con métricas clave",
      "Arquitecturas de datos modernas y seguras",
      "ML aplicado a casos de negocio reales",
    ],
    services: [
      { title: "Modelos Predictivos & Forecasting", description: "Demanda, churn, scoring y más." },
      { title: "RAG & Search Empresarial", description: "Recuperación aumentada para conocimiento interno." },
      { title: "Dashboards & Data Viz", description: "Insights accionables para equipos de negocio." },
      { title: "Data Pipelines & MLOps", description: "Gobierno, despliegue y monitoreo de modelos." },
      { title: "Use Cases por Industria", description: "Retail, finanzas, logística, servicios." },
    ],
    process: [
      { step: "01", title: "Data Discovery", description: "Calidad y disponibilidad de datos" },
      { step: "02", title: "Diseño de Casos", description: "Hipótesis, KPIs y viabilidad" },
      { step: "03", title: "Construcción", description: "Modelado, dashboards y APIs" },
      { step: "04", title: "Deploy", description: "Despliegue seguro y monitoreo" },
      { step: "05", title: "Mejora Continua", description: "Re-entrenos y optimización" },
    ],
  },
}

// Aliases para slugs antiguos que puedan seguir enlazados en la UI
const slugAliases: Record<string, string> = {
  appian: "automatizacion-procesos",
  ia: "ia-agentes-inteligentes",
  transformacion: "transformacion-digital-desarrollo",
  "soluciones-ti": "soluciones-ti-proyectos",
  "gestion-riesgo": "gestion-operaciones-riesgo",
}

export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const { slug } = await params
  const normalizedSlug = slugAliases[slug] || slug
  const content = serviceContent[normalizedSlug]
  const isAppian = normalizedSlug === "automatizacion-procesos"
  const isIAService = normalizedSlug === "ia-agentes-inteligentes"
  const isTransformacion = normalizedSlug === "transformacion-digital-desarrollo"
  const heroBackground = isAppian ? "/images/appian/process-automation-animation.gif" : undefined
  const providerLogos = isIAService ? getLogosFromFolder("ai-providers") : []
  const iaProvidersFallback = ["OpenAI", "Anthropic", "Google Gemini", "Azure OpenAI", "AWS Bedrock", "DeepSeek", "Cohere", "Meta Llama"]

  if (!content) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
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

  if (isTransformacion) {
    const technologies = content.technologiesCards ?? content.technologies?.map((name: string) => ({ name }))

    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />

        <Hero title={content.title} subtitle={content.intro} />

        <Section
          title="¿Qué ofrecemos?"
          subtitle={content.offeringsIntro}
          className="relative bg-gradient-to-br from-white via-[#f6f8fc] to-[#e8edfa] overflow-hidden"
          variant="light"
        >
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -left-32 -top-32 w-80 h-80 rounded-full bg-coral/10 blur-3xl"></div>
            <div className="absolute -right-24 -bottom-24 w-72 h-72 rounded-full bg-[#0B1B33]/10 blur-3xl"></div>
          </div>
          <div className="relative">
            <InteractiveCardCarousel items={content.showcase} accent="#FF5A5F" />
          </div>
        </Section>

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
      <Navbar />

      <Hero title={content.title} subtitle={content.intro} backgroundImage={heroBackground} />

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
      <Section
        title="¿Qué ofrecemos?"
        className={isAppian ? "bg-[#0e2049]" : "bg-gray-50"}
        variant={isAppian ? "dark" : "light"}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {content.services.map((service: any, idx: number) => (
            <div
              key={idx}
              className={`rounded-xl p-6 border ${isAppian ? "bg-white/5 border-white/15 text-white" : "bg-white border-gray-200"}`}
            >
              <h3 className="font-display font-bold text-lg mb-2">{service.title}</h3>
              <p className={`${isAppian ? "text-white/80" : "text-gray-600"}`}>{service.description}</p>
            </div>
          ))}
        </div>
      </Section>

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

      {/* CTA Section */}
      <Section className="bg-gradient-to-r from-coral to-blue-dark text-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-display font-bold text-3xl mb-4">¿Listo para implementar esta solución?</h2>
          <p className="text-lg mb-8 opacity-90">
            Contáctanos para una consulta gratuita y descubre cómo podemos ayudarte.
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
