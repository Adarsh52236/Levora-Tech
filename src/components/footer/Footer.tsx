'use client'

import { useState } from 'react'

import { ArrowUp, Globe, Mail, Share2 } from 'lucide-react'
import { Logo } from '@/components/ui/logo'
import { COMPANY_INFO } from '@/lib/constants/company'
import { NAV_ITEMS } from '@/lib/constants/navigation'

const social = [
  { icon: Share2, label: 'Social', href: '#' },
  { icon: Globe, label: 'Website', href: '#' },
  { icon: Mail, label: 'Email', href: `mailto:${COMPANY_INFO.email}` },
]

export function Footer() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const go = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setStatus('loading')
    setMessage('')

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/v1/newsletter/subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      if (res.ok) {
        setStatus('success')
        setMessage('Thanks for subscribing!')
        setEmail('')
      } else {
        const data = await res.json()
        setStatus('error')
        setMessage(data.detail || 'Failed to subscribe')
      }
    } catch (error) {
      setStatus('error')
      setMessage('Something went wrong. Please try again.')
    }
  }

  return (
    <footer className="relative border-t border-border bg-section-cool px-4 py-16">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="max-w-sm">
          <div className="flex items-center text-4xl">
            <Logo />
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            {COMPANY_INFO.description}
          </p>
          <div className="mt-5 flex gap-3">
            {social.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-brand-cyan/40 hover:text-foreground"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Navigate
          </p>
          <nav className="mt-4 flex flex-col gap-2">
            {NAV_ITEMS.map((l) => {
              const id = l.href.replace('#', '')
              return (
                <button
                  key={l.href}
                  onClick={() => go(id)}
                  className="text-left text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {l.label}
                </button>
              )
            })}
          </nav>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Stay in touch
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            Get insights on product engineering and digital craft.
          </p>
          <form onSubmit={handleSubscribe} className="mt-4 flex flex-col gap-2">
            <div className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="flex-1 rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-blue/30 disabled:opacity-50"
                aria-label="Email for newsletter"
                disabled={status === 'loading'}
                required
              />
              <button 
                type="submit" 
                disabled={status === 'loading'}
                className="rounded-xl bg-brand-blue px-4 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
              >
                {status === 'loading' ? 'Joining...' : 'Join'}
              </button>
            </div>
            {message && (
              <p className={`text-xs ${status === 'success' ? 'text-green-500' : 'text-red-500'}`}>
                {message}
              </p>
            )}
          </form>
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-6xl items-center justify-between border-t border-border pt-6">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} {COMPANY_INFO.name}. All rights reserved.
        </p>
        <button
          onClick={scrollTop}
          aria-label="Back to top"
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-brand-cyan/50 hover:text-foreground"
        >
          <ArrowUp className="h-4 w-4" />
        </button>
      </div>
    </footer>
  )
}
