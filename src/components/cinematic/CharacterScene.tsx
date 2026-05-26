import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ANIMATION_CONFIG } from '@/config/animationConfig'
import { CHARACTER_WEBM } from '@/config/responsiveConfig'
import { useBackgroundForScene } from '@/hooks/useResponsiveAsset'

interface CharacterSceneProps {
  onComplete: () => void
}

export default function CharacterScene({ onComplete }: CharacterSceneProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [showCream, setShowCream] = useState(false)
  const [sceneDone, setSceneDone] = useState(false)
  const bgSrc = useBackgroundForScene('cinematic')
  const { character, creamReveal } = ANIMATION_CONFIG

  useEffect(() => {
    const fadeOutAt = (character.fadeOutDelay + character.fadeOutDuration) * 1000
    const creamAt = character.fadeOutDelay * 1000

    const creamTimer = setTimeout(() => setShowCream(true), creamAt)
    const doneTimer = setTimeout(() => {
      setSceneDone(true)
      onComplete()
    }, fadeOutAt + creamReveal.overlayFadeDuration * 1000 + 300)

    return () => {
      clearTimeout(creamTimer)
      clearTimeout(doneTimer)
    }
  }, [])

  useEffect(() => {
    videoRef.current?.play().catch(() => {})
  }, [])

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

      {/* Character webm — transparent, centered, scaling in */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ scale: character.initialScale, opacity: 1 }}
        animate={{
          scale: character.finalScale,
          opacity: showCream ? 0 : 1,
        }}
        transition={{
          scale: {
            duration: character.scaleDuration,
            ease: [0.16, 1, 0.3, 1],
          },
          opacity: {
            duration: character.fadeOutDuration,
            ease: 'easeOut',
          },
        }}
        style={{ willChange: 'transform, opacity' }}
      >
        <video
          ref={videoRef}
          src={CHARACTER_WEBM}
          className="w-full h-full object-contain max-w-2xl max-h-full"
          muted
          playsInline
          preload="auto"
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
