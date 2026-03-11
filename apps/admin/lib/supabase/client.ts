import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

function assertPublicEnv() {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Supabase public env vars are missing. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.")
  }
}

export function getSupabaseBrowser() {
  assertPublicEnv()
  return createClient(supabaseUrl!, supabaseAnonKey!)
}
