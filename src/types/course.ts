import type { Lesson } from './lesson'

export type CourseLevel = 'S' | 'Pres' | 'TC' | 'MTC'
export type CourseKind  = 'IELTS' | 'TOEIC' | '4SKILLS' | 'VSTEP'

export interface Course {
  id: string
  title: string
  description: string
  thumbnail: string
  level: CourseLevel
  kindOfCourse: CourseKind
  totalLessons: number
  progress: number
  status?: 'not-started' | 'in-progress' | 'completed'
  lessons: Lesson[]
}

export interface Paginated<T> {
  items: T[]
  page: number
  limit: number
  total: number
  totalPages: number
}
