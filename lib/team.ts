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
    role: "Co Fundador — Socio Transformación Digital y Tecnología",
    degree: "Ingeniero, Transformación Digital y Tecnología",
    summary:
      "15+ años liderando innovación y transformación digital en organizaciones públicas y privadas. Combina visión estratégica y ejecución disciplinada.",
    photo: "/images/team/victor_sagredo.png",
    linkedin: "https://cl.linkedin.com/company/vr-group-chile",
  },
  {
    slug: "ignacio-arriagada",
    name: "Ignacio Arriagada Q.",
    role: "Manager — Automatización Digital de Procesos",
    degree: "Ingeniería Civil Industrial, Automatización y Operaciones",
    summary:
      "12+ años en automatización, operaciones, riesgo y cumplimiento. Especialista en iBPMS, RPA y Appian con foco en escalabilidad y trazabilidad.",
    photo: "/images/team/ignacio_arriagada.png",
    linkedin: "https://cl.linkedin.com/company/vr-group-chile",
  },
  {
    slug: "marco-bertolini",
    name: "Marco Bertolini V.",
    role: "Consultor Senior — Proyectos Digitales",
    degree: "Diseño y dirección de proyectos digitales",
    summary:
      "15+ años diseñando y dirigiendo proyectos digitales en retail, banca, telco, seguros, salud y sector público. Aporta visión UX/UI y excelencia operativa.",
    photo: "/images/team/marco_bertolini.png",
    linkedin: "https://cl.linkedin.com/company/vr-group-chile",
  },
  {
    slug: "angel-barrueta",
    name: "Ángel Barrueta",
    role: "Senior Consultant — Tecnología & Ingeniería",
    degree: "Arquitectura de software y liderazgo técnico",
    summary:
      "Experto en desarrollo de software, arquitectura y liderazgo técnico. Ha diseñado plataformas web/mobile y productos escalables con foco en negocio.",
    photo: "/images/team/angel_barroyeta.png",
    linkedin: "https://cl.linkedin.com/company/vr-group-chile",
  },
  {
    slug: "maximiliano-tombolini",
    name: "Maximiliano Tombolini",
    role: "Consultor — Transformación Digital & Ingeniería de Software",
    degree: "Ingeniero de Software, Integración y CI/CD",
    summary:
      "Enfocado en integración, CI/CD, analítica aplicada y plataformas low-code. Lidera equipos digitales con rigor técnico y estructura.",
    photo: "/images/team/maximiliano_tombolini.jpg",
    linkedin: "https://www.linkedin.com/in/mtombolini/",
  },
]
