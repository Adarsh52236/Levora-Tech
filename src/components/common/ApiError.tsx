'use client'

import { AlertCircle, RefreshCw, ServerCrash, WifiOff } from 'lucide-react'
import { ApiClientError } from '@/types/api'
import { motion } from 'framer-motion'

interface ApiErrorProps {
  error: Error | ApiClientError | null
  onRetry?: () => void
  message?: string
}

export function ApiError({ error, onRetry, message }: ApiErrorProps) {
  if (!error) return null

  let Icon = AlertCircle
  let title = 'Unexpected Error'
  let description = message || 'An unexpected error occurred. Please try again.'

  if (error instanceof ApiClientError) {
    if (error.status === 0 || error.message.toLowerCase().includes('network')) {
      Icon = WifiOff
      title = 'Network Error'
      description = 'Could not connect to the server. Please check your internet connection.'
    } else if (error.status >= 500) {
      Icon = ServerCrash
      title = 'Backend Offline'
      description = "The server is currently experiencing issues. We're working on it."
    } else {
      title = 'Request Failed'
      description = error.message
    }
  } else if (error.message.toLowerCase().includes('fetch') || error.message.toLowerCase().includes('network')) {
    Icon = WifiOff
    title = 'Network Error'
    description = 'Could not connect to the server. Please check your internet connection.'
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex w-full flex-col items-center justify-center rounded-2xl border border-destructive/20 bg-destructive/5 p-8 text-center"
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="mb-2 text-lg font-semibold text-foreground">{title}</h3>
      <p className="mb-6 max-w-sm text-sm text-muted-foreground">{description}</p>
      
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-background px-4 py-2 text-sm font-medium text-foreground shadow-sm ring-1 ring-inset ring-border transition-all hover:bg-secondary"
        >
          <RefreshCw className="h-4 w-4" />
          Try Again
        </button>
      )}
    </motion.div>
  )
}
