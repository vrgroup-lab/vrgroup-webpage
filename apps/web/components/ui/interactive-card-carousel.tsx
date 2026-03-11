"use client"

import { useMemo, useRef, useState } from "react"
import { ArrowLeft, ArrowRight, RefreshCw } from "lucide-react"

export interface InteractiveCardItem {
  title: string
  description: string
  tags?: string[]
}

export function InteractiveCardCarousel({
  items,
  className = "",
  accent = "#FF5A5F",
}: {
  items: InteractiveCardItem[]
  className?: string
  accent?: string
}) {
  const scrollerRef = useRef<HTMLDivElement | null>(null)
  const [flipped, setFlipped] = useState<Record<number, boolean>>({})

  const accentStyles = useMemo(
    () => ({
      background: `linear-gradient(135deg, ${accent}, ${lightenHex(accent, 20)})`,
      boxShadow: `0 12px 30px ${accent}33`,
    }),
    [accent]
  )

  const scroll = (direction: "left" | "right") => {
    const node = scrollerRef.current
    if (!node) return
    const amount = node.clientWidth * 0.8
    node.scrollBy({ left: direction === "left" ? -amount : amount, behavior: "smooth" })
  }

  const toggleCard = (idx: number) => {
    setFlipped((prev) => ({ ...prev, [idx]: !prev[idx] }))
  }

  const resetCard = (idx: number) => {
    setFlipped((prev) => ({ ...prev, [idx]: false }))
  }

  return (
    <div className={`relative ${className}`}>
      <div className="flex items-center justify-between gap-3 mb-4">
        <p className="text-sm text-gray-500">Toca o pasa el cursor sobre las tarjetas para ver más detalle.</p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => scroll("left")}
            className="h-10 w-10 rounded-full border border-gray-200 bg-white text-blue-dark hover:border-gray-300 hover:-translate-y-0.5 transition-all shadow-sm"
            aria-label="Desplazar a la izquierda"
          >
            <ArrowLeft size={18} className="mx-auto" />
          </button>
          <button
            type="button"
            onClick={() => scroll("right")}
            className="h-10 w-10 rounded-full border border-gray-200 bg-white text-blue-dark hover:border-gray-300 hover:-translate-y-0.5 transition-all shadow-sm"
            aria-label="Desplazar a la derecha"
          >
            <ArrowRight size={18} className="mx-auto" />
          </button>
        </div>
      </div>

      <div
        ref={scrollerRef}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 [-ms-overflow-style:none] [scrollbar-width:none]"
        style={{ scrollbarWidth: "none" }}
      >
        {items.map((item, idx) => {
          const isFlipped = flipped[idx]
          const initials = item.title.slice(0, 2).toUpperCase()
          return (
            <div
              key={item.title}
              className="group relative min-w-[260px] max-w-[360px] w-full snap-start pb-2 cursor-pointer"
              onMouseLeave={() => resetCard(idx)}
              onMouseEnter={() => setFlipped((prev) => ({ ...prev, [idx]: true }))}
              onClick={() => toggleCard(idx)}
            >
              <div className="h-full min-h-[380px] sm:min-h-[400px] [perspective:1400px]">
                <div
                  className={`relative h-full transition-transform duration-700 [transform-style:preserve-3d] ${
                    isFlipped ? "[transform:rotateY(180deg)]" : ""
                  }`}
                >
                  <div className="absolute inset-0 rounded-2xl border border-white/10 bg-[#0b1224] shadow-[0_14px_36px_rgba(6,12,30,0.4)] p-6 text-white [backface-visibility:hidden] [-webkit-backface-visibility:hidden] group-hover:-translate-y-1 group-hover:shadow-[0_20px_48px_rgba(6,12,30,0.55)] transition-transform duration-500 overflow-hidden">
                    <div
                      className="absolute inset-0 opacity-90"
                      aria-hidden
                      style={{
                        backgroundImage:
                          "radial-gradient(circle at 50% 30%, rgba(255,90,95,0.18), transparent 38%), radial-gradient(circle at 45% 70%, rgba(12,182,255,0.16), transparent 40%), linear-gradient(135deg, rgba(11,27,51,0.92) 0%, rgba(11,27,51,0.85) 55%, rgba(17,40,73,0.9) 100%), repeating-linear-gradient(0deg, rgba(255,255,255,0.06), rgba(255,255,255,0.06) 1px, transparent 1px, transparent 28px), repeating-linear-gradient(90deg, rgba(255,255,255,0.06), rgba(255,255,255,0.06) 1px, transparent 1px, transparent 28px)",
                      }}
                    />
                    <div className="relative flex flex-col items-center justify-center gap-6 h-full text-center">
                      <h3 className="font-display font-semibold text-2xl text-white leading-tight drop-shadow-[0_6px_20px_rgba(0,0,0,0.35)]">
                        {item.title}
                      </h3>
                      <div
                        className="h-14 w-14 rounded-2xl text-white flex items-center justify-center font-bold text-base"
                        style={accentStyles}
                        aria-label="Ícono del servicio"
                      >
                        {initials}
                      </div>
                      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                    </div>
                  </div>

                  <div
                    className="absolute inset-0 rounded-2xl border border-[#0B1B33]/40 bg-gradient-to-br from-[#0B1B33] via-[#0E1A36] to-[#111c3f] text-white p-6 [transform:rotateY(180deg)] [backface-visibility:hidden] [-webkit-backface-visibility:hidden] shadow-lg"
                    style={{ boxShadow: "0 18px 40px rgba(6,12,30,0.35)" }}
                  >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <h3 className="font-display font-semibold text-lg leading-tight">{item.title}</h3>
                      <p className="text-xs text-white/70 mt-1">Detalle</p>
                    </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          resetCard(idx)
                        }}
                        className="h-9 w-9 rounded-lg border border-white/20 bg-white/10 text-white hover:bg-white/20 transition-colors flex items-center justify-center"
                        aria-label="Volver al frente"
                      >
                        <RefreshCw size={16} />
                      </button>
                    </div>
                    <p className="text-sm text-white/90 mb-4 leading-relaxed">{item.description}</p>
                    {item.tags?.length ? (
                      <div className="flex flex-wrap gap-2">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold border border-white/20"
                          >
                            {tag}
                            </span>
                          ))}
                        </div>
                      ) : null}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function lightenHex(hex: string, percent: number) {
  const sanitized = hex.replace("#", "")
  if (sanitized.length < 6) return hex
  const num = parseInt(sanitized, 16)
  if (Number.isNaN(num)) return hex
  const r = Math.min(255, (num >> 16) + Math.round((255 * percent) / 100))
  const g = Math.min(255, ((num >> 8) & 0x00ff) + Math.round((255 * percent) / 100))
  const b = Math.min(255, (num & 0x0000ff) + Math.round((255 * percent) / 100))
  return `#${(r << 16 | g << 8 | b).toString(16).padStart(6, "0")}`
}
