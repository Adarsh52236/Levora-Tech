'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Check, Loader2, Send } from 'lucide-react'
import { useContactForm } from '@/hooks/useContactForm'

const serviceOptions = [
  'Website Development',
  'Web Application',
  'Mobile Application',
  'iOS Application',
  'UI/UX Design',
  'Custom Software',
  'Not Sure Yet',
]

export function ContactForm() {
  const {
    fields,
    touched,
    status,
    serverErrors,
    fieldClass,
    update,
    touch,
    resetForm,
    onSubmit,
  } = useContactForm()

  return (
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
              Your message has been received. Levora Tech will get back to you
              shortly.
            </p>
            <button
              onClick={resetForm}
              className="mt-8 text-sm font-medium text-brand-blue hover:underline"
            >
              Send another message
            </button>
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
                  disabled={status === 'sending'}
                  value={fields.name}
                  onChange={(e) => update('name', e.target.value)}
                  onBlur={() => touch('name')}
                  className={`w-full rounded-xl border bg-secondary/40 px-4 py-3 text-sm outline-none transition-all focus:ring-2 disabled:opacity-50 ${fieldClass('name')}`}
                  placeholder="Your name"
                />
                {serverErrors.name && (
                  <p className="mt-1.5 text-xs text-destructive">{serverErrors.name[0]}</p>
                )}
              </div>
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  disabled={status === 'sending'}
                  value={fields.email}
                  onChange={(e) => update('email', e.target.value)}
                  onBlur={() => touch('email')}
                  className={`w-full rounded-xl border bg-secondary/40 px-4 py-3 text-sm outline-none transition-all focus:ring-2 disabled:opacity-50 ${fieldClass('email')}`}
                  placeholder="you@company.com"
                />
                {serverErrors.email && (
                  <p className="mt-1.5 text-xs text-destructive">{serverErrors.email[0]}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="service" className="mb-2 block text-sm font-medium">
                Service Interested In
              </label>
              <select
                id="service"
                disabled={status === 'sending'}
                value={fields.service}
                onChange={(e) => update('service', e.target.value)}
                onBlur={() => touch('service')}
                className={`w-full rounded-xl border bg-secondary/40 px-4 py-3 text-sm outline-none transition-all focus:ring-2 disabled:opacity-50 ${fieldClass('service')}`}
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
              {serverErrors.service && (
                <p className="mt-1.5 text-xs text-destructive">{serverErrors.service[0]}</p>
              )}
            </div>

            <div>
              <label htmlFor="message" className="mb-2 block text-sm font-medium">
                Message
              </label>
              <textarea
                id="message"
                rows={4}
                disabled={status === 'sending'}
                value={fields.message}
                onChange={(e) => update('message', e.target.value)}
                onBlur={() => touch('message')}
                className={`w-full resize-none rounded-xl border bg-secondary/40 px-4 py-3 text-sm outline-none transition-all focus:ring-2 disabled:opacity-50 ${fieldClass('message')}`}
                placeholder="Tell us about your project"
              />
              {serverErrors.message && (
                <p className="mt-1.5 text-xs text-destructive">{serverErrors.message[0]}</p>
              )}
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
  )
}
