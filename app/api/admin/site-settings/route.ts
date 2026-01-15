import { NextResponse } from "next/server"
import { getSupabaseAdmin } from "@/lib/supabase/server"

export const dynamic = "force-static"
export const revalidate = 0


const defaultSettings = {
  show_portfolio_in_header: true,
  show_portfolio_in_services: true,
  show_careers_in_header: false,
  show_team_in_about: true,
}

export async function GET() {
  try {
    const supabase = getSupabaseAdmin()
    const { data, error } = await supabase
      .from("site_settings")
      .select("show_portfolio_in_header, show_portfolio_in_services, show_careers_in_header, show_team_in_about")
      .eq("singleton_key", "global")
      .maybeSingle()

    if (error) {
      return NextResponse.json({ data: defaultSettings, warning: error.message }, { status: 200 })
    }

    if (!data) {
      const { data: inserted, error: insertError } = await supabase
        .from("site_settings")
        .upsert([{ singleton_key: "global", ...defaultSettings }], { onConflict: "singleton_key" })
        .select("show_portfolio_in_header, show_portfolio_in_services, show_careers_in_header, show_team_in_about")
        .single()

      if (insertError || !inserted) {
        return NextResponse.json({ data: defaultSettings, warning: insertError?.message }, { status: 200 })
      }

      return NextResponse.json({ data: inserted }, { status: 200 })
    }

    return NextResponse.json({ data }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json(
      { data: defaultSettings, warning: error?.message || "No se pudieron cargar los ajustes" },
      { status: 200 }
    )
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const payload = {
      singleton_key: "global",
      show_portfolio_in_header:
        typeof body.show_portfolio_in_header === "boolean" ? body.show_portfolio_in_header : defaultSettings.show_portfolio_in_header,
      show_portfolio_in_services:
        typeof body.show_portfolio_in_services === "boolean" ? body.show_portfolio_in_services : defaultSettings.show_portfolio_in_services,
      show_careers_in_header:
        typeof body.show_careers_in_header === "boolean" ? body.show_careers_in_header : defaultSettings.show_careers_in_header,
      show_team_in_about:
        typeof body.show_team_in_about === "boolean" ? body.show_team_in_about : defaultSettings.show_team_in_about,
    }

    const supabase = getSupabaseAdmin()
    const { data, error } = await supabase
      .from("site_settings")
      .upsert([payload], { onConflict: "singleton_key" })
      .select("show_portfolio_in_header, show_portfolio_in_services, show_careers_in_header, show_team_in_about")
      .single()

    if (error || !data) {
      return NextResponse.json({ error: error?.message || "No se pudieron guardar los ajustes" }, { status: 500 })
    }

    return NextResponse.json({ data }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || "No se pudieron guardar los ajustes" }, { status: 500 })
  }
}
