import { NextRequest, NextResponse } from 'next/server'

export const config = {
  matcher: [
    '/courses/:path*',  
    '/auth/login', 
  ],
}

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value
  const url = req.nextUrl.clone()

  if (!token && url.pathname.startsWith('/courses')) {
    url.pathname = '/auth/login'
    return NextResponse.redirect(url)
  }

  if (token && url.pathname.startsWith('/auth/login')) {
    url.pathname = '/courses'
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}
