const OPTIMIZABLE_EXTENSIONS = [".png", ".jpg", ".jpeg"]
const ANIMATED_EXTENSIONS = [".gif"]
const OPTIMIZED_PREFIX = "/images/optimized"
const OPTIMIZED_VIDEO_PREFIX = "/videos/optimized"
const DEFAULT_RESPONSIVE_WIDTHS = [480, 768, 1200]

type OptimizedAssetOptions = {
  width?: number
}

function splitSource(src: string) {
  const match = src.match(/^([^?#]+)(.*)$/)

  return {
    pathname: match?.[1] ?? src,
    suffix: match?.[2] ?? "",
  }
}

function normalizeWidth(width?: number) {
  return typeof width === "number" && Number.isFinite(width) && width > 0 ? Math.round(width) : undefined
}

function buildOptimizedImagePath(pathname: string, extension: string, width?: number) {
  const widthSuffix = width ? `-${width}w` : ""
  return `${OPTIMIZED_PREFIX}${pathname.slice(0, -extension.length)}${widthSuffix}.webp`
}

export function toOptimizedAssetPath(src?: string | null, options: OptimizedAssetOptions = {}) {
  if (!src) return src ?? ""
  if (!src.startsWith("/") || src.startsWith(OPTIMIZED_PREFIX)) return src

  const { pathname, suffix } = splitSource(src)
  const lowerPath = pathname.toLowerCase()
  const extension = OPTIMIZABLE_EXTENSIONS.find((candidate) => lowerPath.endsWith(candidate))

  if (!extension) return src

  return `${buildOptimizedImagePath(pathname, extension, normalizeWidth(options.width))}${suffix}`
}

export function toBackgroundImage(src?: string | null) {
  const resolved = toOptimizedAssetPath(src)
  return resolved ? `url(${resolved})` : undefined
}

export function isAnimatedAssetPath(src?: string | null) {
  if (!src) return false

  const { pathname } = splitSource(src)
  const lowerPath = pathname.toLowerCase()

  return ANIMATED_EXTENSIONS.some((candidate) => lowerPath.endsWith(candidate))
}

export function toAnimatedAssetPaths(src?: string | null) {
  if (!src || !src.startsWith("/") || src.startsWith(OPTIMIZED_VIDEO_PREFIX)) return null

  const { pathname, suffix } = splitSource(src)
  const lowerPath = pathname.toLowerCase()
  const extension = ANIMATED_EXTENSIONS.find((candidate) => lowerPath.endsWith(candidate))

  if (!extension) return null

  const basePath = pathname.slice(0, -extension.length)

  return {
    poster: `${OPTIMIZED_PREFIX}${basePath}.webp${suffix}`,
    mp4: `${OPTIMIZED_VIDEO_PREFIX}${basePath}.mp4${suffix}`,
  }
}

export function toResponsiveImageProps(
  src?: string | null,
  options: {
    sizes: string
    widths?: number[]
  } = { sizes: "100vw" },
) {
  if (!src) return null

  const widths = Array.from(
    new Set(
      (options.widths ?? DEFAULT_RESPONSIVE_WIDTHS)
        .map((width) => normalizeWidth(width))
        .filter((width): width is number => Boolean(width)),
    ),
  ).sort((a, b) => a - b)

  if (widths.length === 0) {
    const fallbackSrc = toOptimizedAssetPath(src)

    return fallbackSrc
      ? {
          src: fallbackSrc,
          sizes: options.sizes,
          srcSet: undefined,
        }
      : null
  }

  return {
    src: toOptimizedAssetPath(src, { width: widths[widths.length - 1] }),
    sizes: options.sizes,
    srcSet: widths.map((width) => `${toOptimizedAssetPath(src, { width })} ${width}w`).join(", "),
  }
}
