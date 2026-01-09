"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Section } from "@/components/ui/section"

const capabilities = [
  {
    key: "orquestacion",
    title: "Orquestación y automatización",
    desc: "Transforma workflows con tareas humanas, bots y sistemas en un solo canvas.",
    image: "/images/appian/process-automation-animation.gif",
  },
  {
    key: "data-fabric",
    title: "Data Fabric",
    desc: "Unifica datos de múltiples sistemas para apps más potentes y gobernadas.",
    image: "/images/appian/data-fabric-animation.gif",
  },
  {
    key: "ia-copilots",
    title: "IA y copilots",
    desc: "Aplica IA privada en cada paso del proceso con guardrails y métricas.",
    image: "/images/appian/ai-inprocess.gif",
  },
  {
    key: "process-intelligence",
    title: "Process Intelligence",
    desc: "Descubre cuellos de botella y toma decisiones con insights de proceso.",
    image: "/images/appian/process-mining-animation.gif",
  },
]

export function AppianHighlight() {
  const [active, setActive] = useState<string | null>(null)
  const activeCap = capabilities.find((cap) => cap.key === active)

  return (
    <Section className="bg-[linear-gradient(130deg,#10244e,#1f3d8f,#12a0c6)] py-12 sm:py-14 lg:py-16" variant="dark">
      <div className="relative overflow-hidden rounded-3xl">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.07]">
          <Image
            src="/logos/partners/letter_appian.png"
            alt="Appian"
            width={1000}
            height={360}
            className="object-contain drop-shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
            priority
          />
        </div>

        <div className="relative z-10 space-y-8 pb-6 pt-10 lg:pt-6">
          <div className="relative flex flex-col items-center text-center gap-3 lg:flex-row lg:items-center lg:justify-center">
            <div className="relative h-32 w-32 overflow-hidden rounded-2xl bg-white/18 backdrop-blur border border-white/25 shadow-[0_20px_50px_rgba(0,0,0,0.35)] lg:absolute lg:left-4 lg:top-2">
              <Image
                src="/logos/partners/logo_appian.png"
                alt="Appian logo"
                fill
                sizes="128px"
                className="object-contain"
              />
            </div>
            <div className="flex flex-col items-center lg:items-center">
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-white mb-2 flex items-center gap-2 justify-center lg:justify-start">
                Hiper automatización con
                <span className="relative h-10 w-36 inline-block align-middle">
                  <Image src="/logos/partners/letter_appian.png" alt="Appian" fill sizes="96px" className="object-contain" />
                </span>
              </h2>
              <p className="text-white/85 mx-auto">
                Discovery, delivery y gobierno en Appian/iBPMS con escalabilidad desde el día uno.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.8fr] gap-10 items-stretch">
            <div className="space-y-4 h-full flex flex-col min-h-[520px]">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/15 mt-6 lg:mt-14">
                <span className="text-sm text-white/85">Pioneros</span>
                <span className="relative h-5 w-16 inline-block align-middle ml-1">
                  <Image src="/logos/partners/letter_appian.png" alt="Appian" fill sizes="64px" className="object-contain" />
                </span>
                <span className="text-sm text-white/85 ml-1">en Chile 🇨🇱</span>
              </div>

              <div className="rounded-2xl bg-white/5 border border-white/10 divide-y divide-white/10 overflow-hidden flex-1">
                {capabilities.map((card) => (
                  <button
                    key={card.key}
                    onMouseEnter={() => setActive(card.key)}
                    onFocus={() => setActive(card.key)}
                    onClick={() => setActive(card.key)}
                    className={`w-full text-left px-5 py-4 transition-all flex flex-col gap-1 ${
                      active === card.key ? "bg-white/10 text-white" : "hover:bg-white/5 text-white/85"
                    }`}
                  >
                    <span className="font-display font-semibold text-lg">{card.title}</span>
                    <span className="text-sm text-white/75">{card.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="relative rounded-2xl border border-white/10 bg-white/5 overflow-hidden min-h-[520px] h-full flex items-center justify-center lg:-mr-28 lg:mt-0">
              {activeCap ? (
                <>
                  <Image
                    key={activeCap.key}
                    src={activeCap.image}
                    alt={activeCap.title}
                    fill
                    sizes="(min-width: 1024px) 480px, 100vw"
                    className="object-contain transition-opacity duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#0b1b33]/40 to-transparent" />
                </>
              ) : (
                <div className="text-white/55 text-sm">Selecciona una capability para ver el preview</div>
                )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 relative z-10">
            <Link
              href="/servicios/automatizacion-procesos"
              className="px-6 py-3 rounded-lg font-semibold text-center text-white bg-[linear-gradient(120deg,#1f3d8f,#0f7fb2)] shadow-[0_10px_24px_rgba(15,127,178,0.25)] hover:shadow-[0_12px_30px_rgba(15,127,178,0.35)] transition-all"
            >
              Ver servicio de Automatización
            </Link>
            <Link
              href="/contacto"
              className="px-6 py-3 rounded-lg border border-white/30 text-white text-center hover:bg-white/10 transition-all bg-white/5"
            >
              Agenda una demo Appian
            </Link>
          </div>
        </div>
      </div>
    </Section>
  )
}
