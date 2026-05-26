import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ANIMATION_CONFIG } from '@/config/animationConfig'
import { useBackgroundForScene, useDeviceType } from '@/hooks/useResponsiveAsset'

interface CharacterSceneProps {
  onComplete: () => void
}

export default function CharacterScene({ onComplete }: CharacterSceneProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showCream, setShowCream] = useState(false)
  const [sceneDone, setSceneDone] = useState(false)
  const bgSrc = useBackgroundForScene('cinematic')
  const deviceType = useDeviceType()

  const { character, creamReveal } = ANIMATION_CONFIG
  const { sequence, scale, yOffset, slideEase, fadeOutDuration } = character

  // Dynamic responsive scale and positioning configurations
  const deviceScale = scale[deviceType] || scale.desktop
  const deviceYOffset = yOffset?.[deviceType] || yOffset?.desktop || '0px'

  useEffect(() => {
    let accumulatedTime = 0
    const timers: ReturnType<typeof setTimeout>[] = []

    // Schedule frame transitions for each image in the sequence
    sequence.forEach((_, idx) => {
      if (idx === 0) return // First frame is active initially

      accumulatedTime += sequence[idx - 1].duration * 1000
      const timer = setTimeout(() => {
        setCurrentIndex(idx)
      }, accumulatedTime)
      timers.push(timer)
    })

    // Total sequence duration
    const totalSequenceDuration = accumulatedTime + sequence[sequence.length - 1].duration * 1000

    // Fade out and cream flash timings are relative to sequence completion
    const fadeOutDelay = totalSequenceDuration
    const creamAt = fadeOutDelay

    const creamTimer = setTimeout(() => setShowCream(true), creamAt)
    const doneTimer = setTimeout(() => {
      setSceneDone(true)
      onComplete()
    }, fadeOutDelay + fadeOutDuration * 1000 + creamReveal.overlayFadeDuration * 1000 + 300)

    timers.push(creamTimer, doneTimer)

    return () => {
      timers.forEach(clearTimeout)
    }
  }, [onComplete, sequence, fadeOutDuration, creamReveal.overlayFadeDuration])

  if (sceneDone) return null

  return (
    <div className="fixed inset-0 z-40 overflow-hidden">
      {/* Background for this scene */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${bgSrc})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundColor: '#0D1B2A',
        }}
      />

      {/* Character sequence wrapper — scales and offsets vertically based on deviceType, fades out at sequence end */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        initial={{ scale: deviceScale, y: deviceYOffset, opacity: 1 }}
        animate={{
          scale: deviceScale, // Static responsive scale, avoiding center popping
          y: deviceYOffset,   // Responsive vertical positioning offset
          opacity: showCream ? 0 : 1,
        }}
        transition={{
          opacity: {
            duration: fadeOutDuration,
            ease: 'easeOut',
          },
        }}
        style={{ willChange: 'transform, opacity' }}
      >
        {/* The first frame slides in from the right; subsequent frames swap instantly */}
        <motion.img
          src={sequence[currentIndex].src}
          alt={`Character Frame ${currentIndex + 1}`}
          className="w-full h-full object-contain max-w-2xl max-h-full"
          initial={currentIndex === 0 ? { x: '100vw' } : { x: 0 }}
          animate={{ x: 0 }}
          transition={
            currentIndex === 0
              ? { duration: sequence[0].duration, ease: slideEase ? [...slideEase] : [0.25, 0.85, 0.45, 1.0] }
              : { duration: 0 }
          }
        />
      </motion.div>

      {/* Cream overlay that fades in at the end */}
      <AnimatePresence>
        {showCream && (
          <motion.div
            className="absolute inset-0"
            style={{ backgroundColor: '#F5F0E8' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: creamReveal.overlayFadeDuration,
              delay: creamReveal.overlayFadeDelay,
              ease: 'easeInOut',
            }}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
