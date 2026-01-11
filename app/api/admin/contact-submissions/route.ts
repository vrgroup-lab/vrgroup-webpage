import { NextResponse } from "next/server"
import { getSupabaseAdmin } from "@/lib/supabase/server"

export async function GET() {
  try {
    const supabase = getSupabaseAdmin()
    const { data, error } = await supabase
      .from("contact_submissions")
      .select(
        "id, created_at, nombre, empresa, email, telefono, industria, asunto, mensaje, status, email_provider_id, error, ip, user_agent",
      )
      .order("created_at", { ascending: false })

    if (error) throw error
    return NextResponse.json({ data })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Error al obtener contactos" }, { status: 400 })
  }
}
