import Link from "next/link"

export const dynamic = "force-static"
export const dynamicParams = false

export async function generateStaticParams() {
  return [{ id: "placeholder" }]
}

export default function AdminPortfolioProjectPage() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-700 flex items-center justify-center">
      <Link href="/admin/portafolio" className="text-sm underline underline-offset-4">
        Volver a Portafolio
      </Link>
    </div>
  )
}
