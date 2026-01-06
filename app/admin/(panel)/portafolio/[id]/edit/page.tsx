"use client"

import { useParams } from "next/navigation"
import { PortfolioForm } from "@/components/admin/portfolio-form"

export default function AdminPortfolioEditPage() {
  const params = useParams<{ id: string }>()
  const projectId = Array.isArray(params?.id) ? params.id[0] : params?.id

  if (!projectId) return null

  return (
    <div className="space-y-4">
      <PortfolioForm projectId={projectId} />
    </div>
  )
}
