'use client'
import { useEffect, useMemo, useState } from 'react'
import type { Course, Paginated } from '@/types'
import { fetchCourses } from '@/lib/api'
import { useSearchParams, useRouter } from 'next/navigation'

export type LevelFilter = 'All' | 'S' | 'Pres' | 'TC' | 'MTC'

export function useCourses() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [data, setData] = useState<Paginated<Course> | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const page  = Number(searchParams.get('page') ?? 1)
  const q     = searchParams.get('q') ?? ''
  const level = (searchParams.get('level') ?? 'All') as LevelFilter

  const params = useMemo(() => ({ page, limit: 9, q, level }), [page, q, level])

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)

    fetchCourses(params)
      .then(res => { if (!cancelled) setData(res) })
      .catch(err => { if (!cancelled) setError(err?.message || 'Error') })
      .finally(() => { if (!cancelled) setLoading(false) })

    return () => { cancelled = true }
  }, [params])

  function setQuery(next: Partial<{ page: number; q: string; level: LevelFilter }>) {
    const u = new URLSearchParams(Array.from(searchParams.entries()))
    if (next.page !== undefined) u.set('page', String(next.page))
    if (next.q !== undefined) {
      u.set('q', next.q); u.set('page', '1')
    }
    if (next.level !== undefined) {
      u.set('level', next.level); u.set('page', '1')
    }
    router.push(`/courses?${u.toString()}`)
  }

  return { data, loading, error, page, q, level, setQuery }
}
