export type TeamMember = {
  slug: string
  name: string
  role: string
  degree?: string
  summary: string
  photo?: string
  linkedin?: string
}

export const teamMembers: TeamMember[] = [
  {
    slug: "victor-sagredo",
    name: "Víctor Sagredo G.",
    role: "CEO & Founder, VR Group",
    degree: "Ingeniero Forestal | MSc International Technology Management",
    summary:
      "Fundador y CEO de VR Group. Lidera visión estratégica y desarrollo de capacidades en innovación, transformación digital y BPM. Conecta discovery y rediseño de procesos con gobierno, adopción y mejora continua para lograr resultados medibles y ventajas competitivas sostenibles.",
    photo: "/images/team/victor_sagredo.png",
    linkedin: "https://cl.linkedin.com/company/vr-group-chile",
  },
  {
    slug: "ignacio-arriagada",
    name: "Ignacio Arriagada Q.",
    role: "Consulting Manager, VR Group",
    degree: "Ingeniero Civil Industrial",
    summary:
      "Consulting Manager y líder del equipo Appian. Arquitecto de soluciones y referente técnico, asegura diseño robusto, escalabilidad y gobernanza en low-code orientado a procesos. Traduce necesidades complejas en soluciones implementables, guiando decisiones de arquitectura, integración y delivery con foco en calidad y continuidad operativa.",
    photo: "/images/team/ignacio_arriagada.png",
    linkedin: "https://cl.linkedin.com/company/vr-group-chile",
  },
  {
    slug: "marco-bertolini",
    name: "Marco Bertolini V.",
    role: "Director de Proyectos Digitales, VR Group",
    degree: "Diseñador Gráfico (UX/UI)",
    summary:
      "Lidera proyectos digitales de punta a punta, coordinando equipos ágiles, tradicionales o híbridos. Amplia experiencia en retail, banca, telco y seguros, integrando visión de experiencia digital con gestión y relacionamiento para alinear diseño, tecnología y delivery con resultados consistentes.",
    photo: "/images/team/marco_bertolini.png",
    linkedin: "https://cl.linkedin.com/company/vr-group-chile",
  },
  {
    slug: "angel-barrueta",
    name: "Ángel Enrique Barroyeta Núñez",
    role: "Service Delivery Manager, VR Group",
    degree: "Contador Auditor | Máster en Business Analytics",
    summary:
      "Responsable de gestión de entrega y continuidad del servicio. Integra experiencia en auditoría y riesgos con capacidades de data/BI para habilitar mejora continua, seguimiento y reporting ejecutivo. Estructura gobierno de delivery y operación, conectando objetivos de negocio con métricas y resultados.",
    photo: "/images/team/angel_barroyeta.png",
    linkedin: "https://cl.linkedin.com/company/vr-group-chile",
  },
  {
    slug: "maximiliano-tombolini",
    name: "Maximiliano Marcello Tombolini Troncoso",
    role: "Technology Consultant, VR Group",
    degree: "Ingeniero Civil Industrial (en formación)",
    summary:
      "Consultor tecnológico con foco en implementación de soluciones digitales y automatización. Experiencia en Appian/low-code, CI/CD y despliegues auditables, apoyando discovery, modelamiento y orquestación de workflows. Participa en iniciativas de IA aplicada evaluando casos de uso, factibilidad e integración vía APIs/RAG/automatización asistida.",
    photo: "/images/team/maximiliano_tombolini.jpg",
    linkedin: "https://www.linkedin.com/in/mtombolini/",
  },
]
