import { Search, ShieldCheck } from "lucide-react"

export function ComplianceHighlight() {
  return (
    <section className="bg-white pt-10 sm:pt-12 lg:pt-14 pb-10 sm:pb-12 lg:pb-14">
      <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0a0d18] via-[#0b1020] to-[#05060b] p-8 sm:p-10 lg:p-12 shadow-xl">
          <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-white/5 blur-3xl pointer-events-none" />
          <div className="relative grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-8 lg:gap-12 items-center">
            <div>
              <h2 className="font-display text-white text-3xl sm:text-4xl mb-3">
                <span className="font-normal">Cumplimiento</span>{" "}
                <span className="font-bold">Normativo</span>
              </h2>
              <p className="text-base sm:text-lg text-white/75 max-w-xl">
                Acompañamos la adecuación a la nueva Ley de Protección de Datos Personales con discovery e
                implementación.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-xl bg-white/[0.04] border border-white/10 p-5 hover:bg-white/[0.07] hover:border-white/20 transition-all">
                <div className="w-10 h-10 rounded-lg bg-[#FF5A5F]/15 flex items-center justify-center text-[#FF5A5F] mb-3">
                  <Search size={20} />
                </div>
                <h3 className="font-display font-semibold text-base text-white mb-1.5">Discovery</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Diagnóstico del estado actual y brechas frente a la normativa.
                </p>
              </div>
              <div className="rounded-xl bg-white/[0.04] border border-white/10 p-5 hover:bg-white/[0.07] hover:border-white/20 transition-all">
                <div className="w-10 h-10 rounded-lg bg-[#FF5A5F]/15 flex items-center justify-center text-[#FF5A5F] mb-3">
                  <ShieldCheck size={20} />
                </div>
                <h3 className="font-display font-semibold text-base text-white mb-1.5">Implementación</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Plan de adecuación con controles, políticas y evidencia.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 sm:mt-12 lg:mt-14 border-t border-gray-100" />
      </div>
    </section>
  )
}
