import { NextResponse } from "next/server"
import { requireApiSession } from "@/lib/auth"
import { getSupabaseAdmin } from "@/lib/supabase/server"

export const dynamic = "force-dynamic"

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireApiSession(["admin", "editor"])
  if (auth.response) return auth.response

  try {
    const { id } = await params
    const { status } = await request.json()

    if (!status) {
      return NextResponse.json({ error: "status es requerido." }, { status: 400 })
    }

    const supabase = getSupabaseAdmin()
    const { data, error } = await supabase.from("contact_submissions").update({ status }).eq("id", id).select("*").single()

    if (error) throw error
    return NextResponse.json({ data })
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Error al actualizar contacto." }, { status: 400 })
  }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireApiSession(["admin", "editor"])
  if (auth.response) return auth.response

  try {
    const { id } = await params
    const supabase = getSupabaseAdmin()
    const { error } = await supabase.from("contact_submissions").delete().eq("id", id)

    if (error) throw error
    return NextResponse.json({ ok: true })
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Error al eliminar contacto." }, { status: 400 })
  }
}
