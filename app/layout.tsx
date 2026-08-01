import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Manrope, Syne } from 'next/font/google'
import { AmbientBackground } from '@/components/ui/ambient-background'
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
  title: 'Levora Tech — Engineering Digital Excellence',
  description:
    'Levora Tech is a technology studio building high-performance websites, web and mobile applications, and digital platforms for brands that value quality, scalability, and refined execution.',
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
    icon: '/images/brand/ezyit-mark.svg',
    apple: '/images/brand/ezyit-mark.svg',
  },
  openGraph: {
    title: 'Levora Tech — Engineering Digital Excellence',
    description:
      'Web. Mobile. Platforms. Built with precision by Levora Tech.',
    type: 'website',
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
        <AmbientBackground />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
