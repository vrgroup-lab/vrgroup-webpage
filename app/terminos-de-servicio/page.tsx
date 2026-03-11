import { LegalPage } from "@/components/legal/legal-page"

const sections = [
  {
    title: "1. Objeto del sitio",
    paragraphs: [
      "Este sitio web tiene carácter informativo y comercial. Su objetivo es presentar los servicios, capacidades, experiencia, casos de uso y canales de contacto de VR Group.",
      "La navegación por el sitio y el envío de formularios no constituyen por sí solos una contratación de servicios, una oferta vinculante ni una relación laboral. Cualquier contratación o acuerdo posterior se formaliza mediante instrumentos específicos.",
    ],
  },
  {
    title: "2. Uso permitido",
    items: [
      "Utilizar el sitio de forma lícita, sin afectar su disponibilidad, seguridad o integridad.",
      "No intentar acceder sin autorización a sistemas, cuentas, integraciones o contenidos restringidos.",
      "No utilizar formularios, correos o enlaces del sitio para spam, fraude, suplantación o recolección automatizada de datos.",
      "No reproducir, copiar o reutilizar contenidos del sitio con fines comerciales sin autorización previa y por escrito.",
    ],
  },
  {
    title: "3. Propiedad intelectual",
    paragraphs: [
      "Los textos, marcas, logos, diseños, piezas gráficas, fotografías, videos, estructura del sitio y demás contenidos son propiedad de VR Group o de sus respectivos titulares y se encuentran protegidos por la normativa aplicable de propiedad intelectual e industrial.",
      "El uso permitido del sitio no transfiere derechos de propiedad ni autoriza explotación comercial, modificación, distribución masiva o reutilización pública de sus contenidos fuera del marco legal aplicable.",
    ],
  },
  {
    title: "4. Información comercial y limitación de responsabilidad",
    paragraphs: [
      "VR Group procura que la información publicada sea clara, actualizada y útil, pero no garantiza que esté libre de omisiones, errores involuntarios o desactualizaciones puntuales. Las referencias a resultados, tiempos, industrias o capacidades deben entenderse como información general y no como promesas universales aplicables a cualquier caso.",
      "En la medida permitida por la normativa aplicable, VR Group no será responsable por daños derivados del uso del sitio, interrupciones temporales, indisponibilidad de terceros, enlaces externos o decisiones adoptadas exclusivamente en base a información pública contenida en este sitio.",
    ],
  },
  {
    title: "5. Enlaces y servicios de terceros",
    paragraphs: [
      "El sitio puede contener enlaces a plataformas o servicios de terceros, incluyendo mapas, mensajería, redes sociales u otros sitios corporativos. Cada tercero opera bajo sus propias condiciones de uso y políticas de privacidad.",
      "VR Group no controla ni asume responsabilidad por el contenido, disponibilidad, seguridad o tratamiento de datos realizado por dichos terceros fuera de este sitio.",
    ],
  },
  {
    title: "6. Legislación aplicable y enfoque regional",
    paragraphs: [
      "Estos términos se interpretan de conformidad con la legislación chilena aplicable al uso de sitios web, protección del consumidor en lo que corresponda y normativa general de responsabilidad civil y propiedad intelectual.",
      "Adicionalmente, VR Group procura alinear sus prácticas de transparencia, información al usuario, privacidad y uso de cookies con estándares ampliamente reconocidos en Latinoamérica y marcos internacionales de referencia, incluyendo principios presentes en regulaciones como el RGPD europeo cuando resultan razonables para un sitio corporativo informativo.",
    ],
  },
  {
    title: "7. Modificaciones",
    paragraphs: [
      "VR Group puede actualizar estos términos para reflejar cambios legales, operativos o funcionales del sitio. La versión vigente será la publicada en esta página con su fecha de actualización correspondiente.",
    ],
  },
]

export default function TermsOfServicePage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Términos de servicio"
      summary="Condiciones generales de uso del sitio público de VR Group, redactadas como base informativa para Chile y alineadas con estándares regionales e internacionales de transparencia y uso responsable."
      sections={sections}
    />
  )
}
