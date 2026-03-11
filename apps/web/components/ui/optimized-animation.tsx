import { toAnimatedAssetPaths } from "@/lib/assets"
import { cn } from "@/lib/utils"

interface OptimizedAnimationProps {
  src: string
  label: string
  className?: string
  preload?: "none" | "metadata" | "auto"
}

export function OptimizedAnimation({
  src,
  label,
  className,
  preload = "none",
}: OptimizedAnimationProps) {
  const media = toAnimatedAssetPaths(src)

  if (!media) {
    return null
  }

  return (
    <video
      key={src}
      className={cn(className)}
      autoPlay
      loop
      muted
      playsInline
      preload={preload}
      poster={media.poster}
      aria-label={label}
      disablePictureInPicture
    >
      <source src={media.mp4} type="video/mp4" />
    </video>
  )
}
