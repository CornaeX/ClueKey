import { motion } from 'framer-motion'
import { ANIMATION_CONFIG } from '@/config/animationConfig'

interface PressHereButtonProps {
  onClick: () => void
}

export default function PressHereButton({ onClick }: PressHereButtonProps) {
  const { pressHereFloatDuration, pressHereFloatDistance } = ANIMATION_CONFIG.waiting

  return (
    <motion.button
      onClick={onClick}
      className="
        flex flex-col items-center gap-2
        cursor-pointer border-none bg-transparent
        outline-none focus:outline-none
      "
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8, duration: 0.8 }}
    >
      {/* Floating label */}
      <motion.div
        animate={{ y: [0, -pressHereFloatDistance, 0] }}
        transition={{
          duration: pressHereFloatDuration,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="flex flex-col items-center gap-2"
      >
        <span
  className="font-pixel tracking-widest uppercase"
  style={{
    fontSize: '20px',
    color: '#ffffff',
    fontWeight: 600,
    WebkitTextStroke: '7px #ff5ca363',
    paintOrder: 'stroke fill',
    textShadow: `
      0 0 1px rgba(255,255,255,1),
      0 0 2px rgba(255,255,255,0.95),
      0 0 6px rgba(255,92,162,0.35)
    `,
  }}
>
  PRESS HERE
</span>

        {/* Bigger animated arrow arc */}
        <svg
          width="80"
          height="42"
          viewBox="0 0 110 42"
          fill="none"
          className="opacity-95"
        >
          <path
            d="M8 8 Q55 36 102 8"
            stroke="white"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
            style={{
              filter: `
                drop-shadow(0 0 3px #ffffff)
                drop-shadow(0 0 7px #ff006f)
              `,
            }}
          />

          <path
            d="M92 3 L102 8 L95 18"
            stroke="white"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            style={{
              filter: `
                drop-shadow(0 0 3px #ffffff)
                drop-shadow(0 0 7px #ff006f)
              `,
            }}
          />
        </svg>
      </motion.div>

      {/* Ripple on hover */}
      <motion.div
        className="absolute inset-0 rounded-full border border-white/20 pointer-events-none"
        animate={{ scale: [1, 1.3], opacity: [0.4, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
    </motion.button>
  )
}
