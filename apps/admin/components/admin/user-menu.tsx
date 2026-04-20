"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { LogOut } from "lucide-react"
import { toast } from "sonner"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

function initials(name: string | null, fallback: string) {
  const source = name?.trim() || fallback
  const parts = source.split(/\s+/).filter(Boolean)
  const first = parts[0]?.[0] ?? "?"
  const second = parts[1]?.[0] ?? ""
  return (first + second).toUpperCase()
}

export function UserMenu({
  fullName,
  email,
  role,
}: {
  fullName: string | null
  email: string
  role: string
}) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleLogout() {
    setLoading(true)
    try {
      await fetch("/api/auth/logout", { method: "POST", headers: { "Content-Type": "application/json" } })
      toast.success("Sesión cerrada")
      router.push("/login")
      router.refresh()
    } catch {
      toast.error("No se pudo cerrar sesión")
    } finally {
      setLoading(false)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="gap-2 px-2 hover:bg-accent">
          <Avatar className="h-7 w-7">
            <AvatarFallback>{initials(fullName, email)}</AvatarFallback>
          </Avatar>
          <div className="hidden flex-col items-start text-left md:flex">
            <span className="text-xs font-medium leading-tight">{fullName || email}</span>
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{role}</span>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="flex flex-col">
          <span className="text-sm font-semibold">{fullName || "Usuario"}</span>
          <span className="text-xs font-normal text-muted-foreground">{email}</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={(event) => {
            event.preventDefault()
            if (!loading) void handleLogout()
          }}
          className="text-destructive focus:text-destructive"
        >
          <LogOut />
          {loading ? "Saliendo..." : "Cerrar sesión"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
