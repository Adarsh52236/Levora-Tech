'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

interface AutoAdvanceOptions {
  length: number
  interval?: number
  paused?: boolean
}

export function useAutoAdvance({ length, interval = 5000, paused = false }: AutoAdvanceOptions) {
  const [index, setIndexState] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const ref = useRef<HTMLDivElement>(null)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const isPaused = paused || !isVisible

  // Track visibility so timer only runs when section is on screen
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.2 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const next = useCallback(() => {
    setIndexState((prev) => (prev + 1) % length)
  }, [length])

  // Wrap setIndex so manual clicks also reset the interval
  const setIndex = useCallback((i: number) => {
    setIndexState(i)
    // Clear and restart the timer on manual select
    if (timerRef.current) clearInterval(timerRef.current)
  }, [])

  // Move by relative offset, e.g. go(1) = next, go(-1) = prev
  const go = useCallback((offset: number) => {
    setIndexState((prev) => (prev + offset + length) % length)
    if (timerRef.current) clearInterval(timerRef.current)
  }, [length])

  useEffect(() => {
    if (isPaused || length <= 1) return
    timerRef.current = setInterval(next, interval)
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [next, interval, isPaused, length])

  return { index, setIndex, go, ref, next, paused: isPaused }
}
