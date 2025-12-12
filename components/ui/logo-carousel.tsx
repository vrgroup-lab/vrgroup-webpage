import Image from "next/image"
import { logoAltFromPath } from "@/lib/logos"

interface LogoCarouselProps {
  logos: string[]
  speedMs?: number
  height?: number
  fadeColor?: string
}

// Simple CSS marquee-style carousel (duplicates logos to create infinite scroll).
export function LogoCarousel({ logos, speedMs = 24000, height = 48, fadeColor = "#050711" }: LogoCarouselProps) {
  if (!logos || logos.length === 0) {
    return null
  }

  const repeated = [...logos, ...logos]

  return (
    <div className="relative overflow-hidden py-6">
      <div
        className="flex items-center gap-10 hover:[animation-play-state:paused]"
        style={{ animation: `marquee ${speedMs}ms linear infinite` }}
      >
        {repeated.map((logo, idx) => (
          <div key={`${logo}-${idx}`} className="flex-shrink-0">
            <Image
              src={logo}
              alt={logoAltFromPath(logo)}
              width={160}
              height={height}
              className="h-12 w-auto object-contain brightness-100 contrast-100"
              sizes="160px"
              priority={idx < 3}
            />
          </div>
        ))}
      </div>

      {/* Gradient fades */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r"
        style={{ backgroundImage: `linear-gradient(to right, ${fadeColor}, ${fadeColor}99, transparent)` }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l"
        style={{ backgroundImage: `linear-gradient(to left, ${fadeColor}, ${fadeColor}99, transparent)` }}
      />
    </div>
  )
}
