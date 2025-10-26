'use client'
import { useCallback, useEffect, useState } from 'react'
import { getLessonStatus, setLessonCompleted, getCourseMap } from '@/lib/storage'

export function useLessonProgress(courseId: string, lessonId: string) {
  const [status, setStatus] = useState<'not-started' | 'completed'>('not-started')

  useEffect(() => {
    setStatus(getLessonStatus(courseId, lessonId))
  }, [courseId, lessonId])

  const markCompleted = useCallback(() => {
    setLessonCompleted(courseId, lessonId)
    setStatus('completed')
  }, [courseId, lessonId])

  return { status, markCompleted }
}

export function useCourseProgressMap(courseId: string) {
  console.log(courseId);
  
  const [map, setMap] = useState<Record<string, 'not-started' | 'completed'>>({})
  useEffect(() => { setMap(getCourseMap(courseId)) }, [courseId])
  return map
}
