import Link from "next/link"
import type { ReactNode } from "react"

type CTABannerProps = {
  eyebrow?: string
  title: ReactNode
  subtitle: ReactNode
  buttonLabel: string
  buttonHref: string
}

export function CTABanner({ eyebrow, title, subtitle, buttonLabel, buttonHref }: CTABannerProps) {
  return (
    <section className="relative overflow-hidden rounded-t-3xl bg-[linear-gradient(180deg,#0b2f5f_0%,#0b1b33_55%,#000_100%)] text-white -mt-5">
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
            className="inline-flex items-center px-4 py-1.5 rounded-md bg-white text-black text-sm font-semibold shadow-[0_12px_24px_rgba(0,0,0,0.22)] hover:translate-y-[-1px] transition"
          >
            {buttonLabel}
          </Link>
        </div>
      </div>
    </section>
  )
}
