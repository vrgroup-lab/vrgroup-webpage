import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Section } from "@/components/ui/section"
import { teamMembers } from "@/lib/team"
import { Linkedin } from "lucide-react"

export default async function TeamMemberPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const member = teamMembers.find((m) => m.slug === slug)
  if (!member) {
    notFound()
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#0B1B33] text-white">
      <Navbar />

      <Section paddingClass="py-12 sm:py-16" className="bg-[#0B1B33]" variant="dark">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-[280px_1fr] gap-8 items-center">
          <div className="flex flex-col items-center gap-4">
            <div className="relative w-48 h-48 rounded-full overflow-hidden bg-white/10">
              {member.photo ? (
                <Image src={member.photo} alt={member.name} fill className="object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-5xl font-display text-white/80">
                  {member.name.charAt(0)}
                </div>
              )}
            </div>
            {member.linkedin && (
              <Link
                href={member.linkedin}
                target="_blank"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 text-white hover:bg-white/10 transition"
              >
                <Linkedin size={18} />
                LinkedIn
              </Link>
            )}
            <Link
              href="/nosotros#equipo"
              className="text-sm text-white/70 hover:text-white transition underline underline-offset-4"
            >
              ← Volver a Nosotros
            </Link>
          </div>

          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.2em] text-white/60">Equipo VR Group</p>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-white">{member.name}</h1>
            <p className="text-coral font-semibold text-lg">{member.role}</p>
            {member.degree && <p className="text-white/80 text-base">{member.degree}</p>}
            <p className="text-white/80 text-lg leading-relaxed mt-4">{member.summary}</p>
          </div>
        </div>
      </Section>

      <Footer />
    </div>
  )
}
