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
      className="relative min-h-[500px] md:min-h-[600px] flex items-center justify-center overflow-hidden"
      style={
        backgroundImage
          ? { backgroundImage: `url(${backgroundImage})`, backgroundSize: "cover", backgroundPosition: "center" }
          : {}
      }
    >
      {/* Dark base overlay for contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-transparent"></div>

      {/* Vibrant coral to blue gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#FF5A5F] via-[#FF5A5F]/70 to-[#0B1B33] opacity-85"></div>

      {/* Radial accent in top right for depth */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-radial from-[#FF7A7F]/30 to-transparent rounded-full blur-3xl opacity-60"></div>

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
