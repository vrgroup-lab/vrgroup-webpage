"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useRef, useEffect } from "react"
import { Menu, X, ChevronDown } from "lucide-react"
import { servicesData } from "@/components/ui/services-section"

type NavbarSettings = {
  showPortfolioInHeader?: boolean
  showCareersInHeader?: boolean
}

type NavbarProps = {
  settings?: NavbarSettings
}

export function Navbar({ settings }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const closeTimeout = useRef<NodeJS.Timeout | null>(null)

  const openServices = () => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current)
    setServicesOpen(true)
  }

  const delayedCloseServices = () => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current)
    closeTimeout.current = setTimeout(() => setServicesOpen(false), 140)
  }

  useEffect(() => {
    return () => {
      if (closeTimeout.current) clearTimeout(closeTimeout.current)
    }
  }, [])

  const shortTitles: Record<string, string> = {
    "transformacion-digital-desarrollo": "Experiencia Digital",
    "soluciones-ti-proyectos": "Software Factory",
    "automatizacion-procesos": "Automatización de Procesos",
    "gestion-operaciones-riesgo": "Gestión y Riesgo",
    "ia-agentes-inteligentes": "IA & Agentes",
    "staffing-celulas-agiles": "Staffing & Células",
  }

  const showPortfolio = settings?.showPortfolioInHeader ?? true
  const showCareers = settings?.showCareersInHeader ?? false

  const navItems = [
    { label: "Servicios", href: "/servicios", hasSub: true },
    { label: "Quiénes somos", href: "/nosotros" },
    ...(showPortfolio ? [{ label: "Portafolio", href: "/portafolio" }] : []),
    ...(showCareers ? [{ label: "Trabaja con nosotros", href: "/trabaja-con-nosotros" }] : []),
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
      <div className="flex justify-center px-3 pt-3 sm:pt-4">
        <div className="w-full max-w-[1308px] sm:max-w-[1292px] lg:max-w-[1276px] rounded-xl border border-white/15 bg-black/90 shadow-[0_18px_45px_rgba(0,0,0,0.45)] backdrop-blur-lg px-3 sm:px-4 lg:px-4 pointer-events-auto">
          <div className="grid grid-cols-[auto_1fr_auto] items-center h-14 gap-3 sm:gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center font-display text-white">
              <div className="relative h-11 w-36 sm:h-12 sm:w-40">
                <Image
                  src="/logos/brand/logo-vr-group_rectangulo.png"
                  alt="VR Group"
                  fill
                  priority
                  sizes="128px"
                  className="object-contain object-left"
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center justify-center gap-8 text-sm font-medium">
              {navItems.map((item) =>
                item.hasSub ? (
                  <div
                    key={item.href}
                    className="relative"
                    onMouseEnter={openServices}
                    onMouseLeave={delayedCloseServices}
                  >
                    <button className="flex items-center gap-1 text-white hover:text-white transition-colors">
                      {item.label}
                      <ChevronDown size={14} className={`${servicesOpen ? "rotate-180" : ""} transition-transform`} />
                    </button>
                    <div
                      onMouseEnter={openServices}
                      onMouseLeave={delayedCloseServices}
                      className={`fixed inset-x-0 top-[76px] w-full px-0 pt-0 z-40 transition-all duration-150 ${
                        servicesOpen ? "opacity-100 pointer-events-auto translate-y-0" : "opacity-0 pointer-events-none -translate-y-1"
                      }`}
                    >
                      <div className="border-t border-white/10 bg-black shadow-[0_20px_70px_rgba(0,0,0,0.45)]">
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 px-6 pb-6 pt-6">
                          {servicesData.map((service) => {
                            const shortTitle = shortTitles[service.slug] ?? service.title
                            const Icon = service.icon
                            return (
                              <Link
                                key={service.slug}
                                href={`/servicios/${service.slug}`}
                                className="flex gap-3 p-4 rounded-2xl hover:bg-white/10 transition-colors h-full border border-transparent hover:border-white/20"
                              >
                                <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white">
                                  <Icon size={18} />
                                </div>
                                <div>
                                  <p className="text-sm font-semibold text-white leading-snug">{shortTitle}</p>
                                  <p className="text-xs text-white/80 leading-relaxed">{service.description}</p>
                                </div>
                              </Link>
                            )
                          })}
                        </div>
                        <div className="border-t border-white/10 px-6 py-3 text-right">
                          <Link href={item.href} className="text-sm font-semibold text-[#FF7A7F] hover:text-white">
                            Ver todos los servicios →
                          </Link>
            </div>
          </div>
        </div>
      </div>
                ) : (
                  <Link key={item.href} href={item.href} className="text-white hover:text-white transition-colors">
                    {item.label}
                  </Link>
                )
              )}
            </div>

            {/* CTA */}
            <div className="hidden md:flex items-center gap-4 justify-end">
              <Link
                href="/contacto"
                className="px-4 py-1.5 rounded-md bg-white text-black font-medium text-sm hover:bg-gray-100 transition-all"
              >
                Agenda una reunión
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden justify-self-end text-white flex items-center justify-center w-9 h-9 -mr-1"
              onClick={() => {
                setIsOpen(!isOpen)
                setServicesOpen(false)
                setMobileServicesOpen(false)
                if (closeTimeout.current) clearTimeout(closeTimeout.current)
              }}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="md:hidden pb-6 text-white">
              <div className="space-y-6 pt-4">
                <div className="pb-2">
                  <button
                    type="button"
                    onClick={() => setMobileServicesOpen((prev) => !prev)}
                    className="w-full flex items-center justify-start gap-2 text-left focus:outline-none focus-visible:outline-none focus-visible:ring-0"
                    aria-expanded={mobileServicesOpen}
                  >
                    <span className="text-base font-medium text-white/85">Servicios</span>
                    <ChevronDown
                      size={16}
                      className={`text-white/70 transition-transform ${mobileServicesOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  {mobileServicesOpen && (
                    <div className="mt-3 grid grid-cols-1 gap-2">
                      {servicesData.map((service) => {
                        const shortTitle = shortTitles[service.slug] ?? service.title
                        const shortDesc = service.shortDescription ?? service.description
                        const Icon = service.icon
                        return (
                          <Link
                            key={service.slug}
                            href={`/servicios/${service.slug}`}
                            className="flex items-center gap-3 py-2.5 hover:text-white transition"
                            onClick={() => {
                              setIsOpen(false)
                              setMobileServicesOpen(false)
                            }}
                          >
                            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-white/5 text-white/80">
                              <Icon size={16} />
                            </span>
                            <div className="min-w-0">
                              <p className="text-sm font-medium text-white leading-snug">{shortTitle}</p>
                              <p className="text-[11px] text-white/55 line-clamp-1">
                                {shortDesc}
                              </p>
                            </div>
                          </Link>
                        )
                      })}
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {navItems
                    .filter((item) => !item.hasSub)
                    .map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="flex items-center justify-start gap-2 py-3 text-white/85 hover:text-white transition"
                        onClick={() => setIsOpen(false)}
                      >
                        <span className="font-medium">{item.label}</span>
                        <span className="text-white/50">→</span>
                      </Link>
                    ))}
                </div>

                <div className="pt-2 border-t border-white/10">
                  <Link
                    href="/contacto"
                    className="block px-4 py-2.5 rounded-md bg-white text-black text-center font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    Agenda una reunión
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
