import { useState, useEffect } from 'react'
import { BREAKPOINTS, BACKGROUND_SCENES, type DeviceType } from '@/config/responsiveConfig'
import type { SceneKey } from '@/config/responsiveConfig'
import { SCENE_INDEX } from '@/config/responsiveConfig'

function getDeviceType(width: number): DeviceType {
  if (width < BREAKPOINTS.mobile) return 'mobile'
  if (width < BREAKPOINTS.tablet) return 'tablet'
  return 'desktop'
}

export function useDeviceType(): DeviceType {
  const [deviceType, setDeviceType] = useState<DeviceType>(() =>
    getDeviceType(window.innerWidth)
  )

  useEffect(() => {
    const handleResize = () => setDeviceType(getDeviceType(window.innerWidth))
    const observer = new ResizeObserver(() => handleResize())
    observer.observe(document.body)
    return () => observer.disconnect()
  }, [])

  return deviceType
}

export function useBackgroundForScene(scene: SceneKey): string {
  const deviceType = useDeviceType()
  const sceneIndex = SCENE_INDEX[scene]
  return BACKGROUND_SCENES[deviceType][sceneIndex]
}

export function useAllBackgroundsForDevice(): string[] {
  const deviceType = useDeviceType()
  return BACKGROUND_SCENES[deviceType]
}
