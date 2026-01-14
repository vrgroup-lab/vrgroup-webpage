import { cn } from "@/lib/utils"

export type SubserviceItem = {
  title: string
  description: string
  image?: string
}

interface SubservicesGridProps {
  eyebrow?: string
  title?: string
  intro?: string
  items: SubserviceItem[]
  className?: string
  id?: string
}

export function SubservicesGrid({
  eyebrow,
  title = "¿Qué ofrecemos?",
  intro,
  items,
  className,
  id,
}: SubservicesGridProps) {
  if (!items?.length) return null

  const gridClass = (() => {
    switch (items.length) {
      case 1:
        return "grid-cols-1"
      case 2:
        return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-2"
      case 3:
        return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
      case 4:
        return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-2"
      case 5:
        return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-2"
      default:
        return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
    }
  })()

  return (
    <section id={id} className={cn("relative overflow-hidden bg-white py-14 sm:py-16 lg:py-20", className)}>
      <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
          <div className="space-y-4 max-w-3xl">
            {eyebrow && (
              <div className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.32em] text-gray-500">
                <span className="h-2 w-2 bg-coral" />
                <span>{eyebrow}</span>
              </div>
            )}
            <div className="space-y-2">
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-blue-dark">{title}</h2>
              <div className="h-1 w-16 bg-coral" />
            </div>
            {intro && <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed">{intro}</p>}
          </div>
        </div>

        <div className={cn("grid gap-3 sm:gap-4", gridClass)}>
          {items.map((item, idx) => (
            <div
              key={`${item.title}-${idx}`}
              className={cn(
                "group relative overflow-hidden border border-gray-200 bg-gray-100 shadow-[0_20px_50px_rgba(15,23,42,0.18)] aspect-[16/9]",
                items.length === 5 && idx === 4 && "sm:col-span-2 sm:aspect-[32/5]",
              )}
            >
              {item.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={item.image}
                    alt={item.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-[#0B1B33] via-[#12264d] to-[#1f3d8f]" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1B33]/90 via-[#0B1B33]/45 to-transparent" />
              <div className="relative z-10 flex h-full flex-col justify-end p-4 sm:p-5">
                <h3 className="font-display text-lg sm:text-xl font-semibold text-white">{item.title}</h3>
                {item.description && <p className="mt-2 text-xs sm:text-sm text-white/80 leading-relaxed">{item.description}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
