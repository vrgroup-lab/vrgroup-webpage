"use client"

import { ArrowLeft } from "lucide-react"
import { formatDateLabel, getBadgeLabel, type Job } from "@vrgroup/domain"
import { ApplyActions } from "./apply-actions"

type JobDetailProps = {
  job: Job
  onBack: () => void
}

function BulletList({ items }: { items: string[] }) {
  if (!items.length) return null
  return (
    <ul className="grid gap-3 m-0 p-0 list-none">
      {items.map((item) => (
        <li key={item} className="flex gap-3 items-start text-gray-700 leading-relaxed">
          <span className="mt-2 h-2 w-2 rounded-full bg-coral flex-shrink-0" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

export function JobDetail({ job, onBack }: JobDetailProps) {
  const badges = [
    getBadgeLabel("seniority", job.seniority),
    getBadgeLabel("modality", job.modality),
    getBadgeLabel("employment", job.employmentType),
  ].filter(Boolean)

  const publishedLabel = formatDateLabel(job.publishedAt || job.createdAt)

  return (
    <div>
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-dark font-semibold mb-5 transition-colors"
      >
        <ArrowLeft size={16} />
        Volver a vacantes
      </button>

      <section className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-[0_18px_45px_rgba(15,23,42,0.05)]">
        {badges.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {badges.map((badge) => (
              <span
                key={badge?.label}
                className="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold"
                style={{ background: badge?.tone, color: badge?.color }}
              >
                {badge?.label}
              </span>
            ))}
          </div>
        )}

        <h1 className="mt-4 font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-blue-dark leading-tight">
          {job.title}
        </h1>
        {job.summary && (
          <p className="mt-4 text-lg text-gray-600 leading-relaxed">{job.summary}</p>
        )}

        <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-500">
          {job.location && <span>{job.location}</span>}
          {publishedLabel && <span>Publicado {publishedLabel}</span>}
          {job.tags.length > 0 && <span>{job.tags.join(", ")}</span>}
        </div>
      </section>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-[minmax(0,1.4fr)_minmax(320px,0.8fr)] gap-6">
        <div className="grid gap-5">
          {job.description && (
            <article className="rounded-3xl border border-gray-200 bg-white p-6">
              <h2 className="font-display font-bold text-2xl text-blue-dark mb-3">Descripción</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">{job.description}</p>
            </article>
          )}
          {job.responsibilities.length > 0 && (
            <article className="rounded-3xl border border-gray-200 bg-white p-6">
              <h2 className="font-display font-bold text-2xl text-blue-dark mb-3">Responsabilidades</h2>
              <BulletList items={job.responsibilities} />
            </article>
          )}
          {job.requirements.length > 0 && (
            <article className="rounded-3xl border border-gray-200 bg-white p-6">
              <h2 className="font-display font-bold text-2xl text-blue-dark mb-3">Requisitos</h2>
              <BulletList items={job.requirements} />
            </article>
          )}
          {job.benefits.length > 0 && (
            <article className="rounded-3xl border border-gray-200 bg-white p-6">
              <h2 className="font-display font-bold text-2xl text-blue-dark mb-3">Beneficios</h2>
              <BulletList items={job.benefits} />
            </article>
          )}
        </div>

        <aside className="grid gap-5 self-start">
          <ApplyActions job={job} />
        </aside>
      </div>
    </div>
  )
}
