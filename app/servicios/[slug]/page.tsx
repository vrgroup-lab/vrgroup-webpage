import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Hero } from "@/components/ui/hero"
import { Section } from "@/components/ui/section"
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
      "Experiencias digitales orientadas a conversión",
      "Células ágiles con entregas continuas",
      "Arquitecturas escalables y observables",
      "UX/UI con foco en resultados de negocio",
    ],
    services: [
      { title: "Discovery & Roadmap Digital", description: "Priorización y hoja de ruta de producto." },
      { title: "UX/UI y Diseño de Producto", description: "Research, wireframes y prototipos de alto nivel." },
      { title: "Desarrollo Web & Mobile", description: "Entrega ágil de front/back con quality gates." },
      { title: "Performance & SEO", description: "Optimización continua para velocidad y conversión." },
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

      <Hero title={content.title} subtitle={content.intro} />

      {/* Benefits Section */}
      <Section title="Beneficios principales" className="bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {content.benefits.map((benefit: string, idx: number) => (
            <div key={idx} className="flex gap-3 items-start">
              <div className="w-6 h-6 bg-coral rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <Check size={16} className="text-white" />
              </div>
              <p className="text-gray-700">{benefit}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Services Offered */}
      <Section title="¿Qué ofrecemos?" className="bg-gray-50">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {content.services.map((service: any, idx: number) => (
            <div key={idx} className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="font-display font-bold text-lg mb-2 text-blue-dark">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Process Timeline */}
      <Section title="Nuestro proceso" className="bg-white">
        <div className="relative">
          {/* Timeline line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-coral transform -translate-x-1/2"></div>

          <div className="space-y-12">
            {content.process.map((item: any, idx: number) => (
              <div
                key={idx}
                className={`flex gap-6 items-start ${idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
              >
                <div className="hidden md:block flex-1"></div>
                <div className="flex-shrink-0 relative z-10">
                  <div className="w-12 h-12 bg-coral rounded-full flex items-center justify-center">
                    <span className="text-white font-display font-bold">{item.step}</span>
                  </div>
                </div>
                <div className="flex-1 md:py-2">
                  <h3 className="font-display font-bold text-lg mb-1 text-blue-dark">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
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
