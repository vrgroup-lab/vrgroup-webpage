import { NextResponse } from "next/server"
import { getSupabaseAdmin } from "@/lib/supabase/server"

export const dynamic = "force-static"
export const revalidate = 0


export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params
    const { status } = await request.json()

    if (!status) {
      return NextResponse.json({ error: "status es requerido" }, { status: 400 })
    }

    const supabase = getSupabaseAdmin()
    const { data, error } = await supabase
      .from("contact_submissions")
      .update({ status })
      .eq("id", id)
      .select("*")
      .single()

    if (error) throw error
    return NextResponse.json({ data })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Error al actualizar contacto" }, { status: 400 })
  }
}

export async function DELETE(_request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params
    const supabase = getSupabaseAdmin()
    const { error } = await supabase.from("contact_submissions").delete().eq("id", id)
    if (error) throw error
    return NextResponse.json({ ok: true })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Error al eliminar contacto" }, { status: 400 })
  }
}

export async function generateStaticParams() {
  return []
}
