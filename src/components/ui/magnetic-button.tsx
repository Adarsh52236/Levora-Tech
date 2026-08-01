'use client'

import { useRef, useState } from 'react'
import { motion, useSpring } from 'framer-motion'
import { cn } from '@/lib/utils/cn'
import { useReducedMotion } from '@/lib/motion'

type MagneticButtonProps = {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  variant?: 'primary' | 'secondary'
}

export function MagneticButton({
  children,
  className,
  onClick,
  variant = 'primary',
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null)
  const reduced = useReducedMotion()
  const x = useSpring(0, { stiffness: 200, damping: 18 })
  const y = useSpring(0, { stiffness: 200, damping: 18 })
  const [hovered, setHovered] = useState(false)

  const onMove = (e: React.MouseEvent) => {
    if (reduced || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    x.set((e.clientX - rect.left - rect.width / 2) * 0.18)
    y.set((e.clientY - rect.top - rect.height / 2) * 0.18)
  }

  const onLeave = () => {
    x.set(0)
    y.set(0)
    setHovered(false)
  }

  const base =
    variant === 'primary'
      ? 'bg-brand-blue text-primary-foreground hover:shadow-[0_0_32px_-2px_rgba(0,56,118,0.55)] hover:brightness-110'
      : 'border border-border bg-secondary/50 text-foreground backdrop-blur-sm hover:border-brand-cyan/50'

  return (
    <motion.button
      ref={ref}
      style={reduced ? undefined : { x, y }}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onLeave}
      onClick={onClick}
      whileTap={reduced ? undefined : { scale: 0.97 }}
      className={cn(
        'group relative overflow-hidden inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-300',
        base,
        className,
      )}
    >
      {children}
      {variant === 'primary' && (
        <motion.span
          className="absolute inset-0 rounded-xl opacity-0 transition-opacity group-hover:opacity-100"
          style={{
            background:
              'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.12) 50%, transparent 60%)',
            transform: hovered ? 'translateX(100%)' : 'translateX(-100%)',
            transition: 'transform 0.6s ease',
          }}
          aria-hidden
        />
      )}
    </motion.button>
  )
}
