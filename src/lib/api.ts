import type { Paginated, Course } from '@/types'

export async function fetchCourses(params: {
  page?: number
  limit?: number
  q?: string
  level?: string 
}) : Promise<Paginated<Course>> {
  const qs = new URLSearchParams()
  if (params.page)  qs.set('page', String(params.page))
  if (params.limit) qs.set('limit', String(params.limit))
  if (params.q)     qs.set('q', params.q)
  if (params.level && params.level !== 'All') qs.set('level', params.level)

  const res = await fetch(`/api/courses?${qs.toString()}`, { cache: 'no-store' })
  if (!res.ok) throw new Error('Failed to fetch courses')
  return res.json()
}
export async function fetchCourse(id: string): Promise<Course> {
  const res = await fetch(`/api/courses/${id}?id=${id}`, { cache: 'no-store' })
  if (!res.ok) throw new Error('Course not found')
  return res.json()
}