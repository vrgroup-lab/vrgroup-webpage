import { NextResponse } from "next/server"
import { getSupabaseAdmin } from "@/lib/supabase/server"

export const dynamic = "force-static"
export const revalidate = 0


export async function GET() {
  try {
    const supabase = getSupabaseAdmin()
    const { data, error } = await supabase.from("user_profiles").select("*").order("created_at", { ascending: false })
    if (error) throw error
    return NextResponse.json({ data })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Error al obtener usuarios" }, { status: 400 })
  }
}

export async function POST(request: Request) {
  try {
    const supabase = getSupabaseAdmin()
    const body = await request.json()
    const { email, password, full_name, role } = body

    if (!email || !password || !role) {
      return NextResponse.json({ error: "email, password y role son requeridos" }, { status: 400 })
    }

    const { data: userRes, error: createError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    })
    if (createError) throw createError
    const userId = userRes?.user?.id
    if (!userId) throw new Error("No se pudo crear el usuario")

    const { error: profileError } = await supabase
      .from("user_profiles")
      .insert({ id: userId, full_name: full_name ?? "", role })

    if (profileError) throw profileError

    return NextResponse.json({ ok: true, userId })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Error al crear usuario" }, { status: 400 })
  }
}
