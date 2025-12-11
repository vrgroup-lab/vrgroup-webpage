"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Menu, X } from "lucide-react"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { label: "Inicio", href: "/" },
    { label: "Servicios", href: "/servicios" },
    { label: "Portafolio", href: "/portafolio" },
    { label: "Blog", href: "/blog" },
    { label: "Nosotros", href: "/nosotros" },
  ]

  return (
    <nav className="sticky top-0 z-50">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#FF5A5F] to-transparent opacity-80" />
      <div className="backdrop-blur bg-[#050711]/90 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center font-display text-white">
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
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-gray-200 hover:text-[#FF7A7F] transition-colors font-medium text-sm"
                >
                  {item.label}
                </Link>
              ))}
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
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block text-gray-200 hover:text-[#FF7A7F] transition-colors font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
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
