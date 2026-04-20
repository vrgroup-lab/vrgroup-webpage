"use client"

import { useState, useSyncExternalStore } from "react"
import { Menu, PanelLeftClose, PanelLeftOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet"
import { Breadcrumbs } from "@/components/admin/breadcrumbs"
import { SidebarNav } from "@/components/admin/sidebar-nav"
import { UserMenu } from "@/components/admin/user-menu"
import { cn } from "@/lib/utils"

const STORAGE_KEY = "vrg-admin-sidebar-collapsed"

function subscribeToStorage(callback: () => void) {
  window.addEventListener("storage", callback)
  return () => window.removeEventListener("storage", callback)
}

function readCollapsed() {
  return window.localStorage.getItem(STORAGE_KEY) === "1"
}

function readCollapsedServer() {
  return false
}

export function AppShell({
  children,
  fullName,
  email,
  role,
}: {
  children: React.ReactNode
  fullName: string | null
  email: string
  role: string
}) {
  const collapsed = useSyncExternalStore(subscribeToStorage, readCollapsed, readCollapsedServer)
  const [mobileOpen, setMobileOpen] = useState(false)

  function toggleCollapsed() {
    const next = !collapsed
    window.localStorage.setItem(STORAGE_KEY, next ? "1" : "0")
    window.dispatchEvent(new StorageEvent("storage", { key: STORAGE_KEY }))
  }

  return (
    <div className="flex min-h-screen bg-muted/30">
      <aside
        className={cn(
          "hidden shrink-0 border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-[width] duration-200 md:flex md:flex-col",
          collapsed ? "w-16" : "w-60",
        )}
      >
        <SidebarNav collapsed={collapsed} />
      </aside>

      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent
          side="left"
          className="w-64 border-r border-sidebar-border bg-sidebar p-0 text-sidebar-foreground"
        >
          <SheetTitle className="sr-only">Navegación</SheetTitle>
          <SidebarNav onNavigate={() => setMobileOpen(false)} />
        </SheetContent>
      </Sheet>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b bg-background/80 px-4 backdrop-blur md:px-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileOpen(true)}
            className="md:hidden"
            aria-label="Abrir menú"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleCollapsed}
            className="hidden md:inline-flex"
            aria-label={collapsed ? "Expandir sidebar" : "Colapsar sidebar"}
          >
            {collapsed ? <PanelLeftOpen className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
          </Button>
          <div className="flex-1 min-w-0 truncate">
            <Breadcrumbs />
          </div>
          <UserMenu fullName={fullName} email={email} role={role} />
        </header>

        <main className="flex-1 p-4 md:p-8">
          <div className="mx-auto w-full max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  )
}
