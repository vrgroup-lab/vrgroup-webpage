import { Navbar } from "@/components/layout/navbar"
import { getSiteSettings, type SiteSettings } from "@/lib/site-settings"

type SiteNavbarProps = {
  settings?: SiteSettings
}

export async function SiteNavbar({ settings }: SiteNavbarProps) {
  const resolvedSettings = settings ?? (await getSiteSettings())
  return <Navbar settings={resolvedSettings} />
}
