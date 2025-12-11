import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Section } from "@/components/ui/section"
import { LogoGrid } from "@/components/ui/logo-grid"
import { getLogosFromFolder } from "@/lib/logos"

export const metadata = {
  title: "Partners | VR Group",
  description: "Tecnologías y partners con los que co-creamos soluciones para nuestros clientes.",
}

export default function PartnersPage() {
  const partnerLogos = getLogosFromFolder("partners")

  return (
    <div className="min-h-screen flex flex-col bg-[#050711] text-white">
      <Navbar />

      <Section
        title="Nuestros partners"
        subtitle="Ecosistema tecnológico para entregar velocidad, calidad y confianza."
        className="bg-[#050711] pt-12"
        variant="dark"
      >
        <LogoGrid
          logos={partnerLogos}
          columns={4}
          title="Tecnologías que potenciamos"
          subtitle="Plataformas, low-code, IA y automatización que usamos en proyectos y servicios gestionados."
          variant="dark"
        />
      </Section>

      <Footer />
    </div>
  )
}
