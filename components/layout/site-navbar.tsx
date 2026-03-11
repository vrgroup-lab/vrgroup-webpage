import { Navbar } from "@/components/layout/navbar"
import { marketingSiteSettings, type MarketingSiteSettings } from "@/lib/site-config"

type SiteNavbarProps = {
  settings?: MarketingSiteSettings
}

export function SiteNavbar({ settings }: SiteNavbarProps) {
  const resolvedSettings = settings ?? marketingSiteSettings
  return <Navbar settings={resolvedSettings} />
}
