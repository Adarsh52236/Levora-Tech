'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { Logo } from '@/components/ui/logo'

const links = [
  { id: 'home', label: 'Home' },
  { id: 'services', label: 'Services' },
  { id: 'process', label: 'Process' },
  { id: 'work', label: 'Work' },
  { id: 'testimonials', label: 'Testimonials' },
  { id: 'contact', label: 'Contact' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [lastY, setLastY] = useState(0)
  const [active, setActive] = useState('home')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 24)
      setHidden(y > 120 && y > lastY)
      setLastY(y)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [lastY])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    )
    links.forEach((l) => {
      const el = document.getElementById(l.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const go = (id: string) => {
    setOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[150] flex justify-center px-4 pt-4 transition-transform duration-500 ${
        hidden ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      <motion.nav
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`flex w-full max-w-6xl items-center justify-between rounded-2xl px-4 py-3 transition-all duration-500 sm:px-6 ${
          scrolled
            ? 'border border-border bg-background/70 backdrop-blur-xl shadow-[0_8px_40px_-12px_rgba(0,0,0,0.15)] mobile-no-blur'
            : 'border border-transparent bg-transparent'
        }`}
      >
        <button
          onClick={() => go('home')}
          className="flex items-center text-4xl"
          aria-label="EzyIT home"
        >
          <motion.div layoutId="ezyit-logo">
            <Logo />
          </motion.div>
        </button>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              className="group relative px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <span className={active === l.id ? 'text-foreground' : ''}>
                {l.label}
              </span>
              {active === l.id && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute inset-x-3 -bottom-0.5 h-px brand-divider"
                />
              )}
              {active !== l.id && (
                <span className="absolute inset-x-3 -bottom-0.5 h-px origin-left scale-x-0 brand-divider transition-transform duration-300 group-hover:scale-x-100" />
              )}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => go('contact')}
            className="hidden rounded-xl bg-brand-blue px-4 py-2 text-sm font-semibold text-primary-foreground shadow-[0_0_0_0_rgba(59,130,246,0)] transition-all duration-300 hover:shadow-[0_0_28px_-2px_rgba(0,56,118,0.45)] hover:brightness-110 md:inline-flex"
          >
            Start a Project
          </button>
          <button
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border text-foreground md:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 top-0 z-[140] md:hidden"
          >
            <div
              className="absolute inset-0 bg-background/60 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 34 }}
              className="absolute right-0 top-0 flex h-full w-[78%] max-w-xs flex-col gap-1 border-l border-border bg-secondary p-6 pt-24"
            >
              {links.map((l, i) => (
                <motion.button
                  key={l.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 * i }}
                  onClick={() => go(l.id)}
                  className={`rounded-lg px-3 py-3 text-left text-lg font-medium transition-colors ${
                    active === l.id
                      ? 'text-brand-cyan'
                      : 'text-foreground/80 hover:text-foreground'
                  }`}
                >
                  {l.label}
                </motion.button>
              ))}
              <button
                onClick={() => go('contact')}
                className="mt-4 rounded-xl bg-brand-blue px-4 py-3 text-center text-sm font-semibold text-primary-foreground"
              >
                Start a Project
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
