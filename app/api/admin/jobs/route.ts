import { NextResponse } from "next/server"
import { getSupabaseAdmin } from "@/lib/supabase/server"

export const dynamic = "force-static"
export const revalidate = 0


export async function GET() {
  try {
    const supabase = getSupabaseAdmin()
    const { data, error } = await supabase.from("jobs").select("*").order("created_at", { ascending: false })
    if (error) throw error
    return NextResponse.json({ data })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Error al obtener ofertas" }, { status: 400 })
  }
}

export async function POST(request: Request) {
  try {
    const supabase = getSupabaseAdmin()
    const body = await request.json()
    const {
      slug,
      title,
      summary,
      description,
      location,
      modality,
      seniority,
      salary_min,
      salary_max,
      currency,
      tags,
      status,
      apply_url,
      apply_email,
      apply_linkedin_url,
      apply_notion_url,
      responsibilities,
      benefits,
      requirements,
      employment_type,
      created_by,
      published_at,
    } = body

    if (!slug || !title || !status) {
      return NextResponse.json({ error: "slug, title y status son requeridos" }, { status: 400 })
    }

    const { data, error } = await supabase
      .from("jobs")
      .insert([
        {
          slug,
          title,
          summary,
          description,
          location,
          modality,
          seniority,
          salary_min,
          salary_max,
      currency,
      tags,
          status,
          apply_url,
          apply_email,
          apply_linkedin_url,
          apply_notion_url,
          responsibilities,
          benefits,
          requirements,
          employment_type,
          created_by,
          published_at,
        },
      ])
      .select("*")
      .single()

    if (error) throw error
    return NextResponse.json({ data })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Error al crear oferta" }, { status: 400 })
  }
}
