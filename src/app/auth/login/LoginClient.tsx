'use client'

import { useAuth } from '@/hooks/useAuth'
import Container from '@/components/Container'
import { FormEvent, useMemo, useState } from 'react'
import { isValidEmail } from '@/lib/auth'
import { useSearchParams } from 'next/navigation'
import { Tab, Tabs, Input } from '@mui/material'
import { LoadingButton } from '@mui/lab'

export default function LoginClient() {
  const { login } = useAuth()
  const searchParams = useSearchParams()
  const next = searchParams.get('next') || '/courses'

  const [mode, setMode] = useState<'dummyjson' | 'email'>('dummyjson')

  const [username, setUsername] = useState('emilys')
  const [password, setPassword] = useState('emilyspass')

  const [email, setEmail] = useState('')
  const [emailPass, setEmailPass] = useState('')

  const [errors, setErrors] = useState<{ email?: string; password?: string; username?: string }>({})
  const [submitting, setSubmitting] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)

  const isDummyValid = useMemo(
    () => username.trim().length > 0 && password.trim().length >= 6,
    [username, password]
  )

  const isEmailValid = useMemo(() => {
    const e: typeof errors = {}
    if (!email) e.email = 'Vui lòng nhập email'
    else if (!isValidEmail(email)) e.email = 'Email không hợp lệ'
    if (!emailPass) e.password = 'Vui lòng nhập mật khẩu'
    else if (emailPass.length < 6) e.password = 'Mật khẩu tối thiểu 6 ký tự'
    setErrors(e)
    return Object.keys(e).length === 0
  }, [email, emailPass])

  const isFormValid = mode === 'dummyjson' ? isDummyValid : isEmailValid

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setServerError(null)
    if (!isFormValid) return

    try {
      setSubmitting(true)
      if (mode === 'dummyjson') {
        await login(username, password)
      } else {
        await login(email, emailPass)
      }
      if (next && next !== '/courses') window.location.href = next
      else window.location.href = '/courses'
    } catch (err: any) {
      setServerError(err?.message || 'Đăng nhập thất bại')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Container>
      <div className="mx-auto max-w-md">
        <div className="card p-6 mt-6">
          <h1 className="text-2xl font-semibold">Đăng nhập</h1>

          <Tabs value={mode} onChange={(_, v) => setMode(v)} sx={{ mb: 2 }}>
            <Tab value="dummyjson" label="DummyJSON" sx={{ textTransform: 'none' }} />
            <Tab value="email" label="Email" sx={{ textTransform: 'none' }} />
          </Tabs>

          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            {mode === 'dummyjson' ? (
              <>
                <div>
                  <label className="block text-sm mb-1">Username</label>
                  <Input
                    className="input w-full"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    placeholder="VD: emilys"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">Password</label>
                  <Input
                    className="input w-full"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Tối thiểu 6 ký tự"
                  />
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="block text-sm mb-1">Email</label>
                  <Input
                    className="input w-full"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="you@example.com"
                  />
                  {email && errors.email && (
                    <p className="text-sm text-red-600 mt-1">{errors.email}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm mb-1">Password</label>
                  <Input
                    className="input w-full"
                    type="password"
                    value={emailPass}
                    onChange={e => setEmailPass(e.target.value)}
                    placeholder="Tối thiểu 6 ký tự"
                  />
                  {emailPass && errors.password && (
                    <p className="text-sm text-red-600 mt-1">{errors.password}</p>
                  )}
                </div>
              </>
            )}

            {serverError && <div className="text-sm text-red-600">{serverError}</div>}

            <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              loading={submitting}
              sx={{ mt: 2, borderRadius: 2, textTransform: 'none', fontWeight: 600, height: 44 }}
            >
              Đăng nhập
            </LoadingButton>
          </form>
        </div>
      </div>
    </Container>
  )
}
