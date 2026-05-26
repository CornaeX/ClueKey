import { motion } from 'framer-motion'
import type { HTMLMotionProps } from 'framer-motion'

interface FullscreenBackgroundProps extends HTMLMotionProps<'div'> {
  src?: string
  fallbackColor?: string
  overlay?: boolean
  overlayOpacity?: number
  children?: React.ReactNode
}

export default function FullscreenBackground({
  src,
  fallbackColor = '#0D1B2A',
  overlay = false,
  overlayOpacity = 0.4,
  children,
  style,
  ...motionProps
}: FullscreenBackgroundProps) {
  return (
    <motion.div
      className="fixed inset-0 w-full h-full overflow-hidden gpu-accelerate"
      style={{
        backgroundColor: fallbackColor,
        backgroundImage: src ? `url(${src})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        ...style,
      }}
      {...motionProps}
    >
      {overlay && (
        <div
          className="absolute inset-0"
          style={{ backgroundColor: `rgba(0,0,0,${overlayOpacity})` }}
        />
      )}
      {children}
    </motion.div>
  )
}
