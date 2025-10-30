import { useEffect, useRef } from 'react'
import confetti from 'canvas-confetti'

type CelebrationBurstProps = {
  active: boolean
}

export default function CelebrationBurst({ active }: CelebrationBurstProps) {
  const frameRef = useRef<number | null>(null)

  useEffect(() => {
    if (!active) return

    const duration = 1200
    const end = Date.now() + duration
    const colors = ['#ffd93b', '#ff6f91', '#66d5f7', '#8ef6e4']

    const run = () => {
      confetti({
        particleCount: 40,
        spread: 70,
        startVelocity: 25,
        gravity: 0.8,
        ticks: 120,
        origin: { y: 0.4 },
        colors,
        scalar: 0.9,
      })

      confetti({
        particleCount: 25,
        spread: 120,
        startVelocity: 40,
        origin: { y: 0.2 },
        colors,
        scalar: 0.7,
      })

      if (Date.now() < end) {
        frameRef.current = requestAnimationFrame(run)
      }
    }

    frameRef.current = requestAnimationFrame(run)

    return () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current)
        frameRef.current = null
      }
    }
  }, [active])

  return null
}
