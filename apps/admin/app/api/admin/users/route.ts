import { NextResponse } from "next/server"
import { requireApiSession } from "@/lib/auth"
import { getSupabaseAdmin } from "@/lib/supabase/server"

export const dynamic = "force-dynamic"

export async function GET() {
  const auth = await requireApiSession(["admin"])
  if (auth.response) return auth.response

  try {
    const supabase = getSupabaseAdmin()
    const { data: profiles, error } = await supabase
      .from("user_profiles")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) throw error

    const { data: usersList } = await supabase.auth.admin.listUsers({ page: 1, perPage: 1000 })
    const authById = new Map<string, { email: string | null; last_sign_in_at: string | null }>()
    for (const u of usersList?.users ?? []) {
      authById.set(u.id, { email: u.email ?? null, last_sign_in_at: u.last_sign_in_at ?? null })
    }

    const enriched = (profiles ?? []).map((p) => ({
      ...p,
      email: authById.get(p.id)?.email ?? null,
      last_sign_in_at: authById.get(p.id)?.last_sign_in_at ?? null,
    }))

    return NextResponse.json({ data: enriched })
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Error al obtener usuarios." }, { status: 400 })
  }
}

export async function POST(request: Request) {
  const auth = await requireApiSession(["admin"])
  if (auth.response) return auth.response

  try {
    const supabase = getSupabaseAdmin()
    const { email, password, full_name, role } = await request.json()

    if (!email || !password || !role) {
      return NextResponse.json({ error: "email, password y role son requeridos." }, { status: 400 })
    }

    const { data: userRes, error: createError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    })
    if (createError) throw createError

    const userId = userRes?.user?.id
    if (!userId) throw new Error("No se pudo crear el usuario.")

    const { error: profileError } = await supabase.from("user_profiles").insert({ id: userId, full_name: full_name ?? "", role })
    if (profileError) {
      await supabase.auth.admin.deleteUser(userId)
      throw profileError
    }

    return NextResponse.json({ ok: true, userId })
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Error al crear usuario." }, { status: 400 })
  }
}
