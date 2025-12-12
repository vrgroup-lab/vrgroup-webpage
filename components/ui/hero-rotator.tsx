"use client"

import { useEffect, useState } from "react"
import { Hero } from "@/components/ui/hero"

type HeroRotatorProps = {
  images: string[]
  title: React.ReactNode
  subtitle?: React.ReactNode
  minHeight?: string
  children?: React.ReactNode
  intervalMs?: number
}

export function HeroRotator({
  images,
  title,
  subtitle,
  minHeight = "820px",
  children,
  intervalMs = 10000,
}: HeroRotatorProps) {
  const [idx, setIdx] = useState(0)
  const safeImages = images && images.length > 0 ? images : ["/images/hero/nosotros/banner_nosotros.jpg"]
  const hasMultiple = safeImages.length > 1

  useEffect(() => {
    if (!hasMultiple) return
    const id = setInterval(() => setIdx((prev) => (prev + 1) % safeImages.length), intervalMs)
    return () => clearInterval(id)
  }, [safeImages.length, intervalMs, hasMultiple])

  const goPrev = () => setIdx((prev) => (prev - 1 + safeImages.length) % safeImages.length)
  const goNext = () => setIdx((prev) => (prev + 1) % safeImages.length)

  return (
    <div className="relative">
      <Hero title={title} subtitle={subtitle} backgroundImage={safeImages[idx]} minHeight={minHeight}>
        <div className="absolute inset-0 bg-black/15 opacity-40 pointer-events-none transition-opacity duration-700" />
        {hasMultiple && (
          <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-3 sm:px-6 pointer-events-none">
            <button
              type="button"
              className="pointer-events-auto w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/40 text-white flex items-center justify-center backdrop-blur hover:bg-black/60 transition"
              onClick={goPrev}
              aria-label="Imagen anterior"
            >
              ‹
            </button>
            <button
              type="button"
              className="pointer-events-auto w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/40 text-white flex items-center justify-center backdrop-blur hover:bg-black/60 transition"
              onClick={goNext}
              aria-label="Imagen siguiente"
            >
              ›
            </button>
          </div>
        )}
        {children}
      </Hero>
    </div>
  )
}
