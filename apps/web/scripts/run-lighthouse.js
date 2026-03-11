"use strict"

const fs = require("fs/promises")
const http = require("http")
const path = require("path")

const HOST = "127.0.0.1"
const PORT = Number(process.env.LIGHTHOUSE_PORT || 4173)
const ROUTE_TIMEOUT_MS = Number(process.env.LIGHTHOUSE_TIMEOUT_MS || 60000)
const PROJECT_ROOT = path.resolve(__dirname, "..")
const EXPORT_DIR = path.join(PROJECT_ROOT, "out")
const REPORT_DIR = path.join(PROJECT_ROOT, "reports", "lighthouse")

const ROUTES = [
  { slug: "index", route: "/" },
  { slug: "clientes", route: "/clientes" },
  { slug: "contacto", route: "/contacto" },
  { slug: "nosotros", route: "/nosotros" },
  { slug: "partners", route: "/partners" },
  { slug: "servicios", route: "/servicios" },
  { slug: "equipo-marco-bertolini", route: "/equipo/marco-bertolini" },
  { slug: "servicios-experiencia-digital", route: "/servicios/experiencia-digital" },
]

const CONTENT_TYPES = {
  ".css": "text/css; charset=utf-8",
  ".gif": "image/gif",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".mjs": "application/javascript; charset=utf-8",
  ".mp4": "video/mp4",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webm": "video/webm",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".xml": "application/xml; charset=utf-8",
}

function formatMilliseconds(value) {
  if (typeof value !== "number") {
    return null
  }

  return `${Math.round(value)} ms`
}

function formatSeconds(value) {
  if (typeof value !== "number") {
    return null
  }

  return `${value.toFixed(2)} s`
}

function formatScore(value) {
  if (typeof value !== "number") {
    return "n/a"
  }

  return Math.round(value * 100)
}

function sanitizeUrlPath(urlPath) {
  const withoutQuery = urlPath.split("?")[0]
  const normalized = withoutQuery === "/" ? "/index.html" : withoutQuery
  return decodeURIComponent(normalized)
}

async function pathExists(targetPath) {
  try {
    await fs.access(targetPath)
    return true
  } catch {
    return false
  }
}

async function resolveFilePath(requestPath) {
  const sanitized = sanitizeUrlPath(requestPath)
  const rootRelative = sanitized.replace(/^\/+/, "")
  const candidates = [
    path.join(EXPORT_DIR, rootRelative),
    path.join(EXPORT_DIR, rootRelative, "index.html"),
    path.join(EXPORT_DIR, `${rootRelative}.html`),
  ]

  for (const candidate of candidates) {
    const normalized = path.normalize(candidate)

    if (!normalized.startsWith(EXPORT_DIR)) {
      return null
    }

    if (await pathExists(normalized)) {
      const stats = await fs.stat(normalized)
      if (stats.isFile()) {
        return normalized
      }
    }
  }

  return null
}

async function createStaticServer() {
  const server = http.createServer(async (req, res) => {
    try {
      const requestUrl = req.url || "/"
      const resolvedPath = await resolveFilePath(requestUrl)

      if (!resolvedPath) {
        res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" })
        res.end("Not found")
        return
      }

      const extension = path.extname(resolvedPath).toLowerCase()
      const contentType = CONTENT_TYPES[extension] || "application/octet-stream"
      const fileBuffer = await fs.readFile(resolvedPath)

      res.writeHead(200, {
        "Cache-Control": "no-cache",
        "Content-Type": contentType,
      })
      res.end(fileBuffer)
    } catch (error) {
      res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" })
      res.end("Internal server error")
      console.error("Static server error:", error)
    }
  })

  await new Promise((resolve, reject) => {
    server.once("error", reject)
    server.listen(PORT, HOST, resolve)
  })

  return server
}

function withTimeout(promise, label) {
  let timer

  return Promise.race([
    promise,
    new Promise((_, reject) => {
      timer = setTimeout(() => {
        reject(new Error(`${label} exceeded ${ROUTE_TIMEOUT_MS}ms`))
      }, ROUTE_TIMEOUT_MS)
    }),
  ]).finally(() => {
    clearTimeout(timer)
  })
}

