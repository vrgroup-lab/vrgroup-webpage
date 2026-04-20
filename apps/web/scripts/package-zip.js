"use strict"

const fs = require("node:fs")
const path = require("node:path")
const { execSync } = require("node:child_process")

const PROJECT_ROOT = path.resolve(__dirname, "..")
const EXPORT_DIR = path.join(PROJECT_ROOT, "out")
const ZIP_PATH = path.join(PROJECT_ROOT, "vrgroup-web.zip")

if (!fs.existsSync(EXPORT_DIR)) {
  console.error(`No existe ${EXPORT_DIR}. Corre "npm run build" primero.`)
  process.exit(1)
}

if (fs.existsSync(ZIP_PATH)) {
  fs.unlinkSync(ZIP_PATH)
}

try {
  execSync(`zip -r "${ZIP_PATH}" .`, { cwd: EXPORT_DIR, stdio: "inherit" })
} catch {
  console.error("Falló el comando `zip`. Instálalo o empaqueta manualmente `out/`.")
  process.exit(1)
}

const { size } = fs.statSync(ZIP_PATH)
const mb = (size / (1024 * 1024)).toFixed(2)
console.log(`\n✓ ZIP generado: ${path.relative(PROJECT_ROOT, ZIP_PATH)} (${mb} MB)`)
