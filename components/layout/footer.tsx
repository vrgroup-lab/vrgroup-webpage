import Link from "next/link"
import Image from "next/image"
import { Mail, Phone, MapPin, Linkedin, MessageCircle } from "lucide-react"
import { servicesData } from "@/components/ui/services-section"

const shortServiceTitles: Record<string, string> = {
  "transformacion-digital-desarrollo": "Experiencia Digital",
  "soluciones-ti-proyectos": "Software Factory",
  "automatizacion-procesos": "Automatización de Procesos",
  "gestion-operaciones-riesgo": "Gestión y Riesgo",
  "ia-agentes-inteligentes": "IA & Agentes",
  "staffing-celulas-agiles": "Staffing & Células",
}

export function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-8">
          {/* Company Info */}
          <div className="md:col-span-1">
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
              <span className="flex items-center gap-2 text-sm text-white/80">
                <span className="w-px h-6 bg-white/30 inline-block" aria-hidden="true"></span>
                <span className="text-3xl leading-none">🇨🇱</span>
              </span>
            </div>
            <p className="text-gray-400 text-[13px] leading-relaxed max-w-xs">
              Consultora boutique experta en automatización, software e IA aplicada. Entregamos a producción con
              profesionalismo, experiencia y excelencia.
            </p>
          </div>

          {/* Servicios */}
          <div className="md:pl-4">
            <h3 className="font-display font-semibold mb-3 text-sm">Servicios</h3>
            <ul className="space-y-2 text-gray-400 text-[13px]">
              {servicesData.map((service) => (
                <li key={service.slug}>
                  <Link href={`/servicios/${service.slug}`} className="hover:text-coral transition-colors">
                    {shortServiceTitles[service.slug] ?? service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Recursos */}
          <div>
            <h3 className="font-display font-semibold mb-3 text-sm">Recursos</h3>
            <ul className="space-y-2 text-gray-400 text-[13px]">
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
            <h3 className="font-display font-semibold mb-3 text-sm">Legal</h3>
            <ul className="space-y-2 text-gray-400 text-[13px]">
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

          {/* Contacto */}
          <div>
            <h3 className="font-display font-semibold mb-3 text-sm">Contacto</h3>
            <ul className="space-y-2.5 text-gray-400 text-[13px]">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-white flex-shrink-0 mt-0.5" />
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Av.+Apoquindo+7331,+Las+Condes,+Chile"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-coral transition-colors"
                >
                  Av. Apoquindo 7331, oficina 420<br />
                  Las Condes, Chile
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-white flex-shrink-0" />
                <a href="tel:+56989506375" className="hover:text-coral transition-colors">
                  (+56) 9 8950 6375
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MessageCircle size={18} className="text-white flex-shrink-0" />
                <a href="https://wa.me/56989506375" className="hover:text-coral transition-colors">
                  WhatsApp
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-white flex-shrink-0" />
                <a href="mailto:contacto@vrgroup.cl" className="hover:text-coral transition-colors">
                  contacto@vrgroup.cl
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Linkedin size={18} className="text-white flex-shrink-0" />
                <a
                  href="https://cl.linkedin.com/company/vr-group-chile"
                  className="hover:text-coral transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Highlighted footer CTAs */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row gap-3">
          <Link
            href="/trabaja-con-nosotros"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 text-white font-semibold text-sm hover:bg-white/15 transition-colors shadow-[0_10px_35px_rgba(0,0,0,0.25)]"
          >
            Trabaja con nosotros
          </Link>
          <Link
            href="/admin/login"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-white/20 text-white font-semibold text-sm hover:bg-white/10 transition-colors"
          >
            Acceso admin
          </Link>
        </div>

        {/* Partner */}
        <div className="border-t border-white/10 pt-6 flex items-center gap-3">
          <span className="text-sm text-white/70">Partnership</span>
          <a
            href="https://appian.com/es"
            target="_blank"
            rel="noopener noreferrer"
            className="relative h-8 w-[90px] hover:opacity-80 transition-opacity"
            aria-label="Appian"
          >
            <Image src="/logos/partners/letter_appian.png" alt="Appian Partner" fill className="object-contain" />
          </a>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-xs">&copy; 2025 VR Group. Todos los derechos reservados.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a
              href="https://cl.linkedin.com/company/vr-group-chile"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-gray-200 hover:text-coral transition-colors px-3 py-1 rounded-lg border border-white/10"
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
