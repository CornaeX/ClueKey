import { useCallback, useRef, useState } from 'react'

type TimelineStep = {
  id: string
  delay: number    // ms after previous step completes
  action: () => void
}

type TimelineStatus = 'idle' | 'running' | 'complete'

export function useAnimationTimeline() {
  const [status, setStatus] = useState<TimelineStatus>('idle')
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([])

  const clear = useCallback(() => {
    timersRef.current.forEach(clearTimeout)
    timersRef.current = []
  }, [])

  const run = useCallback((steps: TimelineStep[]) => {
    clear()
    setStatus('running')

    let elapsed = 0
    steps.forEach((step) => {
      elapsed += step.delay
      const timer = setTimeout(() => {
        step.action()
      }, elapsed)
      timersRef.current.push(timer)
    })

    // Mark complete after all steps
    const totalDuration = steps.reduce((acc, s) => acc + s.delay, 0)
    const finalTimer = setTimeout(() => {
      setStatus('complete')
    }, totalDuration + 50)
    timersRef.current.push(finalTimer)
  }, [clear])

  return { run, clear, status }
}
