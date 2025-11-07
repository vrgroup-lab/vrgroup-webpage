import type { ReactNode } from "react"

interface SectionProps {
  title?: string
  subtitle?: string
  children: ReactNode
  className?: string
  id?: string
}

export function Section({ title, subtitle, children, className = "", id }: SectionProps) {
  return (
    <section id={id} className={`py-16 sm:py-20 lg:py-24 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {(title || subtitle) && (
          <div className="mb-12 text-center">
            {title && (
              <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-blue-dark mb-4">{title}</h2>
            )}
            {subtitle && <p className="text-gray-600 text-lg max-w-2xl mx-auto">{subtitle}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  )
}
