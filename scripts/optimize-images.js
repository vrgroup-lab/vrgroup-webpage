const fs = require("fs/promises")
const path = require("path")
const sharp = require("sharp")

const projectRoot = process.cwd()
const publicRoot = path.join(projectRoot, "public")
const optimizedRoot = path.join(publicRoot, "images", "optimized")
const supportedExtensions = new Set([".png", ".jpg", ".jpeg"])

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    const absolutePath = path.join(dir, entry.name)

    if (entry.isDirectory()) {
      if (absolutePath === optimizedRoot) continue
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

async function optimizeImage(sourcePath) {
  const relativePath = path.relative(publicRoot, sourcePath)
  const extension = path.extname(relativePath)
  const destinationRelativePath = relativePath.replace(new RegExp(`${extension}$`, "i"), ".webp")
  const destinationPath = path.join(optimizedRoot, destinationRelativePath)
  const sourceStats = await fs.stat(sourcePath)

  if (await fileExists(destinationPath)) {
    const destinationStats = await fs.stat(destinationPath)
    if (destinationStats.mtimeMs >= sourceStats.mtimeMs) {
      return { processed: false, savedBytes: 0 }
    }
  }

  await fs.mkdir(path.dirname(destinationPath), { recursive: true })
  await sharp(sourcePath).webp({ quality: 80 }).toFile(destinationPath)

  const destinationStats = await fs.stat(destinationPath)
  return {
    processed: true,
    savedBytes: sourceStats.size - destinationStats.size,
  }
}

async function main() {
  const startedAt = Date.now()
  await fs.mkdir(optimizedRoot, { recursive: true })

  const sourceFiles = (await walk(publicRoot)).filter((filePath) =>
    supportedExtensions.has(path.extname(filePath).toLowerCase())
  )

  let processedCount = 0
  let skippedCount = 0
  let totalSavedBytes = 0

  for (const sourceFile of sourceFiles) {
    const result = await optimizeImage(sourceFile)
    if (result.processed) {
      processedCount += 1
      totalSavedBytes += result.savedBytes
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
  console.log(`- Total savings: ${formatBytes(totalSavedBytes)}`)
  console.log(`- Output folder: ${path.relative(projectRoot, optimizedRoot)}`)
  console.log(`- Duration: ${durationSeconds}s`)
}

main().catch((error) => {
  console.error("Image optimization failed.")
  console.error(error)
  process.exitCode = 1
})
