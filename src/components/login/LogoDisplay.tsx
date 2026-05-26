import { motion } from 'framer-motion'
import { ANIMATION_CONFIG } from '@/config/animationConfig'
import { STUDENT_ID_ICON, STUDENT_ID_TEXT } from '@/config/responsiveConfig'

export default function LogoDisplay() {
  const { logoRevealDelay, logoRevealDuration } = ANIMATION_CONFIG.login

  return (
    <motion.div
      className="flex flex-col items-center select-none mb-8"
      initial={{ opacity: 0, y: -30, filter: 'blur(10px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: logoRevealDuration, delay: logoRevealDelay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Base container size remains unchanged to preserve overall page layout */}
      <div className="relative w-[100px] h-[100px] md:w-36 md:h-36">
        
        {/* NEW WRAPPER: Groups the logo and circles together and pulls them upward */}
        {/* Adjust '-translate-y-3' or 'md:-translate-y-5' to change how high it moves */}
        <div className="absolute inset-0 -translate-y-3 md:translate-y-2 flex items-center justify-center">
          
          {/* Decorative ornament framing the logo icon */}
          <motion.div
            className="absolute inset-0 rounded-full border border-goldenHour/30"
            animate={{ scale: [1, 1.06, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute inset-2 rounded-full border border-goldenHour/20"
            animate={{ scale: [1, 1.04, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          />
          
          {/* Logo Icon */}
          <img 
            src={STUDENT_ID_ICON} 
            className="w-18 h-18 md:w-24 md:h-24 object-contain relative z-10"
            alt="Logo Icon"
          />
        </div>

        {/* Text Container - Stays anchored to the bottom of the base container */}
        <div className="absolute bottom-[-14px] md:bottom-[-16px] left-1/2 -translate-x-1/2 z-20 w-[130px] md:w-[150px] text-center">
          <img 
            src={STUDENT_ID_TEXT}
            alt="Secret Document" 
            className="w-full h-auto block mx-auto opacity-90" 
          />
        </div>
      </div>
    </motion.div>
  )
}