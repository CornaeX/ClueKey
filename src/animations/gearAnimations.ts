import type { Variants } from 'framer-motion'
import { ANIMATION_CONFIG } from '@/config/animationConfig'

const { gearSpinDuration } = ANIMATION_CONFIG.waiting

export const largeGearVariants: Variants = {
  spinning: {
    rotate: 360,
    transition: {
      duration: gearSpinDuration,
      ease: 'linear',
      repeat: Infinity,
    },
  },
  stopped: {
    rotate: 0,
    transition: { duration: 1 },
  },
}

export const smallGearVariants: Variants = {
  spinning: {
    rotate: -360,
    // Counter-rotate at a rate proportional to teeth ratio
    // Large:Small ≈ 140:96 ≈ 1.46x, so small spins faster
    transition: {
      duration: gearSpinDuration,
      ease: 'linear',
      repeat: Infinity,
    },
  },
  stopped: {
    rotate: 0,
    transition: { duration: 1 },
  },
}

export const leftGearMoveVariants: Variants = {
  closed: { x: 0 },

  open: {
    x: '-100%',

    transition: {
      duration: 1.12, // slower gear movement
      ease: ANIMATION_CONFIG.splitDoor.ease,
      delay: ANIMATION_CONFIG.splitDoor.delay,
    },
  },
}

export const rightGearMoveVariants: Variants = {
  closed: { x: 0 },

  open: {
    x: '100%',

    transition: {
      duration: 1.12, // slower gear movement
      ease: ANIMATION_CONFIG.splitDoor.ease,
      delay: ANIMATION_CONFIG.splitDoor.delay,
    },
  },
}

export const leftPanelVariants: Variants = {
  closed: { x: 0 },
  open: {
    x: '-100%',
    transition: {
      duration: ANIMATION_CONFIG.splitDoor.duration,
      ease: ANIMATION_CONFIG.splitDoor.ease,
      delay: ANIMATION_CONFIG.splitDoor.delay,
    },
  },
}

export const rightPanelVariants: Variants = {
  closed: { x: 0 },
  open: {
    x: '100%',
    transition: {
      duration: ANIMATION_CONFIG.splitDoor.duration,
      ease: ANIMATION_CONFIG.splitDoor.ease,
      delay: ANIMATION_CONFIG.splitDoor.delay,
    },
  },
}
