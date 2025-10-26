import { promises as fs } from 'fs'
import path from 'path'
import type { Course } from '@/types'

let CACHE: Course[] | null = null

export async function loadCoursesFromFile(): Promise<Course[]> {
  if (CACHE) return CACHE
  const file = path.join(process.cwd(), 'public', 'data', 'courses.json')
  const raw = await fs.readFile(file, 'utf8')
  const json = JSON.parse(raw) as Course[]
  CACHE = json
  return json
}
