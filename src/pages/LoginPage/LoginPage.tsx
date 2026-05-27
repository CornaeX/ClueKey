import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import LoginForm from '@/components/login/LoginForm'
import LogoDisplay from '@/components/login/LogoDisplay'
import { useBackgroundForScene } from '@/hooks/useResponsiveAsset'
import { pageEnterVariants } from '@/animations/cinematicAnimations'

export default function LoginPage() {
  const bgSrc = useBackgroundForScene('login')
  const [bgReady, setBgReady] = useState(false)

  // The image was already preloaded by AppLoader, so this resolves instantly
  // on deploy — the browser returns it from cache immediately.
  useEffect(() => {
    if (!bgSrc) return
    const img = new Image()
    img.onload  = () => setBgReady(true)
    img.onerror = () => setBgReady(true) // graceful fallback
    img.src = bgSrc
    // Already cached? onload fires synchronously in some browsers
    if (img.complete) setBgReady(true)
  }, [bgSrc])

  return (
    <motion.div
      className="fixed inset-0 w-full h-full overflow-hidden"
      variants={pageEnterVariants}
      initial="hidden"
      animate={bgReady ? 'visible' : 'hidden'}
      exit="exit"
    >
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: bgReady ? `url(${bgSrc})` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundColor: '#1B2A4A',
        }}
      />

      {/* Gradient vignette for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-deepNavy/60 via-transparent to-deepNavy/70" />
      <div className="absolute inset-0 bg-gradient-to-r from-deepNavy/30 via-transparent to-deepNavy/30" />

      {/* Floating particles atmosphere */}
      <Particles />

      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full px-6">
        <LogoDisplay />
        <LoginForm />
      </div>
    </motion.div>
  )
}

// Subtle ambient particle effect
function Particles() {
  const particles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    delay: Math.random() * 4,
    duration: Math.random() * 3 + 4,
  }))

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-goldenHour/30"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 0.7, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}
