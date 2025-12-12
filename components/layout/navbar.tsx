"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Menu, X, ChevronDown } from "lucide-react"
import { servicesData } from "@/components/ui/services-section"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)

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
            <Link href="/" className="flex items-center font-display text-white -ml-1 sm:-ml-2">
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
                    {servicesOpen && (
                      <div className="absolute left-0 mt-3 w-72 bg-white text-blue-dark rounded-xl shadow-xl border border-gray-100 py-2">
                        <Link
                          href={item.href}
                          className="block px-4 py-2 text-sm font-semibold hover:bg-gray-50"
                        >
                          Ver todos los servicios
                        </Link>
                        <div className="border-t border-gray-100 my-2" />
                        <div className="max-h-80 overflow-y-auto">
                          {servicesData.map((service) => (
                            <Link
                              key={service.slug}
                              href={`/servicios/${service.slug}`}
                              className="block px-4 py-2 text-sm hover:bg-gray-50"
                            >
                              {service.title}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
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
