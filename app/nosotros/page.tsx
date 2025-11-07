import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Hero } from "@/components/ui/hero"
import { Section } from "@/components/ui/section"
import { Heart, Zap, Target, Handshake } from "lucide-react"

export default function AboutPage() {
  const values = [
    {
      icon: Heart,
      title: "Empatía",
      description: "Comprendemos los desafíos de nuestros clientes y trabajamos colaborativamente para solucionarlos.",
    },
    {
      icon: Zap,
      title: "Iniciativa",
      description: "Proponemos soluciones innovadoras y tomamos la iniciativa en mejorar continuamente.",
    },
    {
      icon: Target,
      title: "Compromiso",
      description: "Nos comprometemos con resultados medibles y entregas de calidad en cada proyecto.",
    },
    {
      icon: Handshake,
      title: "Simplicidad",
      description: "Simplificamos lo complejo para que sea accesible y fácil de implementar.",
    },
  ]

  const team = [
    { name: "Víctor Sagredo", role: "Co-Fundador & CEO", title: "Líder Estratégico" },
    { name: "Ángel Barrueta", role: "Co-Fundador & COO", title: "Director de Operaciones" },
    { name: "Marco Bertolini", role: "Director Técnico", title: "VP Tecnología" },
    { name: "Lorem Ipsum", role: "Consultor Senior", title: "Experto en Automatización" },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <Hero
        title="Somos de confianza"
        subtitle="Un equipo boutique de expertos apasionados por la transformación digital, con más de 15 años de experiencia en la industria."
      />

      {/* Story Section */}
      <Section title="Nuestra Historia" className="bg-white">
        <div className="max-w-3xl mx-auto">
          <p className="text-gray-700 text-lg mb-6 leading-relaxed">
            VR Group nació de la necesidad de ofrecer consultoría de clase mundial con un enfoque boutique y
            personalizado. Nuestro equipo ha trabajado en transformaciones digitales complejas con empresas líderes en
            Chile y la región.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed">
            Hoy nos posicionamos como partners confiables para organizaciones que buscan automatizar sus operaciones,
            implementar inteligencia artificial y acelerar su transformación digital.
          </p>
        </div>
      </Section>

      {/* Values Section */}
      <Section title="Nuestros Valores" className="bg-gray-50">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {values.map((value, idx) => {
            const Icon = value.icon
            return (
              <div key={idx} className="bg-white rounded-2xl p-8">
                <div className="w-14 h-14 bg-coral rounded-lg flex items-center justify-center mb-4">
                  <Icon size={28} className="text-white" />
                </div>
                <h3 className="font-display font-bold text-xl mb-3 text-blue-dark">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            )
          })}
        </div>
      </Section>

      {/* Stats Section */}
      <Section className="bg-blue-dark text-white">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="font-display font-bold text-4xl text-coral mb-2">+12K</div>
            <p className="text-gray-300 text-sm">Horas invertidas</p>
          </div>
          <div>
            <div className="font-display font-bold text-4xl text-coral mb-2">+1.5K</div>
            <p className="text-gray-300 text-sm">Usuarios capacitados</p>
          </div>
          <div>
            <div className="font-display font-bold text-4xl text-coral mb-2">+50</div>
            <p className="text-gray-300 text-sm">Proyectos completados</p>
          </div>
          <div>
            <div className="font-display font-bold text-4xl text-coral mb-2">+30</div>
            <p className="text-gray-300 text-sm">Clientes satisfechos</p>
          </div>
        </div>
      </Section>

      {/* Team Section */}
      <Section title="Nuestro Equipo" className="bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, idx) => (
            <div key={idx} className="text-center">
              <div className="w-full aspect-square bg-gradient-to-br from-coral to-blue-dark rounded-2xl mb-4 flex items-end justify-center overflow-hidden">
                <div className="text-6xl pb-4">👤</div>
              </div>
              <h3 className="font-display font-bold text-lg text-blue-dark mb-1">{member.name}</h3>
              <p className="text-coral font-semibold text-sm mb-1">{member.title}</p>
              <p className="text-gray-600 text-sm">{member.role}</p>
            </div>
          ))}
        </div>
      </Section>

      <Footer />
    </div>
  )
}
