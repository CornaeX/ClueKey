import { motion } from 'framer-motion'
import type { StudentData } from '@/types'
import {
  containerRevealVariants,
  listItemVariants,
  backgroundZoomVariants,
} from '@/animations/revealAnimations'
import { useBackgroundForScene, useDeviceType } from '@/hooks/useResponsiveAsset'
import HintRow from './HintRow'
import { SECRET_TEXT } from '@/config/secretDocumentText'

// ── Your IG handle — change this once and it shows on every page ──
const MY_IG = 'your_ig_here'

interface SecretDocumentProps {
  studentData: StudentData
}

// Tune spacing per device to align elements on top of the background image slots
const LAYOUT_CONFIG = {
  desktop: {
    topSpacerHeight: 'h-36 md:h-44',
    containerWidth: 'max-w-lg md:max-w-xl px-10 pb-14',
    infoGap: 'gap-2',
    hintsContainerClass: 'mt-6 flex flex-col gap-3 pb-10',
  },
  tablet: {
    topSpacerHeight: 'h-28',
    containerWidth: 'max-w-md px-7 pb-10',
    infoGap: 'gap-2',
    hintsContainerClass: 'mt-5 flex flex-col gap-2.5 pb-8',
  },
  mobile: {
    topSpacerHeight: 'h-20',
    containerWidth: 'max-w-sm px-4 pb-8',
    infoGap: 'gap-1.5',
    hintsContainerClass: 'mt-4 flex flex-col gap-2 pb-6',
  },
}

export default function SecretDocument({ studentData }: SecretDocumentProps) {
  const bgSrc = useBackgroundForScene('reveal')
  const deviceType = useDeviceType()
  const config = LAYOUT_CONFIG[deviceType]
  const textConfig = SECRET_TEXT[deviceType]

  return (
    <div className="fixed inset-0 z-30 overflow-hidden">
      {/* Zooming background */}
      <motion.div
        className="absolute inset-0"
        variants={backgroundZoomVariants}
        initial="initial"
        animate="reveal"
        style={{ willChange: 'transform' }}
      >
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `url(${bgSrc})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundColor: '#C8B5A0',
          }}
        />
      </motion.div>

      {/* Scrollable content layer */}
      <div className="absolute inset-0 overflow-y-auto flex items-start justify-center px-4 py-6 md:py-10">
        <motion.div
          className={`relative w-full ${config.containerWidth}`}
          variants={containerRevealVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Spacer — keeps the background's built-in top text visible */}
          <div className={config.topSpacerHeight} />

          {/* ── Info header ──────────────────────────────── */}
          <motion.div
            className={`flex flex-col ${config.infoGap} mb-5`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6, ease: 'easeOut' }}
          >
            {/* Main message */}
            <p
              className="font-pixel text-inkBlack/80 leading-loose"
              style={{ fontSize: textConfig.mainFont }}
            >
              {textConfig.main}
            </p>

            {/* Contact chip — static IG */}
            <div className="flex items-center gap-2 self-start">
              <div
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: 'rgba(26,20,16,0.40)' }}
              />
              <p
                className="font-pixel text-inkBlack/55"
                style={{ fontSize: textConfig.contactFont }}
              >
                IG : {MY_IG}
              </p>
            </div>
          </motion.div>

          {/* Thin separator line */}
          <motion.div
            className="w-full mb-5"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.5, ease: 'easeOut' }}
            style={{
              height: '1px',
              transformOrigin: 'left',
              background: 'linear-gradient(90deg, rgba(26,20,16,0.25) 0%, rgba(26,20,16,0.05) 100%)',
            }}
          />

          {/* ── Hint list ────────────────────────────────── */}
          <div className={config.hintsContainerClass}>
            {studentData.hints.map((hint, i) => (
              <motion.div
                key={hint.slot}
                variants={listItemVariants}
                custom={i}
                initial="hidden"
                animate="visible"
              >
                <HintRow hint={hint} index={i} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

