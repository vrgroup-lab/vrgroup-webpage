"use client"

import { useEffect, useState } from "react"

interface MetricCounterProps {
  value: number
  prefix?: string
  suffix?: string
  duration?: number
}

export function MetricCounter({ value, prefix = "", suffix = "", duration = 1200 }: MetricCounterProps) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let start: number | null = null

    const step = (timestamp: number) => {
      if (!start) start = timestamp
      const progress = Math.min((timestamp - start) / duration, 1)
      const current = Math.floor(progress * value)
      setCount(current)
      if (progress < 1) requestAnimationFrame(step)
      else setCount(value)
    }

    const raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [value, duration])

  return (
    <span className="tabular-nums">
      {prefix}
      {count.toLocaleString("es-CL")}
      {suffix}
    </span>
  )
}
