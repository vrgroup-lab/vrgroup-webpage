"use client"

import { useState } from "react"
import Link from "next/link"
import { Section } from "@/components/ui/section"
import { AI_MOCKUPS, type MockupKey } from "@/components/ui/ai-mockups"

type Capability = {
  key: MockupKey
  tabTitle: string
  title: string
  desc: string
  points: string[]
}

const capabilities: Capability[] = [
  {
    key: "agents",
    tabTitle: "Agentes",
    title: "Agentes y copilots",
    desc: "Agentes autónomos y copilots conectados a tus sistemas core, con guardrails y automatización de flujos.",
    points: [
      "Chatbots, voicebots y agentes autónomos",
      "Integración con CRM, ERP y sistemas internos",
      "Guardrails, métricas y trazabilidad",
    ],
  },
  {
    key: "rag",
    tabTitle: "RAG y búsqueda",
    title: "RAG y búsqueda empresarial",
    desc: "Recuperación aumentada con contexto seguro para equipos y clientes sobre tus fuentes de conocimiento.",
    points: [
      "Índices multi-fuente (Drive, Confluence, Notion, CRM)",
      "Control de acceso granular por usuario y equipo",
      "Experiencia de búsqueda moderna con citas",
    ],
  },
  {
    key: "ml",
    tabTitle: "Machine Learning",
    title: "Machine Learning y modelos predictivos",
    desc: "Modelos clásicos para forecast, scoring, clasificación y visión por computadora — más allá de los LLMs.",
    points: [
      "Forecast de demanda y churn, scoring de leads",
      "Clasificación, detección y computer vision",
      "Pipelines de entrenamiento, despliegue y monitoreo",
    ],
  },
  {
    key: "quality",
    tabTitle: "Calidad y gobierno",
    title: "Calidad, gobierno y seguridad de IA",
    desc: "Evaluaciones automáticas, observabilidad y despliegues privados con trazabilidad y cumplimiento.",
    points: [
      "Evals automáticos (accuracy, hallucinations, latency)",
      "Guardrails, PII y políticas de contenido",
      "Despliegues privados, auditoría y compliance",
    ],
  },
  {
    key: "adoption",
    tabTitle: "Adopción",
    title: "Adopción y habilitación",
    desc: "Playbooks de adopción, KPIs de uso y ROI, capacitación de equipos y change management.",
    points: [
      "Playbooks de adopción por área y rol",
      "KPIs de uso, ahorro de horas y ROI",
      "Training, change management y enablement",
    ],
  },
]

interface IAHighlightProps {
  providerLogos?: string[]
}

export function IAHighlight(_props: IAHighlightProps = {}) {
  const [active, setActive] = useState<MockupKey>(capabilities[0].key)
  const activeCap = capabilities.find((cap) => cap.key === active) ?? capabilities[0]
  const Mockup = AI_MOCKUPS[activeCap.key]

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
            Agentes, RAG, machine learning, calidad y adopción con gobierno y métricas.
          </p>
        </div>

        <div className="w-full rounded-lg border border-gray-200 bg-white shadow-sm">
          <div className="grid grid-cols-2 gap-2 p-2 sm:grid-cols-3 lg:grid-cols-5">
            {capabilities.map((cap) => (
              <button
                key={cap.key}
                onClick={() => setActive(cap.key)}
                onMouseEnter={() => setActive(cap.key)}
                onFocus={() => setActive(cap.key)}
                className={`truncate rounded-lg border px-3 py-2 text-xs font-semibold transition-all sm:text-sm ${
                  active === cap.key
                    ? "border-transparent bg-[linear-gradient(120deg,#0f1729,#1f3d8f,#12a0c6)] text-white shadow-sm"
                    : "border-gray-200 bg-white text-[#0f1729] hover:bg-gray-50"
                }`}
                title={cap.title}
              >
                {cap.tabTitle}
              </button>
            ))}
          </div>
        </div>

        <div className="relative grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-6 items-stretch">
          <div className="h-[480px]">
            <Mockup />
          </div>

          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm h-[480px] flex flex-col">
            <div className="flex h-14 items-start">
              <h3 className="font-display text-2xl font-bold text-blue-dark line-clamp-2">{activeCap.title}</h3>
            </div>
            <div className="mt-2 h-20">
              <p className="text-gray-600 line-clamp-3">{activeCap.desc}</p>
            </div>
            <ul className="mt-4 flex h-40 flex-col gap-2">
              {activeCap.points.map((pt) => (
                <li key={pt} className="flex items-start gap-2 text-gray-700">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-500 inline-block"></span>
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
            <div className="mt-auto flex flex-col sm:flex-row gap-3">
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
