"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

export function LogoutButton() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  return (
    <button
      type="button"
      onClick={async () => {
        setLoading(true)

        try {
          await fetch("/api/auth/logout", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
          })
        } finally {
          router.push("/login")
          router.refresh()
          setLoading(false)
        }
      }}
      style={{
        borderRadius: 999,
        border: "1px solid #d8e0ea",
        background: "#fff",
        color: "#0b1b33",
        padding: "10px 14px",
        fontSize: 14,
        fontWeight: 700,
        cursor: "pointer",
      }}
    >
      {loading ? "Saliendo..." : "Cerrar sesion"}
    </button>
  )
}
