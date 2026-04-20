import type { Metadata } from "next"
import { Mail, Phone, CalendarClock, MessageSquareText, FileCheck2, Rocket } from "lucide-react"
import { SiteNavbar } from "@/components/layout/site-navbar"
import { Footer } from "@/components/layout/footer"
import { ContactForm } from "@/components/contact/contact-form"
import { toOptimizedAssetPath } from "@/lib/assets"

// TODO: reemplazar por la URL real de Calendly cuando esté lista
const CALENDLY_URL = "https://calendly.com/vrgroup-chile/30min"
const CONTACT_EMAIL = "contacto@vrgroup.cl"
const CONTACT_PHONE = "+56 9 8950 6375"
const CONTACT_PHONE_TEL = "+56989506375"

export const metadata: Metadata = {
  title: "Contacto | VR Group — Hablemos de tu próximo proyecto",
  description:
    "Agenda una reunión o escríbenos directamente. Consultoría en transformación digital, automatización e IA aplicada. Respuesta en menos de 24h hábiles.",
  alternates: { canonical: "/contacto" },
  openGraph: {
    type: "website",
    locale: "es_CL",
    url: "https://vrgroup.cl/contacto",
    siteName: "VR Group",
    title: "Contacto | VR Group",
    description:
      "Hablemos de tu próximo proyecto en automatización, low-code o IA aplicada. Respuesta en <24h hábiles.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contacto | VR Group",
    description:
      "Hablemos de tu próximo proyecto en automatización, low-code o IA aplicada.",
  },
}

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://vrgroup.cl/#organization",
  name: "VR Group",
  url: "https://vrgroup.cl",
  logo: "https://vrgroup.cl" + toOptimizedAssetPath("/logos/brand/logo_vrgroup_cuadrado.png"),
  image: "https://vrgroup.cl" + toOptimizedAssetPath("/logos/brand/logo_vrgroup_cuadrado.png"),
  telephone: CONTACT_PHONE,
  email: CONTACT_EMAIL,
  priceRange: "$$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Av. Apoquindo 7331, oficina 420",
    addressLocality: "Las Condes",
    addressRegion: "Región Metropolitana",
    postalCode: "7550000",
    addressCountry: "CL",
  },
  areaServed: ["CL", "Latinoamérica"],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
  ],
  sameAs: ["https://cl.linkedin.com/company/vr-group-chile"],
}

const contactPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  url: "https://vrgroup.cl/contacto",
  name: "Contacto VR Group",
  description:
    "Página de contacto de VR Group: formulario, email, teléfono, mapa y agenda de reuniones.",
  inLanguage: "es-CL",
  mainEntity: {
    "@type": "Organization",
    name: "VR Group",
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: CONTACT_PHONE,
        email: CONTACT_EMAIL,
        contactType: "sales",
        areaServed: ["CL", "Latinoamérica"],
        availableLanguage: ["Spanish"],
      },
    ],
  },
}

