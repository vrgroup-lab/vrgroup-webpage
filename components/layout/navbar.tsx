"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Menu, X, ChevronDown } from "lucide-react"
import { servicesData } from "@/components/ui/services-section"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)

  const shortTitles: Record<string, string> = {
    "transformacion-digital-desarrollo": "Transformación Digital",
    "soluciones-ti-proyectos": "Soluciones TI",
    "automatizacion-procesos": "Automatización de Procesos",
    "gestion-operaciones-riesgo": "Gestión y Riesgo",
    "ia-agentes-inteligentes": "IA & Agentes",
    "analitica-ml": "Analítica & ML",
  }

  const navItems = [
    { label: "Inicio", href: "/" },
    { label: "Servicios", href: "/servicios", hasSub: true },
    { label: "Portafolio", href: "/portafolio" },
    { label: "Blog", href: "/blog" },
    { label: "Nosotros", href: "/nosotros" },
  ]

  return (
    <nav className="sticky top-0 z-50">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#FF5A5F] to-transparent opacity-80" />
      <div className="backdrop-blur bg-[#0B1B33]/95 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center font-display text-white -ml-2 sm:-ml-3">
              <div className="relative h-12 w-36">
                <Image
                  src="/logos/brand/logo-vr-group_rectangulo.png"
                  alt="VR Group"
                  fill
                  priority
                  sizes="144px"
                  className="object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.35)]"
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) =>
                item.hasSub ? (
                  <div
                    key={item.href}
                    className="relative"
                    onMouseEnter={() => setServicesOpen(true)}
                    onMouseLeave={() => setServicesOpen(false)}
                  >
                    <button className="flex items-center gap-1 text-gray-200 hover:text-[#FF7A7F] transition-colors font-medium text-sm">
                      {item.label}
                      <ChevronDown size={14} className={`${servicesOpen ? "rotate-180" : ""} transition-transform`} />
                    </button>
                    <div
                      onMouseEnter={() => setServicesOpen(true)}
                      onMouseLeave={() => setServicesOpen(false)}
                      className={`absolute left-0 top-full pt-2 w-[420px] bg-white text-blue-dark rounded-2xl shadow-2xl border border-gray-100 py-3 transition-all duration-150 ${
                        servicesOpen ? "opacity-100 pointer-events-auto translate-y-0" : "opacity-0 pointer-events-none -translate-y-1"
                      }`}
                    >
                      <div className="px-4 pb-2">
                        <h4 className="text-sm font-semibold text-blue-dark">Lo que hacemos</h4>
                        <p className="text-xs text-gray-500">Explora nuestros servicios clave</p>
                      </div>
                      <div className="max-h-96 overflow-y-auto divide-y divide-gray-100">
                        {servicesData.map((service) => {
                          const shortTitle = shortTitles[service.slug] ?? service.title
                          return (
                            <Link
                              key={service.slug}
                              href={`/servicios/${service.slug}`}
                              className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                            >
                              <div className="w-8 h-8 rounded-lg bg-[#FF5A5F]/10 text-[#FF5A5F] flex items-center justify-center text-sm font-bold">
                                {service.title.charAt(0)}
                              </div>
                              <div>
                                <p className="text-sm font-semibold text-blue-dark">{shortTitle}</p>
                                <p className="text-xs text-gray-500 line-clamp-2">{service.description}</p>
                              </div>
                            </Link>
                          )
                        })}
                      </div>
                      <div className="border-t border-gray-100 mt-2 pt-2 px-4">
                        <Link href={item.href} className="block text-sm font-semibold text-[#FF5A5F] hover:text-[#d94852]">
                          Ver todos los servicios →
                        </Link>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-gray-200 hover:text-[#FF7A7F] transition-colors font-medium text-sm"
                  >
                    {item.label}
                  </Link>
                )
              )}
            </div>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center gap-3">
              <Link
                href="/contacto"
                className="px-4 py-2 rounded-lg bg-[#FF5A5F] text-white hover:bg-[#FF3C48] transition-colors font-semibold text-sm shadow-[0_10px_30px_rgba(255,90,95,0.35)]"
              >
                Contáctanos
              </Link>
              <Link
                href="/trabaja-con-nosotros"
                className="px-4 py-2 rounded-lg border border-[#FF5A5F] text-white hover:bg-[#FF5A5F]/15 transition-colors font-medium text-sm"
              >
                Trabaja con nosotros
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="md:hidden pb-4 space-y-4 text-white">
              {navItems.map((item) =>
                item.hasSub ? (
                  <div key={item.href} className="space-y-2">
                    <Link
                      href={item.href}
                      className="block text-gray-200 hover:text-[#FF7A7F] transition-colors font-medium"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </Link>
                    <div className="pl-3 space-y-1">
                      {servicesData.map((service) => (
                        <Link
                          key={service.slug}
                          href={`/servicios/${service.slug}`}
                          className="block text-sm text-gray-300 hover:text-white"
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
                    className="block text-gray-200 hover:text-[#FF7A7F] transition-colors font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                )
              )}
              <div className="pt-4 space-y-2 border-t border-white/10">
                <Link
                  href="/contacto"
                  className="block px-4 py-2 rounded-lg border border-[#FF5A5F] text-white text-center font-medium bg-[#FF5A5F]/10"
                  onClick={() => setIsOpen(false)}
                >
                  Contáctanos
                </Link>
                <Link
                  href="/trabaja-con-nosotros"
                  className="block px-4 py-2 rounded-lg bg-[#FF5A5F] text-white text-center font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Trabaja con nosotros
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
