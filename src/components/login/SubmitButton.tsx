import { motion } from 'framer-motion'

interface SubmitButtonProps {
  onClick: () => void
  disabled?: boolean
  loading?: boolean
}

// Inline SVG mask for the heart shape
const heartMask = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'/%3E%3C/svg%3E\")"

export default function SubmitButton({ onClick, disabled = false, loading = false }: SubmitButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled || loading}
      style={{
        maskImage: heartMask,
        WebkitMaskImage: heartMask,
        maskSize: 'contain',
        WebkitMaskSize: 'contain',
        maskPosition: 'center',
        WebkitMaskPosition: 'center',
        maskRepeat: 'no-repeat',
        WebkitMaskRepeat: 'no-repeat',
      }}
      className="
        relative shrink-0
        flex items-center justify-center
        w-12 h-12
        md:w-10 md:h-10
        bg-dustyRose
        font-pixel
        text-white
        text-[10px]
        md:text-[8px]
        tracking-wider
        leading-none
        cursor-pointer
        disabled:opacity-50 disabled:cursor-not-allowed
        overflow-hidden
        border-none
        outline-none
      "
      whileHover={!disabled && !loading ? { scale: 1.05, backgroundColor: '#E8A0B4' } : {}}
      whileTap={!disabled && !loading ? { scale: 0.97 } : {}}
      transition={{ duration: 0.15 }}
    >
      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
        animate={{ x: ['-100%', '200%'] }}
        transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1.5, ease: 'easeInOut' }}
      />

      {/* Content wrapper - nudged up slightly to visually center inside the heart */}
      <div className="relative z-10 flex items-center justify-center -mt-[2px]">
        {loading ? (
          <motion.span
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          >
            ...
          </motion.span>
        ) : (
          <span>GO</span>
        )}
      </div>
    </motion.button>
  )
}