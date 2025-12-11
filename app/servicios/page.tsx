import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Hero } from "@/components/ui/hero"
import { Section } from "@/components/ui/section"
import { ServicesSection } from "@/components/ui/services-section"
import Link from "next/link"

export default function ServicesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <Hero
        title="Servicios VR Group"
        subtitle="Diseñamos, construimos y operamos soluciones tecnológicas que aceleran la transformación digital de tu organización."
      />

      <ServicesSection variant="dark" />

      <Section className="bg-gray-50">
        <div className="bg-white rounded-2xl p-8 md:p-12 text-center max-w-3xl mx-auto">
          <h2 className="font-display font-bold text-3xl mb-4 text-blue-dark">¿No encuentras lo que buscas?</h2>
          <p className="text-gray-600 mb-6">
            Contáctanos para explorar soluciones personalizadas adaptadas a tus necesidades específicas.
          </p>
          <Link
            href="/contacto"
            className="inline-flex px-6 py-3 bg-coral text-white rounded-lg font-semibold hover:bg-coral-dark transition-colors"
          >
            Solicita una consulta
          </Link>
        </div>
      </Section>

      <Footer />
    </div>
  )
}
