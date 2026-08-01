import { COMPANY_INFO } from './company'

export const SITE_METADATA = {
  title: `${COMPANY_INFO.name} — Web & Mobile Engineering Platform`,
  description: COMPANY_INFO.description,
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://levora.tech',
  ogImage: '/og-image.png',
  twitterHandle: '@levoratech',
}
