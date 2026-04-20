"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { WindowFrame } from "./frame"

const QUERY = "política de retención de datos"

const results = [
  {
    title: "Política de retención de datos de clientes",
    snippet:
      "Los datos personales se conservan durante 5 años desde la última interacción, salvo obligación legal…",
    source: "confluence / policies.pdf · p.3",
  },
  {
    title: "Acuerdo marco de servicios — cláusula 7.2",
    snippet:
      "El proveedor garantiza SLA del 99.9% sobre servicios críticos, con penalidades escaladas por incumplimiento…",
    source: "drive / MSA-2025.docx",
  },
  {
    title: "Runbook: onboarding de clientes enterprise",
    snippet:
      "Paso 3 — Validación legal y compliance antes de emitir accesos SSO al tenant del cliente…",
    source: "notion / Ops Handbook",
  },
]

const sources = [
  { name: "Confluence", count: "12,4K docs" },
  { name: "Google Drive", count: "8,2K docs" },
  { name: "Notion", count: "3,1K páginas" },
  { name: "Salesforce", count: "45K registros" },
]

type Phase = "done" | "idle" | "typing" | "scanning" | "results"

const PHASE_SEQUENCE: { phase: Phase; delay: number }[] = [
  { phase: "done", delay: 2600 },
  { phase: "idle", delay: 500 },
  { phase: "typing", delay: 1600 },
  { phase: "scanning", delay: 1800 },
  { phase: "results", delay: 2000 },
]

const TOTAL_DOCS = 28_742
const TYPING_STEPS = QUERY.length

