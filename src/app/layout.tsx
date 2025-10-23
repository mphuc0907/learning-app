import './globals.css'
import type { Metadata } from 'next'
import { AuthProvider } from '@/contexts/AuthContext'
import Header from '@/components/Header'

export const metadata: Metadata = {
  title: 'Learning App',
  description: 'Mini learning platform',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body className="min-h-dvh antialiased">
        <AuthProvider>
          <Header />
          <main className="py-6">{children}</main>
        </AuthProvider>
      </body>
    </html>
  )
}
