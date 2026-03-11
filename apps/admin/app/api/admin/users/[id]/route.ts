import { NextResponse } from "next/server"
import { requireApiSession } from "@/lib/auth"
import { getSupabaseAdmin } from "@/lib/supabase/server"

export const dynamic = "force-dynamic"

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireApiSession(["admin"])
  if (auth.response) return auth.response

  try {
    const { id } = await params
    const { full_name, role } = await request.json()
    const supabase = getSupabaseAdmin()
    const { error } = await supabase.from("user_profiles").update({ full_name, role }).eq("id", id)

    if (error) throw error
    return NextResponse.json({ ok: true })
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Error al actualizar usuario." }, { status: 400 })
  }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireApiSession(["admin"])
  if (auth.response) return auth.response

  try {
    const { id } = await params
    const supabase = getSupabaseAdmin()
    const { error: profileError } = await supabase.from("user_profiles").delete().eq("id", id)
    if (profileError) throw profileError

    const { error } = await supabase.auth.admin.deleteUser(id)

    if (error) throw error
    return NextResponse.json({ ok: true })
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Error al eliminar usuario." }, { status: 400 })
  }
}
