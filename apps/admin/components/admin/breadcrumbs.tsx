"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight } from "lucide-react"
import { NAV_ITEMS } from "@/components/admin/sidebar-nav"

const LABEL_MAP: Record<string, string> = Object.fromEntries(NAV_ITEMS.map((n) => [n.href, n.label]))

export function Breadcrumbs() {
  const pathname = usePathname() || "/admin"
  const segments = pathname.split("/").filter(Boolean)

  const crumbs: { href: string; label: string }[] = []
  let acc = ""
  for (const seg of segments) {
    acc += `/${seg}`
    crumbs.push({
      href: acc,
      label: LABEL_MAP[acc] ?? seg.charAt(0).toUpperCase() + seg.slice(1),
    })
  }

  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-sm text-muted-foreground">
      {crumbs.map((crumb, idx) => {
        const last = idx === crumbs.length - 1
        return (
          <div key={crumb.href} className="flex items-center gap-1">
            {idx > 0 && <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/60" />}
            {last ? (
              <span className="font-medium text-foreground">{crumb.label}</span>
            ) : (
              <Link href={crumb.href} className="transition-colors hover:text-foreground">
                {crumb.label}
              </Link>
            )}
          </div>
        )
      })}
    </nav>
  )
}
