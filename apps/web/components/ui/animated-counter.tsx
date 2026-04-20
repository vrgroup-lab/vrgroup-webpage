"use client"

import { useEffect, useRef, useState } from "react"

interface AnimatedCounterProps {
  end: number
  durationMs?: number
  prefix?: string
  suffix?: string
  className?: string
}

export function AnimatedCounter({
  end,
  durationMs = 1600,
  prefix = "",
  suffix = "",
  className,
}: AnimatedCounterProps) {
  const [value, setValue] = useState(0)
  const ref = useRef<HTMLSpanElement | null>(null)
  const startedRef = useRef(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) {
      const id = requestAnimationFrame(() => setValue(end))
      return () => cancelAnimationFrame(id)
    }

    const run = () => {
      if (startedRef.current) return
      startedRef.current = true
      const startTime = performance.now()
      const tick = (now: number) => {
        const progress = Math.min((now - startTime) / durationMs, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        setValue(Math.round(end * eased))
        if (progress < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            run()
            observer.disconnect()
            break
          }
        }
      },
      { threshold: 0.3 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [end, durationMs])

  return (
    <span ref={ref} className={`inline-block tabular-nums ${className ?? ""}`}>
      {prefix}
      {value}
      {suffix}
    </span>
  )
}
