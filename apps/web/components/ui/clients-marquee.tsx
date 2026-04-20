import Image from "next/image"
import { logoAltFromPath } from "@/lib/logos"

type Variant = "card" | "minimal"

interface ClientsMarqueeProps {
  logos: string[]
  speedMs?: number
  variant?: Variant
  rows?: 1 | 2
  fadeEdges?: boolean
}

function Row({
  logos,
  reverse,
  speedMs,
  variant,
}: {
  logos: string[]
  reverse: boolean
  speedMs: number
  variant: Variant
}) {
  const repeated = [...logos, ...logos, ...logos]
  const tileClass =
    variant === "card"
      ? "flex-shrink-0 w-[140px] sm:w-[155px] lg:w-[170px] h-[68px] sm:h-[76px] lg:h-[84px] rounded-xl bg-white border border-white/10 flex items-center justify-center p-3 sm:p-3.5"
      : "flex-shrink-0 w-[100px] sm:w-[120px] lg:w-[130px] h-[44px] sm:h-[52px] lg:h-[58px] flex items-center justify-center"
  const imgClass =
    variant === "card"
      ? "w-auto h-auto max-h-full max-w-full object-contain"
      : "w-auto h-auto max-h-full max-w-full object-contain opacity-70 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-300"
  const gap = variant === "card" ? "gap-3 sm:gap-4" : "gap-10 sm:gap-14 lg:gap-16"

  return (
    <div className="overflow-hidden" style={{ contain: "layout paint", isolation: "isolate" }}>
      <div
        className={`flex items-center ${gap} hover:[animation-play-state:paused]`}
        style={{
          animation: `marquee ${speedMs}ms linear infinite`,
          animationDirection: reverse ? "reverse" : "normal",
          willChange: "transform",
          width: "max-content",
        }}
      >
        {repeated.map((logo, idx) => (
          <div key={`${logo}-${idx}`} className={tileClass}>
            <Image
              src={logo}
              alt={logoAltFromPath(logo)}
              width={160}
              height={60}
              className={imgClass}
              sizes={variant === "card" ? "170px" : "130px"}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export function ClientsMarquee({
  logos,
  speedMs = 70000,
  variant = "card",
  rows = 2,
  fadeEdges = false,
}: ClientsMarqueeProps) {
  if (!logos || logos.length === 0) return null

  const content =
    rows === 1 ? (
      <Row logos={logos} reverse={false} speedMs={speedMs} variant={variant} />
    ) : (
      (() => {
        const mid = Math.ceil(logos.length / 2)
        const rowA = logos.slice(0, mid)
        const rowB = logos.slice(mid).length > 0 ? logos.slice(mid) : logos
        return (
          <div className="flex flex-col gap-3 sm:gap-4">
            <Row logos={rowA} reverse={false} speedMs={speedMs} variant={variant} />
            <Row logos={rowB} reverse speedMs={speedMs} variant={variant} />
          </div>
        )
      })()
    )

  if (!fadeEdges) return content
  return (
    <div
      className="relative"
      style={{
        maskImage:
          "linear-gradient(to right, transparent 0, #000 80px, #000 calc(100% - 80px), transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0, #000 80px, #000 calc(100% - 80px), transparent 100%)",
      }}
    >
      {content}
    </div>
  )
}
