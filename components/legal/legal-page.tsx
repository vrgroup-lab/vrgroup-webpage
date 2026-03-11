import type { ReactNode } from "react"
import Link from "next/link"
import { SiteNavbar } from "@/components/layout/site-navbar"
import { Footer } from "@/components/layout/footer"

type LegalSection = {
  title: string
  paragraphs?: string[]
  items?: string[]
}

type LegalPageProps = {
  eyebrow: string
  title: string
  summary: string
  sections: LegalSection[]
  note?: ReactNode
}

export function LegalPage({ eyebrow, title, summary, sections, note }: LegalPageProps) {
  return (
    <div className="min-h-screen flex flex-col bg-[#f5f7fb]">
      <SiteNavbar />

      <main className="flex-1">
        <div className="max-w-[980px] mx-auto px-4 sm:px-6 lg:px-8 pt-32 sm:pt-36 lg:pt-40 pb-16">
          <div className="rounded-[32px] bg-white border border-gray-200 shadow-sm overflow-hidden">
            <div className="bg-[#0B1B33] px-6 sm:px-10 py-10 sm:py-12 text-white">
              <p className="text-xs uppercase tracking-[0.22em] text-white/70 mb-3">{eyebrow}</p>
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">{title}</h1>
              <p className="mt-4 text-white/85 max-w-3xl text-sm sm:text-base leading-relaxed">{summary}</p>
              <p className="mt-4 text-xs text-white/65">Última actualización: 11 de marzo de 2026</p>
            </div>

            <div className="px-6 sm:px-10 py-8 sm:py-10 space-y-8">
              {sections.map((section) => (
                <section key={section.title} className="space-y-4">
                  <h2 className="font-display text-2xl font-semibold text-blue-dark">{section.title}</h2>
                  {section.paragraphs?.map((paragraph) => (
                    <p key={paragraph} className="text-gray-700 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                  {section.items?.length ? (
                    <ul className="space-y-2 text-gray-700">
                      {section.items.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <span className="mt-2 h-2 w-2 rounded-full bg-coral flex-shrink-0" />
                          <span className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              ))}

              <section className="rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4 text-sm text-gray-600">
                <p>
                  Si tienes dudas sobre estos documentos, puedes escribir a{" "}
                  <Link href="mailto:contacto@vrgroup.cl" className="font-semibold text-blue-dark hover:text-coral">
                    contacto@vrgroup.cl
                  </Link>
                  . Este contenido busca establecer una base clara de uso y tratamiento de datos para el sitio público de
                  VR Group y debe ser revisado por asesoría legal antes de cualquier uso contractual específico.
                </p>
                {note ? <div className="mt-3">{note}</div> : null}
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
