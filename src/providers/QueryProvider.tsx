'use client'

import { SWRConfig } from 'swr'
import { ReactNode } from 'react'

export function QueryProvider({ children }: { children: ReactNode }) {
  return (
    <SWRConfig
      value={{
        revalidateOnFocus: false,
        shouldRetryOnError: false,
      }}
    >
      {children}
    </SWRConfig>
  )
}
