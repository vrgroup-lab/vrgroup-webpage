import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Hero } from "@/components/ui/hero"
import { Section } from "@/components/ui/section"
import Link from "next/link"
import { Check, ArrowRight } from "lucide-react"

interface ServiceDetailPageProps {
  params: {
    slug: string
  }
}

const serviceContent: Record<string, any> = {
  appian: {
    title: "Automatización Digital de Procesos con Appian",
    intro:
      "Combinamos negocio, low-code e integración para transformar operaciones con velocidad y control. Somos expertos en la implementación de soluciones Appian que generan valor inmediato.",
    benefits: [
      "Automatización de procesos complejos en semanas",
      "Reducción de costos operativos hasta 40%",
      "Mayor velocidad en la toma de decisiones",
      "Escalabilidad sin límites tecnológicos",
    ],
    services: [
      {
        title: "Estrategia de Automatización",
        description: "Identificamos oportunidades de automatización alineadas con tus objetivos.",
      },
      {
        title: "Implementación iBPMS/RPA",
        description: "Desarrollamos soluciones robustas usando las mejores prácticas de Appian.",
      },
      { title: "Integraciones", description: "Conectamos Appian con tus sistemas existentes sin disrupciones." },
      { title: "Servicios Gestionados", description: "Mantenemos y optimizamos tus soluciones de forma continua." },
    ],
    process: [
      { step: "01", title: "Discovery", description: "Análisis profundo de procesos y oportunidades" },
      { step: "02", title: "Diseño", description: "Arquitectura de solución personalizada" },
      { step: "03", title: "Desarrollo", description: "Implementación ágil con entregas incrementales" },
      { step: "04", title: "Capacitación", description: "Training para tu equipo" },
      { step: "05", title: "Soporte", description: "Acompañamiento post-implementación" },
    ],
  },
  ia: {
    title: "Inteligencia Artificial Aplicada",
    intro:
      "Implementamos soluciones de IA para optimizar operaciones y potenciar la toma de decisiones. Desde copilots inteligentes hasta análisis predictivo.",
    benefits: [
      "Automatización de tareas repetitivas",
      "Análisis predictivo y preventivo",
      "Mejora en experiencia de cliente",
      "Decisiones basadas en datos",
    ],
    services: [
      { title: "Copilots IA", description: "Asistentes inteligentes para tus equipos" },
      { title: "Análisis Predictivo", description: "Predicciones precisas basadas en datos históricos" },
      { title: "Automatización Inteligente", description: "Procesos que aprenden y mejoran con el tiempo" },
      { title: "Training & Adopción", description: "Capacitación para máximo aprovechamiento" },
    ],
    process: [
      { step: "01", title: "Evaluación", description: "Análisis de aplicabilidad de IA en tu negocio" },
      { step: "02", title: "Prueba de Concepto", description: "Demostración del valor potencial" },
      { step: "03", title: "Implementación", description: "Despliegue de solución en producción" },
      { step: "04", title: "Optimización", description: "Mejora continua del modelo" },
      { step: "05", title: "Escalado", description: "Expansión a otras áreas del negocio" },
    ],
  },
  transformacion: {
    title: "Transformación Digital & Experiencia Digital",
    intro:
      "Diseñamos y ejecutamos estrategias integrales que transforman digitalmente tu organización mejorando la experiencia de clientes y colaboradores.",
    benefits: [
      "Transformación cultural y digital",
      "Mejora en experiencia de cliente",
      "Eficiencia operacional",
      "Competitividad en mercado digital",
    ],
    services: [
      { title: "Estrategia Digital", description: "Plan integral de transformación digital" },
      { title: "Diseño UX/UI", description: "Experiencias digitales de clase mundial" },
      { title: "Implementación", description: "Ejecución ágil de proyectos" },
      { title: "Change Management", description: "Gestión del cambio organizacional" },
    ],
    process: [
      { step: "01", title: "Diagnóstico", description: "Evaluación del estado actual digital" },
      { step: "02", title: "Estrategia", description: "Definición de roadmap de transformación" },
      { step: "03", title: "Diseño", description: "Creación de nuevas experiencias" },
      { step: "04", title: "Construcción", description: "Desarrollo de soluciones digitales" },
      { step: "05", title: "Transformación", description: "Implementación y adopción" },
    ],
  },
  "soluciones-ti": {
    title: "Soluciones Tecnológicas & Proyectos TI",
    intro:
      "Desarrollamos soluciones tecnológicas personalizadas que se alinean con tus objetivos de negocio y escalables con tu crecimiento.",
    benefits: [
      "Soluciones personalizadas",
      "Arquitectura moderna y escalable",
      "Ciclos de desarrollo rápidos",
      "Soporte y mantenimiento continuo",
    ],
    services: [
      { title: "Desarrollo de Software", description: "Aplicaciones custom de alto rendimiento" },
      { title: "Integración de Sistemas", description: "Conexión de aplicaciones empresariales" },
      { title: "Cloud & DevOps", description: "Infraestructura moderna en la nube" },
      { title: "Consultoría Técnica", description: "Asesoramiento en arquitectura y tecnología" },
    ],
    process: [
      { step: "01", title: "Análisis", description: "Requerimientos y especificaciones técnicas" },
      { step: "02", title: "Arquitectura", description: "Diseño de solución técnica" },
      { step: "03", title: "Desarrollo", description: "Construcción iterativa" },
      { step: "04", title: "Testing", description: "Garantía de calidad" },
      { step: "05", title: "Deployment", description: "Puesta en producción" },
    ],
  },
  "gestion-riesgo": {
    title: "Gestión, Operaciones, Riesgo y Cumplimiento",
    intro:
      "Fortalecemos la gestión operativa de tu organización y garantizamos el cumplimiento de normativas regulatorias.",
    benefits: [
      "Control integral de operaciones",
      "Cumplimiento normativo garantizado",
      "Gestión proactiva de riesgos",
      "Optimización de procesos",
    ],
    services: [
      { title: "Auditoría y Control", description: "Evaluación de controles internos" },
      { title: "Gestión de Riesgos", description: "Identificación y mitigación de riesgos" },
      { title: "Cumplimiento Normativo", description: "Adaptación a regulaciones" },
      { title: "Optimización Operacional", description: "Mejora de procesos y eficiencia" },
    ],
    process: [
      { step: "01", title: "Diagnóstico", description: "Evaluación del estado actual" },
      { step: "02", title: "Diseño", description: "Plan de mejora integral" },
      { step: "03", title: "Implementación", description: "Ejecución de cambios" },
      { step: "04", title: "Monitoreo", description: "Seguimiento y control" },
      { step: "05", title: "Mejora Continua", description: "Optimización permanente" },
    ],
  },
}

export default function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const content = serviceContent[params.slug]

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
