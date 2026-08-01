'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { submitContact } from '@/lib/api/contact'
import { ApiClientError } from '@/types/api'
import { ContactFormFields, ContactFormErrors, ServerValidationErrors } from '@/types/contact'

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function useContactForm() {
  const [fields, setFields] = useState<ContactFormFields>({
    name: '',
    email: '',
    service: '',
    message: '',
  })
  const [touched, setTouched] = useState<ContactFormErrors>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')
  const [serverErrors, setServerErrors] = useState<ServerValidationErrors>({})

  const validate = (f: ContactFormFields): ContactFormErrors => ({
    name: f.name.trim().length < 2,
    email: !emailRe.test(f.email),
    service: f.service === '',
    message: f.message.trim().length < 10,
  })

  const errors = validate(fields)
  const isValid = !Object.values(errors).some(Boolean)

  const fieldClass = (key: keyof ContactFormFields) => {
    const show = touched[key]
    if (show && errors[key]) return 'border-destructive/70 focus:ring-destructive/40'
    if (show && !errors[key]) return 'border-brand-cyan/60 focus:ring-brand-cyan/40'
    return 'border-border focus:ring-brand-blue/40'
  }

  const update = (key: keyof ContactFormFields, value: string) =>
    setFields((f) => ({ ...f, [key]: value }))

  const touch = (key: keyof ContactFormFields) =>
    setTouched((t) => ({ ...t, [key]: true }))

  const resetForm = () => {
    setFields({ name: '', email: '', service: '', message: '' })
    setTouched({})
    setServerErrors({})
    setStatus('idle')
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (status === 'sending') return
    setTouched({ name: true, email: true, service: true, message: true })
    setServerErrors({})
    if (!isValid) return

    setStatus('sending')
    try {
      await submitContact(fields)
      toast.success('Message sent successfully!')
      setStatus('sent')
      setFields({ name: '', email: '', service: '', message: '' })
      setTouched({})
    } catch (err: any) {
      if (err instanceof ApiClientError && err.errors) {
        setServerErrors(err.errors)
        toast.error('Please check the form for errors.')
      } else {
        toast.error(err.message || 'Failed to send message. Please try again.')
      }
      setStatus('idle')
    }
  }

  return {
    fields,
    touched,
    status,
    serverErrors,
    isValid,
    fieldClass,
    update,
    touch,
    resetForm,
    onSubmit,
  }
}
