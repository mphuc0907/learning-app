import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { TOKEN_COOKIE, USER_COOKIE } from '@/lib/auth'

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json()
    const res = await fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, expiresInMins: 120 }),
      cache: 'no-store'
    })

    if (!res.ok) {
      const msg = await res.json().catch(() => ({}))
      return NextResponse.json({ message: msg?.message || 'Invalid credentials' }, { status: 401 })
    }

    const data = await res.json()

    // Tạo user rút gọn
    const user = {
      id: data.id,
      username: data.username,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      image: data.image
    }

    const response = NextResponse.json({ user }, { status: 200 })

    // Set cookie HttpOnly cho token
    response.cookies.set({
      name: TOKEN_COOKIE,
      value: data.accessToken,
      httpOnly: true,
      sameSite: 'lax',
      secure: true,
      path: '/',
      maxAge: 60 * 60 * 2, // 2h
    })

    // Set cookie readable cho client (không chứa token)
    response.cookies.set({
      name: USER_COOKIE,
      value: JSON.stringify(user),
      httpOnly: false,
      sameSite: 'lax',
      secure: true,
      path: '/',
      maxAge: 60 * 60 * 2,
    })

    return response
  } catch (e) {
    return NextResponse.json({ message: 'Unexpected error' }, { status: 500 })
  }
}
