import { SiteNavbar } from "@/components/layout/site-navbar"
import { Footer } from "@/components/layout/footer"
import { Section } from "@/components/ui/section"
import { LogoGrid } from "@/components/ui/logo-grid"
import { getLogosFromFolder } from "@/lib/logos"

export const metadata = {
  title: "Clientes | VR Group",
  description: "Marcas que confían en VR Group para su transformación digital y automatización.",
}

export default function ClientsPage() {
  const clientLogos = getLogosFromFolder("clients")

  return (
    <div className="min-h-screen flex flex-col bg-[#f6f7fb] text-[#1C1F26]">
      <SiteNavbar />

      <Section
        title="Nuestros clientes"
        subtitle="Organizaciones que confían en VR Group para diseñar, construir y operar soluciones de alto impacto."
        className="bg-white pt-12"
        variant="light"
      >
        <LogoGrid
          logos={clientLogos}
          title="Confían en nosotros"
          subtitle="Banca, consumo masivo, retail, manufactura y tecnología."
          variant="light"
        />
      </Section>

      <Footer />
    </div>
  )
}
