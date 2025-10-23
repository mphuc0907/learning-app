'use client'
import { createContext, useEffect, useMemo, useState } from 'react'
import type { SessionUser } from '@/types/auth'

type AuthCtx = {
  user: SessionUser | null
  loading: boolean
  login: (username: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

export const AuthContext = createContext<AuthCtx>({
  user: null,
  loading: true,
  login: async () => {},
  logout: async () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<SessionUser | null>(null)
  const [loading, setLoading] = useState(true)

  // Đồng bộ user từ cookie readable `user`
  useEffect(() => {
    try {
      const raw = (typeof document !== 'undefined')
        ? document.cookie.split('; ').find(v => v.startsWith('user='))?.split('=')[1]
        : undefined
      if (raw) {
        const decoded = decodeURIComponent(raw)
        setUser(JSON.parse(decoded))
      } else {
        setUser(null)
      }
    } catch { /* ignore */ }
    setLoading(false)
  }, [])

  const login = async (username: string, password: string) => {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })
    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      throw new Error(data?.message || 'Đăng nhập thất bại')
    }
    // cookie đã được set ở server, reload để đồng bộ
    window.location.href = '/courses'
  }

  const logout = async () => {
    await fetch('/api/logout', { method: 'POST' })
    window.location.href = '/auth/login'
  }

  const value = useMemo(() => ({ user, loading, login, logout }), [user, loading])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
