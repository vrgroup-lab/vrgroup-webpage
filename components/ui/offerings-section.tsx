import { cn } from "@/lib/utils"

export type OfferingItem = {
  title: string
  description: string
  tags?: string[]
  image?: string
}

type OfferingsCardVariant = "default" | "title-only"

interface OfferingsSectionProps {
  eyebrow?: string
  title?: string
  intro?: string
  items: OfferingItem[]
  cardVariant?: OfferingsCardVariant
  className?: string
  id?: string
}

export function OfferingsSection({
  eyebrow,
  title = "¿Qué ofrecemos?",
  intro,
  items,
  cardVariant = "default",
  className,
  id,
}: OfferingsSectionProps) {
  if (!items?.length) return null

  const highlightSource = items.flatMap((item) => item.tags ?? [])
  const highlights = Array.from(new Set(highlightSource)).slice(0, 6)
  const hasAside = Boolean(intro) || highlights.length > 0
  const gridClass =
    cardVariant === "title-only"
      ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"

  if (cardVariant === "title-only") {
    return (
      <section
        id={id}
        className={cn(
          "relative overflow-hidden bg-gradient-to-b from-[#f7f8fc] via-white to-[#eef2f7] py-14 sm:py-16 lg:py-20",
          className,
        )}
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -left-28 -top-24 h-72 w-72 rounded-full bg-coral/10 blur-3xl"></div>
          <div className="absolute -right-24 -bottom-24 h-64 w-64 rounded-full bg-[#0B1B33]/10 blur-3xl"></div>
        </div>
        <div className="relative max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] items-start">
            <div className="space-y-4 text-left">
              {eyebrow && (
                <div className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.32em] text-gray-500">
                  <span className="h-2 w-2 rounded-full bg-coral" />
                  <span>{eyebrow}</span>
                </div>
              )}
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold text-blue-dark">{title}</h2>
              {intro && <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{intro}</p>}
              {highlights.length ? (
                <div className="flex flex-wrap gap-2">
                  {highlights.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-gray-200 bg-gray-100 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-gray-500"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {items.map((item, idx) => (
                <div
                  key={`${item.title}-${idx}`}
                  className="rounded-2xl border border-gray-200 bg-white px-6 py-7 shadow-sm border-t-4 border-t-coral/60"
                >
                  <h3 className="font-display text-lg sm:text-xl font-semibold text-blue-dark">{item.title}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section
      id={id}
      className={cn(
        "relative overflow-hidden bg-gradient-to-b from-[#f7f8fc] via-white to-[#eef2f7] py-14 sm:py-16 lg:py-20",
        className,
      )}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -left-28 -top-24 h-72 w-72 rounded-full bg-coral/10 blur-3xl"></div>
        <div className="absolute -right-24 -bottom-24 h-64 w-64 rounded-full bg-[#0B1B33]/10 blur-3xl"></div>
      </div>
      <div className="relative max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <div className={cn("grid gap-6 items-start", hasAside && "lg:grid-cols-[0.9fr_1.1fr]")}>
            <div className="space-y-4 text-left">
              {eyebrow && (
                <div className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.32em] text-gray-500">
                  <span className="h-2 w-2 rounded-full bg-coral" />
                  <span>{eyebrow}</span>
                </div>
              )}
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold text-blue-dark">{title}</h2>
            </div>
            {hasAside && (
              <div className="rounded-2xl border border-gray-200 bg-white/80 p-5 shadow-sm text-left">
                {intro && <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{intro}</p>}
                {highlights.length ? (
                  <div className="mt-4">
                    <p className="text-[11px] uppercase tracking-[0.26em] text-gray-400 mb-2">Foco</p>
                    <div className="flex flex-wrap gap-2">
                      {highlights.map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-gray-200 bg-gray-100 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-gray-500"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            )}
          </div>
        </div>

        <div className={gridClass}>
          {items.map((item, idx) => {
            const initials = item.title
              .split(" ")
              .map((word) => word[0])
              .join("")
              .slice(0, 2)
              .toUpperCase()

            if (cardVariant === "title-only") {
              return (
                <div
                  key={`${item.title}-${idx}`}
                  className="rounded-2xl border border-gray-200 bg-white px-6 py-7 shadow-sm border-t-4 border-t-coral/60"
                >
                  <h3 className="font-display text-lg sm:text-xl font-semibold text-blue-dark">{item.title}</h3>
                </div>
              )
            }

            return (
              <div
                key={`${item.title}-${idx}`}
                className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/0 to-[#f2f4f9] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="h-9 w-9 rounded-full bg-blue-dark text-white text-[11px] font-semibold tracking-[0.18em] flex items-center justify-center">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="h-px flex-1 bg-gray-200 group-hover:bg-coral/40 transition-colors" />
                  </div>

                  <div className="mb-4 rounded-xl border border-gray-200 bg-white overflow-hidden">
                    {item.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={item.image} alt={item.title} className="w-full h-28 object-cover" />
                    ) : (
                      <div className="h-28 flex items-center justify-center bg-gradient-to-br from-[#0B1B33] to-[#1d345f] text-white">
                        <span className="text-xs font-semibold tracking-[0.32em]">{initials}</span>
                      </div>
                    )}
                  </div>

                  <h3 className="font-display text-lg font-semibold text-blue-dark mb-2">{item.title}</h3>
                  {item.description && <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>}

                  {item.tags?.length ? (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-gray-200 bg-gray-100 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-gray-500"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
