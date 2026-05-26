import type { Variants } from 'framer-motion'
import { ANIMATION_CONFIG } from '@/config/animationConfig'

const { character, creamReveal } = ANIMATION_CONFIG

export const characterScaleVariants: Variants = {
  enter: {
    scale: character.initialScale,
    opacity: 1,
  },
  running: {
    scale: character.finalScale,
    opacity: 1,
    transition: {
      scale: {
        duration: character.scaleDuration,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: character.fadeOutDuration,
      delay: character.fadeOutDelay,
      ease: 'easeOut',
    },
  },
}

export const creamOverlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: creamReveal.overlayFadeDuration,
      delay: creamReveal.overlayFadeDelay,
      ease: 'easeInOut',
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: creamReveal.overlayFadeDuration,
      ease: 'easeOut',
    },
  },
}

export const pageEnterVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: ANIMATION_CONFIG.pageTransition.duration,
      ease: ANIMATION_CONFIG.pageTransition.ease,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.4,
      ease: 'easeIn',
    },
  },
}
