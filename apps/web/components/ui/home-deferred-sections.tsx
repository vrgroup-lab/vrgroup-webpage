"use client"

import dynamic from "next/dynamic"
import { AppianHighlightStatic } from "@/components/ui/appian-highlight-static"
import { IAHighlightStatic } from "@/components/ui/ia-highlight-static"
import { ComplianceHighlight } from "@/components/ui/compliance-highlight"

const AppianHighlight = dynamic(() => import("@/components/ui/appian-highlight").then((module) => module.AppianHighlight), {
  ssr: false,
  loading: () => <AppianHighlightStatic />,
})

const IAHighlight = dynamic(() => import("@/components/ui/ia-highlight").then((module) => module.IAHighlight), {
  ssr: false,
  loading: () => <IAHighlightStatic />,
})

interface HomeDeferredSectionsProps {
  providerLogos: string[]
}

export function HomeDeferredSections({ providerLogos }: HomeDeferredSectionsProps) {
  return (
    <>
      <AppianHighlight />
      <ComplianceHighlight />
      <IAHighlight providerLogos={providerLogos} />
    </>
  )
}
