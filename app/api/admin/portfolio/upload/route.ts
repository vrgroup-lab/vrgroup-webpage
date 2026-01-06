import { NextResponse } from "next/server"
import { getSupabaseAdmin } from "@/lib/supabase/server"

export async function POST(request: Request) {
  const supabase = getSupabaseAdmin()
  const formData = await request.formData()
  const file = formData.get("file") as File | null
  const projectId = (formData.get("projectId") as string | null) ?? "general"

  if (!file) {
    return NextResponse.json({ error: "Falta archivo" }, { status: 400 })
  }

  const safeName = file.name.replace(/\s+/g, "-").toLowerCase()
  const path = `projects/${projectId}/${Date.now()}-${safeName}`

  const { error: uploadError } = await supabase.storage.from("portfolio").upload(path, file, {
    cacheControl: "3600",
    upsert: true,
    contentType: file.type || undefined,
  })

  if (uploadError) {
    return NextResponse.json({ error: uploadError.message }, { status: 400 })
  }

  const { data } = supabase.storage.from("portfolio").getPublicUrl(path)
  if (!data?.publicUrl) {
    return NextResponse.json({ error: "No se pudo obtener URL pública" }, { status: 500 })
  }

  return NextResponse.json({ url: data.publicUrl, path })
}
