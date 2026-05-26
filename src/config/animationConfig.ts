// ============================================================
// CENTRAL ANIMATION CONFIGURATION
// All timings, durations, and easing values live here.
// Edit this file to tune every animation in the project.
// ============================================================

export const ANIMATION_CONFIG = {
  // ── PAGE TRANSITIONS ──────────────────────────────────────
  pageTransition: {
    duration: 0.8,
    ease: [0.76, 0, 0.24, 1] as const,
  },

  // ── LOGIN PAGE ────────────────────────────────────────────
  login: {
    logoRevealDelay: 0.3,
    logoRevealDuration: 1.2,
    formRevealDelay: 0.7,
    formRevealDuration: 0.9,
    inputFocusScale: 1.02,
    submitHoverScale: 1.05,
  },

  // ── WAITING SCREEN ────────────────────────────────────────
  waiting: {
    gearSpinDuration: 9,           // seconds per full rotation
    largeGearSize: 220,            // px (desktop base)
    smallGearSize: 150,             // px (desktop base)
    pressHereFloatDuration: 2.5,
    pressHereFloatDistance: 8,     // px up/down
  },

  // ── SPLIT DOOR TRANSITION ─────────────────────────────────
  splitDoor: {
    delay: 0.1,
    duration: 1.1,
    ease: [0.76, 0, 0.24, 1] as const,
    splitOriginX: '55%',           // split starts slightly right of center
  },

  // ── RUNNING CHARACTER (webm) ──────────────────────────────
  character: {
    duration: 6.0,                 // webm clip duration (s)
    initialScale: 0.15,
    finalScale: 1.0,
    scaleDuration: 3.8,
    fadeOutDuration: 0.8,
    fadeOutDelay: 4.5,
  },

  // ── CREAM OVERLAY → BACKGROUND REVEAL ────────────────────
  creamReveal: {
    overlayFadeDuration: 0.6,
    overlayFadeDelay: 0.2,
    backgroundFadeInDuration: 1.0,
    backgroundFadeInDelay: 0.4,
  },

  // ── BACKGROUND POP-ZOOM ────────────────────────────────────
  backgroundZoom: {
    initialScale: 1.18,            // zoom in to hide borders
    finalScale: 1.0,
    duration: 1.8,
    ease: [0.25, 0.46, 0.45, 0.94] as const,
    delay: 0.3,
  },

  // ── FINAL REVEAL (Secret Document) ───────────────────────
  finalReveal: {
    containerDelay: 0.3,
    titleRevealDuration: 1.0,
    titleRevealDelay: 0.5,
    imageRevealDelay: 0.9,
    imageRevealDuration: 0.8,
    listStaggerDelay: 0.12,       // s between each list item
    listItemDuration: 0.5,
    listStartDelay: 1.4,
    lineDrawDuration: 0.8,
  },
} as const

export type AnimationConfig = typeof ANIMATION_CONFIG
