import { LegalPage } from "@/components/legal/legal-page"

const sections = [
  {
    title: "1. Qué son las cookies",
    paragraphs: [
      "Las cookies son pequeños archivos que un sitio o servicio relacionado puede almacenar en el navegador para recordar información técnica o funcional sobre una visita. También pueden existir tecnologías similares, como almacenamiento local, identificadores de sesión o etiquetas de terceros.",
    ],
  },
  {
    title: "2. Qué tipos de cookies puede utilizar este sitio",
    items: [
      "Cookies estrictamente necesarias para el funcionamiento técnico, seguridad, navegación y prestación básica del sitio.",
      "Cookies funcionales orientadas a recordar preferencias o mejorar experiencia, si se habilitan en el futuro.",
      "Cookies de terceros asociadas a servicios embebidos o enlazados, como mapas, mensajería, redes sociales o herramientas de medición, cuando correspondan.",
      "Cookies analíticas o de rendimiento, solo en caso de que sean implementadas y comunicadas de forma consistente con la experiencia del sitio y la normativa aplicable.",
    ],
  },
  {
    title: "3. Uso actual y terceros",
    paragraphs: [
      "El sitio público de VR Group prioriza un uso acotado de tecnologías de seguimiento. Sin perjuicio de ello, ciertas integraciones de terceros, como mapas, enlaces de WhatsApp, LinkedIn u otros servicios externos, pueden establecer sus propias cookies o mecanismos equivalentes al interactuar con dichos servicios.",
      "VR Group no controla las políticas de cookies de esos terceros y recomienda revisar directamente sus condiciones de privacidad cuando se utilicen dichos servicios.",
    ],
  },
  {
    title: "4. Gestión por parte del usuario",
    items: [
      "Configurar el navegador para bloquear, permitir o eliminar cookies de forma total o parcial.",
      "Borrar cookies ya almacenadas desde el navegador o dispositivo.",
      "Evitar el uso de ciertos servicios embebidos o de terceros si no se desea su interacción con el navegador.",
    ],
  },
  {
    title: "5. Criterio regulatorio aplicado",
    paragraphs: [
      "Esta política se redacta considerando criterios de transparencia y control del usuario presentes en la legislación chilena sobre protección de datos personales, buenas prácticas latinoamericanas de información al usuario y estándares internacionales como el RGPD europeo y la normativa europea sobre confidencialidad en las comunicaciones electrónicas, en cuanto sirven como referencia para sitios corporativos.",
      "Si en el futuro el sitio incorpora herramientas de analítica, publicidad comportamental o preferencias avanzadas, esta política y los mecanismos de información/gestión correspondientes deberán actualizarse antes de su activación productiva.",
    ],
  },
]

export default function CookiesPolicyPage() {
  return (
    <LegalPage
      eyebrow="Cookies"
      title="Política de cookies"
      summary="Información general sobre el uso de cookies y tecnologías similares en el sitio público de VR Group, incluyendo integraciones de terceros y controles disponibles para las personas usuarias."
      sections={sections}
    />
  )
}
