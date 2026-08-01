export interface ContactSubmission {
  name: string
  email: string
  service: string
  message: string
}

export type ContactFormFields = ContactSubmission

export type ContactFormErrors = Partial<Record<keyof ContactFormFields, boolean>>

export type ServerValidationErrors = Record<string, string[]>
