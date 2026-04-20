const fs = require("fs/promises")
const path = require("path")
const { execFile } = require("child_process")
const { promisify } = require("util")
const sharp = require("sharp")

const execFileAsync = promisify(execFile)
const projectRoot = process.cwd()
const publicRoot = path.join(projectRoot, "public")
const optimizedImageRoot = path.join(publicRoot, "images", "optimized")
const optimizedVideoRoot = path.join(publicRoot, "videos", "optimized")
const rasterExtensions = new Set([".png", ".jpg", ".jpeg"])
const animatedExtensions = new Set([".gif"])
const supportedExtensions = new Set([...rasterExtensions, ...animatedExtensions])
const responsiveWidths = [128, 256, 320, 480, 768, 1200, 1600, 1920]
const maxOptimizedWidth = 1920
const maxVideoWidth = 1280

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    const absolutePath = path.join(dir, entry.name)

    if (entry.isDirectory()) {
      if (absolutePath === optimizedImageRoot || absolutePath === optimizedVideoRoot) continue
      files.push(...(await walk(absolutePath)))
      continue
    }

    if (entry.isFile()) files.push(absolutePath)
  }

  return files
}

function formatBytes(bytes) {
  const units = ["B", "KB", "MB", "GB"]
  const sign = bytes < 0 ? "-" : ""
  let value = Math.abs(bytes)
  let unitIndex = 0

  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024
    unitIndex += 1
  }

  const formatted = value >= 10 || unitIndex === 0 ? value.toFixed(0) : value.toFixed(1)
  return `${sign}${formatted} ${units[unitIndex]}`
}

async function fileExists(filePath) {
  try {
    await fs.access(filePath)
    return true
  } catch {
    return false
  }
}

function replaceExtension(filePath, extension) {
  return filePath.replace(/\.[^.]+$/i, extension)
}

function buildOptimizedImagePath(relativePath, width) {
  const suffix = width ? `-${width}w.webp` : ".webp"
  return path.join(optimizedImageRoot, replaceExtension(relativePath, suffix))
}

function buildOptimizedVideoPath(relativePath, extension) {
  return path.join(optimizedVideoRoot, replaceExtension(relativePath, extension))
}

async function outputsAreCurrent(sourceStats, outputPaths) {
  if (outputPaths.length === 0) return false

  for (const outputPath of outputPaths) {
    if (!(await fileExists(outputPath))) {
      return false
    }

    const outputStats = await fs.stat(outputPath)
    if (outputStats.mtimeMs < sourceStats.mtimeMs) {
      return false
    }
  }

  return true
}

async function runFfmpeg(args) {
  await execFileAsync("ffmpeg", args, {
    windowsHide: true,
    maxBuffer: 10 * 1024 * 1024,
  })
}

function shouldTrimWhitespace(relativePath) {
  const normalized = relativePath.split(path.sep).join("/")
  return normalized.startsWith("logos/clients/")
}

function createPipeline(sourcePath, relativePath) {
  const pipeline = sharp(sourcePath, { limitInputPixels: false })
  if (shouldTrimWhitespace(relativePath)) {
    return pipeline.trim({ threshold: 15 })
  }
  return pipeline
}

