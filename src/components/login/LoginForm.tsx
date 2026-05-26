import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import StudentInput from './StudentInput'
import SubmitButton from './SubmitButton'
import { validateStudentId, checkStudentExists } from '@/utils/studentData'
import { ANIMATION_CONFIG } from '@/config/animationConfig'

// ─── Toast ────────────────────────────────────────────────────────────────────

interface ToastProps {
  message: string
  visible: boolean
}

function Toast({ message, visible }: ToastProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="toast"
          className="
            fixed top-6 left-1/2 z-[200]
            -translate-x-1/2
            flex items-center gap-3
            px-5 py-3
            rounded-xl
            bg-deepNavy/90 backdrop-blur-md
            border border-dustyRose/40
            shadow-[0_8px_32px_rgba(0,0,0,0.45),0_0_0_1px_rgba(212,135,156,0.15)]
          "
          initial={{ opacity: 0, y: -20, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -16, scale: 0.94 }}
          transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Warning icon */}
          <motion.div
            className="flex-shrink-0 w-5 h-5 rounded-full bg-dustyRose/20 border border-dustyRose/60 flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1, type: 'spring', stiffness: 400 }}
          >
            <span className="text-dustyRose text-[10px] font-bold leading-none">!</span>
          </motion.div>

          <p className="font-mono text-blushPink text-xs tracking-wide whitespace-nowrap">
            {message}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ─── LoginForm ────────────────────────────────────────────────────────────────

export default function LoginForm() {
  const [studentId, setStudentId] = useState('')
  const [loading, setLoading] = useState(false)
  const [toastMsg, setToastMsg] = useState('')
  const [toastVisible, setToastVisible] = useState(false)
  const navigate = useNavigate()

  const { formRevealDelay, formRevealDuration } = ANIMATION_CONFIG.login

  /** Show a toast, then auto-dismiss after 3 s */
  const showToast = (msg: string) => {
    setToastMsg(msg)
    setToastVisible(true)
  }

  useEffect(() => {
    if (!toastVisible) return
    const t = setTimeout(() => setToastVisible(false), 3000)
    return () => clearTimeout(t)
  }, [toastVisible])

  const handleSubmit = async () => {
    if (loading) return

    const trimmed = studentId.trim()

    // Basic length check
    if (!validateStudentId(trimmed)) {
      showToast('Student ID must be at least 4 characters')
      return
    }

    setLoading(true)

    // Check that the ID actually exists in the database
    const exists = await checkStudentExists(trimmed)
    if (!exists) {
      setLoading(false)
      showToast(`"${trimmed}" is not a valid Student ID`)
      return
    }

    // Small artificial delay for cinematic feel
    await new Promise((r) => setTimeout(r, 400))
    navigate(`/experience/${trimmed}`)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSubmit()
  }

  return (
    <>
      {/* Toast rendered at the top-level so it floats above everything */}
      <Toast message={toastMsg} visible={toastVisible} />

      <motion.div
        className="flex flex-col items-center gap-4 w-full max-w-xs md:max-w-xs"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: formRevealDuration, delay: formRevealDelay, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {/* Ellipse input container */}
        <motion.div
          className="
            relative flex items-center w-full
            h-12 md:h-10
            bg-white/95
            rounded-full
            border-2 border-blushPink/70
            shadow-[0_4px_30px_rgba(212,135,156,0.25),0_0_0_4px_rgba(212,135,156,0.08)]
            overflow-hidden
          "
          whileHover={{
            boxShadow: '0 4px 40px rgba(212,135,156,0.4), 0 0 0 4px rgba(212,135,156,0.12)',
            borderColor: 'rgba(232,160,180,0.9)',
          }}
          transition={{ duration: 0.2 }}
          onKeyDown={handleKeyDown}
        >
          {/* Subtle inner glow */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blushPink/5 via-transparent to-blushPink/5 pointer-events-none" />

          <StudentInput
            value={studentId}
            onChange={(v) => {
              setStudentId(v)
              if (toastVisible) setToastVisible(false)
            }}
            disabled={loading}
            placeholder="Enter your Student ID"
          />

          <div className="pr-1.5">
            <SubmitButton onClick={handleSubmit} disabled={loading} loading={loading} />
          </div>
        </motion.div>

        {/* Decorative hint text */}
        <motion.p
          className="font-body italic text-cream/50 text-sm md:text-base tracking-wide"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: formRevealDelay + 0.5, duration: 1 }}
        >
          คำใบ้ใหม่ๆจะมาในทุกๆ สัปดาห์
        </motion.p>
      </motion.div>
    </>
  )
}
