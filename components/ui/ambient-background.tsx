'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from '@/lib/motion'

export function AmbientBackground() {
  const reduced = useReducedMotion()

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-background">
      {!reduced && (
        <div className="absolute inset-0 opacity-60 mix-blend-multiply">
          <motion.div
            animate={{
              x: ['0%', '5%', '-5%', '0%'],
              y: ['0%', '5%', '-2%', '0%'],
              scale: [1, 1.1, 0.95, 1],
            }}
            transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-[10%] -left-[10%] h-[60vw] w-[60vw] rounded-full bg-brand-cyan/20 blur-[80px] md:blur-[120px]"
          />
          <motion.div
            animate={{
              x: ['0%', '-5%', '5%', '0%'],
              y: ['0%', '-5%', '5%', '0%'],
              scale: [1, 1.05, 1.1, 1],
            }}
            transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-[10%] -right-[10%] h-[50vw] w-[50vw] rounded-full bg-brand-blue/20 blur-[80px] md:blur-[120px]"
          />
          <motion.div
            animate={{
              x: ['0%', '10%', '-5%', '0%'],
              y: ['0%', '-10%', '5%', '0%'],
              scale: [1, 1.15, 0.9, 1],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -bottom-[20%] left-[20%] h-[70vw] w-[70vw] rounded-full bg-brand-amber/15 blur-[90px] md:blur-[140px]"
          />
        </div>
      )}

      <div
        className="absolute inset-0 opacity-[0.6]"
        style={{
          backgroundImage:
            'radial-gradient(rgba(0, 56, 118, 0.12) 1.5px, transparent 1.5px)',
          backgroundSize: '28px 28px',
        }}
      />

      <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-white/60 to-transparent" />
    </div>
  )
}
