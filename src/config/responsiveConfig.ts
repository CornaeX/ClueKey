// ============================================================
// RESPONSIVE CONFIGURATION
// Breakpoints and device-specific asset mappings.
// ============================================================

export const BREAKPOINTS = {
  mobile: 768,   // < 768px
  tablet: 1024,  // 768–1024px
  desktop: 1024, // > 1024px
} as const

export type DeviceType = 'mobile' | 'tablet' | 'desktop'

// Background scene filenames per device
// Place actual images in: public/backgrounds/{device}/bg{1-4}.png
export const BACKGROUND_SCENES: Record<DeviceType, string[]> = {
  desktop: [
    '/backgrounds/desktop/bg1.png',
    '/backgrounds/desktop/bg2.png',
    '/backgrounds/desktop/bg3.png',
    '/backgrounds/desktop/bg4.png',
  ],
  tablet: [
    '/backgrounds/tablet/bg1.png',
    '/backgrounds/tablet/bg2.png',
    '/backgrounds/tablet/bg3.png',
    '/backgrounds/tablet/bg4.png',
  ],
  mobile: [
    '/backgrounds/mobile/bg1.png',
    '/backgrounds/mobile/bg2.png',
    '/backgrounds/mobile/bg3.png',
    '/backgrounds/mobile/bg4.png',
  ],
}

// Which scene index to use for each stage
export const SCENE_INDEX = {
  login: 0,
  waiting: 1,
  cinematic: 2,
  reveal: 3,
} as const

export type SceneKey = keyof typeof SCENE_INDEX

// Gear image path (single file, reused for both gears)
export const GEAR_IMAGE = '/images/gearv2.png'
export const STUDENT_ID_ICON = '/images/student-id-icon.png'
export const STUDENT_ID_TEXT = '/images/student-id-text.png'


