import { NextResponse } from "next/server"
import { getSupabaseAdmin } from "@/lib/supabase/server"

export const dynamic = "force-static"
export const revalidate = 0


type ParamsPromise = { params: Promise<{ id: string }> }
const allowedMediaTypes = ["image", "video", "pdf", "link"] as const

export async function POST(request: Request, { params }: ParamsPromise) {
  const { id: projectId } = await params
  const body = await request.json()

  if (!body.url || !body.type) {
    return NextResponse.json({ error: "Faltan url o type" }, { status: 400 })
  }
  if (!allowedMediaTypes.includes(body.type)) {
    return NextResponse.json({ error: "Tipo de media no permitido" }, { status: 400 })
  }

  const supabase = getSupabaseAdmin()

  if (body.is_primary) {
    await supabase.from("portfolio_media").update({ is_primary: false }).eq("project_id", projectId)
  }

  const { data, error } = await supabase
    .from("portfolio_media")
    .insert([
      {
        project_id: projectId,
        type: body.type,
        url: body.url,
        thumbnail_url: body.thumbnail_url ?? null,
        alt_text: body.alt_text ?? null,
        caption: body.caption ?? null,
        is_primary: body.is_primary ?? false,
        order_index: body.order_index ?? 0,
      },
    ])
    .select("id")
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ data }, { status: 201 })
}

export async function PATCH(request: Request, { params }: ParamsPromise) {
  const { id: projectId } = await params
  const body = await request.json()
  const mediaId = body.media_id as string | undefined
  if (!mediaId) {
    return NextResponse.json({ error: "Falta media_id" }, { status: 400 })
  }

  const supabase = getSupabaseAdmin()
  await supabase.from("portfolio_media").update({ is_primary: false }).eq("project_id", projectId)
  const { error } = await supabase.from("portfolio_media").update({ is_primary: true }).eq("id", mediaId)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}

export async function DELETE(request: Request, { params }: ParamsPromise) {
  const { id: projectId } = await params
  const mediaId = new URL(request.url).searchParams.get("media_id")
  if (!mediaId) {
    return NextResponse.json({ error: "Falta media_id" }, { status: 400 })
  }

  const supabase = getSupabaseAdmin()
  const { error } = await supabase.from("portfolio_media").delete().eq("id", mediaId).eq("project_id", projectId)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}

export async function generateStaticParams() {
  return []
}
