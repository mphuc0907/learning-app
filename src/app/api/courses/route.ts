export const runtime = 'nodejs'
import { NextRequest, NextResponse } from 'next/server'
import { loadCoursesFromFile } from './_file'
import type { Course } from '@/types'

export async function GET(req: NextRequest) {
  const COURSES = await loadCoursesFromFile()

  const { searchParams } = new URL(req.url)
  const page  = Number(searchParams.get('page') ?? 1)
  const id = searchParams.get('id')
  
  const limit = Number(searchParams.get('limit') ?? 9)
  const q     = (searchParams.get('q') ?? '').toLowerCase().trim()
  const levelParam = (searchParams.get('level') ?? '').trim() as '' | Course['level']

  let data = COURSES
  if (q) data = data.filter(c => c.title.toLowerCase().includes(q))
  if (levelParam && ['S','Pres','TC','MTC'].includes(levelParam)) {
    data = data.filter(c => c.level === levelParam)
  }

  const total = data.length
  const totalPages = Math.max(1, Math.ceil(total / Math.max(1, limit)))
  const current = Math.min(Math.max(page, 1), totalPages)
  const start = (current - 1) * limit
  const items = data.slice(start, start + limit)
  return NextResponse.json({ items, page: current, limit, total, totalPages })
}
