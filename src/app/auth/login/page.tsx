import { Suspense } from 'react'
import LoginClient from './LoginClient'

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="container mx-auto p-6">Đang tải…</div>}>
      <LoginClient />
    </Suspense>
  )
}
