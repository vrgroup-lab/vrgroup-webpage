import type React from "react"
import type { Metadata } from "next"
import { Poppins, Inter } from "next/font/google"
import "./globals.css"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
})

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "VR Group | Transformación Digital y Consultoría",
  description:
    "Consultora boutique experta en automatización de procesos, desarrollo de software y transformación digital",
  generator: "v0.app",
  metadataBase: new URL("https://vrgroup.cl"),
  openGraph: {
    type: "website",
    locale: "es_CL",
    url: "https://vrgroup.cl",
    siteName: "VR Group",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
  },
  icons: {
    icon: [{ url: "/logos/brand/logo_vrgroup_cuadrado.png" }],
    apple: "/logos/brand/logo_vrgroup_cuadrado.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${poppins.variable} ${inter.variable}`}>
      <body className="font-sans antialiased bg-[#F8F9FA] text-[#1C1F26]">{children}</body>
    </html>
  )
}
