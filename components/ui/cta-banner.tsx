import Link from "next/link"
import type { ReactNode } from "react"
import { ArrowRight } from "lucide-react"

type CTABannerProps = {
  eyebrow?: string
  title: ReactNode
  subtitle: ReactNode
  buttonLabel: string
  buttonHref: string
}

export function CTABanner({ eyebrow, title, subtitle, buttonLabel, buttonHref }: CTABannerProps) {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#FF5A5F_0%,#ff7a7f_15%,#0b0b0b_45%,#000_100%)] text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-14 text-center space-y-4">
        {eyebrow && (
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold uppercase tracking-[0.16em]">
            {eyebrow}
          </div>
        )}
        <h2 className="font-display font-bold text-3xl sm:text-4xl leading-tight">{title}</h2>
        <p className="text-lg sm:text-xl text-white/85 max-w-3xl mx-auto">{subtitle}</p>
        <div className="flex justify-center pt-2">
          <Link
            href={buttonHref}
            className="inline-flex items-center gap-2 px-6 sm:px-7 py-3 rounded-xl bg-white text-black font-semibold shadow-[0_14px_30px_rgba(0,0,0,0.25)] hover:translate-y-[-1px] transition"
          >
            {buttonLabel}
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  )
}
