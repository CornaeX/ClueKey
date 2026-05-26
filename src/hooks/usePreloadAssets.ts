import { useState, useEffect } from 'react'

type AssetStatus = 'idle' | 'loading' | 'ready' | 'error'

function preloadImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve()
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`))
    img.src = src
  })
}

export function usePreloadAssets(assets: string[]): {
  status: AssetStatus
  progress: number
} {
  const [status, setStatus] = useState<AssetStatus>('idle')
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (assets.length === 0) {
      setStatus('ready')
      setProgress(100)
      return
    }

    setStatus('loading')
    let loaded = 0

    const promises = assets.map((src) =>
      preloadImage(src)
        .then(() => {
          loaded++
          setProgress(Math.round((loaded / assets.length) * 100))
        })
        .catch(() => {
          // Non-blocking: still count as loaded to keep progress moving
          loaded++
          setProgress(Math.round((loaded / assets.length) * 100))
        })
    )

    Promise.all(promises).then(() => {
      setStatus('ready')
    })
  }, [assets.join(',')])

  return { status, progress }
}
