"use client"

import { useEffect, useRef, useState } from "react"

type VantaInstance = {
  destroy: () => void
  resize?: () => void
  animationLoop?: () => void
  req?: number
  prevNow?: number | null
}

type VantaOptions = {
  el: HTMLElement
  THREE: unknown
  mouseControls: boolean
  touchControls: boolean
  gyroControls: boolean
  minHeight: number
  minWidth: number
  scale: number
  scaleMobile: number
  backgroundColor: number
  skyColor: number
  cloudColor: number
  lightColor: number
  speed: number
  texturePath: string
}

type Clouds2Factory = (opts: VantaOptions) => VantaInstance

const NOISE_SIZE = 128

function makeNoiseDataUrl(): string {
  const canvas = document.createElement("canvas")
  canvas.width = NOISE_SIZE
  canvas.height = NOISE_SIZE
  const ctx = canvas.getContext("2d")
  if (!ctx) return ""
  const img = ctx.createImageData(NOISE_SIZE, NOISE_SIZE)
  for (let i = 0; i < img.data.length; i += 4) {
    const v = (Math.random() * 256) | 0
    img.data[i] = v
    img.data[i + 1] = v
    img.data[i + 2] = v
    img.data[i + 3] = 255
  }
  ctx.putImageData(img, 0, 0)
  return canvas.toDataURL("image/png")
}

type IdleWindow = Window & {
  requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number
  cancelIdleCallback?: (id: number) => void
}

export function VantaCloudsBackground({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [shouldInit, setShouldInit] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)")
    if (mq?.matches) return

    const w = window as IdleWindow
    let idleId: number | null = null
    let timeoutId: number | null = null

    if (typeof w.requestIdleCallback === "function") {
      idleId = w.requestIdleCallback(() => setShouldInit(true), { timeout: 2500 })
    } else {
      timeoutId = window.setTimeout(() => setShouldInit(true), 1500)
    }

    return () => {
      if (idleId !== null && typeof w.cancelIdleCallback === "function") {
        w.cancelIdleCallback(idleId)
      }
      if (timeoutId !== null) window.clearTimeout(timeoutId)
    }
  }, [])

  useEffect(() => {
    if (!shouldInit || !ref.current) return

    const node = ref.current
    let instance: VantaInstance | null = null
    let factory: Clouds2Factory | null = null
    let THREELib: unknown = null
    let starting = false
    let disposed = false
    const noiseUrl = makeNoiseDataUrl()

    const start = async () => {
      if (instance || starting || disposed) return
      starting = true
      try {
        if (!factory) {
          THREELib = await import("three")
          const mod = (await import("vanta/dist/vanta.clouds2.min")) as {
            default?: Clouds2Factory
          } & Clouds2Factory
          factory = mod.default ?? (mod as unknown as Clouds2Factory)
        }
        if (disposed || !node.isConnected) return
        instance = factory({
          el: node,
          THREE: THREELib,
          mouseControls: false,
          touchControls: false,
          gyroControls: false,
          minHeight: 200,
          minWidth: 200,
          scale: 0.4,
          scaleMobile: 0.35,
          backgroundColor: 0x000000,
          skyColor: 0x5ca6ca,
          cloudColor: 0x334d80,
          lightColor: 0xffffff,
          speed: 0.85,
          texturePath: noiseUrl,
        })
        const canvas = node.querySelector<HTMLCanvasElement>("canvas.vanta-canvas")
        if (canvas) {
          canvas.style.transform = "translateZ(0)"
          canvas.style.willChange = "transform"
          canvas.style.contain = "strict"
          canvas.style.backfaceVisibility = "hidden"
        }
      } catch {
        // leave gradient fallback visible
      } finally {
        starting = false
      }
    }

    const stop = () => {
      if (!instance) return
      try {
        instance.destroy()
      } catch {
        // ignore
      }
      instance = null
    }

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries[0]?.isIntersecting ?? false
        if (visible) void start()
        else stop()
      },
      { rootMargin: "200px" },
    )
    io.observe(node)

    let paused = false
    let scrollTimer: number | null = null

    const pauseRender = () => {
      if (!instance || paused) return
      if (typeof instance.req === "number") {
        window.cancelAnimationFrame(instance.req)
      }
      paused = true
    }
    const resumeRender = () => {
      if (!instance || !paused) return
      instance.prevNow = null
      paused = false
      instance.animationLoop?.()
    }

    const onScroll = () => {
      pauseRender()
      if (scrollTimer !== null) window.clearTimeout(scrollTimer)
      scrollTimer = window.setTimeout(resumeRender, 140)
    }
    window.addEventListener("scroll", onScroll, { passive: true })

    return () => {
      disposed = true
      window.removeEventListener("scroll", onScroll)
      if (scrollTimer !== null) window.clearTimeout(scrollTimer)
      io.disconnect()
      stop()
    }
  }, [shouldInit])

  return (
    <div
      ref={ref}
      aria-hidden
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{
        transform: "translateZ(0)",
        willChange: "transform",
        contain: "layout paint style",
        isolation: "isolate",
      }}
    />
  )
}
