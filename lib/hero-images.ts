import fs from "fs"
import path from "path"

export function getHeroImages(folder: string): string[] {
  const basePath = path.join(process.cwd(), "public", "images", "hero", folder)
  const allowed = [".jpg", ".jpeg", ".png", ".webp"]
  try {
    const files = fs.readdirSync(basePath)
    return files
      .filter((file) => allowed.includes(path.extname(file).toLowerCase()))
      .sort()
      .map((file) => `/images/hero/${folder}/${file}`)
  } catch (err) {
    console.warn(`No se pudieron leer imágenes de hero/${folder}:`, err)
    return []
  }
}
