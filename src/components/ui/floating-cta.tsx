'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useReducedMotion } from '@/lib/motion'

export function FloatingCTA() {
  const [visible, setVisible] = useState(false)
  const reduced = useReducedMotion()

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.85)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToContact = () =>
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={reduced ? { opacity: 1 } : { opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={reduced ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.9 }}
          onClick={scrollToContact}
          className="fixed bottom-6 right-6 z-[140] inline-flex items-center gap-2 rounded-full border border-border bg-background/90 px-5 py-3 text-sm font-semibold text-foreground shadow-[0_8px_32px_-8px_rgba(0,0,0,0.25)] backdrop-blur-xl transition-colors hover:border-brand-cyan/50 md:hidden"
          aria-label="Start a project"
        >
          Start a Project
          <ArrowRight className="h-4 w-4" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
