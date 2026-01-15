import "server-only"

import { getSupabaseAdmin } from "@/lib/supabase/server"

export type SiteSettings = {
  showPortfolioInHeader: boolean
  showPortfolioInServices: boolean
  showCareersInHeader: boolean
  showTeamInAbout: boolean
}

export const defaultSiteSettings: SiteSettings = {
  showPortfolioInHeader: true,
  showPortfolioInServices: true,
  showCareersInHeader: false,
  showTeamInAbout: true,
}

export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const supabase = getSupabaseAdmin()
    const { data, error } = await supabase
      .from("site_settings")
      .select("show_portfolio_in_header, show_portfolio_in_services, show_careers_in_header, show_team_in_about")
      .eq("singleton_key", "global")
      .maybeSingle()

    if (error || !data) {
      if (error) {
        console.error("Error loading site settings:", error.message)
        return defaultSiteSettings
      }

      const { data: inserted, error: insertError } = await supabase
        .from("site_settings")
        .upsert([{ singleton_key: "global", ...defaultSiteSettings }], { onConflict: "singleton_key" })
        .select("show_portfolio_in_header, show_portfolio_in_services, show_careers_in_header, show_team_in_about")
        .single()

      if (insertError || !inserted) {
        if (insertError) {
          console.error("Error creating site settings:", insertError.message)
        }
        return defaultSiteSettings
      }

      return {
        showPortfolioInHeader: inserted.show_portfolio_in_header ?? defaultSiteSettings.showPortfolioInHeader,
        showPortfolioInServices: inserted.show_portfolio_in_services ?? defaultSiteSettings.showPortfolioInServices,
        showCareersInHeader: inserted.show_careers_in_header ?? defaultSiteSettings.showCareersInHeader,
        showTeamInAbout: inserted.show_team_in_about ?? defaultSiteSettings.showTeamInAbout,
      }
    }

    return {
      showPortfolioInHeader: data.show_portfolio_in_header ?? defaultSiteSettings.showPortfolioInHeader,
      showPortfolioInServices: data.show_portfolio_in_services ?? defaultSiteSettings.showPortfolioInServices,
      showCareersInHeader: data.show_careers_in_header ?? defaultSiteSettings.showCareersInHeader,
      showTeamInAbout: data.show_team_in_about ?? defaultSiteSettings.showTeamInAbout,
    }
  } catch (error: any) {
    console.error("Error loading site settings:", error?.message || error)
    return defaultSiteSettings
  }
}
