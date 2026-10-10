import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Northline — one operating picture for every store',
  description:
    'Portfolio landing page for Northline, a sample retail-operations product. Includes pricing, FAQ, and a demo request that stays in the browser.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  )
}