async function ensureExportExists() {
  if (!(await pathExists(EXPORT_DIR))) {
    throw new Error(`No export found at ${EXPORT_DIR}. Run "npm run build" first.`)
  }
}

async function resetReportDir() {
  await fs.rm(REPORT_DIR, { recursive: true, force: true })
  await fs.mkdir(REPORT_DIR, { recursive: true })
}

async function runAudit() {
  await ensureExportExists()
  await resetReportDir()

  const [{ default: lighthouse }, { launch }] = await Promise.all([
    import("lighthouse"),
    import("chrome-launcher"),
  ])

  const chrome = await launch({
    chromeFlags: ["--headless=new", "--no-sandbox", "--disable-dev-shm-usage"],
  })

  const server = await createStaticServer()
  const summary = []
  const failures = []

  try {
    for (const entry of ROUTES) {
      const url = `http://${HOST}:${PORT}${entry.route}`
      console.log(`Auditing ${entry.route}`)

      try {
        const result = await withTimeout(
          lighthouse(
            url,
            {
              logLevel: "error",
              onlyCategories: ["performance", "accessibility", "best-practices", "seo"],
              output: ["html", "json"],
              port: chrome.port,
            },
            undefined,
          ),
          `Lighthouse for ${entry.route}`,
        )

        if (!result) {
          throw new Error(`Lighthouse returned no result for ${url}`)
        }

        const reports = Array.isArray(result.report) ? result.report : [result.report]
        await fs.writeFile(path.join(REPORT_DIR, `${entry.slug}.html`), reports[0], "utf8")
        await fs.writeFile(path.join(REPORT_DIR, `${entry.slug}.json`), reports[1], "utf8")

        const { categories, audits, finalDisplayedUrl } = result.lhr
        summary.push({
          route: entry.route,
          url: finalDisplayedUrl,
          scores: {
            performance: formatScore(categories.performance?.score),
            accessibility: formatScore(categories.accessibility?.score),
            bestPractices: formatScore(categories["best-practices"]?.score),
            seo: formatScore(categories.seo?.score),
          },
          metrics: {
            firstContentfulPaint: formatSeconds(audits["first-contentful-paint"]?.numericValue / 1000),
            largestContentfulPaint: formatSeconds(audits["largest-contentful-paint"]?.numericValue / 1000),
            speedIndex: formatSeconds(audits["speed-index"]?.numericValue / 1000),
            totalBlockingTime: formatMilliseconds(audits["total-blocking-time"]?.numericValue),
            cumulativeLayoutShift: audits["cumulative-layout-shift"]?.displayValue || null,
          },
        })
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error)
        failures.push({ route: entry.route, error: message })
        console.error(`Audit failed for ${entry.route}: ${message}`)
      }
    }
  } finally {
    await new Promise((resolve) => server.close(resolve))
    await chrome.kill()
  }

  await fs.writeFile(
    path.join(REPORT_DIR, "summary.json"),
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        host: `http://${HOST}:${PORT}`,
        routes: summary,
        failures,
      },
      null,
      2,
    ),
    "utf8",
  )

  console.log("\nLighthouse summary")
  for (const route of summary) {
    console.log(
      [
        `- ${route.route}`,
        `Perf ${route.scores.performance}`,
        `A11y ${route.scores.accessibility}`,
        `Best ${route.scores.bestPractices}`,
        `SEO ${route.scores.seo}`,
        `LCP ${route.metrics.largestContentfulPaint || "n/a"}`,
        `TBT ${route.metrics.totalBlockingTime || "n/a"}`,
        `CLS ${route.metrics.cumulativeLayoutShift || "n/a"}`,
      ].join(" | "),
    )
  }

  console.log(`\nReports written to ${path.relative(PROJECT_ROOT, REPORT_DIR)}`)

  if (failures.length > 0) {
    console.log("\nRoutes with audit failures")
    for (const failure of failures) {
      console.log(`- ${failure.route}: ${failure.error}`)
    }
  }
}

runAudit().catch((error) => {
  console.error("\nLighthouse run failed")
  console.error(error instanceof Error ? error.message : error)
  process.exit(1)
})
