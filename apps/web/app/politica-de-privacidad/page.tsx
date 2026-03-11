import { LegalPage } from "@/components/legal/legal-page"

const sections = [
  {
    title: "1. Responsable del tratamiento",
    paragraphs: [
      "VR Group actúa como responsable del tratamiento de los datos personales recabados a través de este sitio público, en particular mediante formularios de contacto, correos electrónicos, canales de mensajería y navegación web.",
      "El tratamiento se realiza con base en la legislación chilena vigente sobre protección de la vida privada, con un enfoque complementario de buenas prácticas inspiradas en estándares internacionales de privacidad, minimización, seguridad y transparencia.",
    ],
  },
  {
    title: "2. Qué datos recopilamos",
    items: [
      "Datos de identificación y contacto que la persona entregue voluntariamente, como nombre, empresa, correo electrónico, teléfono, industria y mensaje.",
      "Datos técnicos básicos derivados de la navegación, tales como dirección IP, navegador, dispositivo, fecha, hora y páginas visitadas, cuando ello resulte necesario para seguridad, operación o medición del sitio.",
      "Datos asociados a interacciones con servicios de terceros integrados desde el sitio, por ejemplo mapas, mensajería o redes sociales, sujetos además a las políticas de esos terceros.",
    ],
  },
  {
    title: "3. Finalidades del tratamiento",
    items: [
      "Responder consultas comerciales, solicitudes de contacto o requerimientos enviados por formularios o canales directos.",
      "Evaluar oportunidades comerciales, coordinar reuniones y hacer seguimiento a conversaciones iniciadas por el usuario.",
      "Mantener seguridad, trazabilidad técnica, continuidad operativa y prevención de abusos o uso indebido del sitio.",
      "Analizar de manera agregada el uso del sitio para mejorar contenidos, experiencia, rendimiento y canales de contacto, cuando ello aplique.",
    ],
  },
  {
    title: "4. Base de tratamiento y principios aplicados",
    paragraphs: [
      "Tratamos datos personales principalmente sobre la base de la entrega voluntaria realizada por la persona usuaria, la necesidad de responder solicitudes iniciadas por ella, el cumplimiento de obligaciones legales que resulten aplicables y el interés legítimo de operar un sitio corporativo de forma segura y funcional.",
      "Aplicamos criterios de finalidad específica, proporcionalidad, minimización, acceso restringido, conservación limitada y medidas razonables de seguridad, siguiendo principios presentes en la Ley N° 19.628 chilena y marcos internacionales como el Reglamento General de Protección de Datos de la Unión Europea en lo que sirven de referencia operativa.",
    ],
  },
  {
    title: "5. Cesión, almacenamiento y transferencias",
    paragraphs: [
      "VR Group no vende datos personales. Puede compartir información con proveedores que actúan como encargados de tratamiento para soportar formularios, hosting, correo, analítica, mensajería u otras funciones técnicas razonables para la operación del sitio.",
      "Cuando existan transferencias o alojamientos fuera de Chile, procuraremos que dichos proveedores mantengan medidas de seguridad y estándares contractuales adecuados para la naturaleza de los datos tratados.",
    ],
  },
  {
    title: "6. Derechos de las personas",
    items: [
      "Solicitar acceso a los datos personales que hayamos recibido a través del sitio.",
      "Pedir rectificación o actualización si la información es inexacta o incompleta.",
      "Solicitar eliminación cuando corresponda legal o contractualmente.",
      "Solicitar información sobre la finalidad del tratamiento y los canales de contacto disponibles.",
    ],
  },
  {
    title: "7. Conservación y seguridad",
    paragraphs: [
      "Conservamos la información solo durante el tiempo necesario para cumplir la finalidad para la que fue recopilada, atender relaciones comerciales legítimas, resguardar seguridad operativa o cumplir exigencias legales.",
      "Implementamos medidas técnicas y organizativas razonables para reducir riesgos de acceso no autorizado, pérdida, alteración o divulgación indebida, sin que ello implique garantizar seguridad absoluta frente a cualquier contingencia.",
    ],
  },
]

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      eyebrow="Privacidad"
      title="Política de privacidad"
      summary="Cómo recopila, utiliza y protege VR Group los datos personales obtenidos mediante su sitio público, con foco en transparencia, minimización y uso responsable de la información."
      sections={sections}
    />
  )
}
