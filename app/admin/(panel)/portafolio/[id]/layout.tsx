import type { ReactNode } from "react"

export const dynamic = "force-static"
export const dynamicParams = false

export async function generateStaticParams() {
  return [{ id: "placeholder" }]
}

export default function AdminPortfolioProjectLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
