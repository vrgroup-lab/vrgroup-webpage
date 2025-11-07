import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Hero } from "@/components/ui/hero"
import { Section } from "@/components/ui/section"
import Link from "next/link"
import { ArrowRight, Calendar } from "lucide-react"

export default function BlogPage() {
  const posts = [
    {
      id: 1,
      title: "5 Tendencias de Automatización Digital para 2025",
      excerpt:
        "Descubre las principales tendencias en automatización que definirán la transformación digital este año.",
      author: "Víctor Sagredo",
      date: "15 de Enero, 2025",
      category: "Automatización",
      image: "🤖",
      slug: "tendencias-automatizacion-2025",
    },
    {
      id: 2,
      title: "Inteligencia Artificial en Operaciones: Casos de Uso Real",
      excerpt: "Cómo empresas líderes están utilizando IA para optimizar sus operaciones y tomar mejores decisiones.",
      author: "Ángel Barrueta",
      date: "10 de Enero, 2025",
      category: "IA & ML",
      image: "🧠",
      slug: "ia-operaciones-casos",
    },
    {
      id: 3,
      title: "Guía Completa: Implementación de Appian en tu Organización",
      excerpt: "Todo lo que necesitas saber para iniciar un proyecto de automatización con Appian.",
      author: "Marco Bertolini",
      date: "5 de Enero, 2025",
      category: "Appian",
      image: "⚙️",
      slug: "implementacion-appian",
    },
    {
      id: 4,
      title: "Transformación Digital: Estrategia vs. Implementación",
      excerpt: "La diferencia entre tener una buena estrategia y una implementación exitosa de transformación digital.",
      author: "Víctor Sagredo",
      date: "28 de Diciembre, 2024",
      category: "Transformación",
      image: "📱",
      slug: "transformacion-estrategia",
    },
    {
      id: 5,
      title: "ROI en Proyectos de Automatización: Cómo Medirlo",
      excerpt: "Métodos y KPIs para medir el retorno de inversión en proyectos de automatización digital.",
      author: "Ángel Barrueta",
      date: "20 de Diciembre, 2024",
      category: "Análisis",
      image: "📊",
      slug: "roi-automatizacion",
    },
    {
      id: 6,
      title: "La Experiencia del Usuario en Soluciones Digitales",
      excerpt: "Por qué el diseño UX/UI es crucial en el éxito de tus proyectos de transformación digital.",
      author: "Marco Bertolini",
      date: "15 de Diciembre, 2024",
      category: "Diseño",
      image: "🎨",
      slug: "experiencia-usuario",
    },
  ]

  const categories = ["Todos", "Automatización", "IA & ML", "Appian", "Transformación", "Diseño"]

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <Hero
        title="Blog VR Group"
        subtitle="Insights, tendencias y casos de uso sobre transformación digital, automatización e inteligencia artificial."
      />

      <Section className="bg-white">
        {/* Categories Filter */}
        <div className="flex flex-wrap gap-3 mb-12 justify-center">
          {categories.map((category, idx) => (
            <button
              key={idx}
              className={`px-4 py-2 rounded-full font-medium transition-all ${
                idx === 0 ? "bg-coral text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-coral hover:shadow-xl transition-all"
            >
              {/* Post Image */}
              <div className="w-full aspect-video bg-gradient-to-br from-coral to-blue-dark flex items-center justify-center text-6xl">
                {post.image}
              </div>

              {/* Post Content */}
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="inline-block px-3 py-1 bg-coral text-white text-xs font-semibold rounded-full">
                    {post.category}
                  </span>
                </div>

                <h3 className="font-display font-bold text-lg text-blue-dark mb-2 line-clamp-2 group-hover:text-coral transition-colors">
                  {post.title}
                </h3>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{post.excerpt}</p>

                {/* Meta */}
                <div className="flex items-center gap-4 text-gray-500 text-sm mb-4 pb-4 border-t">
                  <div className="flex items-center gap-1 mt-4">
                    <Calendar size={14} />
                    {post.date}
                  </div>
                </div>

                <div className="flex items-center gap-2 text-coral font-semibold group-hover:gap-3 transition-all">
                  Leer artículo
                  <ArrowRight size={18} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      <Footer />
    </div>
  )
}
