"use client"

import Link from "next/link"
import { OptimizedAnimation } from "@/components/ui/optimized-animation"
import { Section } from "@/components/ui/section"

const activeCap = {
  key: "agentes",
  title: "Agentes de IA y copilots",
  desc: "Bots y copilots conectados a datos y sistemas core, con guardrails.",
  image: "/images/ai/agentic.gif",
  points: ["Chatbots y voicebots", "Integración con sistemas core", "Guardrails, métricas y adopción"],
}

const capabilities = [
  "Agentes de IA y copilots",
  "RAG y búsqueda empresarial",
  "Fine-tuning y prompt engineering",
  "IA privada y seguridad",
  "Adopción y training",
]

export function IAHighlightStatic() {
  return (
    <Section className="bg-white" variant="light" paddingClass="py-12 sm:py-14 lg:py-16">
      <div className="space-y-8">
        <div className="flex flex-col items-center text-center gap-3">
          <h2 className="font-display font-bold text-4xl md:text-5xl text-blue-dark flex flex-wrap items-center justify-center gap-2">
            <span className="bg-[linear-gradient(120deg,#0f1729,#1f3d8f,#12a0c6)] bg-clip-text text-transparent">IA</span>
            <span>aplicada y agentes inteligentes</span>
          </h2>
          <p className="text-gray-600 text-lg md:text-xl max-w-4xl leading-relaxed">
            Capacidades modulares para diseñar, desplegar y operar IA.
            <br className="hidden md:block" />
            Agentes, RAG, fine-tuning, IA privada, seguridad y adopción con gobierno y métricas.
          </p>
        </div>

        <div className="w-full rounded-lg border border-gray-200 bg-white shadow-sm">
          <div className="flex items-center gap-2 p-2 overflow-x-auto">
            {capabilities.map((capability, index) => (
              <div
                key={capability}
                className={`whitespace-nowrap px-4 sm:px-5 py-2 rounded-lg text-sm sm:text-base font-semibold transition-all border ${
                  index === 0
                    ? "border-transparent bg-[linear-gradient(120deg,#0f1729,#1f3d8f,#12a0c6)] text-white shadow-[0_8px_20px_rgba(18,160,198,0.3)]"
                    : "border-gray-200 text-[#0f1729] bg-white"
                }`}
              >
                {capability}
              </div>
            ))}
          </div>
        </div>

        <div className="relative grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-6 items-stretch">
          <div className="rounded-3xl border border-gray-200 bg-gray-50 overflow-hidden min-h-[420px] h-full relative">
            <OptimizedAnimation
              src={activeCap.image}
              label={activeCap.title}
              preload="none"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>

          <div className="rounded-3xl border border-gray-200 bg-white p-6 space-y-3 shadow-sm min-h-[420px] h-full flex flex-col justify-between">
            <h3 className="font-display text-2xl font-bold text-blue-dark">{activeCap.title}</h3>
            <p className="text-gray-600">{activeCap.desc}</p>
            <ul className="space-y-2">
              {activeCap.points.map((point) => (
                <li key={point} className="flex items-start gap-2 text-gray-700">
                  <span className="mt-1 h-2 w-2 rounded-full bg-blue-500 inline-block"></span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link
                href="/servicios/ia-y-agentes"
                className="px-5 py-3 rounded-lg bg-blue-900 text-white font-semibold text-center hover:bg-blue-800 transition-colors"
              >
                Ver servicio de IA
              </Link>
              <Link
                href="/contacto"
                className="px-5 py-3 rounded-lg border border-blue-200 text-blue-900 font-semibold text-center hover:bg-blue-50 transition-colors"
              >
                Hablemos de tu caso
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
