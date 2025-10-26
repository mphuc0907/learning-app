import './globals.css'
import type { Metadata } from 'next'
import { AuthProvider } from '@/contexts/AuthContext'
import Header from '@/components/Header'
import { ProgressProvider } from '@/contexts/ProgressContext'

export const metadata: Metadata = {
  title: { default: 'Learning App', template: '%s | Learning App' },
  description: 'Mini learning platform',
  openGraph: { title: 'Learning App', description: 'Learn efficiently', type: 'website', siteName: 'Learning App' },
  icons: { icon: '/favicon.ico' }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body className="min-h-dvh antialiased">
        <AuthProvider>
          <ProgressProvider>
            <Header />
            <main className="py-6 max-md:py-4 max-sm:py-2">{children}</main>
          </ProgressProvider>
        </AuthProvider>
      </body>
    </html >
  )
}
