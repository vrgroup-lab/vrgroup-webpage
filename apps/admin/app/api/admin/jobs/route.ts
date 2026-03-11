import { NextResponse } from "next/server"
import { requireApiSession } from "@/lib/auth"
import { getSupabaseAdmin } from "@/lib/supabase/server"

export const dynamic = "force-dynamic"

export async function GET() {
  const auth = await requireApiSession()
  if (auth.response) return auth.response

  try {
    const supabase = getSupabaseAdmin()
    const { data, error } = await supabase.from("jobs").select("*").order("created_at", { ascending: false })

    if (error) throw error
    return NextResponse.json({ data })
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Error al obtener ofertas." }, { status: 400 })
  }
}

export async function POST(request: Request) {
  const auth = await requireApiSession(["admin", "editor"])
  if (auth.response) return auth.response

  try {
    const supabase = getSupabaseAdmin()
    const body = await request.json()

    if (!body.slug || !body.title || !body.status) {
      return NextResponse.json({ error: "slug, title y status son requeridos." }, { status: 400 })
    }

    const payload = {
      ...body,
      created_by: auth.session.profile.id,
    }

    const { data, error } = await supabase.from("jobs").insert([payload]).select("*").single()
    if (error) throw error

    return NextResponse.json({ data })
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Error al crear oferta." }, { status: 400 })
  }
}
