export const SECRET_TEXT = {
  desktop: {
    main: 'คำใหม่จะมาในทุกๆ สัปดาห์',
    mainFont: 'clamp(12px, 1.8vw, 16px)',
    contactFont: 'clamp(11px, 1.4vw, 14px)',
    /** Font size for the actual hint text when unlocked */
    hintFont: 'clamp(13px, 1.6vw, 15px)',
    /** Font size for the locked-slot label */
    slotFont: 'clamp(10px, 1.2vw, 12px)',
  },
  tablet: {
    main: 'คำใหม่จะมาในทุกๆ สัปดาห์',
    mainFont: 'clamp(11px, 2vw, 15px)',
    contactFont: 'clamp(10px, 1.6vw, 13px)',
    hintFont: 'clamp(12px, 1.8vw, 14px)',
    slotFont: 'clamp(9px, 1.3vw, 11px)',
  },
  mobile: {
    main: 'คำใหม่จะมาในทุกๆ สัปดาห์',
    mainFont: 'clamp(11px, 3.2vw, 14px)',
    contactFont: 'clamp(10px, 2.8vw, 12px)',
    hintFont: 'clamp(12px, 3.4vw, 14px)',
    slotFont: 'clamp(9px, 2.5vw, 11px)',
  },
} as const
