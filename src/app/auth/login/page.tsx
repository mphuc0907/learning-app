'use client'
import { useAuth } from '@/hooks/useAuth'
import Container from '@/components/Container'
import { FormEvent, useMemo, useState } from 'react'
import { isValidEmail } from '@/lib/auth'
import { useSearchParams } from 'next/navigation'

export default function LoginPage() {
  const { login } = useAuth()
  const searchParams = useSearchParams()
  const next = searchParams.get('next') || '/courses'

  const [mode, setMode] = useState<'dummyjson' | 'email'>('dummyjson')

  // DummyJSON fields
  const [username, setUsername] = useState('emilys')
  const [password, setPassword] = useState('emilyspass')

  // Email mode fields (optional)
  const [email, setEmail] = useState('')
  const [emailPass, setEmailPass] = useState('')

  const [errors, setErrors] = useState<{ email?: string; password?: string; username?: string }>({})
  const [submitting, setSubmitting] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)

  const isDummyValid = useMemo(() => {
    const ok = username.trim().length > 0 && password.trim().length >= 6
    return ok
  }, [username, password])

  const isEmailValid = useMemo(() => {
    const e: typeof errors = {}
    if (!email) e.email = 'Vui lòng nhập email'
    else if (!isValidEmail(email)) e.email = 'Email không hợp lệ'
    if (!emailPass) e.password = 'Vui lòng nhập mật khẩu'
    else if (emailPass.length < 6) e.password = 'Mật khẩu tối thiểu 6 ký tự'
    setErrors(e)
    return Object.keys(e).length === 0
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        // Với email mode, ta map email -> username (demo)
        await login(email, emailPass)
      }
      // login() sẽ redirect /courses, nếu muốn giữ ?next thì có thể:
      if (next && next !== '/courses') window.location.href = next
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
          <p className="text-sm text-gray-500 mt-1">Day 1 – Auth with DummyJSON</p>

          <div className="mt-4 grid grid-cols-2 gap-2">
            <button
              className={`btn ${mode==='dummyjson' ? 'btn-primary' : 'border border-gray-200'}`}
              onClick={() => setMode('dummyjson')}
              type="button"
            >DummyJSON</button>
            <button
              className={`btn ${mode==='email' ? 'btn-primary' : 'border border-gray-200'}`}
              onClick={() => setMode('email')}
              type="button"
            >Email</button>
          </div>

          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            {mode === 'dummyjson' ? (
              <>
                <div>
                  <label className="block text-sm mb-1">Username</label>
                  <input
                    className="input"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    placeholder="VD: emilys"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">Password</label>
                  <input
                    className="input"
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
                  <input
                    className="input"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="you@example.com"
                  />
                  {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label className="block text-sm mb-1">Password</label>
                  <input
                    className="input"
                    type="password"
                    value={emailPass}
                    onChange={e => setEmailPass(e.target.value)}
                    placeholder="Tối thiểu 6 ký tự"
                  />
                  {errors.password && <p className="text-sm text-red-600 mt-1">{errors.password}</p>}
                </div>
              </>
            )}

            {serverError && <div className="text-sm text-red-600">{serverError}</div>}

            <button
              className="btn btn-primary w-full"
              disabled={!isFormValid || submitting}
            >
              {submitting ? 'Đang đăng nhập...' : 'Đăng nhập'}
            </button>
          </form>

          <div className="mt-4 text-xs text-gray-500">
            <p><b>Test nhanh DummyJSON:</b> username <code>emilys</code> / password <code>emilyspass</code></p>
          </div>
        </div>
      </div>
    </Container>
  )
}
