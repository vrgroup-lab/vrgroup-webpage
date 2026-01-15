import { NextResponse } from "next/server"
import { getSupabaseAdmin } from "@/lib/supabase/server"

export const dynamic = "force-static"
export const revalidate = 0


type ParamsPromise = { params: Promise<{ id: string }> }
const allowedStatuses = ["draft", "public", "hidden"] as const

export async function PUT(request: Request, { params }: ParamsPromise) {
  const { id } = await params
  const body = await request.json()
  const supabase = getSupabaseAdmin()

  const status =
    typeof body.status === "string" && allowedStatuses.includes(body.status.trim())
      ? (body.status.trim() as (typeof allowedStatuses)[number])
      : "draft"

  const updates = {
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
  }

  const { data, error } = await supabase.from("portfolio_projects").update(updates).eq("id", id).select("id")

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // Optional primary media upsert (one item)
  if (body.media && body.media.url && body.media.type) {
    const media = body.media
    const mediaPayload = {
      project_id: id,
      type: media.type,
      url: media.url,
      thumbnail_url: media.thumbnail_url ?? null,
      alt_text: media.alt_text ?? null,
      caption: media.caption ?? null,
      is_primary: media.is_primary ?? true,
      order_index: media.order_index ?? 0,
    }

    const { error: upsertError } = await supabase
      .from("portfolio_media")
      .upsert(mediaPayload, { onConflict: "project_id,is_primary" })
    if (upsertError) {
      return NextResponse.json({ error: upsertError.message }, { status: 500 })
    }
  }

  return NextResponse.json({ data })
}

export async function DELETE(request: Request, { params }: ParamsPromise) {
  const { id } = await params
  const supabase = getSupabaseAdmin()

  const { error: mediaError } = await supabase.from("portfolio_media").delete().eq("project_id", id)
  if (mediaError) {
    return NextResponse.json({ error: mediaError.message }, { status: 500 })
  }

  const { error } = await supabase.from("portfolio_projects").delete().eq("id", id)
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}

export async function generateStaticParams() {
  return []
}
