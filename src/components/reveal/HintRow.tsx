import type { HintItem } from '@/types'
import { useDeviceType } from '@/hooks/useResponsiveAsset'
import { SECRET_TEXT } from '@/config/secretDocumentText'

interface HintRowProps {
  hint: HintItem
  index: number
}

export default function HintRow({ hint, index }: HintRowProps) {
  const device = useDeviceType()
  const hintFont = SECRET_TEXT[device].hintFont
  const daysFont = SECRET_TEXT[device].contactFont

  return (
    <div
      className="group relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 hover:scale-[1.01]"
      style={{
        background: hint.isUnlocked
          ? 'linear-gradient(135deg, rgba(200,185,160,0.35) 0%, rgba(220,205,180,0.20) 100%)'
          : 'linear-gradient(135deg, rgba(26,20,16,0.10) 0%, rgba(26,20,16,0.05) 100%)',
        border: hint.isUnlocked
          ? '1px solid rgba(180,155,110,0.45)'
          : '1px solid rgba(26,20,16,0.12)',
        backdropFilter: 'blur(8px)',
        boxShadow: hint.isUnlocked
          ? '0 2px 16px rgba(180,155,110,0.12)'
          : 'none',
      }}
    >
      {/* Index number badge */}
      <div
        className="shrink-0 flex items-center justify-center rounded-lg font-pixel"
        style={{
          width: '28px',
          height: '28px',
          fontSize: '9px',
          backgroundColor: hint.isUnlocked
            ? 'rgba(180,155,110,0.30)'
            : 'rgba(26,20,16,0.08)',
          color: hint.isUnlocked ? 'rgba(26,20,16,0.70)' : 'rgba(26,20,16,0.25)',
          border: hint.isUnlocked
            ? '1px solid rgba(180,155,110,0.40)'
            : '1px solid rgba(26,20,16,0.10)',
        }}
      >
        {String(index + 1).padStart(2, '0')}
      </div>

      {/* Hint label */}
      <span
        className="flex-1 font-pixel leading-relaxed"
        style={{
          fontSize: hintFont,
          color: hint.isUnlocked ? 'rgba(26,20,16,0.85)' : 'rgba(26,20,16,0.30)',
        }}
      >
        {hint.label}
      </span>

      {/* Status pill */}
      <div
        className="shrink-0 flex items-center gap-1.5 px-2.5 py-1 rounded-full"
        style={{
          backgroundColor: hint.isUnlocked
            ? 'rgba(180,155,110,0.25)'
            : 'rgba(26,20,16,0.06)',
          border: hint.isUnlocked
            ? '1px solid rgba(180,155,110,0.35)'
            : '1px solid rgba(26,20,16,0.10)',
        }}
      >
        {hint.isUnlocked ? (
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
            <path d="M1 4L3 6L7 2" stroke="rgba(26,20,16,0.65)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : (
          <svg width="7" height="9" viewBox="0 0 7 9" fill="none">
            <rect x="0.5" y="3.5" width="6" height="5" rx="1" stroke="rgba(26,20,16,0.30)" strokeWidth="1" />
            <path d="M2 3.5V2.5a1.5 1.5 0 0 1 3 0V3.5" stroke="rgba(26,20,16,0.30)" strokeWidth="1" />
          </svg>
        )}
        <span
          className="font-pixel"
          style={{
            fontSize: daysFont,
            color: hint.isUnlocked ? 'rgba(26,20,16,0.60)' : 'rgba(26,20,16,0.25)',
          }}
        >
          {hint.isUnlocked ? 'OPEN' : `${hint.daysLeft}D`}
        </span>
      </div>
    </div>
  )
}
