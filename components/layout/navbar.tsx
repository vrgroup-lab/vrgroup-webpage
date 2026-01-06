"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useRef, useEffect } from "react"
import { Menu, X, ChevronDown } from "lucide-react"
import { servicesData } from "@/components/ui/services-section"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
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

  const navItems = [
    { label: "Servicios", href: "/servicios", hasSub: true },
    { label: "Equipo", href: "/nosotros" },
    { label: "Portafolio", href: "/portafolio" },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
      <div className="flex justify-center px-3 pt-3 sm:pt-4">
        <div className="w-full max-w-[1260px] rounded-2xl border border-white/10 bg-black/90 shadow-[0_18px_45px_rgba(0,0,0,0.45)] backdrop-blur-lg px-4 sm:px-6 lg:px-8 pointer-events-auto">
          <div className="grid grid-cols-[auto_1fr_auto] items-center h-16 gap-3 sm:gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center font-display text-white -ml-1 sm:-ml-2">
              <div className="relative h-11 w-36 sm:h-12 sm:w-40">
                <Image
                  src="/logos/brand/logo-vr-group_rectangulo.png"
                  alt="VR Group"
                  fill
                  priority
                  sizes="128px"
                  className="object-contain"
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center justify-center gap-6 text-sm font-semibold">
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
            <div className="hidden md:flex items-center gap-3 justify-end">
              <Link
                href="/contacto"
                className="px-5 py-2 rounded-xl bg-white text-black font-semibold text-sm hover:bg-gray-100 transition-all"
              >
                Agenda una reunión
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden justify-self-end text-white"
              onClick={() => {
                setIsOpen(!isOpen)
                setServicesOpen(false)
                if (closeTimeout.current) clearTimeout(closeTimeout.current)
              }}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="md:hidden pb-4 space-y-3 text-white">
              {navItems.map((item) =>
                item.hasSub ? (
                  <div key={item.href} className="space-y-2">
                    <Link
                      href={item.href}
                      className="block text-white/80 hover:text-white transition-colors font-medium"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </Link>
                    <div className="pl-3 space-y-1">
                      {servicesData.map((service) => (
                        <Link
                          key={service.slug}
                          href={`/servicios/${service.slug}`}
                          className="block text-sm text-white/60 hover:text-white"
                          onClick={() => setIsOpen(false)}
                        >
                          {service.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block text-white/80 hover:text-white transition-colors font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                )
              )}
              <div className="pt-3 border-t border-white/10">
                <Link
                  href="/contacto"
                  className="block px-4 py-2 rounded-xl bg-white text-black text-center font-semibold"
                  onClick={() => setIsOpen(false)}
                >
                  Agenda una reunión
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
