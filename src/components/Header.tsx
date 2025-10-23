'use client'
import Link from 'next/link'
import Container from './Container'
import { useAuth } from '@/hooks/useAuth'
import { usePathname, useRouter } from 'next/navigation'

export default function Header() {
  const { user, logout, loading } = useAuth()
  const pathname = usePathname()
  const router = useRouter()

  const isAuthPage = pathname?.startsWith('/auth/')

  return (
    <header className="sticky top-0 z-50 bg-white/70 backdrop-blur border-b border-gray-100">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <Link href={user ? '/courses' : '/auth/login'} className="font-semibold tracking-tight">
            Learning<span className="text-blue-600">App</span>
          </Link>

          <nav className="flex items-center gap-2">
            {!loading && user && (
              <>
                <button onClick={() => router.push('/courses')} className="btn">Courses</button>
                <button onClick={logout} className="btn btn-primary">Logout</button>
              </>
            )}
            {!loading && !user && !isAuthPage && (
              <Link href="/auth/login" className="btn btn-primary">Login</Link>
            )}
          </nav>
        </div>
      </Container>
    </header>
  )
}
