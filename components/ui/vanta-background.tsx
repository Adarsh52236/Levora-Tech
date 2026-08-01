'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

type VantaBackgroundProps = {
  className?: string
}

export function VantaBackground({ className }: VantaBackgroundProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let effect: { destroy: () => void } | null = null
    let cancelled = false

    const init = async () => {
      if (!ref.current || cancelled) return
      try {
        const HALO = (await import('vanta/dist/vanta.halo.min')).default
        if (cancelled || !ref.current) return
        effect = HALO({
          el: ref.current,
          THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200,
          minWidth: 200,
          backgroundColor: 0xfdfdfd,
          baseColor: 0x003876,
          size: 1.2,
        })
      } catch (error) {
        console.error('Vanta load error', error)
      }
    }

    init()

    return () => {
      cancelled = true
      effect?.destroy()
    }
  }, [])

  return <div ref={ref} className={className} aria-hidden />
}
