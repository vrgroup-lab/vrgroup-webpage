import { NextResponse } from "next/server"
import { getSupabaseAdmin } from "@/lib/supabase/server"

export const dynamic = "force-static"
export const revalidate = 0


const requiredProjectFields = ["slug", "title", "status", "display_order", "tags", "highlights", "client_display"]
const allowedStatuses = ["draft", "public", "hidden"] as const

export async function GET() {
  const supabase = getSupabaseAdmin()
  const { data, error } = await supabase
    .from("portfolio_projects")
    .select("*, portfolio_media(*), service_lines(id, slug, name)")
    .order("display_order", { ascending: true })
    .order("created_at", { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ data })
}

export async function POST(request: Request) {
  const body = await request.json()
  const status =
    typeof body.status === "string" && allowedStatuses.includes(body.status.trim())
      ? (body.status.trim() as (typeof allowedStatuses)[number])
      : "draft"

  for (const field of requiredProjectFields) {
    if (body[field] === undefined) {
      return NextResponse.json({ error: `Falta el campo requerido: ${field}` }, { status: 400 })
    }
  }

  const supabase = getSupabaseAdmin()
  const media = body.media as
    | {
        url: string
        type: string
        thumbnail_url?: string
        alt_text?: string
        caption?: string
        is_primary?: boolean
        order_index?: number
      }
    | undefined

  const { data, error } = await supabase
    .from("portfolio_projects")
    .insert([
      {
        slug: body.slug,
        title: body.title,
        status,
        is_featured: body.is_featured ?? false,
        display_order: body.display_order ?? 0,
        client_display: body.client_display ?? "Cliente",
        client_name: body.client_name ?? null,
        client_logo_url: body.client_logo_url ?? null,
        summary: body.summary ?? null,
        problem: body.problem ?? null,
        solution: body.solution ?? null,
        outcomes: body.outcomes ?? null,
        service_line_id: body.service_line_id ?? null,
        tags: Array.isArray(body.tags) ? body.tags : [],
        highlights: Array.isArray(body.highlights) ? body.highlights : [],
        created_by: body.created_by ?? null,
      },
    ])
    .select("id")
    .single()

  if (error || !data) {
    return NextResponse.json({ error: error?.message || "No se pudo crear el proyecto" }, { status: 500 })
  }

  if (media && media.url && media.type) {
    const mediaPayload = {
      project_id: data.id,
      type: media.type,
      url: media.url,
      thumbnail_url: media.thumbnail_url ?? null,
      alt_text: media.alt_text ?? null,
      caption: media.caption ?? null,
      is_primary: media.is_primary ?? true,
      order_index: media.order_index ?? 0,
    }
    const { error: mediaError } = await supabase.from("portfolio_media").insert([mediaPayload])
    if (mediaError) {
      return NextResponse.json({ error: mediaError.message }, { status: 500 })
    }
  }

  return NextResponse.json({ data: { id: data.id } }, { status: 201 })
}
