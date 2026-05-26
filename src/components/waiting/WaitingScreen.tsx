import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PressHereButton from './PressHereButton'
import { useBackgroundForScene } from '@/hooks/useResponsiveAsset'
import {
  leftPanelVariants,
  rightPanelVariants,
  leftGearMoveVariants,
  rightGearMoveVariants,
} from '@/animations/gearAnimations'
import { ANIMATION_CONFIG } from '@/config/animationConfig'

interface WaitingScreenProps {
  onOpened: () => void
}

type WaitingState =
  | 'idle'
  | 'clicked'
  | 'splitting'
  | 'done'

const DONE: WaitingState = 'done'
const SPLITTING: WaitingState = 'splitting'

export default function WaitingScreen({
  onOpened,
}: WaitingScreenProps) {
  const [state, setState] =
    useState<WaitingState>('idle')

  const bgSrc =
    useBackgroundForScene('waiting')

  const splitDuration =
    ANIMATION_CONFIG.splitDoor.duration *
    1000

  const handlePress = useCallback(() => {
    if (state !== 'idle') return

    setState('clicked')

    // start split
    setTimeout(() => {
      setState('splitting')
    }, 300)

    // notify parent after animation
    setTimeout(() => {
      setState('done')
      onOpened()
    }, 300 + splitDuration + 200)
  }, [state, onOpened, splitDuration])

  if (state === 'done') return null

  const isSpinning =
    state === 'idle' ||
    state === 'clicked' ||
    state === 'splitting'

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden"
      onClick={handlePress}
    >
      {/* ================================================= */}
      {/* LEFT PANEL */}
      {/* ================================================= */}

      <motion.div
        className="absolute inset-0 overflow-hidden z-10"
        style={{
          clipPath:
            'polygon(0 0, 66% 0, 36% 100%, 0 100%)',
          scale: 1.005,
        }}
        variants={leftPanelVariants}
        animate={
          state === SPLITTING ||
          state === DONE
            ? 'open'
            : 'closed'
        }
      >
        {/* Background */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${bgSrc})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundColor: '#1B2A4A',
          }}
        />

        {/* Left Label */}
        <div
          className="
            absolute
            left-4
            top-1/2
            -translate-y-1/2
            flex
            flex-col
            gap-1
            z-20
          "
        >
          {['O', 'P', 'E', 'N', 'S'].map(
            (c, i) => (
              <span
                key={i}
                className="
                  font-pixel
                  text-white/40
                  text-xs
                "
              >
                {c}
              </span>
            )
          )}
        </div>

        {/* Left Arrow */}
        <motion.div
          className="
            absolute
            left-16
            top-1/2
            -translate-y-1/2
            z-20
          "
          animate={
            state === 'splitting'
              ? {
                  x: -10,
                  opacity: 0,
                }
              : {
                  x: 0,
                  opacity: 1,
                }
          }
          transition={{ duration: 0.3 }}
        >
          <span className="text-white/40 text-lg">
            ←
          </span>
        </motion.div>
      </motion.div> {/* <--- FIXED: Added this closing tag for the left panel */}

      {/* ================================================= */}
      {/* RIGHT PANEL */}
      {/* ================================================= */}

      <motion.div
        className="absolute inset-0 overflow-hidden z-10"
        style={{
          clipPath:
            'polygon(100% 0, 100% 100%, 35% 100%, 65% 0)',
          scale: 1.005,
        }}
        variants={rightPanelVariants}
        animate={
          state === SPLITTING ||
          state === DONE
            ? 'open'
            : 'closed'
        }
      >
        {/* Background */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${bgSrc})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundColor: '#1B2A4A',
          }}
        />

        {/* Right Label */}
        <div
          className="
            absolute
            right-4
            top-1/2
            -translate-y-1/2
            flex
            flex-col
            gap-1
            z-20
          "
        >
          {['O', 'P', 'E', 'N', 'S'].map(
            (c, i) => (
              <span
                key={i}
                className="
                  font-pixel
                  text-white/40
                  text-xs
                "
              >
                {c}
              </span>
            )
          )}
        </div>

        {/* Right Arrow */}
        <motion.div
          className="
            absolute
            right-16
            top-1/2
            -translate-y-1/2
            z-20
          "
          animate={
            state === 'splitting'
              ? {
                  x: 20,
                  opacity: 0,
                }
              : {
                  x: 0,
                  opacity: 1,
                }
          }
          transition={{ duration: 0.3 }}
        >
          <span className="text-white/40 text-lg">
            →
          </span>
        </motion.div>
      </motion.div>

      {/* ================================================= */}
      {/* LEFT GEAR */}
      {/* ================================================= */}

      <motion.div
        className="absolute inset-0 z-30 pointer-events-none"
        variants={leftGearMoveVariants}
        animate={
          state === SPLITTING || state === DONE
            ? 'open'
            : 'closed'
        }
      >
        <div
          className="
            absolute

            left-[38%]
            top-[42%]

            md:left-[45.5%]
            md:top-[45%]

            -translate-x-1/2
            -translate-y-1/2
          "
        >
          <motion.img
            src="/images/gearv2.png"
            alt="gear"
            className="
              object-contain

              w-[160px]
              h-[160px]

              md:w-[220px]
              md:h-[220px]

              select-none
            "
            animate={
              isSpinning
                ? { rotate: 360 }
                : { rotate: 0 }
            }
            transition={{
              duration: 7,
              ease: 'linear',
              repeat: Infinity,
            }}
            draggable={false}
          />
        </div>
      </motion.div>

      {/* ================================================= */}
      {/* RIGHT GEAR */}
      {/* ================================================= */}

      <motion.div
        className="absolute inset-0 z-30 pointer-events-none"
        variants={rightGearMoveVariants}
        animate={
          state === SPLITTING || state === DONE
            ? 'open'
            : 'closed'
        }
      >
        <div
          className="
            absolute

            left-[63%]
            top-[45.3%]

            md:left-[54.4%]
            md:top-[49.7%]

            -translate-x-1/2
            -translate-y-1/2
          "
        >
          <motion.img
            src="/images/gearv2.png"
            alt="gear"
            className="
              object-contain

              w-[110px]
              h-[110px]

              md:w-[150px]
              md:h-[150px]

              select-none
            "
            animate={
              isSpinning
                ? { rotate: -360 }
                : { rotate: 0 }
            }
            transition={{
              duration: 7,
              ease: 'linear',
              repeat: Infinity,
            }}
            draggable={false}
          />
        </div>
      </motion.div>

      {/* ================================================= */}
      {/* CENTER BUTTON */}
      {/* ================================================= */}

      <AnimatePresence>
        {state !== DONE && (
          <motion.div
            className="absolute inset-0 z-40"
            animate={
              state === 'splitting'
                ? { opacity: 0 }
                : { opacity: 1 }
            }
            transition={{ duration: 0.2 }}
          >
            <div
              className="
                absolute
                left-1/2
                top-[53%]
                md:top-[60%]
                -translate-x-1/2
              "
            >
              <PressHereButton
                onClick={handlePress}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}