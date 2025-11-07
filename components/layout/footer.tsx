import Link from "next/link"
import { Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-blue-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 font-display font-bold text-lg mb-4">
              <div className="w-8 h-8 bg-coral rounded flex items-center justify-center font-bold">VR</div>
              <span>Group</span>
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
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">&copy; 2025 VR Group. Todos los derechos reservados.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-coral transition-colors" aria-label="LinkedIn">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M16.338 16.338H13.67V12.16c0-.995-.017-2.292-1.194-2.292-1.195 0-1.38.932-1.38 1.893v3.577H8.265V9.359h2.47v.94h.04c.348-.62 1.191-1.575 2.457-1.575 2.631 0 3.12 1.73 3.12 3.98v4.634zM4.997 8.684c-.611 0-1.12-.49-1.12-1.12 0-.63.51-1.12 1.12-1.12.61 0 1.119.49 1.119 1.12 0 .63-.51 1.12-1.12 1.12zm.9 7.654h-1.8V9.359h1.8v6.979zM17.668 1H2.331C1.593 1 1 1.581 1 2.298v15.404C1 18.418 1.593 19 2.331 19h15.338c.738 0 1.331-.582 1.331-1.298V2.298C19 1.581 18.406 1 17.668 1z" />
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-coral transition-colors" aria-label="Twitter">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
