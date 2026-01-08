"use client"

import { useEffect, useMemo, useRef, useState } from "react"

type RotatingWordProps = {
  words: string[]
  fallback?: string
  className?: string
  typingMs?: number
  erasingMs?: number
  holdMs?: number
  startDelayMs?: number
  betweenMs?: number
}

export function RotatingWord({
  words,
  fallback,
  className = "",
  typingMs = 65,
  erasingMs = 40,
  holdMs = 1300,
  startDelayMs = 320,
  betweenMs = 220,
}: RotatingWordProps) {
  const wordList = useMemo(() => words.filter(Boolean), [words])
  const fallbackWord = fallback ?? wordList[0] ?? ""
  const initialIndex = Math.max(0, wordList.indexOf(fallbackWord))
  const indexRef = useRef(initialIndex)
  const [current, setCurrent] = useState(fallbackWord)
  const [isDeleting, setIsDeleting] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)
  const hasStartedRef = useRef(false)

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
    indexRef.current = Math.max(0, wordList.indexOf(fallbackWord))
    setCurrent(fallbackWord)
    setIsDeleting(false)
    hasStartedRef.current = false
  }, [fallbackWord, wordList])

  useEffect(() => {
    if (reduceMotion || wordList.length <= 1) {
      return
    }

    const currentWord = wordList[indexRef.current] ?? fallbackWord
    let timeoutId: number | undefined

    if (!hasStartedRef.current) {
      timeoutId = window.setTimeout(() => {
        hasStartedRef.current = true
        setCurrent("")
      }, startDelayMs)
      return () => window.clearTimeout(timeoutId)
    }

    if (!isDeleting && current.length < currentWord.length) {
      timeoutId = window.setTimeout(() => {
        setCurrent(currentWord.slice(0, current.length + 1))
      }, typingMs)
    } else if (!isDeleting && current.length === currentWord.length) {
      timeoutId = window.setTimeout(() => {
        setIsDeleting(true)
      }, holdMs)
    } else if (isDeleting && current.length > 0) {
      timeoutId = window.setTimeout(() => {
        setCurrent(currentWord.slice(0, current.length - 1))
      }, erasingMs)
    } else if (isDeleting && current.length === 0) {
      timeoutId = window.setTimeout(() => {
        setIsDeleting(false)
        indexRef.current = (indexRef.current + 1) % wordList.length
      }, betweenMs)
    }

    return () => {
      if (timeoutId) {
        window.clearTimeout(timeoutId)
      }
    }
  }, [current, isDeleting, reduceMotion, wordList, fallbackWord, typingMs, erasingMs, holdMs, startDelayMs, betweenMs])

  const showCursor = !reduceMotion

  return (
    <span className={`inline-flex items-center ${className}`}>
      <span>{reduceMotion ? fallbackWord : current}</span>
      {showCursor ? (
        <span aria-hidden="true" className="ml-0 inline-block animate-pulse">
          |
        </span>
      ) : null}
    </span>
  )
}
