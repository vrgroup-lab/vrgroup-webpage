"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Section } from "@/components/ui/section"

type Capability = {
  key: string
  title: string
  desc: string
  image: string
  points: string[]
}

const capabilities: Capability[] = [
  {
    key: "agentes",
    title: "Agentes de IA y copilots",
    desc: "Bots y copilots conectados a datos y sistemas core, con guardrails.",
    image: "/images/ai/agentic.gif",
    points: ["Chatbots y voicebots", "Integración con sistemas core", "Guardrails, métricas y adopción"],
  },
  {
    key: "rag",
    title: "RAG y búsqueda empresarial",
    desc: "Recuperación aumentada con contexto seguro para equipos y clientes.",
    image: "/images/ai/rag.gif",
    points: ["Índices seguros y multi-fuente", "Controles de acceso", "Experiencia de búsqueda moderna"],
  },
  {
    key: "fine-tuning",
    title: "Fine-tuning y prompt engineering",
    desc: "Modelos ajustados a tu dominio y prompts gobernados.",
    image: "/placeholder.jpg",
    points: ["Prompts versionados", "Evaluaciones automáticas", "Modelos afinados a tu industria"],
  },
  {
    key: "ia-privada",
    title: "IA privada y seguridad",
    desc: "Despliegues en entornos privados con control y trazabilidad.",
    image: "/placeholder.jpg",
    points: ["Entornos privados y on-prem", "Trazabilidad y auditoría", "Cumplimiento y privacidad"],
  },
  {
    key: "adopcion",
    title: "Adopción y training",
    desc: "Capacitación, change management y KPIs de uso/adopción.",
    image: "/placeholder.jpg",
    points: ["Playbooks de adopción", "KPIs de uso y ROI", "Capacitación de equipos"],
  },
]

const providers = ["OpenAI", "Anthropic", "Google Gemini", "Azure OpenAI", "AWS Bedrock", "DeepSeek", "Cohere", "Meta Llama"]

interface IAHighlightProps {
  providerLogos?: string[]
}

export function IAHighlight({ providerLogos = [] }: IAHighlightProps) {
  const [active, setActive] = useState<string | null>(capabilities[0]?.key ?? null)
  const activeCap = capabilities.find((cap) => cap.key === active)

  return (
    <Section className="bg-white" variant="light">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col items-center text-center gap-3">
          <h2 className="font-display font-bold text-4xl md:text-5xl text-blue-dark flex flex-wrap items-center justify-center gap-2">
            <span className="bg-[linear-gradient(120deg,#0f1729,#1f3d8f,#12a0c6)] bg-clip-text text-transparent">IA</span>
            <span>aplicada y agentes inteligentes</span>
          </h2>
          <p className="text-gray-600 text-lg md:text-xl max-w-3xl">
            Capacidades modulares para diseñar, desplegar y operar IA: agentes, RAG, fine-tuning, IA privada, seguridad y adopción con gobierno y métricas.
          </p>
        </div>

        <div className="max-w-6xl mx-auto overflow-x-auto whitespace-nowrap px-1">
          <div className="inline-flex items-center gap-2 border border-gray-200 rounded-lg p-2 bg-white shadow-sm">
            {capabilities.map((cap) => (
              <button
                key={cap.key}
                onClick={() => setActive(cap.key)}
                onMouseEnter={() => setActive(cap.key)}
                onFocus={() => setActive(cap.key)}
                className={`px-4 sm:px-5 py-2 rounded-lg text-sm sm:text-base font-semibold transition-all border ${
                  active === cap.key
                    ? "border-transparent bg-[linear-gradient(120deg,#0f1729,#1f3d8f,#12a0c6)] text-white shadow-[0_8px_20px_rgba(18,160,198,0.3)]"
                    : "border-gray-200 text-[#0f1729] bg-white hover:bg-gray-50"
                }`}
              >
                {cap.title}
              </button>
            ))}
          </div>
        </div>

        <div className="relative grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-6 items-stretch">
          <div className="rounded-3xl border border-gray-200 bg-gray-50 overflow-hidden min-h-[420px] h-full relative">
            {activeCap ? (
              <Image
                key={activeCap.key}
                src={activeCap.image}
                alt={activeCap.title}
                fill
                sizes="(min-width: 1024px) 640px, 100vw"
                className="object-contain"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-sm">
                Selecciona una capability para ver el preview
              </div>
            )}
          </div>

          <div className="rounded-3xl border border-gray-200 bg-white p-6 space-y-3 shadow-sm min-h-[420px] h-full flex flex-col justify-between">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-900 text-xs font-semibold">Capability</span>
              <span className="text-sm text-gray-500">Vista previa</span>
            </div>
            <h3 className="font-display text-2xl font-bold text-blue-dark">{activeCap?.title ?? "Selecciona una opción"}</h3>
            <p className="text-gray-600">{activeCap?.desc ?? "Elige una capability para ver más detalles."}</p>
            <ul className="space-y-2">
              {(activeCap?.points ?? ["Placeholder 1", "Placeholder 2", "Placeholder 3"]).map((pt) => (
                <li key={pt} className="flex items-start gap-2 text-gray-700">
                  <span className="mt-1 h-2 w-2 rounded-full bg-blue-500 inline-block"></span>
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link
                href="/servicios/ia-agentes-inteligentes"
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
