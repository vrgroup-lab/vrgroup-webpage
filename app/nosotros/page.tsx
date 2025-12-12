import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { HeroRotator } from "@/components/ui/hero-rotator"
import { Section } from "@/components/ui/section"
import Image from "next/image"
import Link from "next/link"
import { CheckCircle2, Sparkles, Workflow, Users, Rocket, ShieldCheck, Linkedin } from "lucide-react"
import { teamMembers } from "@/lib/team"
import { getHeroImages } from "@/lib/hero-images"

export default function AboutPage() {
  const pillars = [
    {
      icon: Sparkles,
      title: "Simplicidad con impacto",
      description: "Soluciones claras y escalables, orientadas a resultados medibles sin sobrecomplejidad.",
    },
    {
      icon: Workflow,
      title: "Tecnología al servicio del negocio",
      description: "Ingeniería, diseño y automatización con foco en habilitar decisiones, eficiencia y crecimiento.",
    },
    {
      icon: Users,
      title: "Equipos expertos y cercanos",
      description: "Trabajamos como un solo equipo con nuestros clientes, impulsando entrega continua y evolución.",
    },
    {
      icon: Rocket,
      title: "Innovación aplicada",
      description: "IA, low-code y automatización inteligente para acelerar la ejecución de iniciativas digitales.",
    },
  ]

  const heroBackgrounds = getHeroImages("nosotros")

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <HeroRotator
        title={
          <>
            Somos <span className="text-[#FF5A5F]">VR Group</span>, una consultora boutique en transformación digital, automatización e IA
          </>
        }
        subtitle="Desde 2017 acompañamos a organizaciones públicas y privadas a diseñar, construir y escalar capacidades tecnológicas con impacto real en sus operaciones."
        images={heroBackgrounds}
        minHeight="820px"
      >
        <div className="mt-6 flex flex-col lg:flex-row items-center gap-6 justify-center">
          <div className="bg-white/10 border border-white/15 backdrop-blur-lg rounded-3xl px-6 py-5 text-white shadow-2xl flex flex-col gap-3 w-full max-w-xl">
            <div className="grid grid-cols-3 gap-4 text-center">
              {[
                { value: "2017", label: "Fundada" },
                { value: "150+", label: "Proyectos" },
                { value: "58", label: "Colaboradores" },
              ].map((item) => (
                <div key={item.label} className="space-y-1">
                  <div className="text-2xl sm:text-3xl font-display font-bold">{item.value}</div>
                  <p className="text-sm text-white/80">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </HeroRotator>

      {/* Historia */}
      <Section
        title="Nuestra Historia"
        className="relative bg-[#0B1B33] text-white overflow-hidden"
        variant="dark"
        paddingClass="py-14 lg:py-16"
      >
        <div
          className="absolute inset-0 bg-cover bg-center opacity-55 z-0"
          style={{ backgroundImage: "url(/images/sections/cordillera.png)" }}
        ></div>
        <div className="absolute inset-0 bg-[#0B1B33]/45 z-0"></div>
        <div className="relative z-10 max-w-6xl mx-auto space-y-10 text-lg leading-relaxed">
          <div className="max-w-4xl mx-auto space-y-4 text-white text-base sm:text-lg font-medium drop-shadow-[0_0_18px_rgba(255,255,255,0.35)]">
            <p>
              Fundada en 2017, VR Group nació con la convicción de que la transformación digital debe ser práctica,
              medible y centrada en las personas. A lo largo de estos años, hemos ejecutado más de 150 proyectos,
              impulsado la modernización tecnológica de múltiples industrias y construido un equipo multidisciplinario
              de más de 50 especialistas en consultoría, desarrollo, automatización e inteligencia artificial.
            </p>
            <p>
              Hoy acompañamos a compañías en Chile y Latinoamérica a evolucionar sus procesos, adoptar tecnologías de
              última generación y construir experiencias digitales que generan valor de negocio.
            </p>
          </div>
        </div>
      </Section>

      {/* Principios */}
      <Section
        title="Los principios que nos guían"
        subtitle="Valores que definen cómo trabajamos, decidimos y colaboramos con nuestros clientes."
        className="bg-[#050711]"
        variant="dark"
        paddingClass="py-14 lg:py-16"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {pillars.map((value, idx) => {
            const Icon = value.icon
            return (
              <div
                key={idx}
                className="rounded-3xl bg-gradient-to-b from-[#0f192f] via-[#0b1327] to-[#050711] border border-white/8 px-5 py-7 text-white shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
              >
                <div className="w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center mb-4">
                  <Icon size={24} />
                </div>
                <h3 className="font-display font-bold text-lg mb-2">{value.title}</h3>
                <p className="text-white/80 text-sm">{value.description}</p>
              </div>
            )
          })}
        </div>
      </Section>

      {/* Stats */}
      <Section className="bg-[#0B1B33] text-white" variant="dark">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { value: "8", suffix: " años", desc: "Impulsando modernización tecnológica desde 2017." },
            { value: "150+", suffix: " proyectos", desc: "Transformación digital, automatización y consultoría." },
            { value: "58", suffix: " colaboradores", desc: "Equipo multidisciplinario senior y boutique." },
          ].map((stat) => (
            <div key={stat.value} className="rounded-2xl bg-white/5 border border-white/10 p-6">
              <div className="font-display text-4xl sm:text-5xl font-bold text-coral mb-2">
                {stat.value} <span className="text-white text-2xl align-middle">{stat.suffix}</span>
              </div>
              <p className="text-gray-200">{stat.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Metodología */}
      <Section title="Nuestra forma de trabajar" className="bg-white">
        <div className="space-y-10">
          <div className="flex flex-col gap-6">
            <p className="font-semibold text-blue-dark text-lg">Metodología centrada en valor</p>
            <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-r from-white to-gray-50 px-4 py-5">
              <div className="hidden md:block absolute top-1/2 left-8 right-8 h-px bg-gray-200" aria-hidden />
              <div className="grid grid-cols-1 md:grid-cols-5 gap-3 relative">
                {[
                  { label: "Descubrimiento", desc: "Entendimiento profundo del negocio" },
                  { label: "Priorización", desc: "Impacto y factibilidad primero" },
                  { label: "Diseño integral", desc: "Estrategia, tecnología y UX" },
                  { label: "Ejecución iterativa", desc: "Squads multidisciplinares" },
                  { label: "Adopción continua", desc: "Operación y mejora permanente" },
                ].map((step) => (
                  <div key={step.label} className="flex md:flex-col items-start md:items-center gap-2 text-center md:text-center">
                    <div className="flex items-center justify-center w-9 h-9 rounded-full bg-coral text-white shadow-md shrink-0">
                      <CheckCircle2 size={18} />
                    </div>
                    <div className="space-y-1 md:space-y-1">
                      <p className="font-semibold text-blue-dark text-sm">{step.label}</p>
                      <p className="text-sm text-gray-600 md:text-xs">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <p className="font-semibold text-blue-dark text-lg">Por qué funciona</p>
            <div className="flex flex-wrap gap-3">
              {[
                "Promueve entregas rápidas",
                "Reduce riesgo y retrabajo",
                "Alinea negocio y tecnología",
                "Mide impacto desde el día uno",
              ].map((reason) => (
                <span
                  key={reason}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-dark/5 text-blue-dark border border-blue-dark/10 text-sm font-semibold"
                >
                  <ShieldCheck size={16} className="text-coral" />
                  {reason}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Equipo */}
      <Section
        title="Equipo directivo y responsables"
        className="bg-[#0B1B33]"
        variant="dark"
        paddingClass="py-14"
        id="equipo"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {teamMembers.map((member) => (
            <div
              key={member.slug}
              className="bg-white/5 border border-white/10 rounded-3xl p-5 text-center flex flex-col items-center gap-3 backdrop-blur-sm"
            >
              <div className="relative w-24 h-24 rounded-full overflow-hidden bg-white/10">
                {member.photo ? (
                  <Image src={member.photo} alt={member.name} fill className="object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-3xl font-display text-white/80">
                    {member.name.charAt(0)}
                  </div>
                )}
              </div>
              <div className="space-y-1">
                <h3 className="font-display font-bold text-lg text-white">{member.name}</h3>
                <p className="text-gray-300 text-xs font-semibold uppercase tracking-wide">{member.role}</p>
                {member.degree && <p className="text-gray-200 text-sm">{member.degree}</p>}
              </div>
              <div className="flex items-center gap-3">
                <Link
                  href={`/equipo/${member.slug}`}
                  className="px-3 py-1.5 rounded-full border border-white/20 text-white text-sm hover:bg-white/10 transition"
                >
                  Ver perfil
                </Link>
                {member.linkedin && (
                  <Link
                    href={member.linkedin}
                    target="_blank"
                    className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition"
                    aria-label={`LinkedIn de ${member.name}`}
                  >
                    <Linkedin size={18} />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section className="bg-gradient-to-br from-coral via-coral-dark to-[#0B1B33]" variant="dark">
        <div className="max-w-3xl mx-auto text-center text-white space-y-4">
          <h2 className="font-display font-bold text-3xl sm:text-4xl">¿Listo para impulsar tu organización?</h2>
          <p className="text-lg text-white/90">
            Conversemos y diseñemos juntos la próxima etapa de tu estrategia digital.
          </p>
          <div className="flex justify-center">
            <a
              href="/contacto"
              className="inline-flex px-6 py-3 rounded-lg bg-gradient-to-r from-[#FF5A5F] to-[#FF7A7F] text-white font-semibold shadow-[0_14px_30px_rgba(255,90,95,0.35)] hover:shadow-[0_18px_38px_rgba(255,90,95,0.45)] transition"
            >
              Hablemos
            </a>
          </div>
        </div>
      </Section>

      <Footer />
    </div>
  )
}
