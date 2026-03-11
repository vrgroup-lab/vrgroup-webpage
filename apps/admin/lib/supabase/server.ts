import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

export function getSupabasePublic() {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Supabase public env vars are missing. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.")
  }

  return createClient(supabaseUrl, supabaseAnonKey)
}

export function getSupabaseAdmin() {
  if (!supabaseUrl || !supabaseServiceRoleKey) {
    throw new Error("Supabase admin env vars are missing. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.")
  }

  return createClient(supabaseUrl, supabaseServiceRoleKey)
}
