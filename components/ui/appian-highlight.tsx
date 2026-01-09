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
  const [active, setActive] = useState<string>(capabilities[0]?.key ?? "")
  const activeCap = capabilities.find((cap) => cap.key === active) ?? capabilities[0]

  return (
    <Section className="bg-[linear-gradient(130deg,#10244e,#1f3d8f,#12a0c6)] py-10 sm:py-12 lg:py-14 overflow-hidden" variant="dark">
      <div className="relative rounded-3xl">
        <div
          className="relative z-10 pb-6 pt-0"
          style={{ ["--bleed-right" as any]: "max(0px, calc((100vw - 1340px) / 2 + 48px))" }}
        >
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[auto_1fr] lg:gap-x-6 lg:gap-y-8">
            <div className="relative h-20 w-20 sm:h-24 sm:w-24 lg:h-full lg:w-auto lg:aspect-square lg:self-stretch overflow-hidden rounded-2xl bg-white/18 backdrop-blur border border-white/25 shadow-[0_20px_50px_rgba(0,0,0,0.35)]">
              <Image
                src="/logos/partners/logo_appian.png"
                alt="Appian logo"
                fill
                sizes="128px"
                className="object-contain"
              />
            </div>
            <div className="flex flex-col items-start gap-3 lg:h-full lg:justify-between">
              <div className="flex flex-col items-start">
                <h2 className="font-display font-bold text-4xl sm:text-5xl text-white mb-2 leading-tight">
                  Hiper automatización con{"\u00A0"}
                  <span className="relative h-12 w-44 inline-block align-middle">
                    <Image src="/logos/partners/letter_appian.png" alt="Appian" fill sizes="176px" className="object-contain" />
                  </span>
                </h2>
                <p className="text-white/85 max-w-[520px] text-sm sm:text-base leading-relaxed">
                  Discovery, delivery y gobierno en Appian/iBPMS con escalabilidad desde el día uno.
                </p>
              </div>
              <div className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-lg bg-white/10 border border-white/15">
                <span className="text-sm text-white/85">Pioneros</span>
                <span className="relative h-4 w-12 inline-block align-middle">
                  <Image src="/logos/partners/letter_appian.png" alt="Appian" fill sizes="48px" className="object-contain" />
                </span>
                <span className="text-sm text-white/85">en Chile 🇨🇱</span>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,520px)_minmax(0,1fr)] gap-10 items-stretch lg:[--panel-height:clamp(480px,48vh,560px)]">
                <div className="h-full flex flex-col min-h-[480px] lg:h-[var(--panel-height)]">
                  <div className="rounded-2xl bg-white/5 border border-white/10 divide-y divide-white/10 overflow-hidden flex-1 min-h-0 grid grid-rows-4">
                    {capabilities.map((card) => (
                      <button
                        key={card.key}
                        onMouseEnter={() => setActive(card.key)}
                        onFocus={() => setActive(card.key)}
                        onClick={() => setActive(card.key)}
                        className={`w-full h-full text-left px-5 py-4 transition-all flex flex-col justify-center gap-1 ${
                          active === card.key ? "bg-white/10 text-white" : "hover:bg-white/5 text-white/85"
                        }`}
                      >
                        <span className="font-display font-semibold text-lg">{card.title}</span>
                        <span className="text-sm text-white/75">{card.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="relative rounded-2xl border border-white/15 bg-[#0b1b33]/35 overflow-hidden min-h-[480px] h-full flex items-center justify-center shadow-[0_24px_60px_rgba(0,0,0,0.45)] lg:h-[var(--panel-height)] lg:mt-0 lg:mr-[calc(var(--bleed-right)*-1)] lg:w-[calc(100%+var(--bleed-right))] lg:rounded-r-none lg:border-r-0">
                  {activeCap ? (
                    <>
                      <Image
                        key={activeCap.key}
                        src={activeCap.image}
                        alt={activeCap.title}
                        fill
                        sizes="(min-width: 1024px) 960px, 100vw"
                        className="object-cover object-left lg:object-right transition-opacity duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-tr from-[#0b1b33]/40 to-transparent" />
                      <div className="pointer-events-none absolute inset-0">
                        <div className="absolute inset-0 rounded-2xl ring-1 ring-white/10 lg:rounded-r-none" />
                        <div className="absolute top-0 left-0 right-0 h-9 border-b border-white/10 bg-[#0b1b33]/70 flex items-center gap-2 px-4">
                          <span className="h-2.5 w-2.5 rounded-full bg-white/30" />
                          <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                          <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
                        </div>
                      </div>
                    </>
                  ) : null}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 relative z-10 mt-8">
            <Link
              href="/servicios/automatizacion-de-procesos"
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
