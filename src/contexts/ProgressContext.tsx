'use client'
import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import type { LessonStatus } from '@/lib/storage'
import { getLessonStatus, setLessonStatus, getCourseLessonMap, computeCourseStats, resetCourse as _resetCourse } from '@/lib/storage'

type Ctx = {
  getStatus: (courseId: string, lessonId: string) => LessonStatus
  setStatus: (courseId: string, lessonId: string, status: LessonStatus) => void
  courseMap: (courseId: string) => Record<string, LessonStatus>
  courseStats: (courseId: string, lessonIds: string[]) => { completed: number; total: number; percent: number; status: 'not-started'|'in-progress'|'completed' }
  resetCourse: (courseId: string) => void
  version: number
}

const ProgressContext = createContext<Ctx | null>(null)

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [version, setVersion] = useState(0)

  const bump = () => setVersion(v => v + 1)

  const getStatus = useCallback((courseId: string, lessonId: string) => {
    return getLessonStatus(courseId, lessonId)
  }, [])

  const setStatus = useCallback((courseId: string, lessonId: string, status: LessonStatus) => {
    setLessonStatus(courseId, lessonId, status)
    bump()
  }, [])

  const courseMap = useCallback((courseId: string) => getCourseLessonMap(courseId), [])

  const courseStats = useCallback((courseId: string, lessonIds: string[]) => {
    return computeCourseStats(courseId, lessonIds)
  }, [])

  const resetCourse = useCallback((courseId: string) => {
    _resetCourse(courseId)
    bump()
  }, [])

  const value = useMemo(() => ({ getStatus, setStatus, courseMap, courseStats, resetCourse, version }), [getStatus, setStatus, courseMap, courseStats, resetCourse, version])

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
}

export function useProgressCtx() {
  const ctx = useContext(ProgressContext)
  if (!ctx) throw new Error('useProgressCtx must be used within ProgressProvider')
  return ctx
}
