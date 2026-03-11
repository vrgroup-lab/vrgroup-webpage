import Link from "next/link"
import { notFound } from "next/navigation"
import { formatDateLabel, getBadgeLabel, getPublishedJobBySlug } from "@/lib/careers/repository"

export const dynamic = "force-dynamic"

function BulletList({ items }: { items: string[] }) {
  if (!items.length) return null

  return (
    <ul style={{ display: "grid", gap: 12, margin: 0, padding: 0, listStyle: "none" }}>
      {items.map((item) => (
        <li key={item} style={{ display: "flex", gap: 10, alignItems: "start", color: "#334155", lineHeight: 1.6 }}>
          <span style={{ marginTop: 8, width: 8, height: 8, borderRadius: 999, background: "#ff5a5f", flexShrink: 0 }} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

export default async function JobDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const job = await getPublishedJobBySlug(slug)

  if (!job) {
    notFound()
  }

  return (
    <main style={{ maxWidth: 1120, margin: "0 auto", padding: "40px 20px 80px" }}>
      <div style={{ marginBottom: 18 }}>
        <Link href="/trabaja-con-nosotros" style={{ textDecoration: "none", color: "#4f5d75", fontWeight: 600 }}>
          ← Volver a vacantes
        </Link>
      </div>

      <section
        style={{
          background: "#fff",
          border: "1px solid #d8e0ea",
          borderRadius: 32,
          padding: 28,
          boxShadow: "0 18px 45px rgba(15, 23, 42, 0.05)",
        }}
      >
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {[getBadgeLabel("seniority", job.seniority), getBadgeLabel("modality", job.modality), getBadgeLabel("employment", job.employmentType)]
            .filter(Boolean)
            .map((badge) => (
              <span
                key={badge?.label}
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

        <h1 style={{ margin: "18px 0 12px", fontSize: 42, lineHeight: 1.05 }}>{job.title}</h1>
        {job.summary ? <p style={{ margin: 0, fontSize: 19, lineHeight: 1.7, color: "#4f5d75" }}>{job.summary}</p> : null}

        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginTop: 16, fontSize: 14, color: "#5b6b82" }}>
          {job.location ? <span>{job.location}</span> : null}
          {job.publishedAt || job.createdAt ? <span>Publicado {formatDateLabel(job.publishedAt || job.createdAt)}</span> : null}
          {job.tags.length ? <span>{job.tags.join(", ")}</span> : null}
        </div>
      </section>

      <div
        style={{
          marginTop: 24,
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.4fr) minmax(320px, 0.8fr)",
          gap: 20,
        }}
      >
        <section style={{ display: "grid", gap: 20 }}>
          {job.description ? (
            <article style={{ background: "#fff", border: "1px solid #d8e0ea", borderRadius: 28, padding: 24 }}>
              <h2 style={{ marginTop: 0, fontSize: 28 }}>Descripcion</h2>
              <p style={{ margin: 0, color: "#334155", lineHeight: 1.75, whiteSpace: "pre-line" }}>{job.description}</p>
            </article>
          ) : null}

          {job.responsibilities.length ? (
            <article style={{ background: "#fff", border: "1px solid #d8e0ea", borderRadius: 28, padding: 24 }}>
              <h2 style={{ marginTop: 0, fontSize: 28 }}>Responsabilidades</h2>
              <BulletList items={job.responsibilities} />
            </article>
          ) : null}

          {job.requirements.length ? (
            <article style={{ background: "#fff", border: "1px solid #d8e0ea", borderRadius: 28, padding: 24 }}>
              <h2 style={{ marginTop: 0, fontSize: 28 }}>Requisitos</h2>
              <BulletList items={job.requirements} />
            </article>
          ) : null}

          {job.benefits.length ? (
            <article style={{ background: "#fff", border: "1px solid #d8e0ea", borderRadius: 28, padding: 24 }}>
              <h2 style={{ marginTop: 0, fontSize: 28 }}>Beneficios</h2>
              <BulletList items={job.benefits} />
            </article>
          ) : null}
        </section>

        <aside style={{ display: "grid", gap: 20, alignSelf: "start" }}>
          <section style={{ background: "#fff", border: "1px solid #d8e0ea", borderRadius: 28, padding: 24 }}>
            <h2 style={{ marginTop: 0, fontSize: 26 }}>Aplicar</h2>
            <p style={{ color: "#4f5d75", lineHeight: 1.6 }}>
              Esta vacante deriva a los canales de postulacion configurados en la oferta. Si no hay un enlace directo,
              usa el email de contacto.
            </p>
            <div style={{ display: "grid", gap: 10, marginTop: 14 }}>
              {job.applyUrl ? (
                <Link
                  href={job.applyUrl}
                  target="_blank"
                  style={{
                    textDecoration: "none",
                    textAlign: "center",
                    borderRadius: 14,
                    background: "#0b1b33",
                    color: "#fff",
                    padding: "14px 16px",
                    fontWeight: 700,
                  }}
                >
                  Aplicar en portal externo
                </Link>
              ) : null}
              {job.applyLinkedInUrl ? (
                <Link
                  href={job.applyLinkedInUrl}
                  target="_blank"
                  style={{
                    textDecoration: "none",
                    textAlign: "center",
                    borderRadius: 14,
                    background: "#ff5a5f",
                    color: "#fff",
                    padding: "14px 16px",
                    fontWeight: 700,
                  }}
                >
                  Aplicar por LinkedIn
                </Link>
              ) : null}
              {job.applyNotionUrl ? (
                <Link
                  href={job.applyNotionUrl}
                  target="_blank"
                  style={{
                    textDecoration: "none",
                    textAlign: "center",
                    borderRadius: 14,
                    background: "#fff",
                    color: "#0b1b33",
                    border: "1px solid #d8e0ea",
                    padding: "14px 16px",
                    fontWeight: 700,
                  }}
                >
                  Completar formulario externo
                </Link>
              ) : null}
              {job.applyEmail ? (
                <Link
                  href={`mailto:${job.applyEmail}?subject=${encodeURIComponent(`Postulacion ${job.title}`)}`}
                  style={{
                    textDecoration: "none",
                    textAlign: "center",
                    borderRadius: 14,
                    background: "#fff",
                    color: "#0b1b33",
                    border: "1px solid #d8e0ea",
                    padding: "14px 16px",
                    fontWeight: 700,
                  }}
                >
                  Postular por email
                </Link>
              ) : null}
              {!job.applyUrl && !job.applyLinkedInUrl && !job.applyNotionUrl && !job.applyEmail ? (
                <div
                  style={{
                    borderRadius: 18,
                    border: "1px dashed #cbd5e1",
                    color: "#4f5d75",
                    padding: 16,
                    lineHeight: 1.6,
                  }}
                >
                  Esta oferta aun no tiene un canal de postulacion configurado.
                </div>
              ) : null}
            </div>
          </section>
        </aside>
      </div>
    </main>
  )
}
