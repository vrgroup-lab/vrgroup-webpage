"use client"

import { useEffect, useState } from "react"
import { motion } from "motion/react"
import { WindowFrame } from "./frame"

const playbookSteps = [
  "Kickoff ejecutivo",
  "Mapeo de procesos",
  "Training de embajadores",
  "Piloto controlado",
  "Rollout por área",
  "Medición de ROI",
]

const departments = [
  { name: "Comercial", adoption: 92 },
  { name: "Operaciones", adoption: 78 },
  { name: "Producto", adoption: 88 },
  { name: "Finanzas", adoption: 61 },
  { name: "RRHH", adoption: 45 },
  { name: "IT", adoption: 94 },
  { name: "Legal", adoption: 32 },
  { name: "Marketing", adoption: 71 },
]

type Phase = "idle" | "playbook" | "rollout" | "done"

const PHASE_SEQUENCE: { phase: Phase; delay: number }[] = [
  { phase: "done", delay: 3000 },
  { phase: "idle", delay: 500 },
  { phase: "playbook", delay: 2400 },
  { phase: "rollout", delay: 2400 },
]

export function AdoptionKpisMockup() {
  const [phase, setPhase] = useState<Phase>("done")
  const [checkedSteps, setCheckedSteps] = useState(playbookSteps.length)
  const [activeDepts, setActiveDepts] = useState(departments.length)

  useEffect(() => {
    let cancelled = false
    let i = 0
    let timeout: ReturnType<typeof setTimeout>
    let inner: ReturnType<typeof setInterval> | null = null

    const clearInner = () => {
      if (inner) {
        clearInterval(inner)
        inner = null
      }
    }

    const run = () => {
      if (cancelled) return
      const step = PHASE_SEQUENCE[i % PHASE_SEQUENCE.length]
      clearInner()
      setPhase(step.phase)

      if (step.phase === "idle") {
        setCheckedSteps(0)
        setActiveDepts(0)
      } else if (step.phase === "playbook") {
        setCheckedSteps(0)
        setActiveDepts(0)
        let c = 0
        const per = Math.floor(step.delay / (playbookSteps.length + 1))
        inner = setInterval(() => {
          c += 1
          setCheckedSteps(c)
          if (c >= playbookSteps.length) clearInner()
        }, per)
      } else if (step.phase === "rollout") {
        setCheckedSteps(playbookSteps.length)
        setActiveDepts(0)
        let d = 0
        const per = Math.floor(step.delay / (departments.length + 1))
        inner = setInterval(() => {
          d += 1
          setActiveDepts(d)
          if (d >= departments.length) clearInner()
        }, per)
      } else if (step.phase === "done") {
        setCheckedSteps(playbookSteps.length)
        setActiveDepts(departments.length)
      }

      timeout = setTimeout(() => {
        i += 1
        run()
      }, step.delay)
    }

    run()
    return () => {
      cancelled = true
      clearTimeout(timeout)
      clearInner()
    }
  }, [])

  const playbookActive = phase === "playbook"
  const rolloutActive = phase === "rollout"
  const visibleDepts = activeDepts

  return (
    <WindowFrame title="adopcion.vrgroup.ai — Rollout organizacional">
      <div className="flex h-full flex-col p-3 text-[11px]">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-[11px] font-semibold text-gray-900">
              Playbook de adopción · 237 usuarios
            </div>
            <div className="text-[9px] text-gray-500">
              {phase === "done" ? "8 áreas · rollout completo" : rolloutActive ? "Activando áreas…" : "Ejecutando playbook…"}
            </div>
          </div>
          <motion.span
            animate={
              phase === "done"
                ? { opacity: 1 }
                : { opacity: [1, 0.5, 1] }
            }
            transition={{ duration: 1.1, repeat: phase !== "done" ? Infinity : 0 }}
            className="rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-medium text-emerald-700 ring-1 ring-emerald-200"
          >
            ROI 3.8x
          </motion.span>
        </div>

        <div className="mt-2 flex-1 overflow-hidden rounded-lg border border-gray-200 bg-white">
          <div className="border-b border-gray-200 bg-gray-50 px-2 py-1 text-[9px] font-semibold uppercase tracking-wider text-gray-500">
            Playbook: Onboarding de IA
          </div>
          <div className="p-2">
            <div className="relative space-y-1.5">
              <motion.div
                animate={playbookActive ? { opacity: [0.4, 1, 0.4] } : { opacity: 0.3 }}
                transition={{ duration: 1.2, repeat: playbookActive ? Infinity : 0 }}
                className="absolute left-[7px] top-1 h-[calc(100%-0.5rem)] w-[1.5px] bg-gradient-to-b from-[#1f3d8f] to-[#12a0c6]"
              />
              {playbookSteps.map((step, i) => {
                const done = i < checkedSteps
                const active = i === checkedSteps && playbookActive
                return (
                  <div key={step} className="relative flex items-center gap-2 pl-5">
                    <motion.div
                      animate={
                        active
                          ? { scale: [1, 1.25, 1], boxShadow: ["0 0 0 0 rgba(18,160,198,0)", "0 0 0 4px rgba(18,160,198,0.4)", "0 0 0 0 rgba(18,160,198,0)"] }
                          : {}
                      }
                      transition={{ duration: 0.9, repeat: active ? Infinity : 0 }}
                      className={`absolute left-0 flex h-3.5 w-3.5 items-center justify-center rounded-full ring-2 ring-white ${
                        done
                          ? "bg-[linear-gradient(120deg,#1f3d8f,#12a0c6)]"
                          : active
                            ? "bg-blue-500"
                            : "bg-gray-200"
                      }`}
                    >
                      {done && (
                        <motion.svg
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 600, damping: 20 }}
                          className="h-2 w-2 text-white"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="4"
                        >
                          <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                        </motion.svg>
                      )}
                    </motion.div>
                    <span
                      className={`text-[10px] transition-colors ${
                        done
                          ? "text-gray-700"
                          : active
                            ? "font-medium text-gray-900"
                            : "text-gray-400"
                      }`}
                    >
                      {step}
                    </span>
                    {active && (
                      <motion.span
                        initial={{ opacity: 0, x: -4 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="rounded bg-blue-50 px-1 py-0.5 text-[8px] font-semibold text-blue-700"
                      >
                        en curso
                      </motion.span>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <div className="mt-2 rounded-lg border border-gray-200 bg-white">
          <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-2 py-1">
            <span className="text-[9px] font-semibold uppercase tracking-wider text-gray-500">
              Adopción por área
            </span>
            <motion.span
              key={visibleDepts}
              initial={{ opacity: 0, y: -3 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-mono text-[9px] text-gray-600"
            >
              {visibleDepts}/{departments.length}
            </motion.span>
          </div>
          <div className="grid grid-cols-4 gap-1.5 p-2">
            {departments.map((d, i) => {
              const isActive = i < visibleDepts
              const justActivated = rolloutActive && i === visibleDepts - 1
              return (
                <motion.div
                  key={d.name}
                  animate={
                    justActivated
                      ? {
                          scale: [0.85, 1.08, 1],
                          boxShadow: [
                            "0 0 0 0 rgba(18,160,198,0)",
                            "0 0 0 6px rgba(18,160,198,0.4)",
                            "0 0 0 0 rgba(18,160,198,0)",
                          ],
                        }
                      : { scale: 1 }
                  }
                  transition={{ duration: 0.6, times: [0, 0.5, 1] }}
                  className={`rounded-md border px-1.5 py-1 transition-colors ${
                    isActive
                      ? "border-blue-200 bg-blue-50"
                      : "border-gray-200 bg-gray-50 opacity-50"
                  }`}
                >
                  <div className="flex items-center gap-1">
                    <motion.span
                      animate={
                        justActivated
                          ? { scale: [1, 1.8, 1], opacity: [1, 0.5, 1] }
                          : {}
                      }
                      transition={{ duration: 0.7 }}
                      className={`h-1 w-1 rounded-full ${
                        isActive ? "bg-emerald-500" : "bg-gray-300"
                      }`}
                    />
                    <span className="truncate text-[9px] font-medium text-gray-800">{d.name}</span>
                  </div>
                  <div className="mt-0.5 h-[3px] overflow-hidden rounded-full bg-gray-100">
                    <motion.div
                      initial={{ width: "0%" }}
                      animate={{ width: isActive ? `${d.adoption}%` : "0%" }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className="h-full rounded-full bg-[linear-gradient(90deg,#1f3d8f,#12a0c6)]"
                    />
                  </div>
                  <div className="mt-0.5 text-right font-mono text-[8px] text-gray-500">
                    {isActive ? `${d.adoption}%` : "—"}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </WindowFrame>
  )
}
