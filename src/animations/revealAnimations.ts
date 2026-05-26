import type { Variants } from 'framer-motion'
import { ANIMATION_CONFIG } from '@/config/animationConfig'

const { finalReveal, backgroundZoom } = ANIMATION_CONFIG

export const backgroundZoomVariants: Variants = {
  initial: { scale: backgroundZoom.initialScale },
  reveal: {
    scale: backgroundZoom.finalScale,
    transition: {
      duration: backgroundZoom.duration,
      ease: backgroundZoom.ease,
      delay: backgroundZoom.delay,
    },
  },
}

export const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: (custom: { duration?: number; delay?: number } = {}) => ({
    opacity: 1,
    transition: {
      duration: custom.duration ?? 0.8,
      delay: custom.delay ?? 0,
      ease: 'easeOut',
    },
  }),
}

export const slideUpVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (custom: { delay?: number } = {}) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: finalReveal.listItemDuration,
      delay: custom.delay ?? 0,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
}

export const titleRevealVariants: Variants = {
  hidden: { opacity: 0, y: -20, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: finalReveal.titleRevealDuration,
      delay: finalReveal.titleRevealDelay,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
}

export const containerRevealVariants: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.7,
      delay: finalReveal.containerDelay,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
}

export const listItemVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: finalReveal.listItemDuration,
      delay: finalReveal.listStartDelay + i * finalReveal.listStaggerDelay,
      ease: 'easeOut',
    },
  }),
}
