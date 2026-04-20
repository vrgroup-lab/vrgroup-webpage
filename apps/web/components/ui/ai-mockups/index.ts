import type { ComponentType } from "react"
import { AgentsChatMockup } from "./agents-chat"
import { RagSearchMockup } from "./rag-search"
import { MlForecastMockup } from "./ml-forecast"
import { QualityEvalsMockup } from "./quality-evals"
import { AdoptionKpisMockup } from "./adoption-kpis"

export type MockupKey = "agents" | "rag" | "ml" | "quality" | "adoption"

export const AI_MOCKUPS: Record<MockupKey, ComponentType> = {
  agents: AgentsChatMockup,
  rag: RagSearchMockup,
  ml: MlForecastMockup,
  quality: QualityEvalsMockup,
  adoption: AdoptionKpisMockup,
}

export { AgentsChatMockup, RagSearchMockup, MlForecastMockup, QualityEvalsMockup, AdoptionKpisMockup }
export { WindowFrame } from "./frame"
