import { SiteNavbar } from "@/components/layout/site-navbar"
import { Footer } from "@/components/layout/footer"
import { ContactForm } from "@/components/contact/contact-form"

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f5f7fb]">
      <SiteNavbar />

      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 sm:pt-36 lg:pt-40 pb-14 lg:pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-start">
            {/* Lado izquierdo: propuesta */}
            <div className="space-y-6">
              <div className="space-y-3">
                <h1 className="font-display font-bold text-4xl sm:text-5xl text-blue-dark leading-tight">
                  Conversa con un experto en soluciones digitales.
                </h1>
                <p className="text-xl text-gray-700">Te ayudamos a:</p>
              </div>
              <ul className="space-y-3 text-lg text-gray-700">
                {[
                  "Discovery y diseño de soluciones tecnológicas alineadas a negocio.",
                  "Implementación ágil y software factory con QA y CI/CD.",
                  "Integración de sistemas, datos e IA con gobierno y trazabilidad.",
                  "Equipos senior para delivery, soporte y evolución continua.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="text-blue-dark mt-1.5">✔</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="text-sm text-gray-600">
                +150 proyectos en producción respaldan nuestra experiencia.
              </div>
            </div>

            <ContactForm />
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="border-t border-gray-200 pt-10">
            <div className="text-center mb-6">
              <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-2">Ubicación</p>
              <h2 className="font-display text-2xl sm:text-3xl font-semibold text-blue-dark">Visítanos en Santiago</h2>
              <p className="text-sm text-gray-600 mt-2">Av. Apoquindo 7331, oficina 420, Las Condes</p>
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
