import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Hero } from "@/components/ui/hero"
import { Section } from "@/components/ui/section"
import { ServicesSection } from "@/components/ui/services-section"
import { CTABanner } from "@/components/ui/cta-banner"

export default function ServicesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <Hero
        title="Servicios VR Group"
        subtitle="Diseñamos, construimos y operamos soluciones tecnológicas que aceleran la transformación digital de tu organización."
      />

      <ServicesSection variant="dark" />

      <CTABanner
        eyebrow="Contacto"
        title="🛠️ Diseñemos la solución que necesitas"
        subtitle="Cuéntanos tu reto y armamos un plan a medida con entrega a producción."
        buttonLabel="Solicita una consulta"
        buttonHref="/contacto"
      />

      <Footer />
    </div>
  )
}
