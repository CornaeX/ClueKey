// ============================================================
// SHARED TYPES
// ============================================================

export type ExperienceStage =
  | 'waiting'
  | 'splitting'
  | 'character'
  | 'reveal'
  | 'final'

export interface HintItem {
  id: string
  label: string
  daysLeft: number
  isUnlocked: boolean
}

export interface StudentData {
  id: string
  name?: string
  hints: HintItem[]
  imageUrl?: string
  contactInfo?: string
}

export interface SceneProps {
  onComplete?: () => void
  isActive?: boolean
}

export interface BackgroundAsset {
  src: string
  deviceType: 'mobile' | 'tablet' | 'desktop'
  sceneIndex: number
}
