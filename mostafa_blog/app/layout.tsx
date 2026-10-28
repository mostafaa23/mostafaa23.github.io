import type { Metadata, Viewport } from 'next'
import { basePath } from '@/lib/base-path'
import './globals.css'

export const metadata: Metadata = {
  title: 'mostafa.log — Cybersecurity Research Notebook',
  description: 'Technical notes on web application security, vulnerability research, API security, and authorized testing.',
  generator: 'v0.app',
  icons: {
    icon: [
      { url: `${basePath}/icon-light-32x32.png`, media: '(prefers-color-scheme: light)' },
      { url: `${basePath}/icon-dark-32x32.png`, media: '(prefers-color-scheme: dark)' },
      { url: `${basePath}/icon.svg`, type: 'image/svg+xml' },
    ],
    apple: `${basePath}/apple-icon.png`,
  },
}

export const viewport: Viewport = { themeColor: '#0a0d0c', userScalable: true }

// Applies the saved theme before the first paint so the page never flashes the wrong colors.
const themeScript = "try{if(localStorage.getItem('theme')==='light')document.documentElement.classList.add('light')}catch(e){}"

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head><body className="antialiased">{children}</body></html>
}
