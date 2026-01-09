import type { ReactNode } from "react"

interface SectionProps {
  title?: string
  subtitle?: string
  children: ReactNode
  className?: string
  id?: string
  variant?: "light" | "dark"
  paddingClass?: string
}

export function Section({
  title,
  subtitle,
  children,
  className = "",
  id,
  variant = "light",
  paddingClass,
}: SectionProps) {
  const headingColor = variant === "dark" ? "text-white" : "text-blue-dark"
  const subtitleColor = variant === "dark" ? "text-gray-300" : "text-gray-600"
  const padding = paddingClass ?? "py-16 sm:py-20 lg:py-24"

  return (
    <section id={id} className={`${padding} ${className}`}>
      <div className="w-full max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
        {(title || subtitle) && (
          <div className="mb-12 text-center">
            {title && (
              <h2 className={`font-display font-bold text-3xl sm:text-4xl lg:text-5xl mb-4 ${headingColor}`}>{title}</h2>
            )}
            {subtitle && <p className={`text-lg mx-auto ${subtitleColor}`}>{subtitle}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  )
}
