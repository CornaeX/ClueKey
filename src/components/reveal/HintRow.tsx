import type { HintItem } from '@/types'

interface HintRowProps {
  hint: HintItem
  index: number
}

export default function HintRow({ hint }: HintRowProps) {
  return (
    <div
      className="
        flex items-center justify-between
        px-4 py-3
        rounded-lg
      "
      style={{ backgroundColor: hint.isUnlocked ? '#D4CABC' : '#CBC1B3' }}
    >
      <span
        className="font-pixel text-inkBlack/80"
        style={{ fontSize: 'clamp(7px, 2vw, 10px)' }}
      >
        {hint.label}
      </span>

      <div className="flex items-center gap-2">
        {/* Lock icon if locked */}
        {!hint.isUnlocked && (
          <svg width="10" height="12" viewBox="0 0 10 12" fill="none" className="opacity-40">
            <rect x="1" y="5" width="8" height="7" rx="1" stroke="#1A1410" strokeWidth="1" />
            <path d="M3 5V3.5a2 2 0 0 1 4 0V5" stroke="#1A1410" strokeWidth="1" />
          </svg>
        )}
        <span
          className="font-pixel text-inkBlack/50 text-right"
          style={{ fontSize: 'clamp(6px, 1.8vw, 9px)' }}
        >
          {hint.daysLeft} DAYS LEFT
        </span>
      </div>
    </div>
  )
}
