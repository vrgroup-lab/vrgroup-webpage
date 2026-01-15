import { PortfolioForm } from "@/components/admin/portfolio-form"

export const dynamic = "force-static"
export const dynamicParams = false

export async function generateStaticParams() {
  return [{ id: "placeholder" }]
}

export default function AdminPortfolioEditPage({ params }: { params: { id: string } }) {
  const projectId = params?.id

  if (!projectId) return null

  return (
    <div className="space-y-4">
      <PortfolioForm projectId={projectId} />
    </div>
  )
}
