export const runtime = 'nodejs'
import { NextRequest, NextResponse } from 'next/server'
import { loadCoursesFromFile } from '../_file'

export async function GET(_req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params  
  const COURSES = await loadCoursesFromFile()
  const course = COURSES.find(c => c.id === id)

  if (!course) {
    return NextResponse.json({ message: 'Not found' }, { status: 404 })
  }

  return NextResponse.json(course)
}
