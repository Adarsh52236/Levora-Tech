'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

interface AutoAdvanceOptions {
  length: number
  interval?: number
  paused?: boolean
}

export function useAutoAdvance({ length, interval = 5000, paused = false }: AutoAdvanceOptions) {
  const [index, setIndex] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  const next = useCallback(() => {
    setIndex((prev) => (prev + 1) % length)
  }, [length])

  useEffect(() => {
    if (paused || length <= 1) return
    const timer = setInterval(next, interval)
    return () => clearInterval(timer)
  }, [next, interval, paused, length])

  return { index, setIndex, ref, next }
}
