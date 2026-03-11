import Image from "next/image"
import { logoAltFromPath } from "@/lib/logos"

interface LogoGridProps {
  logos: string[]
  columns?: number
  title?: string
  subtitle?: string
  variant?: "light" | "dark"
}

export function LogoGrid({ logos, columns = 5, title, subtitle, variant = "light" }: LogoGridProps) {
  if (!logos || logos.length === 0) return null

  const gridCols = columns === 4 ? "md:grid-cols-4" : "md:grid-cols-5"
  const titleColor = variant === "dark" ? "text-white" : "text-blue-dark"
  const subtitleColor = variant === "dark" ? "text-gray-300" : "text-gray-600"
  const cardBg = variant === "dark" ? "bg-white/5 border-white/10" : "bg-white border-gray-200"
  const hoverBorder = variant === "dark" ? "hover:border-[#FF7A7F]/60" : "hover:border-[#FF5A5F]"

  return (
    <div className="space-y-6">
      {(title || subtitle) && (
        <div className="text-center space-y-2">
          {title && <h3 className={`font-display text-2xl font-bold ${titleColor}`}>{title}</h3>}
          {subtitle && <p className={`max-w-2xl mx-auto ${subtitleColor}`}>{subtitle}</p>}
        </div>
      )}
      <div className={`grid grid-cols-2 ${gridCols} lg:grid-cols-6 gap-6 items-center`}>
        {logos.map((logo) => (
          <div
            key={logo}
            className={`flex items-center justify-center p-3 rounded-xl border transition-colors ${cardBg} ${hoverBorder}`}
          >
            <Image
              src={logo}
              alt={logoAltFromPath(logo)}
              width={160}
              height={60}
              className="h-12 w-auto object-contain"
              sizes="160px"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
