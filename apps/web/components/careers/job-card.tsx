"use client"

import { ArrowRight } from "lucide-react"
import { formatDateLabel, getBadgeLabel, type Job } from "@vrgroup/domain"

type JobCardProps = {
  job: Job
  onSelect: (slug: string) => void
}

export function JobCard({ job, onSelect }: JobCardProps) {
  const badges = [
    getBadgeLabel("seniority", job.seniority),
    getBadgeLabel("modality", job.modality),
    getBadgeLabel("employment", job.employmentType),
  ].filter(Boolean)

  const publishedLabel = formatDateLabel(job.publishedAt || job.createdAt)

  return (
    <button
      type="button"
      onClick={() => onSelect(job.slug)}
      className="group text-left rounded-3xl border border-gray-200 bg-white p-6 shadow-[0_12px_30px_rgba(15,23,42,0.05)] hover:border-coral hover:shadow-[0_18px_40px_rgba(15,23,42,0.08)] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-coral"
    >
      {badges.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {badges.map((badge) => (
            <span
              key={`${job.id}-${badge?.label}`}
              className="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold"
              style={{ background: badge?.tone, color: badge?.color }}
            >
              {badge?.label}
            </span>
          ))}
        </div>
      )}

      <h3 className="font-display font-bold text-xl sm:text-2xl text-blue-dark leading-snug group-hover:text-coral transition-colors">
        {job.title}
      </h3>

      {job.summary && (
        <p className="mt-3 text-gray-600 leading-relaxed line-clamp-3">{job.summary}</p>
      )}

      <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500">
        {job.location && <span>{job.location}</span>}
        {publishedLabel && <span>Publicado {publishedLabel}</span>}
      </div>

      <div className="mt-5 inline-flex items-center gap-2 text-coral font-semibold text-sm">
        Ver detalle
        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
      </div>
    </button>
  )
}
