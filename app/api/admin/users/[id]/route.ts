import { NextResponse } from "next/server"
import { getSupabaseAdmin } from "@/lib/supabase/server"

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const supabase = getSupabaseAdmin()
    const body = await request.json()
    const { full_name, role } = body

    const { error } = await supabase
      .from("user_profiles")
      .update({ full_name, role })
      .eq("id", params.id)

    if (error) throw error
    return NextResponse.json({ ok: true })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Error al actualizar usuario" }, { status: 400 })
  }
}

export async function DELETE(_request: Request, { params }: { params: { id: string } }) {
  try {
    const supabase = getSupabaseAdmin()
    const { error } = await supabase.auth.admin.deleteUser(params.id)
    if (error) throw error
    return NextResponse.json({ ok: true })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Error al eliminar usuario" }, { status: 400 })
  }
}
