import type { ReactNode } from "react"
import type { CSSProperties } from "react"
import { TypewriterText } from "@/components/ui/typewriter-text"

interface HeroProps {
  title: ReactNode
  subtitle?: ReactNode
  eyebrow?: ReactNode
  children?: ReactNode
  backgroundImage?: string
  backgroundVideo?: string
  overlayImage?: string
  overlayClassName?: string
  overlayPosition?: string
  alignment?: "left" | "center"
  minHeight?: string
  backgroundSize?: string
  style?: CSSProperties
  className?: string
  variant?: "default" | "services"
  subtitleClassName?: string
}

export function Hero({
  title,
  subtitle,
  eyebrow,
  children,
  backgroundImage,
  backgroundVideo,
  overlayImage,
  overlayClassName = "opacity-30 mix-blend-screen",
  overlayPosition = "center",
  alignment = "center",
  minHeight,
  backgroundSize = "cover",
  style,
  className = "",
  variant = "default",
  subtitleClassName = "",
}: HeroProps) {
  const minH = minHeight ?? "520px"
  return (
    <section
      className={`relative flex items-center justify-center overflow-hidden ${className}`}
      style={
        backgroundImage && !backgroundVideo
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
      {backgroundVideo ? (
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src={backgroundVideo}
          autoPlay
          muted
          loop
          playsInline
        />
      ) : null}
      {backgroundImage || backgroundVideo ? (
        // Overlay azul suave para contraste sin opacar la foto/video
        <div className="absolute inset-0 bg-[#01042d]/55"></div>
      ) : (
        <>
          <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0b1b33] to-[#0c2f5c]" />
          <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05),transparent_60%)] blur-3xl opacity-70" />
          <div className="pointer-events-none absolute right-[-60px] bottom-[-80px] h-96 w-96 rounded-full bg-[radial-gradient(circle_at_center,rgba(0,153,255,0.16),transparent_60%)] blur-3xl opacity-80" />
        </>
      )}
      {overlayImage && (
        <div
          className={`absolute inset-0 bg-center bg-cover ${overlayClassName}`}
          style={{ backgroundImage: `url(${overlayImage})`, backgroundPosition: overlayPosition }}
        />
      )}

      {/* Content */}
      <div
        className={`relative z-10 max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 py-20 ${alignment === "center" ? "text-center" : "text-left"}`}
      >
        {eyebrow && (
          <div className={`mb-4 ${alignment === "center" ? "justify-center" : ""} flex`}>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/80 backdrop-blur">
              {eyebrow}
            </div>
          </div>
        )}
        {variant === "services" ? (
          <div className="space-y-2">
            <h1 className="font-display font-black text-white text-3xl sm:text-4xl lg:text-[2.9rem] leading-tight drop-shadow-lg">
              {title}
            </h1>
            {subtitle && (
              <p className="font-display font-black text-white text-2xl sm:text-[2.2rem] lg:text-[2.4rem] opacity-70 leading-tight drop-shadow">
                {typeof subtitle === "string" ? <TypewriterText text={subtitle} /> : subtitle}
              </p>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            <h1 className="font-display font-bold text-white text-4xl sm:text-5xl lg:text-6xl leading-tight drop-shadow-lg">
              {title}
            </h1>
            {subtitle && (
              <p className={`text-white text-lg sm:text-xl max-w-3xl mx-auto opacity-90 drop-shadow ${subtitleClassName}`}>
                {subtitle}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  )
}
