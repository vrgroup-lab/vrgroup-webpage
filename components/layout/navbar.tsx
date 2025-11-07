"use client"

import Link from "next/link"
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
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-display font-bold text-xl">
            <div className="w-8 h-8 bg-coral rounded flex items-center justify-center text-white font-bold">VR</div>
            <span className="text-blue-dark">Group</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-700 hover:text-coral transition-colors font-medium text-sm"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/contacto"
              className="px-4 py-2 rounded-lg border border-coral text-coral hover:bg-coral hover:text-white transition-colors font-medium text-sm"
            >
              Contáctanos
            </Link>
            <Link
              href="/trabaja-con-nosotros"
              className="px-4 py-2 rounded-lg bg-coral text-white hover:bg-coral-dark transition-colors font-medium text-sm"
            >
              Trabaja con nosotros
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block text-gray-700 hover:text-coral transition-colors font-medium"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-4 space-y-2 border-t">
              <Link
                href="/contacto"
                className="block px-4 py-2 rounded-lg border border-coral text-coral text-center font-medium"
                onClick={() => setIsOpen(false)}
              >
                Contáctanos
              </Link>
              <Link
                href="/trabaja-con-nosotros"
                className="block px-4 py-2 rounded-lg bg-coral text-white text-center font-medium"
                onClick={() => setIsOpen(false)}
              >
                Trabaja con nosotros
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
