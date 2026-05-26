import { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { pageEnterVariants } from '@/animations/cinematicAnimations'
import WaitingScreen from '@/components/waiting/WaitingScreen'
import CharacterScene from '@/components/cinematic/CharacterScene'
import SecretDocument from '@/components/reveal/SecretDocument'
import { fetchStudentData } from '@/utils/studentData'
import { useAllBackgroundsForDevice, useBackgroundForScene } from '@/hooks/useResponsiveAsset'
import { usePreloadAssets } from '@/hooks/usePreloadAssets'
import { ANIMATION_CONFIG } from '@/config/animationConfig'
import type { ExperienceStage } from '@/types'
import type { StudentData } from '@/types'

// ─── localStorage key ─────────────────────────────────────────────────────────
const FIRST_VISIT_KEY = 'cluekey_has_seen_intro'

function hasSeenIntro(): boolean {
  try {
    return localStorage.getItem(FIRST_VISIT_KEY) === 'true'
  } catch {
    return false
  }
}

function markIntroSeen(): void {
  try {
    localStorage.setItem(FIRST_VISIT_KEY, 'true')
  } catch {
    // localStorage unavailable — silently ignore
  }
}

// ─── ExperiencePage ───────────────────────────────────────────────────────────

export default function ExperiencePage() {
  const { studentId } = useParams<{ studentId: string }>()
  const isReturningUser = useRef(hasSeenIntro())

  // Returning users skip straight to 'final' (door already open, no stopmotion).
  // First-time users start at 'waiting' as normal.
  const [stage, setStage] = useState<ExperienceStage>(
    isReturningUser.current ? 'final' : 'waiting',
  )
  const [studentData, setStudentData] = useState<StudentData | null>(null)

  const allBackgrounds = useAllBackgroundsForDevice()
  const characterImages = ANIMATION_CONFIG.character.sequence.map((item) => item.src)
  const preloadAssets = [...allBackgrounds, ...characterImages]
  const { status: preloadStatus } = usePreloadAssets(preloadAssets)

  const cinematicBg = useBackgroundForScene('cinematic')

  // Fetch student data on mount
  useEffect(() => {
    if (!studentId) return
    fetchStudentData(studentId).then(setStudentData)
  }, [studentId])

  const handleWaitingOpened = () => {
    // Mark that this device has now seen the intro
    markIntroSeen()
    setStage('character')
  }

  const handleCharacterComplete = () => setStage('final')

  return (
    <motion.div
      className="fixed inset-0 w-full h-full overflow-hidden bg-deepNavy"
      variants={pageEnterVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* Preloading overlay (only if assets haven't loaded yet) */}
      {preloadStatus === 'loading' && (
        <div className="absolute inset-0 z-[100] bg-deepNavy flex items-center justify-center">
          <motion.p
            className="font-pixel text-goldenHour/60 text-xs tracking-widest"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            Loading...
          </motion.p>
        </div>
      )}

      {/* Background visible behind the doors */}
      {stage === 'waiting' && (
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${cinematicBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />
      )}

      {/* Stage: Waiting — split-door (first visit only) */}
      {stage === 'waiting' && (
        <WaitingScreen onOpened={handleWaitingOpened} />
      )}

      {/* Stage: Character cinematic (first visit only) */}
      {stage === 'character' && (
        <CharacterScene onComplete={handleCharacterComplete} />
      )}

      {/* Stage: Final Secret Document reveal */}
      {stage === 'final' && (
        <SecretDocument studentData={studentData} />
      )}
    </motion.div>
  )
}
