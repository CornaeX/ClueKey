import { motion } from 'framer-motion'
import { ANIMATION_CONFIG } from '@/config/animationConfig'
import { GEAR_IMAGE } from '@/config/responsiveConfig'
import {
  largeGearVariants,
  smallGearVariants,
} from '@/animations/gearAnimations'

interface GearPairProps {
  isSpinning: boolean
}

export default function GearPair({ isSpinning }: GearPairProps) {
  const { largeGearSize, smallGearSize } = ANIMATION_CONFIG.waiting

  // Responsive multiplier: scale down on mobile
  const scale = typeof window !== 'undefined' && window.innerWidth < 768 ? 0.7 : 1
  const lg = largeGearSize * scale
  const sm = smallGearSize * scale

  // Small gear sits to the right of large gear, teeth interlocking
  const isMobile =
  typeof window !== 'undefined' && window.innerWidth < 768

  const gearGap = isMobile ? 13 : 19

  const centerDistance =
    (lg / 2) +
    (sm / 2) +
    gearGap
  const totalWidth = centerDistance + sm
  const smallCX = centerDistance
  const largeCX = 0
  // const smallCY = -(sm / 2 - lg / 2)  // vertically center small gear relative to large
  const verticalOffset = 45 * scale


  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: totalWidth, height: lg }}
    >
      {/* Large gear — left side */}
      <motion.div
        className="absolute"
        style={{
          left: largeCX,
          top: 0,
          width: lg,
          height: lg,
          transformOrigin: 'center center',
        }}
        variants={largeGearVariants}
        animate={isSpinning ? 'spinning' : 'stopped'}
      >
        <img
          src={GEAR_IMAGE}
          alt="gear"
          className="w-full h-full object-contain"
          style={{ filter: 'brightness(0.85)' }}
          draggable={false}
        />
      </motion.div>

      {/* Small gear — right side */}
      <motion.div
        className="absolute"
        style={{
          left: smallCX,
          top: lg / 2 - sm / 2 + verticalOffset,
          width: sm,
          height: sm,
        }}
        variants={smallGearVariants}
        animate={isSpinning ? 'spinning' : 'stopped'}
      >
        <img
          src={GEAR_IMAGE}
          alt="gear"
          className="w-full h-full object-contain"
          style={{ filter: 'brightness(0.85)' }}
          draggable={false}
        />
      </motion.div>
    </div>
  )
}