const processSteps = [
  {
    icon: MessageSquareText,
    title: "Respondemos en <24h hábiles",
    desc: "Un ejecutivo senior revisa tu mensaje y te escribe para coordinar el siguiente paso.",
  },
  {
    icon: CalendarClock,
    title: "Call de 30 min",
    desc: "Entendemos tu contexto, objetivos y restricciones. Sin compromiso.",
  },
  {
    icon: FileCheck2,
    title: "Propuesta en 5 días hábiles",
    desc: "Alcance, equipo propuesto, plazos estimados e inversión clara.",
  },
  {
    icon: Rocket,
    title: "Kickoff y entrega iterativa",
    desc: "Squad dedicado operando con entregas continuas desde la semana 1.",
  },
]

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f5f7fb]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageJsonLd) }}
      />
      <SiteNavbar />

      <main className="flex-1">
        <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 pt-32 sm:pt-36 lg:pt-40 pb-14 lg:pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-start">
            {/* Lado izquierdo */}
            <div className="space-y-8">
              {/* Hero */}
              <div className="space-y-4">
                <p className="text-xs uppercase tracking-[0.25em] text-coral font-semibold">
                  Contacto
                </p>
                <h1 className="font-display font-bold text-4xl sm:text-5xl text-blue-dark leading-tight">
                  Hablemos de tu <span className="text-coral">próximo proyecto</span>.
                </h1>
                <p className="text-lg text-gray-700">
                  Consultoría en transformación digital, automatización e IA aplicada para
                  organizaciones que buscan resultados medibles.
                </p>
              </div>

              {/* Contactos directos destacados */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="group rounded-2xl border border-gray-200 bg-white p-4 sm:p-5 hover:border-coral hover:shadow-md transition-all flex items-center gap-4"
                >
                  <div className="h-11 w-11 rounded-xl bg-coral/10 text-coral flex items-center justify-center shrink-0 group-hover:bg-coral group-hover:text-white transition-colors">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">
                      Email
                    </p>
                    <p className="font-semibold text-blue-dark truncate">{CONTACT_EMAIL}</p>
                  </div>
                </a>
                <a
                  href={`tel:${CONTACT_PHONE_TEL}`}
                  className="group rounded-2xl border border-gray-200 bg-white p-4 sm:p-5 hover:border-coral hover:shadow-md transition-all flex items-center gap-4"
                >
                  <div className="h-11 w-11 rounded-xl bg-coral/10 text-coral flex items-center justify-center shrink-0 group-hover:bg-coral group-hover:text-white transition-colors">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">
                      WhatsApp
                    </p>
                    <p className="font-semibold text-blue-dark">{CONTACT_PHONE}</p>
                  </div>
                </a>
              </div>

              {/* Agendar directo (Calendly) */}
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block rounded-2xl border-2 border-coral/30 bg-gradient-to-br from-white to-coral/5 p-5 sm:p-6 hover:border-coral hover:shadow-lg transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-xl bg-coral text-white flex items-center justify-center shrink-0">
                    <CalendarClock className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs uppercase tracking-wider text-coral font-bold mb-1">
                      Opción rápida
                    </p>
                    <p className="font-display font-bold text-blue-dark text-lg sm:text-xl">
                      Agenda una reunión directa de 30 min
                    </p>
                    <p className="text-gray-600 text-sm mt-1">
                      Elige el horario que te acomode en nuestro calendario.
                    </p>
                  </div>
                  <span className="hidden sm:inline-flex items-center text-coral font-semibold text-sm group-hover:translate-x-0.5 transition-transform">
                    Agendar →
                  </span>
                </div>
              </a>

              {/* Qué pasa cuando escribes */}
              <div className="space-y-5">
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-coral font-semibold mb-2">
                    Proceso
                  </p>
                  <h2 className="font-display font-bold text-2xl text-blue-dark">
                    Qué pasa cuando escribes
                  </h2>
                </div>
                <ol className="space-y-4">
                  {processSteps.map((step, idx) => {
                    const Icon = step.icon
                    return (
                      <li key={step.title} className="flex items-start gap-4">
                        <div className="relative shrink-0">
                          <div className="h-10 w-10 rounded-full bg-blue-dark text-white flex items-center justify-center font-display font-bold text-sm">
                            {idx + 1}
                          </div>
                        </div>
                        <div className="flex-1 pt-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Icon className="h-4 w-4 text-coral" />
                            <p className="font-semibold text-blue-dark">{step.title}</p>
                          </div>
                          <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
                        </div>
                      </li>
                    )
                  })}
                </ol>
              </div>

              <div className="pt-2 text-sm text-gray-500">
                +150 proyectos en producción respaldan nuestra experiencia.
              </div>
            </div>

            <ContactForm />
          </div>
        </div>

        <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="border-t border-gray-200 pt-10">
            <div className="text-center mb-6">
              <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-2">Ubicación</p>
              <h2 className="font-display text-2xl sm:text-3xl font-semibold text-blue-dark">
                Visítanos en Santiago
              </h2>
              <p className="text-sm text-gray-600 mt-2">
                Av. Apoquindo 7331, oficina 420, Las Condes
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
              <iframe
                title="Mapa VR Group"
                src="https://www.google.com/maps?q=Av.+Apoquindo+7331,+Las+Condes,+Chile&output=embed"
                className="w-full h-[320px] sm:h-[400px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
