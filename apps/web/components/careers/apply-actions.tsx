import type { Job } from "@vrgroup/domain"

type ApplyActionsProps = {
  job: Job
}

export function ApplyActions({ job }: ApplyActionsProps) {
  const hasAny = job.applyUrl || job.applyLinkedInUrl || job.applyNotionUrl || job.applyEmail

  return (
    <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.05)]">
      <h2 className="font-display font-bold text-2xl text-blue-dark mb-2">Postular</h2>
      <p className="text-gray-600 leading-relaxed">
        Postula a través de los canales configurados por el equipo. Si no hay un enlace directo,
        usa el email de contacto.
      </p>

      <div className="mt-5 grid gap-2.5">
        {job.applyUrl && (
          <a
            href={job.applyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-xl bg-blue-dark text-white font-semibold px-4 py-3 hover:bg-[#0a1628] transition-colors"
          >
            Aplicar en portal externo
          </a>
        )}
        {job.applyLinkedInUrl && (
          <a
            href={job.applyLinkedInUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-xl bg-coral text-white font-semibold px-4 py-3 hover:bg-coral-dark transition-colors"
          >
            Aplicar por LinkedIn
          </a>
        )}
        {job.applyNotionUrl && (
          <a
            href={job.applyNotionUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-xl border border-gray-300 bg-white text-blue-dark font-semibold px-4 py-3 hover:bg-gray-50 transition-colors"
          >
            Completar formulario externo
          </a>
        )}
        {job.applyEmail && (
          <a
            href={`mailto:${job.applyEmail}?subject=${encodeURIComponent(`Postulación ${job.title}`)}`}
            className="inline-flex items-center justify-center rounded-xl border border-gray-300 bg-white text-blue-dark font-semibold px-4 py-3 hover:bg-gray-50 transition-colors"
          >
            Postular por email
          </a>
        )}
        {!hasAny && (
          <div className="rounded-xl border border-dashed border-gray-300 text-gray-600 p-4 leading-relaxed">
            Esta oferta aún no tiene un canal de postulación configurado. Escríbenos a
            {" "}
            <a href="mailto:contacto@vrgroup.cl" className="text-coral font-semibold">
              contacto@vrgroup.cl
            </a>
            .
          </div>
        )}
      </div>
    </section>
  )
}
