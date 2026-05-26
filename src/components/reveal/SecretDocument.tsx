import { motion } from 'framer-motion'
import type { StudentData } from '@/types'
import {
  titleRevealVariants,
  containerRevealVariants,
  listItemVariants,
  backgroundZoomVariants,
} from '@/animations/revealAnimations'
import { useBackgroundForScene } from '@/hooks/useResponsiveAsset'
import HintRow from './HintRow'

interface SecretDocumentProps {
  studentData: StudentData
}

export default function SecretDocument({ studentData }: SecretDocumentProps) {
  const bgSrc = useBackgroundForScene('reveal')

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
          className="relative w-full max-w-sm md:max-w-md"
          variants={containerRevealVariants}
          initial="hidden"
          animate="visible"
        >
          {/* ── Document card ─────────────────────────────── */}
          <div
            className="
              w-full rounded-2xl overflow-hidden
              shadow-[0_20px_60px_rgba(0,0,0,0.25)]
            "
            style={{ backgroundColor: '#E8E3D8' }}
          >
            {/* Title bar */}
            <motion.div
              className="px-5 pt-6 pb-4"
              variants={titleRevealVariants}
              initial="hidden"
              animate="visible"
            >
              <h1
                className="font-pixel text-inkBlack text-center text-xs md:text-sm tracking-wider"
                style={{ fontSize: 'clamp(9px, 2.5vw, 13px)' }}
              >
                SECRET DOCUMENT
              </h1>
            </motion.div>

            {/* Top section: image + info */}
            <motion.div
              className="mx-4 mb-4 flex gap-4 items-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.7 }}
            >
              {/* Image placeholder */}
              <div
                className="shrink-0 w-28 h-28 md:w-36 md:h-36 rounded-xl overflow-hidden flex items-center justify-center"
                style={{ backgroundColor: '#D0CAB8' }}
              >
                {studentData.imageUrl ? (
                  <img
                    src={studentData.imageUrl}
                    alt="Student"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="font-pixel text-inkBlack/40 text-xs">IMAGE</span>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 pt-1 flex flex-col gap-2">
                <p
                  className="font-pixel text-inkBlack/70 leading-relaxed"
                  style={{ fontSize: 'clamp(7px, 2vw, 10px)' }}
                >
                  คำใหม่จะมาในทุกๆ สัปดาห์
                </p>
                {studentData.contactInfo && (
                  <p
                    className="font-pixel text-inkBlack/50"
                    style={{ fontSize: 'clamp(6px, 1.8vw, 9px)' }}
                  >
                    มีปัญหาติดต่อ IG : {studentData.contactInfo}
                  </p>
                )}
              </div>
            </motion.div>

            {/* Divider */}
            <div className="mx-4 h-px bg-inkBlack/10 mb-1" />

            {/* Hint rows */}
            <div className="px-4 pb-6 flex flex-col gap-1.5 mt-3">
              {studentData.hints.map((hint, i) => (
                <motion.div
                  key={hint.id}
                  variants={listItemVariants}
                  custom={i}
                  initial="hidden"
                  animate="visible"
                >
                  <HintRow hint={hint} index={i} />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
