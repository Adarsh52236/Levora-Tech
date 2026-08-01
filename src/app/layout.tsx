import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Manrope, Syne } from 'next/font/google'
import { AmbientBackground } from '@/components/ui/ambient-background'
import { Toaster } from 'sonner'
import { AppProviders } from '@/providers/AppProviders'
import { SITE_METADATA } from '@/lib/constants/site'
import './globals.css'

const manrope = Manrope({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
})

const syne = Syne({
  variable: '--font-display-family',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: SITE_METADATA.title,
  description: SITE_METADATA.description,
  keywords: [
    'Levora Tech',
    'web development',
    'web applications',
    'mobile applications',
    'iOS development',
    'UI/UX engineering',
    'custom software',
    'technology studio',
  ],
  icons: {
    icon: '/images/brand/levora-mark.svg',
    apple: '/images/brand/levora-mark.svg',
  },
  openGraph: {
    title: SITE_METADATA.title,
    description: 'Web. Mobile. Platforms. Built with precision by Levora Tech.',
    type: 'website',
    url: SITE_METADATA.siteUrl,
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#fdfdfd',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${syne.variable} bg-background`}>
      <body className="font-sans antialiased bg-transparent text-foreground relative">
        <AppProviders>
          <AmbientBackground />
          {children}
          <Toaster richColors position="bottom-right" />
          {process.env.NODE_ENV === 'production' && <Analytics />}
        </AppProviders>
      </body>
    </html>
  )
}
