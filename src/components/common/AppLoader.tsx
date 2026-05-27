import { useEffect, useRef } from 'react'
import { BACKGROUND_SCENES, GEAR_IMAGE, STUDENT_ID_ICON, STUDENT_ID_TEXT } from '@/config/responsiveConfig'

// All assets that must be cached before the login page renders
const CRITICAL_ASSETS: string[] = [
  // Current device backgrounds will be loaded dynamically,
  // but we eagerly load desktop set (most common) plus the UI images
  ...BACKGROUND_SCENES.desktop,
  GEAR_IMAGE,
  STUDENT_ID_ICON,
  STUDENT_ID_TEXT,
]

function preloadImage(src: string): Promise<void> {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => resolve()
    img.onerror = () => resolve() // never block on error
    img.src = src
  })
}

interface AppLoaderProps {
  children: React.ReactNode
}

export default function AppLoader({ children }: AppLoaderProps) {
  const splashRef = useRef<HTMLDivElement | null>(null)
  const barRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    splashRef.current = document.getElementById('splash') as HTMLDivElement
    barRef.current   = document.getElementById('splash-bar') as HTMLElement

    // Also load the correct backgrounds for the user's actual device
    const w = window.innerWidth
    const deviceBgs =
      w < 768  ? BACKGROUND_SCENES.mobile  :
      w < 1024 ? BACKGROUND_SCENES.tablet  :
                 BACKGROUND_SCENES.desktop

    const assets = Array.from(new Set([...CRITICAL_ASSETS, ...deviceBgs]))
    let loaded = 0

    const updateBar = () => {
      loaded++
      const pct = Math.round((loaded / assets.length) * 100)
      if (barRef.current) barRef.current.style.width = `${pct}%`
    }

    const promises = assets.map((src) =>
      preloadImage(src).then(updateBar)
    )

    Promise.all(promises).then(() => {
      // Small grace period so the bar visually hits 100%
      setTimeout(() => {
        if (splashRef.current) splashRef.current.classList.add('splash-hidden')
        // Remove from DOM after transition ends (keeps accessibility tree clean)
        setTimeout(() => {
          splashRef.current?.remove()
        }, 600)
      }, 120)
    })
  }, [])

  // Render children immediately (they're hidden behind the splash).
  // This lets React hydrate and framer-motion prepare while assets load.
  return <>{children}</>
}
