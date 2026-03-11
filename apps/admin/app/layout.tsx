import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "VR Group Admin",
  description: "Backoffice y capa dinámica de VR Group",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
