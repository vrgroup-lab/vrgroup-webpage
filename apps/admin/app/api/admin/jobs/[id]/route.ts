import { NextResponse } from "next/server"
import { requireApiSession } from "@/lib/auth"
import { getSupabaseAdmin } from "@/lib/supabase/server"

export const dynamic = "force-dynamic"

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireApiSession(["admin", "editor"])
  if (auth.response) return auth.response

  try {
    const { id } = await params
    const body = await request.json()
    const supabase = getSupabaseAdmin()
    const { data, error } = await supabase.from("jobs").update(body).eq("id", id).select("*").single()

    if (error) throw error
    return NextResponse.json({ data })
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Error al actualizar oferta." }, { status: 400 })
  }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireApiSession(["admin", "editor"])
  if (auth.response) return auth.response

  try {
    const { id } = await params
    const supabase = getSupabaseAdmin()
    const { error } = await supabase.from("jobs").delete().eq("id", id)

    if (error) throw error
    return NextResponse.json({ ok: true })
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Error al eliminar oferta." }, { status: 400 })
  }
}
