import type { ReactNode } from "react"
import type { CSSProperties } from "react"

interface HeroProps {
  title: ReactNode
  subtitle?: ReactNode
  eyebrow?: ReactNode
  children?: ReactNode
  backgroundImage?: string
  alignment?: "left" | "center"
  minHeight?: string
  backgroundSize?: string
  style?: CSSProperties
  className?: string
}

export function Hero({
  title,
  subtitle,
  eyebrow,
  children,
  backgroundImage,
  alignment = "center",
  minHeight,
  backgroundSize = "cover",
  style,
  className = "",
}: HeroProps) {
  const minH = minHeight ?? "700px"
  return (
    <section
      className={`relative flex items-center justify-center overflow-hidden ${className}`}
      style={
        backgroundImage
          ? {
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize,
              backgroundPosition: "center",
              minHeight: minH,
              ...style,
            }
          : { minHeight: minH, ...style }
      }
    >
      {backgroundImage ? (
        // Overlay azul suave para contraste sin opacar la foto
        <div className="absolute inset-0 bg-[#01042d]/55"></div>
      ) : (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-[#0b1b33] via-[#0f2d4a] to-[#060d1d]" />
          <div className="pointer-events-none absolute -left-32 -top-20 h-80 w-80 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,90,95,0.25),transparent_60%)] blur-3xl opacity-80" />
          <div className="pointer-events-none absolute -right-16 bottom-0 h-96 w-96 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,122,127,0.2),transparent_55%)] blur-3xl opacity-80" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.06),transparent_65%)]" />
        </>
      )}

      {/* Content */}
      <div
        className={`relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 ${alignment === "center" ? "text-center" : "text-left"}`}
      >
        {eyebrow && (
          <div className={`mb-4 ${alignment === "center" ? "justify-center" : ""} flex`}>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/80 backdrop-blur">
              {eyebrow}
            </div>
          </div>
        )}
        <h1 className="font-display font-bold text-white text-4xl sm:text-5xl lg:text-6xl mb-6 leading-tight drop-shadow-lg">
          {title}
        </h1>
        {subtitle && (
          <p className="text-white text-lg sm:text-xl max-w-2xl mx-auto mb-8 opacity-95 drop-shadow">{subtitle}</p>
        )}
        {children}
      </div>
    </section>
  )
}
