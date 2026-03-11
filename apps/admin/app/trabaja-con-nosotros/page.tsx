import Link from "next/link"
import { formatDateLabel, getBadgeLabel, listPublishedJobs } from "@/lib/careers/repository"

export const dynamic = "force-dynamic"

export default async function CareersPage() {
  const jobs = await listPublishedJobs()

  return (
    <main style={{ maxWidth: 1180, margin: "0 auto", padding: "40px 20px 80px" }}>
      <section
        style={{
          background: "linear-gradient(135deg, #08111f, #0b1b33 58%, #123a6b)",
          color: "#fff",
          borderRadius: 32,
          padding: "40px 28px",
          boxShadow: "0 24px 60px rgba(11, 27, 51, 0.18)",
        }}
      >
        <p style={{ margin: 0, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.18em", color: "#ffb3b5" }}>
          Talento
        </p>
        <h1 style={{ margin: "14px 0 10px", fontSize: 46, lineHeight: 1.05 }}>Construye productos con impacto real</h1>
        <p style={{ margin: 0, maxWidth: 780, fontSize: 18, lineHeight: 1.7, color: "rgba(255,255,255,0.84)" }}>
          Este modulo vive en la capa dinamica porque las vacantes cambian, se publican y se archivan. Las postulaciones
          hoy se canalizan a traves de enlaces externos definidos en cada oferta.
        </p>
      </section>

      <section style={{ marginTop: 28 }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 16, alignItems: "end", flexWrap: "wrap" }}>
          <div>
            <p style={{ margin: 0, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.16em", color: "#ff5a5f" }}>
              Posiciones abiertas
            </p>
            <h2 style={{ margin: "10px 0 0", fontSize: 34 }}>Vacantes publicadas</h2>
          </div>
          <p style={{ margin: 0, color: "#4f5d75" }}>
            {jobs.length === 0 ? "No hay vacantes publicadas." : `${jobs.length} vacante(s) publicada(s).`}
          </p>
        </div>

        <div
          style={{
            marginTop: 20,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 18,
          }}
        >
          {jobs.length === 0 ? (
            <div
              style={{
                border: "1px dashed #cbd5e1",
                background: "#fff",
                borderRadius: 24,
                padding: 24,
                color: "#4f5d75",
              }}
            >
              Aun no hay ofertas publicadas o faltan variables/configuracion para leerlas desde Supabase.
            </div>
          ) : (
            jobs.map((job) => (
              <Link
                key={job.id}
                href={`/trabaja-con-nosotros/${job.slug}`}
                style={{
                  textDecoration: "none",
                  color: "#0b1b33",
                  borderRadius: 24,
                  background: "#fff",
                  border: "1px solid #d8e0ea",
                  padding: 22,
                  boxShadow: "0 12px 30px rgba(15, 23, 42, 0.05)",
                }}
              >
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
                  {[getBadgeLabel("seniority", job.seniority), getBadgeLabel("modality", job.modality), getBadgeLabel("employment", job.employmentType)]
                    .filter(Boolean)
                    .map((badge) => (
                      <span
                        key={`${job.id}-${badge?.label}`}
                        style={{
                          borderRadius: 999,
                          padding: "6px 10px",
                          fontSize: 12,
                          fontWeight: 700,
                          background: badge?.tone,
                          color: badge?.color,
                        }}
                      >
                        {badge?.label}
                      </span>
                    ))}
                </div>
                <h3 style={{ margin: 0, fontSize: 24, lineHeight: 1.2 }}>{job.title}</h3>
                {job.summary ? (
                  <p style={{ margin: "12px 0 0", color: "#4f5d75", lineHeight: 1.6 }}>{job.summary}</p>
                ) : null}
                <div style={{ marginTop: 14, display: "flex", gap: 12, flexWrap: "wrap", color: "#5b6b82", fontSize: 14 }}>
                  {job.location ? <span>{job.location}</span> : null}
                  {job.publishedAt || job.createdAt ? <span>Publicado {formatDateLabel(job.publishedAt || job.createdAt)}</span> : null}
                </div>
              </Link>
            ))
          )}
        </div>
      </section>
    </main>
  )
}
