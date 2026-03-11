const OPTIMIZABLE_EXTENSIONS = [".png", ".jpg", ".jpeg"]
const OPTIMIZED_PREFIX = "/images/optimized"

export function toOptimizedAssetPath(src?: string | null) {
  if (!src) return src ?? ""
  if (!src.startsWith("/") || src.startsWith(OPTIMIZED_PREFIX)) return src

  const match = src.match(/^([^?#]+)(.*)$/)
  const pathname = match?.[1] ?? src
  const suffix = match?.[2] ?? ""
  const lowerPath = pathname.toLowerCase()
  const extension = OPTIMIZABLE_EXTENSIONS.find((candidate) => lowerPath.endsWith(candidate))

  if (!extension) return src

  return `${OPTIMIZED_PREFIX}${pathname.slice(0, -extension.length)}.webp${suffix}`
}

export function toBackgroundImage(src?: string | null) {
  const resolved = toOptimizedAssetPath(src)
  return resolved ? `url(${resolved})` : undefined
}
