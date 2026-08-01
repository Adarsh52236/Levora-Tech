'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Logo } from '@/components/ui/logo'

export function Loader() {
  const [done, setDone] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setDone(true), 1900)
    return () => clearTimeout(t)
  }, [])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[300] flex flex-col items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          <motion.div
            layoutId="ezyit-logo"
            initial={{ opacity: 0, y: 10, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <Logo className="text-4xl sm:text-5xl" />
          </motion.div>

          <motion.div
            className="relative mt-8 h-px w-44 overflow-hidden rounded-full bg-border"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <motion.span
              className="absolute inset-y-0 left-0 w-1/2 brand-divider"
              initial={{ x: '-100%' }}
              animate={{ x: '200%' }}
              transition={{
                duration: 1.1,
                ease: 'easeInOut',
                repeat: Infinity,
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
