import type { HintItem } from '@/types'
import { useDeviceType } from '@/hooks/useResponsiveAsset'
import { SECRET_TEXT } from '@/config/secretDocumentText'
import { motion } from 'framer-motion'

interface HintRowProps {
  hint: HintItem
  index: number
  isLoading?: boolean
}

export default function HintRow({ hint, index, isLoading = false }: HintRowProps) {
  const device = useDeviceType()
  const hintFont = SECRET_TEXT[device].hintFont
  const labelFont = SECRET_TEXT[device].slotFont

  return (
    <div
      className="group relative flex items-start gap-3 px-4 py-3 rounded-xl transition-all duration-300 hover:scale-[1.01]"
      style={{
        background: hint.isUnlocked
          ? 'linear-gradient(135deg, rgba(200,185,160,0.40) 0%, rgba(220,205,180,0.22) 100%)'
          : 'linear-gradient(135deg, rgba(26,20,16,0.07) 0%, rgba(26,20,16,0.03) 100%)',
        border: hint.isUnlocked
          ? '1px solid rgba(180,155,110,0.50)'
          : '1px solid rgba(26,20,16,0.10)',
        backdropFilter: 'blur(8px)',
        boxShadow: hint.isUnlocked
          ? '0 2px 16px rgba(180,155,110,0.15)'
          : 'none',
      }}
    >
      {/* Slot number badge */}
      <div
        className="shrink-0 flex items-center justify-center rounded-lg font-pixel mt-0.5"
        style={{
          width: '26px',
          height: '26px',
          fontSize: '9px',
          backgroundColor: hint.isUnlocked
            ? 'rgba(180,155,110,0.30)'
            : 'rgba(26,20,16,0.07)',
          color: hint.isUnlocked ? 'rgba(26,20,16,0.70)' : 'rgba(26,20,16,0.22)',
          border: hint.isUnlocked
            ? '1px solid rgba(180,155,110,0.40)'
            : '1px solid rgba(26,20,16,0.10)',
        }}
      >
        {String(index + 1).padStart(2, '0')}
      </div>

      {/* Main content column */}
      <div className="flex-1 min-w-0">
        {isLoading ? (
          /* ── LOADING: shimmer skeleton ── */
          <motion.div
            className="h-3 rounded-full"
            style={{
              width: `${65 + ((index * 17) % 30)}%`,
              background: 'linear-gradient(90deg, rgba(26,20,16,0.08) 0%, rgba(26,20,16,0.16) 50%, rgba(26,20,16,0.08) 100%)',
              backgroundSize: '200% 100%',
            }}
            animate={{ backgroundPosition: ['200% 0', '-200% 0'] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'linear', delay: index * 0.08 }}
          />
        ) : hint.isUnlocked ? (
          /* ── UNLOCKED: show the actual hint text ── */
          <p
            className="font-pixel leading-relaxed break-words"
            style={{
              fontSize: hintFont,
              color: 'rgba(26,20,16,0.88)',
              lineHeight: '1.75',
            }}
          >
            {hint.text}
          </p>
        ) : (
          /* ── LOCKED: placeholder row ── */
          <div className="flex items-center gap-2">
            {/* Lock icon */}
            <svg
              width="11"
              height="13"
              viewBox="0 0 11 13"
              fill="none"
              className="shrink-0"
            >
              <rect
                x="0.75"
                y="5.25"
                width="9.5"
                height="7"
                rx="1.25"
                stroke="rgba(26,20,16,0.22)"
                strokeWidth="1.25"
              />
              <path
                d="M3 5.25V3.5a2.5 2.5 0 0 1 5 0V5.25"
                stroke="rgba(26,20,16,0.22)"
                strokeWidth="1.25"
              />
            </svg>

            <span
              className="font-pixel"
              style={{
                fontSize: labelFont,
                color: 'rgba(26,20,16,0.25)',
                letterSpacing: '0.05em',
              }}
            >
              ยังไม่ปลดล็อค
            </span>
          </div>
        )}
      </div>

      {/* Status pill — right side */}
      <div
        className="shrink-0 self-start flex items-center gap-1.5 px-2 py-1 rounded-full"
        style={{
          backgroundColor: hint.isUnlocked
            ? 'rgba(180,155,110,0.22)'
            : 'rgba(26,20,16,0.05)',
          border: hint.isUnlocked
            ? '1px solid rgba(180,155,110,0.35)'
            : '1px solid rgba(26,20,16,0.09)',
        }}
      >
        {isLoading ? (
          <motion.div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: 'rgba(26,20,16,0.15)' }}
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut', delay: index * 0.1 }}
          />
        ) : hint.isUnlocked ? (
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
            <path
              d="M1 4L3 6L7 2"
              stroke="rgba(26,20,16,0.65)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          <svg width="7" height="7" viewBox="0 0 7 7" fill="none">
            <circle cx="3.5" cy="3.5" r="3" stroke="rgba(26,20,16,0.22)" strokeWidth="1" />
          </svg>
        )}
        <span
          className="font-pixel"
          style={{
            fontSize: '8px',
            color: hint.isUnlocked ? 'rgba(26,20,16,0.60)' : 'rgba(26,20,16,0.22)',
          }}
        >
          {isLoading ? '···' : hint.isUnlocked ? 'OPEN' : 'LOCK'}
        </span>
      </div>
    </div>
  )
}
