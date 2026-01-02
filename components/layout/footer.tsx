import Link from "next/link"
import Image from "next/image"
import { Mail, Phone, MapPin, Linkedin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-blue-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-3 font-display font-bold text-lg mb-4 -ml-1 sm:-ml-2">
              <div className="relative h-12 w-36">
                <Image
                  src="/logos/brand/logo-vr-group_rectangulo.png"
                  alt="VR Group"
                  fill
                  className="object-contain"
                  sizes="144px"
                />
              </div>
            </div>
            <p className="text-gray-300 text-sm">
              Consultora boutique experta en automatización, desarrollo de software y transformación digital.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-semibold mb-4">Explorar</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>
                <Link href="/servicios" className="hover:text-coral transition-colors">
                  Servicios
                </Link>
              </li>
              <li>
                <Link href="/portafolio" className="hover:text-coral transition-colors">
                  Portafolio
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-coral transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/nosotros" className="hover:text-coral transition-colors">
                  Nosotros
                </Link>
              </li>
              <li>
                <Link href="/admin/login" className="hover:text-coral transition-colors">
                  Acceso admin
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-display font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>
                <Link href="#" className="hover:text-coral transition-colors">
                  Términos de servicio
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-coral transition-colors">
                  Política de privacidad
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-coral transition-colors">
                  Política de cookies
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-display font-semibold mb-4">Contacto</h3>
            <ul className="space-y-3 text-gray-300 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-coral flex-shrink-0 mt-0.5" />
                <span>
                  Libertador Bernardo O'Higgins 949, piso 25 Of. 4<br />
                  Santiago, Chile
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-coral flex-shrink-0" />
                <a href="tel:+56961928852" className="hover:text-coral transition-colors">
                  (+56) 9 6192 8852
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-coral flex-shrink-0" />
                <a href="mailto:contacto@vrgroup.cl" className="hover:text-coral transition-colors">
                  contacto@vrgroup.cl
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Linkedin size={18} className="text-coral flex-shrink-0" />
                <a
                  href="https://cl.linkedin.com/company/vr-group-chile"
                  className="hover:text-coral transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn · VR Group Chile
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">&copy; 2025 VR Group. Todos los derechos reservados.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a
              href="https://cl.linkedin.com/company/vr-group-chile"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-gray-200 hover:text-coral transition-colors px-3 py-1 rounded-full border border-white/10"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
              <span className="text-sm">VR Group Chile</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
