export type LessonStatus = 'not-started' | 'completed'

export interface Lesson {
  id: string
  courseId: string
  title: string
  duration: number 
  url: string
  description: string
  status: LessonStatus 
  order: number
}
