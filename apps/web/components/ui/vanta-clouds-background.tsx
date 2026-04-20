"use client"

import { useEffect, useRef, useState } from "react"

type VantaInstance = {
  destroy: () => void
  resize?: () => void
  animationLoop?: () => void
  req?: number
  prevNow?: number | null
  uniforms?: { iMouse?: { value?: { x: number; y: number } } }
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
  cloudShadowColor: number
  sunColor: number
  sunGlareColor: number
  sunlightColor: number
  speed: number
}

type CloudsFactory = (opts: VantaOptions) => VantaInstance

type IdleWindow = Window & {
  requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number
  cancelIdleCallback?: (id: number) => void
}

interface VantaCloudsBackgroundProps {
  className?: string
  backgroundColor?: number
  skyColor?: number
  cloudColor?: number
  cloudShadowColor?: number
  sunColor?: number
  sunGlareColor?: number
  sunlightColor?: number
  speed?: number
  /**
   * Camera height (0–1). Higher = camera looks more down = horizon lower in frame.
   * Default 0.95 — near-max, so horizon sits low in frame.
   */
  cameraHeight?: number
}

export function VantaCloudsBackground({
  className = "",
  backgroundColor = 0x8a6a58,
  skyColor = 0x5ab0cc,
  cloudColor = 0xf0a868,
  cloudShadowColor = 0x183550,
  sunColor = 0xe08c3a,
  sunGlareColor = 0xf0b060,
  sunlightColor = 0xe08c3a,
  speed = 1,
  cameraHeight = 0.95,
}: VantaCloudsBackgroundProps) {
  const ref = useRef<HTMLDivElement>(null)
  const instanceRef = useRef<VantaInstance | null>(null)
  const [shouldInit, setShouldInit] = useState(false)

  useEffect(() => {
    const node = ref.current
    const parent = node?.parentElement
    if (!node || !parent) return
    const TARGET_ASPECT = 16 / 9
    const update = () => {
      const pw = parent.offsetWidth
      const ph = parent.offsetHeight
      if (!pw || !ph) return
      const parentAspect = pw / ph
      let w: number
      let h: number
      if (parentAspect >= TARGET_ASPECT) {
        w = pw
        h = Math.round(pw / TARGET_ASPECT)
      } else {
        w = Math.round(ph * TARGET_ASPECT)
        h = ph
      }
      node.style.width = `${w}px`
      node.style.height = `${h}px`
      instanceRef.current?.resize?.()
    }
    update()
    const ro = new ResizeObserver(update)
    ro.observe(parent)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    if (typeof window === "undefined") return
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)")
    if (mq?.matches) return

    const w = window as IdleWindow
    let idleId: number | null = null
    let timeoutId: number | null = null

    if (typeof w.requestIdleCallback === "function") {
      idleId = w.requestIdleCallback(() => setShouldInit(true), { timeout: 800 })
    } else {
      timeoutId = window.setTimeout(() => setShouldInit(true), 400)
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
    let factory: CloudsFactory | null = null
    let THREELib: unknown = null
    let starting = false
    let disposed = false

    const start = async () => {
      if (instance || starting || disposed) return
      starting = true
      try {
        if (!factory) {
          THREELib = await import("three")
          const mod = (await import("vanta/dist/vanta.clouds.min")) as {
            default?: CloudsFactory
          } & CloudsFactory
          factory = mod.default ?? (mod as unknown as CloudsFactory)
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
          scale: 3,
          scaleMobile: 12,
          backgroundColor,
          skyColor,
          cloudColor,
          cloudShadowColor,
          sunColor,
          sunGlareColor,
          sunlightColor,
          speed,
        })
        instanceRef.current = instance
        instance?.resize?.()
        const canvas = node.querySelector<HTMLCanvasElement>("canvas.vanta-canvas")
        if (canvas) {
          canvas.style.transform = "translateZ(0)"
          canvas.style.willChange = "transform"
          canvas.style.contain = "strict"
          canvas.style.backfaceVisibility = "hidden"
        }
        // Pin camera height by overriding iMouse uniform. The shader reads:
        //   m.y = (1.0 - iMouse.y/iResolution.y) * 0.33 + 0.28
        // iMouse.y = 0 → m.y = 0.61 (camera higher, horizon lower in frame).
        // iMouse.y = height → m.y = 0.28 (camera lower, horizon higher).
        // Map cameraHeight [0,1] → iMouse.y [height, 0].
        const clampedCam = Math.max(0, Math.min(1, cameraHeight))
        const pinCamera = () => {
          const v = instance?.uniforms?.iMouse?.value
          if (!v) return
          const h = node.offsetHeight || 1
          v.y = (1 - clampedCam) * h
        }
        pinCamera()
        if (instance && typeof instance.animationLoop === "function") {
          const original = instance.animationLoop.bind(instance)
          const TARGET_MS = 1000 / 30
          let lastRender = 0
          instance.animationLoop = function throttled() {
            const now = performance.now()
            if (now - lastRender < TARGET_MS) {
              if (instance) {
                instance.req = window.requestAnimationFrame(throttled)
              }
              return
            }
            lastRender = now
            pinCamera()
            original()
          }
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
      instanceRef.current = null
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
  }, [
    shouldInit,
    backgroundColor,
    skyColor,
    cloudColor,
    cloudShadowColor,
    sunColor,
    sunGlareColor,
    sunlightColor,
    speed,
    cameraHeight,
  ])

  return (
    <div
      ref={ref}
      aria-hidden
      className={`absolute pointer-events-none ${className}`}
      style={{
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%) translateZ(0)",
        willChange: "transform",
        contain: "layout paint style",
        isolation: "isolate",
      }}
    />
  )
}
