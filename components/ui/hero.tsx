import type { ReactNode } from "react"

interface HeroProps {
  title: string
  subtitle?: string
  children?: ReactNode
  backgroundImage?: string
  alignment?: "left" | "center"
}

export function Hero({ title, subtitle, children, backgroundImage, alignment = "center" }: HeroProps) {
  return (
    <section
      className="relative min-h-[620px] md:min-h-[720px] flex items-center justify-center overflow-hidden"
      style={
        backgroundImage
          ? { backgroundImage: `url(${backgroundImage})`, backgroundSize: "cover", backgroundPosition: "center" }
          : {}
      }
    >
      {/* Overlay azul suave para contraste sin opacar la foto */}
      <div className="absolute inset-0 bg-[#01042d]/55"></div>

      {/* Content */}
      <div
        className={`relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 ${alignment === "center" ? "text-center" : "text-left"}`}
      >
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
