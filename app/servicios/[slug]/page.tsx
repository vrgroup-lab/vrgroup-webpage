import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Hero } from "@/components/ui/hero"
import { Section } from "@/components/ui/section"
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
    title: "Transformación Digital & Desarrollo Tecnológico",
    intro:
      "Diseñamos y desarrollamos experiencias digitales web/mobile con equipos ágiles, UX/UI centrado en negocio y performance medible para escalar productos tecnológicos.",
    benefits: [
      "Time-to-market acelerado con células ágiles",
      "Arquitecturas escalables y preparadas para crecer",
      "Experiencias digitales que convierten y retienen",
      "Integraciones robustas que reducen fricción operativa",
      "Calidad y menor retrabajo con QA estructurado",
      "Hosting y operación eficientes en cloud",
      "Visibilidad con analítica y monitoreo continuo",
      "Soluciones alineadas a métricas reales de negocio",
    ],
    services: [
      { title: "Discovery & Roadmap", description: "Priorización y hoja de ruta de producto." },
      { title: "UX/UI de Producto", description: "Research, wireframes y prototipos validados." },
      { title: "Web & Mobile Delivery", description: "Front/back ágil con quality gates." },
      { title: "Performance & SEO", description: "Optimización continua para velocidad y conversión." },
    ],
    offering: [
      {
        title: "Diseño y Desarrollo Web",
        items: [
          "Sitios corporativos, públicos e intranets",
          "E-commerce y landings promocionales",
          "Portales privados y plataformas responsive",
          "WebApps escalables con Next.js / React",
        ],
      },
      {
        title: "Desarrollo Mobile & Multiplataforma",
        items: [
          "Apps iOS y Android con React Native",
          "Apps híbridas con Ionic",
          "Experiencia móvil y publicación en stores",
        ],
      },
      {
        title: "Progressive Web Apps (PWA)",
        items: ["Modo offline, push y experiencia nativa", "Instalable y de alto rendimiento", "Compatibilidad multiplataforma"],
      },
      {
        title: "Backend & Lógica de Negocio",
        items: [
          "Arquitectura escalable y modular",
          "Servicios REST y GraphQL",
          "Microservicios y manejo de datos SQL/NoSQL",
        ],
      },
      {
        title: "APIs e Integraciones",
        items: ["Diseño de APIs empresariales", "Gateways y servicios interoperables", "Integración con ERP, CRM, BPM, Appian, etc."],
      },
      {
        title: "UX/UI & Diseño de Producto",
        items: ["Research e insights", "Wireframes y prototipos", "Sistemas de diseño escalables"],
      },
      {
        title: "Performance Digital",
        items: ["SEO, analítica y Tag Manager", "Observabilidad y monitoreo", "Mejora de Core Web Vitals"],
      },
      {
        title: "Células Ágiles & Staffing TI",
        items: ["Equipos permanentes y multidisciplinares", "Staffing para roles TI", "Gestión end-to-end con PO, QA, UX"],
      },
    ],
    specializations: [
      "Experiencia Digital y Desarrollo de Proyectos",
      "Transformación Digital y estrategia",
      "Diseño y Desarrollo Mobile",
      "Diseño y Desarrollo Web",
      "Performance Digital (SEO/Analítica)",
      "Células y Staffing",
    ],
    technical: [
      {
        title: "Infraestructura & Cloud",
        items: ["AWS, Azure, GCP", "CI/CD y despliegues automatizados", "Contenedores y microservicios", "Observabilidad y gestión de ambientes"],
      },
      {
        title: "QA & Calidad de Software",
        items: ["QA manual y automatizado", "Pruebas funcionales, regresión y performance", "Pipelines de testing continuo", "Quality Gates"],
      },
      {
        title: "DevOps",
        items: ["Automatización de flujos de desarrollo", "Monitoreo, seguridad y versionamiento", "Despliegues confiables"],
      },
    ],
    includes: [
      "Análisis de requerimientos y arquitectura técnica",
      "UX/UI centrado en negocio y conversión",
      "Desarrollo web y mobile escalable",
      "Integración con APIs y sistemas core",
      "Cloud, DevOps y observabilidad",
      "QA, performance y seguridad continua",
    ],
    technologies: [
      "React/Next.js",
      "Node.js",
      "TypeScript",
      "Python",
      "Java Spring",
      "AWS/Azure",
      "Docker/Kubernetes",
      "GraphQL/REST",
      "CI/CD",
    ],
    useCases: [
      { title: "E-commerce y funnels", desc: "Sitios y checkout optimizados para conversión y performance." },
      { title: "Portales self-service", desc: "Experiencias para clientes y partners con integraciones core." },
      { title: "Apps móviles B2C/B2B", desc: "Aplicaciones seguras con analítica y eventos en tiempo real." },
      { title: "Backoffice digital", desc: "Operaciones, workflows y reporting para equipos internos." },
      { title: "Onboarding digital", desc: "Flujos de registro, KYC y activación con gobierno y métricas." },
      { title: "Data & dashboards", desc: "Visualizaciones ejecutivas y monitoreo de KPIs clave." },
    ],
    process: [
      { step: "01", title: "Discovery", description: "Entendimiento de negocio y definición de objetivos" },
      { step: "02", title: "Diseño", description: "UX/UI, arquitectura y backlog priorizado" },
      { step: "03", title: "Build", description: "Sprints con entregas incrementales" },
      { step: "04", title: "Lanzamiento", description: "Release seguro con monitoreo" },
      { step: "05", title: "Evolución", description: "Mejora continua guiada por datos" },
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
