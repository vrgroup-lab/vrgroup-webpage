import { NextResponse } from "next/server"
import { requireApiSession } from "@/lib/auth"
import { getSupabaseAdmin } from "@/lib/supabase/server"

export const dynamic = "force-dynamic"

export async function GET() {
  const auth = await requireApiSession()
  if (auth.response) return auth.response

  try {
    const supabase = getSupabaseAdmin()
    const { data, error } = await supabase
      .from("contact_submissions")
      .select("id, created_at, nombre, empresa, email, telefono, industria, asunto, mensaje, status, email_provider_id, error, ip, user_agent")
      .order("created_at", { ascending: false })

    if (error) throw error
    return NextResponse.json({ data })
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Error al obtener contactos." }, { status: 400 })
  }
}
