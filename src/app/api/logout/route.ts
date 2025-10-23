import { NextResponse } from 'next/server'
import { TOKEN_COOKIE, USER_COOKIE } from '@/lib/auth'

export async function POST() {
  const res = NextResponse.json({ ok: true })
  res.cookies.set(TOKEN_COOKIE, '', { path: '/', maxAge: 0 })
  res.cookies.set(USER_COOKIE,  '', { path: '/', maxAge: 0 })
  return res
}