async function optimizeRasterImage(sourcePath) {
  const relativePath = path.relative(publicRoot, sourcePath)
  const sourceStats = await fs.stat(sourcePath)
  const metadata = await sharp(sourcePath, { limitInputPixels: false }).metadata()
  const sourceWidth = metadata.width ?? maxOptimizedWidth
  const baseWidth = Math.min(sourceWidth, maxOptimizedWidth)
  const variantWidths = responsiveWidths.filter((width) => width !== baseWidth)
  const destinationPaths = [buildOptimizedImagePath(relativePath), ...variantWidths.map((width) => buildOptimizedImagePath(relativePath, width))]

  if (await outputsAreCurrent(sourceStats, destinationPaths)) {
    return { processed: false, savedBytes: 0, generatedFiles: 0 }
  }

  for (const width of variantWidths) {
    const destinationPath = buildOptimizedImagePath(relativePath, width)
    await fs.mkdir(path.dirname(destinationPath), { recursive: true })
    await createPipeline(sourcePath, relativePath)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(destinationPath)
  }

  const baseDestinationPath = buildOptimizedImagePath(relativePath)
  await fs.mkdir(path.dirname(baseDestinationPath), { recursive: true })
  await createPipeline(sourcePath, relativePath)
    .resize({ width: baseWidth, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(baseDestinationPath)

  const baseStats = await fs.stat(baseDestinationPath)

  return {
    processed: true,
    savedBytes: sourceStats.size - baseStats.size,
    generatedFiles: destinationPaths.length,
  }
}

async function optimizeAnimatedImage(sourcePath) {
  const relativePath = path.relative(publicRoot, sourcePath)
  const sourceStats = await fs.stat(sourcePath)
  const posterPath = buildOptimizedImagePath(relativePath)
  const mp4Path = buildOptimizedVideoPath(relativePath, ".mp4")
  const outputPaths = [posterPath, mp4Path]

  if (await outputsAreCurrent(sourceStats, outputPaths)) {
    return { processed: false, savedBytes: 0, generatedFiles: 0 }
  }

  await fs.mkdir(path.dirname(posterPath), { recursive: true })
  await fs.mkdir(path.dirname(mp4Path), { recursive: true })

  const scaleFilter = `scale=min(${maxVideoWidth}\\,iw):-2:flags=lanczos`

  const metadata = await sharp(sourcePath, { animated: true, limitInputPixels: false }).metadata()
  const posterWidth = Math.min(metadata.width ?? maxVideoWidth, maxVideoWidth)

  await sharp(sourcePath, { animated: true, page: 0, limitInputPixels: false })
    .resize({ width: posterWidth, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(posterPath)

  await runFfmpeg([
    "-y",
    "-i",
    sourcePath,
    "-an",
    "-vf",
    `${scaleFilter},fps=24`,
    "-c:v",
    "libx264",
    "-preset",
    "medium",
    "-crf",
    "28",
    "-pix_fmt",
    "yuv420p",
    "-movflags",
    "+faststart",
    mp4Path,
  ])

  const mp4Stats = await fs.stat(mp4Path)

  return {
    processed: true,
    savedBytes: sourceStats.size - mp4Stats.size,
    generatedFiles: outputPaths.length,
  }
}

async function main() {
  const startedAt = Date.now()
  await fs.mkdir(optimizedImageRoot, { recursive: true })
  await fs.mkdir(optimizedVideoRoot, { recursive: true })

  const sourceFiles = (await walk(publicRoot)).filter((filePath) =>
    supportedExtensions.has(path.extname(filePath).toLowerCase())
  )

  let processedCount = 0
  let skippedCount = 0
  let totalSavedBytes = 0
  let generatedFilesCount = 0

  for (const sourceFile of sourceFiles) {
    const extension = path.extname(sourceFile).toLowerCase()
    const result = rasterExtensions.has(extension)
      ? await optimizeRasterImage(sourceFile)
      : await optimizeAnimatedImage(sourceFile)

    if (result.processed) {
      processedCount += 1
      totalSavedBytes += result.savedBytes
      generatedFilesCount += result.generatedFiles
    } else {
      skippedCount += 1
    }
  }

  const durationSeconds = ((Date.now() - startedAt) / 1000).toFixed(2)

  console.log("")
  console.log("Image optimization summary")
  console.log(`- Source images found: ${sourceFiles.length}`)
  console.log(`- Images processed: ${processedCount}`)
  console.log(`- Images skipped: ${skippedCount}`)
  console.log(`- Generated files: ${generatedFilesCount}`)
  console.log(`- Total savings (primary assets): ${formatBytes(totalSavedBytes)}`)
  console.log(`- Output folder: ${path.relative(projectRoot, optimizedImageRoot)}`)
  console.log(`- Video output folder: ${path.relative(projectRoot, optimizedVideoRoot)}`)
  console.log(`- Duration: ${durationSeconds}s`)
}

main().catch((error) => {
  console.error("Image optimization failed.")
  console.error(error)
  process.exitCode = 1
})
