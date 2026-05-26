import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import StudentInput from './StudentInput'
import SubmitButton from './SubmitButton'
import { validateStudentId } from '@/utils/studentData'
import { ANIMATION_CONFIG } from '@/config/animationConfig'

export default function LoginForm() {
  const [studentId, setStudentId] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const { formRevealDelay, formRevealDuration } = ANIMATION_CONFIG.login

  const handleSubmit = async () => {
    if (!validateStudentId(studentId)) {
      setError('Please enter a valid Student ID')
      return
    }
    setError('')
    setLoading(true)
    // Small artificial delay for cinematic feel
    await new Promise((r) => setTimeout(r, 600))
    navigate(`/experience/${studentId.trim()}`)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSubmit()
  }

  return (
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
          onChange={setStudentId}
          disabled={loading}
          placeholder="Enter your Student ID"
        />

        <div className="pr-1.5">
          <SubmitButton onClick={handleSubmit} disabled={loading} loading={loading} />
        </div>
      </motion.div>

      {/* Error message */}
      {error && (
        <motion.p
          className="font-mono text-dustyRose text-xs text-center tracking-wide"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {error}
        </motion.p>
      )}

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
  )
}
