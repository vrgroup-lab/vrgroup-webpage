"use client"

import { useEffect, useState } from "react"
import { motion } from "motion/react"
import { WindowFrame } from "./frame"

const features = [
  { name: "precio_promedio", weight: 0.32 },
  { name: "estacionalidad_q4", weight: 0.24 },
  { name: "stock_canal", weight: 0.18 },
  { name: "campaña_activa", weight: 0.14 },
]

type Phase = "idle" | "history" | "predict" | "done"

const PHASE_SEQUENCE: { phase: Phase; delay: number }[] = [
  { phase: "done", delay: 3000 },
  { phase: "idle", delay: 500 },
  { phase: "history", delay: 1400 },
  { phase: "predict", delay: 1600 },
]

export function MlForecastMockup() {
  const [phase, setPhase] = useState<Phase>("done")
  const [mape, setMape] = useState(4.2)
  const [r2, setR2] = useState(0.94)
  const [rmse, setRmse] = useState(112)

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

    const tickCounters = (duration: number) => {
      const start = performance.now()
      setMape(0)
      setR2(0)
      setRmse(0)
      inner = setInterval(() => {
        const t = Math.min(1, (performance.now() - start) / duration)
        const eased = 1 - Math.pow(1 - t, 2)
        setMape(Number((eased * 4.2).toFixed(1)))
        setR2(Number((eased * 0.94).toFixed(2)))
        setRmse(Math.floor(eased * 112))
        if (t >= 1) clearInner()
      }, 30)
    }

    const run = () => {
      if (cancelled) return
      const step = PHASE_SEQUENCE[i % PHASE_SEQUENCE.length]
      clearInner()
      setPhase(step.phase)

      if (step.phase === "idle") {
        setMape(0)
        setR2(0)
        setRmse(0)
      } else if (step.phase === "predict") {
        tickCounters(step.delay - 200)
      } else if (step.phase === "done") {
        setMape(4.2)
        setR2(0.94)
        setRmse(112)
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

  const showHistory = phase === "history" || phase === "predict" || phase === "done"
  const showPredict = phase === "predict" || phase === "done"
  const showFeatures = phase === "done" || phase === "predict"

  return (
    <WindowFrame title="forecast.vrgroup.ai — Demanda Q2 2026">
      <div className="flex h-full flex-col p-3 text-[11px]">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-[11px] font-semibold text-gray-900">
              Forecast de demanda · producto A
            </div>
            <div className="text-[9px] text-gray-500">XGBoost · entrenado 2026-04-15</div>
          </div>
          <div className="flex gap-1">
            <span className="rounded-md bg-gray-100 px-2 py-0.5 text-[9px] font-medium text-gray-700">
              30d
            </span>
            <motion.span
              animate={
                phase === "predict"
                  ? { boxShadow: ["0 0 0 0 rgba(37,99,235,0)", "0 0 0 4px rgba(37,99,235,0.35)", "0 0 0 0 rgba(37,99,235,0)"] }
                  : {}
              }
              transition={{ duration: 1.1, repeat: Infinity }}
              className="rounded-md bg-blue-600 px-2 py-0.5 text-[9px] font-medium text-white"
            >
              90d
            </motion.span>
            <span className="rounded-md bg-gray-100 px-2 py-0.5 text-[9px] font-medium text-gray-700">
              1y
            </span>
          </div>
        </div>

        <div className="mt-2 grid grid-cols-3 gap-2">
          <MetricTile
            label="MAPE"
            value={`${mape.toFixed(1)}%`}
            trend="-0.3"
            highlight={phase === "predict"}
          />
          <MetricTile
            label="R²"
            value={r2.toFixed(2)}
            trend="+0.02"
            highlight={phase === "predict"}
          />
          <MetricTile
            label="RMSE"
            value={`${rmse}`}
            trend="-8"
            highlight={phase === "predict"}
          />
        </div>

        <div className="mt-2 flex-1 rounded-lg border border-gray-200 bg-gray-50 p-2">
          <svg viewBox="0 0 300 110" className="h-full w-full" preserveAspectRatio="none">
            <defs>
              <linearGradient id="ml-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#12a0c6" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#12a0c6" stopOpacity="0" />
              </linearGradient>
            </defs>
            {[0, 1, 2, 3].map((i) => (
              <line
                key={i}
                x1="0"
                x2="300"
                y1={20 + i * 25}
                y2={20 + i * 25}
                stroke="#e5e7eb"
                strokeDasharray="2 3"
              />
            ))}

            <motion.path
              d="M 0 80 L 20 72 L 40 78 L 60 65 L 80 70 L 100 58 L 120 62 L 140 50 L 160 55 L 180 45"
              fill="none"
              stroke="#0f1729"
              strokeWidth="1.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: showHistory ? 1 : 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />

            {showPredict && (
              <motion.path
                key={`pred-${phase}`}
                d="M 180 45 C 195 40, 210 38, 225 35 C 240 32, 260 28, 280 22 L 300 18"
                fill="none"
                stroke="#12a0c6"
                strokeWidth="2.5"
                strokeDasharray="3 2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.1, ease: "easeOut", delay: phase === "predict" ? 0.2 : 0 }}
              />
            )}

            {showPredict && (
              <motion.path
                d="M 180 52 C 200 46, 220 42, 240 36 C 260 30, 280 22, 300 14 L 300 28 C 280 36, 260 42, 240 48 C 220 54, 200 58, 180 58 Z"
                fill="url(#ml-grad)"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: phase === "predict" ? 0.9 : 0 }}
              />
            )}

            {showHistory && (
              <>
                <line x1="180" x2="180" y1="15" y2="100" stroke="#9ca3af" strokeDasharray="2 2" strokeWidth="0.5" />
                <text x="184" y="20" fontSize="7" fill="#6b7280">
                  hoy
                </text>
              </>
            )}

            {showPredict && (
              <motion.circle
                cx="300"
                cy="18"
                r="2.5"
                fill="#12a0c6"
                initial={{ scale: 0 }}
                animate={{ scale: [0, 2, 1] }}
                transition={{
                  duration: 0.8,
                  delay: phase === "predict" ? 1.2 : 0,
                  times: [0, 0.6, 1],
                }}
              />
            )}
          </svg>
        </div>

        <div className="mt-2 rounded-lg border border-gray-200 bg-white">
          <div className="border-b border-gray-200 px-2 py-1 text-[9px] font-semibold uppercase tracking-wider text-gray-500">
            Top features
          </div>
          <div className="space-y-1 p-2">
            {features.map((f, i) => (
              <div key={f.name} className="flex items-center gap-2">
                <span className="w-24 truncate font-mono text-[9px] text-gray-700">{f.name}</span>
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-gray-100">
                  <motion.div
                    className="h-full rounded-full bg-[linear-gradient(90deg,#1f3d8f,#12a0c6)]"
                    initial={{ width: "0%" }}
                    animate={{ width: showFeatures ? `${f.weight * 100}%` : "0%" }}
                    transition={{
                      duration: 0.8,
                      delay: phase === "predict" ? 0.4 + i * 0.12 : 0,
                      ease: "easeOut",
                    }}
                  />
                </div>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: showFeatures ? 1 : 0 }}
                  transition={{ delay: phase === "predict" ? 0.6 + i * 0.12 : 0 }}
                  className="w-8 text-right font-mono text-[9px] text-gray-600"
                >
                  {f.weight.toFixed(2)}
                </motion.span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </WindowFrame>
  )
}

function MetricTile({
  label,
  value,
  trend,
  highlight,
}: {
  label: string
  value: string
  trend: string
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
      <div className="text-[9px] font-medium text-emerald-600">{trend}</div>
    </motion.div>
  )
}
