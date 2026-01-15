import { NextResponse } from "next/server"
import { getSupabaseAdmin } from "@/lib/supabase/server"

export const dynamic = "force-static"
export const revalidate = 0


export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const supabase = getSupabaseAdmin()
    const body = await request.json()
    const { id } = await params
    const { error, data } = await supabase.from("jobs").update(body).eq("id", id).select("*").single()
    if (error) throw error
    return NextResponse.json({ data })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Error al actualizar oferta" }, { status: 400 })
  }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const supabase = getSupabaseAdmin()
    const { id } = await params
    const { error } = await supabase.from("jobs").delete().eq("id", id)
    if (error) throw error
    return NextResponse.json({ ok: true })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Error al eliminar oferta" }, { status: 400 })
  }
}

export async function generateStaticParams() {
  return []
}
