import fs from "fs"
import path from "path"

type LogoFolder = "brand" | "clients" | "partners" | "services"

const allowedExtensions = [".png", ".jpg", ".jpeg", ".svg", ".webp"]

export function getLogosFromFolder(folder: LogoFolder): string[] {
  try {
    const basePath = path.join(process.cwd(), "public", "logos", folder)
    const files = fs.readdirSync(basePath)
    return files
      .filter((file) => allowedExtensions.includes(path.extname(file).toLowerCase()))
      .sort()
      .map((file) => `/logos/${folder}/${file}`)
  } catch (error) {
    console.warn(`No se pudieron leer los logos de ${folder}:`, error)
    return []
  }
}

export function logoAltFromPath(src: string) {
  const name = src.split("/").pop() || "logo"
  const clean = name.replace(path.extname(name), "").replace(/[-_]+/g, " ")
  return clean.trim() || "logo"
}
