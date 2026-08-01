'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, Loader2, Mail, Send } from 'lucide-react'
import { SectionHeading } from '@/components/ui/section-heading'

const serviceOptions = [
  'Website Development',
  'Web Application',
  'Mobile Application',
  'iOS Application',
  'UI/UX Design',
  'Custom Software',
  'Not Sure Yet',
]

type Fields = { name: string; email: string; service: string; message: string }
type Errors = Partial<Record<keyof Fields, boolean>>

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function Contact() {
  const [fields, setFields] = useState<Fields>({
    name: '',
    email: '',
    service: '',
    message: '',
  })
  const [touched, setTouched] = useState<Errors>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')

  const validate = (f: Fields): Errors => ({
    name: f.name.trim().length < 2,
    email: !emailRe.test(f.email),
    service: f.service === '',
    message: f.message.trim().length < 10,
  })

  const errors = validate(fields)
  const isValid = !Object.values(errors).some(Boolean)

  const fieldClass = (key: keyof Fields) => {
    const show = touched[key]
    if (show && errors[key]) return 'border-destructive/70 focus:ring-destructive/40'
    if (show && !errors[key]) return 'border-brand-cyan/60 focus:ring-brand-cyan/40'
    return 'border-border focus:ring-brand-blue/40'
  }

  const update = (key: keyof Fields, value: string) =>
    setFields((f) => ({ ...f, [key]: value }))

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setTouched({ name: true, email: true, service: true, message: true })
    if (!isValid) return
    setStatus('sending')
    setTimeout(() => setStatus('sent'), 1600)
  }

  return (
    <section id="contact" className="relative px-4 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-start gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Contact"
              title="Let's build something exceptional."
              description="Tell us what you are planning. We'll help shape the right digital solution."
            />
            <div className="mt-8 space-y-4">
              <a
                href="mailto:hello@ezyit.com"
                className="inline-flex items-center gap-3 rounded-xl border border-border bg-background px-4 py-3 text-sm transition-colors hover:border-brand-cyan/40"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-blue/10 text-brand-cyan">
                  <Mail className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-xs text-muted-foreground">Email us directly</p>
                  <p className="font-medium">hello@ezyit.com</p>
                </div>
              </a>
              <p className="text-sm leading-relaxed text-muted-foreground">
                We typically respond within one business day. Share as much context
                as you can — goals, timeline, and budget range help us prepare
                thoughtfully.
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-background p-6 sm:p-8">
            <AnimatePresence mode="wait">
              {status === 'sent' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center py-10 text-center"
                >
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-blue/15 text-brand-cyan">
                    <Check className="h-7 w-7" />
                  </span>
                  <h3 className="mt-5 text-xl font-semibold">Message received</h3>
                  <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
                    Your message has been received. EzyIT will get back to you
                    shortly.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={onSubmit}
                  noValidate
                  className="grid gap-5"
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="mb-2 block text-sm font-medium">
                        Name
                      </label>
                      <input
                        id="name"
                        value={fields.name}
                        onChange={(e) => update('name', e.target.value)}
                        onBlur={() => setTouched((t) => ({ ...t, name: true }))}
                        className={`w-full rounded-xl border bg-secondary/40 px-4 py-3 text-sm outline-none transition-all focus:ring-2 ${fieldClass('name')}`}
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="mb-2 block text-sm font-medium">
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={fields.email}
                        onChange={(e) => update('email', e.target.value)}
                        onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                        className={`w-full rounded-xl border bg-secondary/40 px-4 py-3 text-sm outline-none transition-all focus:ring-2 ${fieldClass('email')}`}
                        placeholder="you@company.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="service" className="mb-2 block text-sm font-medium">
                      Service Interested In
                    </label>
                    <select
                      id="service"
                      value={fields.service}
                      onChange={(e) => update('service', e.target.value)}
                      onBlur={() => setTouched((t) => ({ ...t, service: true }))}
                      className={`w-full rounded-xl border bg-secondary/40 px-4 py-3 text-sm outline-none transition-all focus:ring-2 ${fieldClass('service')}`}
                    >
                      <option value="" disabled>
                        Select a service
                      </option>
                      {serviceOptions.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="mb-2 block text-sm font-medium">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      value={fields.message}
                      onChange={(e) => update('message', e.target.value)}
                      onBlur={() => setTouched((t) => ({ ...t, message: true }))}
                      className={`w-full resize-none rounded-xl border bg-secondary/40 px-4 py-3 text-sm outline-none transition-all focus:ring-2 ${fieldClass('message')}`}
                      placeholder="Tell us about your project"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="group inline-flex items-center justify-center gap-2 rounded-xl bg-brand-blue px-6 py-3 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:shadow-[0_0_28px_-2px_rgba(0,56,118,0.45)] hover:brightness-110 disabled:opacity-70"
                  >
                    {status === 'sending' ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Sending…
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
