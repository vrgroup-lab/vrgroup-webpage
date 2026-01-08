"use client"

import { useEffect, useState } from "react"

type TypewriterTextProps = {
  text: string
  speedMs?: number
  startDelayMs?: number
  className?: string
}

export function TypewriterText({ text, speedMs = 45, startDelayMs = 180, className = "" }: TypewriterTextProps) {
  const [displayed, setDisplayed] = useState("")
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    const handleChange = () => setReduceMotion(media.matches)
    handleChange()

    if (media.addEventListener) {
      media.addEventListener("change", handleChange)
    } else {
      media.addListener(handleChange)
    }

    return () => {
      if (media.removeEventListener) {
        media.removeEventListener("change", handleChange)
      } else {
        media.removeListener(handleChange)
      }
    }
  }, [])

  useEffect(() => {
    if (!text) {
      setDisplayed("")
      return
    }
    if (reduceMotion) {
      setDisplayed(text)
      return
    }

    let index = 0
    setDisplayed("")

    let intervalId: number | undefined
    const timeoutId = window.setTimeout(() => {
      intervalId = window.setInterval(() => {
        index += 1
        setDisplayed(text.slice(0, index))
        if (index >= text.length && intervalId) {
          window.clearInterval(intervalId)
        }
      }, speedMs)
    }, startDelayMs)

    return () => {
      window.clearTimeout(timeoutId)
      if (intervalId) {
        window.clearInterval(intervalId)
      }
    }
  }, [text, speedMs, startDelayMs, reduceMotion])

  const showCursor = !reduceMotion && displayed.length < text.length

  return (
    <span className={`inline-flex items-center ${className}`}>
      <span>{displayed}</span>
      {showCursor ? (
        <span aria-hidden="true" className="ml-1 inline-block w-[1ch] animate-pulse">
          |
        </span>
      ) : null}
    </span>
  )
}
