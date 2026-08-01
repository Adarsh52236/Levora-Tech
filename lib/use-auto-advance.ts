'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import { useReducedMotion } from '@/lib/motion'

type UseAutoAdvanceOptions = {
  length: number
  interval?: number
  paused?: boolean
}

export function useAutoAdvance({
  length,
  interval = 5000,
  paused = false,
}: UseAutoAdvanceOptions) {
  const [index, setIndex] = useState(0)
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { margin: '-25% 0px -25% 0px' })
  const reduced = useReducedMotion()

  useEffect(() => {
    if (paused || !inView || reduced || length <= 1) return
    const t = setInterval(
      () => setIndex((i) => (i + 1) % length),
      interval,
    )
    return () => clearInterval(t)
  }, [paused, inView, reduced, length, interval])

  const go = (dir: number) =>
    setIndex((i) => (i + dir + length) % length)

  return {
    index,
    setIndex,
    go,
    ref,
    paused: paused || !inView || reduced,
  }
}
