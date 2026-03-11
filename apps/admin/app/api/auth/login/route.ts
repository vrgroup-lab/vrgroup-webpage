import { NextResponse } from "next/server"
import { applyAuthCookies } from "@/lib/auth"
import { getSupabaseAdmin, getSupabasePublic } from "@/lib/supabase/server"

export const dynamic = "force-dynamic"

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email y contrasena son requeridos." }, { status: 400 })
    }

    const publicClient = getSupabasePublic()
    const { data, error } = await publicClient.auth.signInWithPassword({ email, password })
    if (error || !data.session || !data.user) {
      return NextResponse.json({ error: error?.message || "Credenciales invalidas." }, { status: 401 })
    }

    const adminClient = getSupabaseAdmin()
    const { data: profile, error: profileError } = await adminClient
      .from("user_profiles")
      .select("id, role")
      .eq("id", data.user.id)
      .maybeSingle()

    if (profileError || !profile || !["admin", "editor", "viewer"].includes(profile.role)) {
      return NextResponse.json({ error: "Tu usuario no tiene acceso al panel." }, { status: 403 })
    }

    const response = NextResponse.json({ ok: true })
    return applyAuthCookies(response, data.session.access_token, data.session.refresh_token)
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "No se pudo iniciar sesion." },
      { status: 500 }
    )
  }
}