export function RagSearchMockup() {
  const [phase, setPhase] = useState<Phase>("done")
  const [queryChars, setQueryChars] = useState(QUERY.length)
  const [scanned, setScanned] = useState(TOTAL_DOCS)

  useEffect(() => {
    let cancelled = false
    let i = 0
    let stepTimeout: ReturnType<typeof setTimeout>
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
        setQueryChars(0)
        setScanned(0)
      } else if (step.phase === "typing") {
        setScanned(0)
        setQueryChars(0)
        let c = 0
        const perChar = Math.max(40, Math.floor((step.delay - 200) / TYPING_STEPS))
        inner = setInterval(() => {
          c += 1
          setQueryChars(c)
          if (c >= TYPING_STEPS) clearInner()
        }, perChar)
      } else if (step.phase === "scanning") {
        setQueryChars(TYPING_STEPS)
        const start = performance.now()
        inner = setInterval(() => {
          const t = Math.min(1, (performance.now() - start) / (step.delay - 100))
          const eased = 1 - Math.pow(1 - t, 2)
          setScanned(Math.floor(eased * TOTAL_DOCS))
          if (t >= 1) clearInner()
        }, 40)
      } else {
        setQueryChars(TYPING_STEPS)
        setScanned(TOTAL_DOCS)
      }

      stepTimeout = setTimeout(() => {
        i += 1
        run()
      }, step.delay)
    }

    run()
    return () => {
      cancelled = true
      clearTimeout(stepTimeout)
      clearInner()
    }
  }, [])

  const displayedQuery = QUERY.slice(0, queryChars)
  const scanning = phase === "scanning"
  const resultsVisible = phase === "results" || phase === "done"

  return (
    <WindowFrame title="search.vrgroup.ai">
      <div className="grid h-full grid-cols-[1fr_140px] text-[11px]">
        <section className="flex min-w-0 flex-col overflow-hidden">
          <div className="border-b border-gray-200 p-3">
            <motion.div
              animate={
                scanning
                  ? {
                      boxShadow: [
                        "0 0 0 0 rgba(18,160,198,0)",
                        "0 0 0 4px rgba(18,160,198,0.25)",
                        "0 0 0 0 rgba(18,160,198,0)",
                      ],
                    }
                  : { boxShadow: "0 0 0 0 rgba(18,160,198,0)" }
              }
              transition={{ duration: 1.2, repeat: scanning ? Infinity : 0 }}
              className="flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2"
            >
              <motion.svg
                animate={scanning ? { rotate: [0, 15, -10, 0], scale: [1, 1.15, 1] } : { rotate: 0, scale: 1 }}
                transition={{ duration: 1.1, repeat: scanning ? Infinity : 0 }}
                className="h-3.5 w-3.5 text-blue-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m21 21-4.3-4.3" />
              </motion.svg>
              <span className="min-h-[14px] text-[11px] font-medium text-gray-800">
                {displayedQuery}
                {phase === "typing" && (
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity }}
                    className="ml-0.5 inline-block h-3 w-[1px] -translate-y-[1px] bg-gray-800 align-middle"
                  />
                )}
              </span>
              <span className="ml-auto text-[9px] text-gray-400">
                {scanning
                  ? `${scanned.toLocaleString("es-AR")} docs`
                  : resultsVisible
                    ? `${TOTAL_DOCS.toLocaleString("es-AR")} docs`
                    : ""}
              </span>
            </motion.div>

            <div className="mt-2 h-[2px] overflow-hidden rounded-full bg-gray-100">
              <AnimatePresence>
                {scanning && (
                  <motion.div
                    key="scanbar"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.7, ease: "easeOut" }}
                    className="h-full rounded-full bg-[linear-gradient(90deg,#1f3d8f,#12a0c6)]"
                  />
                )}
              </AnimatePresence>
            </div>

            <div className="mt-2 flex items-center gap-1.5">
              <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[9px] font-medium text-blue-700 ring-1 ring-blue-200">
                Todo
              </span>
              <span className="rounded-full bg-gray-50 px-2 py-0.5 text-[9px] text-gray-600 ring-1 ring-gray-200">
                Docs
              </span>
              <span className="rounded-full bg-gray-50 px-2 py-0.5 text-[9px] text-gray-600 ring-1 ring-gray-200">
                Contratos
              </span>
              <span className="rounded-full bg-gray-50 px-2 py-0.5 text-[9px] text-gray-600 ring-1 ring-gray-200">
                Runbooks
              </span>
              <span className="ml-auto text-[9px] text-gray-400">
                {resultsVisible ? "3 resultados · 280ms" : scanning ? "buscando…" : ""}
              </span>
            </div>
          </div>

          <div className="relative flex-1 overflow-hidden p-3">
            <AnimatePresence>
              {scanning && (
                <motion.div
                  key="scanline"
                  initial={{ top: "0%" }}
                  animate={{ top: "100%" }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.6, ease: "linear", repeat: Infinity }}
                  className="pointer-events-none absolute left-0 right-0 z-10 h-8 bg-[linear-gradient(180deg,rgba(18,160,198,0)_0%,rgba(18,160,198,0.25)_50%,rgba(18,160,198,0)_100%)]"
                />
              )}
            </AnimatePresence>

            <div className="space-y-2">
              <AnimatePresence mode="popLayout">
                {resultsVisible &&
                  results.map((r, i) => (
                    <motion.div
                      key={r.title}
                      initial={{ opacity: 0, y: 12, scale: 0.96 }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        scale: phase === "results" ? [0.96, 1.02, 1] : 1,
                      }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{
                        duration: 0.5,
                        delay: phase === "results" ? i * 0.2 : 0,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="rounded-lg border border-gray-200 bg-white p-2.5"
                    >
                      <div className="text-[11px] font-semibold text-gray-900">{r.title}</div>
                      <p className="mt-1 text-[10px] leading-relaxed text-gray-600">{r.snippet}</p>
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          delay: phase === "results" ? i * 0.2 + 0.3 : 0,
                          type: "spring",
                          stiffness: 500,
                          damping: 22,
                        }}
                        className="mt-1.5 inline-flex items-center gap-1 rounded-md bg-blue-50 px-1.5 py-0.5 text-[9px] font-medium text-blue-700"
                      >
                        <span>📄</span>
                        <span className="font-mono">{r.source}</span>
                      </motion.div>
                    </motion.div>
                  ))}
              </AnimatePresence>

              {scanning && (
                <>
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={`skel-${i}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0.4, 0.9, 0.4] }}
                      transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        delay: i * 0.15,
                      }}
                      className="rounded-lg border border-gray-200 bg-white p-2.5"
                    >
                      <div className="h-2 w-2/3 rounded bg-gray-200" />
                      <div className="mt-1.5 h-1.5 w-full rounded bg-gray-100" />
                      <div className="mt-1 h-1.5 w-4/5 rounded bg-gray-100" />
                    </motion.div>
                  ))}
                </>
              )}
            </div>
          </div>
        </section>

        <aside className="border-l border-gray-200 bg-gray-50 p-3">
          <div className="mb-2 text-[9px] font-semibold uppercase tracking-wider text-gray-500">
            Fuentes conectadas
          </div>
          <div className="space-y-1.5">
            {sources.map((s, i) => (
              <motion.div
                key={s.name}
                animate={
                  scanning
                    ? {
                        backgroundColor: ["#ffffff", "#eff6ff", "#ffffff"],
                        borderColor: ["#e5e7eb", "#bfdbfe", "#e5e7eb"],
                        scale: [1, 1.03, 1],
                      }
                    : { backgroundColor: "#ffffff", borderColor: "#e5e7eb", scale: 1 }
                }
                transition={{
                  duration: 1.1,
                  repeat: scanning ? Infinity : 0,
                  delay: i * 0.15,
                  ease: "easeInOut",
                }}
                className="rounded-md border bg-white px-2 py-1.5"
              >
                <div className="flex items-center gap-1.5">
                  <motion.span
                    animate={
                      scanning
                        ? { scale: [1, 1.6, 1], opacity: [1, 0.6, 1] }
                        : { scale: 1, opacity: 1 }
                    }
                    transition={{
                      duration: 0.9,
                      repeat: scanning ? Infinity : 0,
                      delay: i * 0.12,
                    }}
                    className="h-1.5 w-1.5 rounded-full bg-emerald-500"
                  />
                  <span className="text-[10px] font-medium text-gray-800">{s.name}</span>
                </div>
                <div className="mt-0.5 text-[9px] text-gray-500">{s.count}</div>
              </motion.div>
            ))}
          </div>
          <div className="mt-3 rounded-md border border-dashed border-gray-300 px-2 py-1.5 text-center text-[9px] text-gray-500">
            + Conectar fuente
          </div>
        </aside>
      </div>
    </WindowFrame>
  )
}
