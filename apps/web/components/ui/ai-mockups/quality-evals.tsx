"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { WindowFrame } from "./frame"

const suites = [
  { name: "guardrail-pii", count: "240 casos", status: "PASS", value: "100%" },
  { name: "factuality-v2", count: "180 casos", status: "PASS", value: "94.4%" },
  { name: "toxicity-filter", count: "320 casos", status: "PASS", value: "99.1%" },
  { name: "jailbreak-suite", count: "85 casos", status: "WARN", value: "92.0%" },
  { name: "latency-budget", count: "p95 < 2s", status: "PASS", value: "1.4s" },
]

const bars = [62, 78, 85, 71, 90, 94, 88, 96]

type Phase = "idle" | "running" | "results" | "done"

const PHASE_SEQUENCE: { phase: Phase; delay: number }[] = [
  { phase: "done", delay: 2800 },
  { phase: "idle", delay: 500 },
  { phase: "running", delay: 2200 },
  { phase: "results", delay: 1800 },
]

export function QualityEvalsMockup() {
  const [phase, setPhase] = useState<Phase>("done")
  const [acc, setAcc] = useState(94)
  const [hall, setHall] = useState(2.1)
  const [lat, setLat] = useState(1.4)
  const [progress, setProgress] = useState(100)

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

    const animateProgress = (duration: number) => {
      const start = performance.now()
      setProgress(0)
      inner = setInterval(() => {
        const t = Math.min(1, (performance.now() - start) / duration)
        setProgress(Math.floor(t * 100))
        if (t >= 1) clearInner()
      }, 40)
    }

    const animateCounters = (duration: number) => {
      const start = performance.now()
      setAcc(0)
      setHall(0)
      setLat(0)
      inner = setInterval(() => {
        const t = Math.min(1, (performance.now() - start) / duration)
        const eased = 1 - Math.pow(1 - t, 2)
        setAcc(Math.floor(eased * 94))
        setHall(Number((eased * 2.1).toFixed(1)))
        setLat(Number((eased * 1.4).toFixed(1)))
        if (t >= 1) clearInner()
      }, 30)
    }

    const run = () => {
      if (cancelled) return
      const step = PHASE_SEQUENCE[i % PHASE_SEQUENCE.length]
      clearInner()
      setPhase(step.phase)

      if (step.phase === "idle") {
        setAcc(0)
        setHall(0)
        setLat(0)
        setProgress(0)
      } else if (step.phase === "running") {
        setAcc(0)
        setHall(0)
        setLat(0)
        animateProgress(step.delay - 100)
      } else if (step.phase === "results") {
        setProgress(100)
        animateCounters(step.delay - 200)
      } else if (step.phase === "done") {
        setAcc(94)
        setHall(2.1)
        setLat(1.4)
        setProgress(100)
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

  const running = phase === "running"
  const showResults = phase === "results" || phase === "done"

  return (
    <WindowFrame title="evals.vrgroup.ai — Producción">
      <div className="flex h-full flex-col p-3 text-[11px]">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[11px] font-semibold text-gray-900">Calidad · últimos 7 días</div>
            <div className="text-[9px] text-gray-500">5 suites · 42K evaluaciones</div>
          </div>
          <motion.span
            animate={
              running
                ? { opacity: [1, 0.4, 1] }
                : { opacity: 1 }
            }
            transition={{ duration: 0.8, repeat: running ? Infinity : 0 }}
            className={`rounded-full px-2 py-0.5 text-[9px] font-medium ring-1 ${
              running
                ? "bg-blue-50 text-blue-700 ring-blue-200"
                : "bg-emerald-50 text-emerald-700 ring-emerald-200"
            }`}
          >
            {running ? "● Ejecutando…" : "● Saludable"}
          </motion.span>
        </div>

        <div className="mt-2 h-[2px] overflow-hidden rounded-full bg-gray-100">
          <motion.div
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
            className="h-full rounded-full bg-[linear-gradient(90deg,#1f3d8f,#12a0c6)]"
          />
        </div>

        <div className="mt-2 grid grid-cols-3 gap-2">
          <StatTile label="Accuracy" value={`${acc}%`} delta="+1.2%" highlight={phase === "results"} />
          <StatTile label="Hallucinations" value={`${hall.toFixed(1)}%`} delta="-0.4%" highlight={phase === "results"} />
          <StatTile label="Latency p95" value={`${lat.toFixed(1)}s`} delta="-120ms" highlight={phase === "results"} />
        </div>

        <div className="mt-2 rounded-lg border border-gray-200 bg-white p-2">
          <div className="flex items-center justify-between">
            <div className="text-[9px] font-semibold uppercase tracking-wider text-gray-500">
              Accuracy diaria
            </div>
            <div className="text-[9px] text-gray-500">últimos 8 días</div>
          </div>
          <div className="mt-1.5 flex h-16 items-end gap-1">
            {bars.map((h, i) => (
              <motion.div
                key={i}
                initial={{ height: "0%" }}
                animate={{ height: showResults ? `${h}%` : "0%" }}
                transition={{
                  duration: 0.6,
                  delay: phase === "results" ? i * 0.08 : 0,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="flex-1 rounded-t bg-[linear-gradient(180deg,#12a0c6,#1f3d8f)]"
              />
            ))}
          </div>
        </div>

        <div className="mt-2 flex-1 overflow-hidden rounded-lg border border-gray-200 bg-white">
          <div className="grid grid-cols-[1.4fr_1fr_0.6fr_0.6fr] gap-2 border-b border-gray-200 bg-gray-50 px-2 py-1 text-[9px] font-semibold uppercase tracking-wider text-gray-500">
            <span>Suite</span>
            <span>Cobertura</span>
            <span>Score</span>
            <span>Estado</span>
          </div>
          <div className="divide-y divide-gray-100">
            <AnimatePresence>
              {suites.map((s, i) => {
                const visible = showResults || (running && i < Math.floor(progress / 20))
                if (!visible) return null
                return (
                  <motion.div
                    key={s.name}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.35,
                      delay: phase === "results" ? i * 0.1 : 0,
                    }}
                    className="grid grid-cols-[1.4fr_1fr_0.6fr_0.6fr] items-center gap-2 px-2 py-1.5"
                  >
                    <span className="truncate font-mono text-[10px] text-gray-800">{s.name}</span>
                    <span className="text-[9px] text-gray-500">{s.count}</span>
                    <span className="font-mono text-[10px] font-semibold text-gray-900">{s.value}</span>
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        delay: phase === "results" ? i * 0.1 + 0.15 : 0,
                        type: "spring",
                        stiffness: 500,
                        damping: 20,
                      }}
                      className={`inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[9px] font-semibold ${
                        s.status === "PASS"
                          ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
                          : "bg-amber-50 text-amber-700 ring-1 ring-amber-200"
                      }`}
                    >
                      {s.status}
                    </motion.span>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </WindowFrame>
  )
}

function StatTile({
  label,
  value,
  delta,
  highlight,
}: {
  label: string
  value: string
  delta: string
  highlight?: boolean
}) {
  return (
    <motion.div
      animate={
        highlight
          ? { boxShadow: ["0 0 0 0 rgba(18,160,198,0)", "0 0 0 4px rgba(18,160,198,0.3)", "0 0 0 0 rgba(18,160,198,0)"] }
          : {}
      }
      transition={{ duration: 1.1, repeat: highlight ? Infinity : 0 }}
      className="rounded-lg border border-gray-200 bg-white p-2"
    >
      <div className="text-[9px] font-semibold uppercase tracking-wider text-gray-500">{label}</div>
      <div className="mt-0.5 font-display text-base font-bold text-gray-900">{value}</div>
      <div className="text-[9px] font-medium text-emerald-600">{delta}</div>
    </motion.div>
  )
}
