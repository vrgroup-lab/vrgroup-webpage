import type { User } from "@supabase/supabase-js"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { NextResponse } from "next/server"
import { getSupabaseAdmin, getSupabasePublic } from "@/lib/supabase/server"

const ACCESS_COOKIE = "vrg_admin_access_token"
const REFRESH_COOKIE = "vrg_admin_refresh_token"
const KNOWN_ROLES = new Set(["admin", "editor", "viewer"])

type Profile = {
  id: string
  fullName: string | null
  role: string
}

export type AdminSession = {
  user: User
  profile: Profile
}

function cookieOptions(maxAge?: number) {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    ...(typeof maxAge === "number" ? { maxAge } : {}),
  }
}

async function resolveProfile(userId: string): Promise<Profile | null> {
  const supabase = getSupabaseAdmin()
  const { data, error } = await supabase
    .from("user_profiles")
    .select("id, full_name, role")
    .eq("id", userId)
    .maybeSingle()

  if (error || !data || !KNOWN_ROLES.has(data.role)) {
    return null
  }

  return {
    id: data.id,
    fullName: data.full_name ?? null,
    role: data.role,
  }
}

async function resolveSession(accessToken?: string | null): Promise<AdminSession | null> {
  if (!accessToken) return null

  const supabase = getSupabasePublic()
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser(accessToken)

  if (error || !user) {
    return null
  }

  const profile = await resolveProfile(user.id)
  if (!profile) {
    return null
  }

  return { user, profile }
}

export async function getAdminSession() {
  const store = await cookies()
  return resolveSession(store.get(ACCESS_COOKIE)?.value)
}

export async function requireAdminSession(allowedRoles: string[] = ["admin", "editor", "viewer"]) {
  const session = await getAdminSession()
  if (!session) {
    redirect("/login")
  }

  if (!allowedRoles.includes(session.profile.role)) {
    redirect("/login")
  }

  return session
}

export async function requireApiSession(allowedRoles: string[] = ["admin", "editor", "viewer"]) {
  const session = await getAdminSession()

  if (!session) {
    return {
      session: null,
      response: NextResponse.json({ error: "No autorizado." }, { status: 401 }),
    }
  }

  if (!allowedRoles.includes(session.profile.role)) {
    return {
      session: null,
      response: NextResponse.json({ error: "No tienes permisos suficientes." }, { status: 403 }),
    }
  }

  return { session, response: null }
}

export function applyAuthCookies(response: NextResponse, accessToken: string, refreshToken: string) {
  response.cookies.set(ACCESS_COOKIE, accessToken, cookieOptions(60 * 60 * 8))
  response.cookies.set(REFRESH_COOKIE, refreshToken, cookieOptions(60 * 60 * 24 * 30))
  return response
}

export function clearAuthCookies(response: NextResponse) {
  response.cookies.set(ACCESS_COOKIE, "", cookieOptions(0))
  response.cookies.set(REFRESH_COOKIE, "", cookieOptions(0))
  return response
}
