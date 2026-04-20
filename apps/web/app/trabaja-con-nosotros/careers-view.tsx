"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import type { Job } from "@vrgroup/domain"
import { listPublishedJobs } from "@/lib/careers/client"
import { JobCard } from "@/components/careers/job-card"
import { JobDetail } from "@/components/careers/job-detail"
import { CareersEmpty } from "@/components/careers/careers-empty"
import { CareersLoading } from "@/components/careers/careers-loading"

type Status = "loading" | "ready" | "error"

export function CareersView() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const activeSlug = searchParams.get("job")?.trim() || null

  const [jobs, setJobs] = useState<Job[]>([])
  const [status, setStatus] = useState<Status>("loading")

  useEffect(() => {
    let cancelled = false
    listPublishedJobs()
      .then((data) => {
        if (cancelled) return
        setJobs(data)
        setStatus("ready")
      })
      .catch((err) => {
        if (cancelled) return
        console.error("Error loading jobs", err)
        setStatus("error")
      })
    return () => {
      cancelled = true
    }
  }, [])

  const selectedJob = useMemo(
    () => (activeSlug ? jobs.find((job) => job.slug === activeSlug) ?? null : null),
    [jobs, activeSlug],
  )

  const updateSlug = useCallback(
    (slug: string | null) => {
      const params = new URLSearchParams(Array.from(searchParams.entries()))
      if (slug) {
        params.set("job", slug)
      } else {
        params.delete("job")
      }
      const query = params.toString()
      router.push(query ? `/trabaja-con-nosotros?${query}` : "/trabaja-con-nosotros", {
        scroll: false,
      })
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, behavior: "smooth" })
      }
    },
    [router, searchParams],
  )

  if (activeSlug && selectedJob) {
    return <JobDetail job={selectedJob} onBack={() => updateSlug(null)} />
  }

  if (activeSlug && status === "ready" && !selectedJob) {
    return (
      <CareersEmpty
        message="Esta vacante ya no está disponible o fue despublicada. Revisa las ofertas abiertas más abajo."
      />
    )
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-coral mb-2">
            Posiciones abiertas
          </p>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-blue-dark">
            Vacantes publicadas
          </h2>
        </div>
        {status === "ready" && (
          <p className="text-gray-600">
            {jobs.length === 0
              ? "No hay vacantes publicadas."
              : `${jobs.length} vacante${jobs.length === 1 ? "" : "s"} publicada${jobs.length === 1 ? "" : "s"}.`}
          </p>
        )}
      </div>

      {status === "loading" ? (
        <CareersLoading />
      ) : status === "error" ? (
        <CareersEmpty message="No pudimos cargar las vacantes. Intenta recargar la página en unos minutos." />
      ) : jobs.length === 0 ? (
        <CareersEmpty />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} onSelect={updateSlug} />
          ))}
        </div>
      )}
    </div>
  )
}
