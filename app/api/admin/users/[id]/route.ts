import { NextResponse } from "next/server"
import { getSupabaseAdmin } from "@/lib/supabase/server"

export const dynamic = "force-static"
export const revalidate = 0


export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const supabase = getSupabaseAdmin()
    const body = await request.json()
    const { full_name, role } = body

    const { error } = await supabase
      .from("user_profiles")
      .update({ full_name, role })
      .eq("id", id)

    if (error) throw error
    return NextResponse.json({ ok: true })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Error al actualizar usuario" }, { status: 400 })
  }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const supabase = getSupabaseAdmin()
    const { error } = await supabase.auth.admin.deleteUser(id)
    if (error) throw error
    return NextResponse.json({ ok: true })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Error al eliminar usuario" }, { status: 400 })
  }
}

export async function generateStaticParams() {
  return []
}
