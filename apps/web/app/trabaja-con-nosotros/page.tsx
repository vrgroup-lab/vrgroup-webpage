import { Suspense } from "react"
import type { Metadata } from "next"
import { SiteNavbar } from "@/components/layout/site-navbar"
import { Footer } from "@/components/layout/footer"
import { Hero } from "@/components/ui/hero"
import { CTABanner } from "@/components/ui/cta-banner"
import { marketingSiteSettings } from "@/lib/site-config"
import { CareersView } from "./careers-view"
import { CareersLoading } from "@/components/careers/careers-loading"

export const dynamic = "force-static"

export const metadata: Metadata = {
  title: "Trabaja con nosotros | VR Group",
  description:
    "Conoce las vacantes abiertas de VR Group y postula a través de nuestros canales oficiales. Construye productos con impacto real junto a un equipo experto.",
  openGraph: {
    title: "Trabaja con nosotros | VR Group",
    description:
      "Vacantes abiertas en VR Group: consultoría, desarrollo, automatización e IA aplicada.",
    type: "website",
  },
}

export default function CareersPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteNavbar settings={marketingSiteSettings} />

      <Hero
        eyebrow="Talento"
        title="Construye productos con impacto real"
        subtitle="Nuestras vacantes se publican y cierran dinámicamente. Explora las posiciones abiertas y postula a través de los canales configurados por cada equipo."
      />

      <section className="bg-gray-50 py-16 sm:py-20">
        <div className="w-full max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
          <Suspense fallback={<CareersLoading />}>
            <CareersView />
          </Suspense>
        </div>
      </section>

      <CTABanner
        eyebrow="¿Postulación espontánea?"
        title="¿No ves una posición que calce contigo?"
        subtitle="Escríbenos y cuéntanos qué haces mejor. Siempre estamos atentos al buen talento."
        buttonLabel="Escríbenos"
        buttonHref="/contacto"
      />

      <Footer />
    </div>
  )
}
