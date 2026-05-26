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
  /** Slot number 1–6 */
  slot: number
  /** The actual hint text (only meaningful when isUnlocked is true) */
  text: string
  isUnlocked: boolean
}

export interface StudentData {
  id: string
  name?: string
  hints: HintItem[]
  imageUrl?: string
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

// ── JSON database shape ──────────────────────────────────────
// Only include slots that are unlocked; presence in the array = unlocked.
// Do NOT add isUnlocked here — unlock state is derived automatically.
export interface StudentJsonEntry {
  id: string
  name: string
  hints: Array<{ slot: number; text: string }>
}

export interface StudentsJsonDatabase {
  students: StudentJsonEntry[]
}
