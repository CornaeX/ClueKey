// ============================================================
// CENTRAL ANIMATION CONFIGURATION
// All timings, durations, and easing values live here.
// Edit this file to tune every animation in the project.
// ============================================================

export const ANIMATION_CONFIG = {
  // ── FLOW CONTROL ──────────────────────────────────────────
  // skipWaitingScreen:
  //   false → Mode A: login → waiting → final   (default)
  //   true  → Mode B: login → final
  skipWaitingScreen: false,

  // skipStopmotion (only applies when skipWaitingScreen is false):
  //   true  → waiting → (click) → final        (stopmotion skipped)
  //   false → waiting → (click) → stopmotion → final
  skipStopmotion: true,

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

  // ── RUNNING CHARACTER (image sequence) ────────────────────
  character: {
    sequence: [
      { src: '/images/Act1.png', duration: 2.5 }, // slide-in duration
      { src: '/images/Act2.png', duration: 1.0 },
      { src: '/images/Act3.png', duration: 1.0 },
      { src: '/images/Act4.png', duration: 1.0 },
      { src: '/images/Act5.png', duration: 1.0 },
    ],
    // Responsive scale configurations per device (PC and Mobile)
    scale: {
      desktop: 0.6, // Scale for PC (desktop) version
      tablet: 0.85, // Scale for Tablet version
      mobile: 0.65, // Scale for Mobile version
    },
    // Responsive vertical positioning offset (adjust up/down; supports px, %, etc.)
    yOffset: {
      desktop: '100px',  // PC vertical offset (negative moves up, positive down)
      tablet: '0px',   // Tablet vertical offset
      mobile: '0px',   // Mobile vertical offset
    },
    slideEase: [0.25, 0.85, 0.45, 1.0] as const, // Smooth ease curve (moderate fast start, gentle deceleration, short hold)
    fadeOutDuration: 0.8,
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