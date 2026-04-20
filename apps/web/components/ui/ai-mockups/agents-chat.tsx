"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { WindowFrame } from "./frame"

const agents = [
  { name: "Sales Copilot", status: "online", initials: "SC" },
  { name: "Support Bot", status: "online", initials: "SB" },
  { name: "SDR Agent", status: "idle", initials: "SD" },
  { name: "Ops Assistant", status: "offline", initials: "OA" },
]

type Phase = "idle" | "user" | "typing" | "reply" | "tool" | "done"

const PHASE_SEQUENCE: { phase: Phase; delay: number }[] = [
  { phase: "done", delay: 2400 },
  { phase: "idle", delay: 500 },
  { phase: "user", delay: 900 },
  { phase: "typing", delay: 1400 },
  { phase: "reply", delay: 1600 },
  { phase: "tool", delay: 1100 },
]

export function AgentsChatMockup() {
  const [phase, setPhase] = useState<Phase>("done")

  useEffect(() => {
    let cancelled = false
    let i = 0
    let timeout: ReturnType<typeof setTimeout>

    const tick = () => {
      if (cancelled) return
      const step = PHASE_SEQUENCE[i % PHASE_SEQUENCE.length]
      setPhase(step.phase)
      timeout = setTimeout(() => {
        i += 1
        tick()
      }, step.delay)
    }

    tick()
    return () => {
      cancelled = true
      clearTimeout(timeout)
    }
  }, [])

  const showUser = phase !== "idle"
  const showTyping = phase === "typing"
  const showReply = phase === "reply" || phase === "tool" || phase === "done"
  const showTool = phase === "tool" || phase === "done"
  const agentActive = phase === "typing" || phase === "reply" || phase === "tool"

  return (
    <WindowFrame title="copilot.vrgroup.ai — Sales Copilot">
      <div className="grid h-full grid-cols-[140px_1fr] text-[11px]">
        <aside className="border-r border-gray-200 bg-gray-50 p-2">
          <div className="mb-2 px-1 text-[9px] font-semibold uppercase tracking-wider text-gray-400">
            Agentes
          </div>
          <div className="space-y-1">
            {agents.map((a, i) => {
              const isActiveAgent = i === 0 && agentActive
              return (
                <motion.div
                  key={a.name}
                  animate={
                    isActiveAgent
                      ? { scale: 1.04, boxShadow: "0 0 0 2px rgba(18,160,198,0.35)" }
                      : { scale: 1, boxShadow: "0 0 0 0px rgba(18,160,198,0)" }
                  }
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className={`flex items-center gap-2 rounded-md px-2 py-1.5 ${
                    i === 0 ? "bg-white ring-1 ring-gray-200" : "text-gray-600"
                  }`}
                >
                  <div className="relative">
                    <motion.div
                      animate={isActiveAgent ? { rotate: [0, -4, 4, 0] } : { rotate: 0 }}
                      transition={{
                        duration: 0.6,
                        repeat: isActiveAgent ? Infinity : 0,
                        ease: "easeInOut",
                      }}
                      className="flex h-6 w-6 items-center justify-center rounded-md bg-[linear-gradient(120deg,#0f1729,#1f3d8f,#12a0c6)] text-[9px] font-bold text-white"
                    >
                      {a.initials}
                    </motion.div>
                    <span
                      className={`absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full ring-2 ring-gray-50 ${
                        a.status === "online"
                          ? "bg-emerald-500"
                          : a.status === "idle"
                            ? "bg-amber-400"
                            : "bg-gray-300"
                      }`}
                    />
                  </div>
                  <span className="truncate text-[10px] font-medium text-gray-800">{a.name}</span>
                </motion.div>
              )
            })}
          </div>
        </aside>

        <section className="flex min-w-0 flex-col">
          <div className="flex items-center justify-between border-b border-gray-200 px-4 py-2">
            <div>
              <div className="text-[11px] font-semibold text-gray-900">Sales Copilot</div>
              <div className="text-[9px] text-gray-500">Conectado a Salesforce · HubSpot</div>
            </div>
            <motion.span
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-medium text-emerald-700 ring-1 ring-emerald-200"
            >
              ● Activo
            </motion.span>
          </div>

          <div className="flex-1 space-y-3 overflow-hidden px-4 py-3">
            <AnimatePresence mode="popLayout">
              {showUser && (
                <motion.div
                  key="user-msg"
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: phase === "user" ? [0.8, 1.08, 1] : 1,
                  }}
                  exit={{ opacity: 0, y: -8, scale: 0.95 }}
                  transition={{
                    duration: 0.5,
                    ease: [0.16, 1, 0.3, 1],
                    scale: { duration: 0.55, times: [0, 0.6, 1] },
                  }}
                  className="flex justify-end"
                >
                  <motion.div
                    animate={
                      phase === "user"
                        ? { boxShadow: ["0 0 0 0 rgba(37,99,235,0)", "0 0 0 8px rgba(37,99,235,0.15)", "0 0 0 0 rgba(37,99,235,0)"] }
                        : {}
                    }
                    transition={{ duration: 0.9 }}
                    className="max-w-[80%] rounded-lg rounded-tr-sm bg-blue-600 px-3 py-2 text-[10px] text-white shadow-sm"
                  >
                    Prepará un resumen del lead ACME S.A. y creá un contacto en Salesforce.
                  </motion.div>
                </motion.div>
              )}

              {showTyping && (
                <motion.div
                  key="typing"
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-start gap-2"
                >
                  <motion.div
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }}
                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[linear-gradient(120deg,#0f1729,#1f3d8f,#12a0c6)] text-[9px] font-bold text-white shadow-[0_0_0_4px_rgba(18,160,198,0.18)]"
                  >
                    SC
                  </motion.div>
                  <div className="flex items-center gap-1 rounded-lg rounded-tl-sm bg-gray-100 px-3 py-2">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="h-1.5 w-1.5 rounded-full bg-gray-400"
                        animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4], scale: [1, 1.4, 1] }}
                        transition={{
                          duration: 0.8,
                          repeat: Infinity,
                          delay: i * 0.14,
                          ease: "easeInOut",
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}

              {showReply && (
                <motion.div
                  key="bot-reply"
                  initial={{ opacity: 0, y: 16, scale: 0.85 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: phase === "reply" ? [0.85, 1.05, 1] : 1,
                  }}
                  exit={{ opacity: 0, y: -8, scale: 0.95 }}
                  transition={{
                    duration: 0.5,
                    ease: [0.16, 1, 0.3, 1],
                    scale: { duration: 0.55, times: [0, 0.6, 1] },
                  }}
                  className="flex items-start gap-2"
                >
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[linear-gradient(120deg,#0f1729,#1f3d8f,#12a0c6)] text-[9px] font-bold text-white">
                    SC
                  </div>
                  <div className="max-w-[85%] space-y-2">
                    <motion.div
                      animate={
                        phase === "reply"
                          ? { boxShadow: ["0 0 0 0 rgba(18,160,198,0)", "0 0 0 6px rgba(18,160,198,0.25)", "0 0 0 0 rgba(18,160,198,0)"] }
                          : {}
                      }
                      transition={{ duration: 0.9 }}
                      className="rounded-lg rounded-tl-sm bg-gray-100 px-3 py-2 text-[10px] leading-relaxed text-gray-800"
                    >
                      ACME S.A. — industria logística, 320 empleados. Último contacto hace 12 días.
                      Oportunidad estimada: US$ 85K ARR.
                    </motion.div>

                    <AnimatePresence>
                      {showTool && (
                        <motion.div
                          key="tool-chip"
                          initial={{ opacity: 0, scale: 0.6, y: 8 }}
                          animate={{
                            opacity: 1,
                            scale: phase === "tool" ? [0.6, 1.2, 1] : 1,
                            y: 0,
                          }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{
                            duration: 0.6,
                            ease: [0.16, 1, 0.3, 1],
                            scale: { duration: 0.6, times: [0, 0.55, 1] },
                          }}
                          className="relative inline-flex items-center gap-1.5 rounded-md border border-blue-200 bg-blue-50 px-2 py-1 text-[9px] font-medium text-blue-800"
                        >
                          {phase === "tool" && (
                            <motion.span
                              initial={{ opacity: 0.6, scale: 1 }}
                              animate={{ opacity: 0, scale: 1.6 }}
                              transition={{ duration: 0.9, ease: "easeOut" }}
                              className="absolute inset-0 -z-0 rounded-md bg-blue-400/40"
                            />
                          )}
                          <span className="relative">🔧</span>
                          <code className="relative font-mono">Salesforce.createLead(&quot;ACME S.A.&quot;)</code>
                          <motion.span
                            initial={{ scale: 0, rotate: -45 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{
                              delay: 0.35,
                              type: "spring",
                              stiffness: 600,
                              damping: 18,
                            }}
                            className="relative rounded bg-emerald-100 px-1 py-0.5 text-[8px] font-semibold text-emerald-700"
                          >
                            OK
                          </motion.span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="border-t border-gray-200 bg-gray-50 px-4 py-2">
            <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-1.5">
              <span className="text-[10px] text-gray-400">Escribí un mensaje…</span>
              <div className="ml-auto h-5 w-5 rounded-md bg-[linear-gradient(120deg,#0f1729,#1f3d8f,#12a0c6)]" />
            </div>
          </div>
        </section>
      </div>
    </WindowFrame>
  )
}
