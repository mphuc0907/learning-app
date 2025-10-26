const KEY_V1 = 'progress_v1'
const KEY_V2 = 'progress_v2'

export type LessonStatus = 'not-started' | 'in-progress' | 'completed'
type CourseMap = Record<string, Record<string, LessonStatus>>
type StoreV2 = { courses: Record<string, { lessons: Record<string, LessonStatus> }> }

function readV2(): StoreV2 {
  if (typeof window === 'undefined') return { courses: {} }
  try {
    const raw = localStorage.getItem(KEY_V2)
    if (raw) return JSON.parse(raw)
    const v1raw = localStorage.getItem(KEY_V1)
    if (v1raw) {
      const v1: CourseMap = JSON.parse(v1raw)
      const migrated: StoreV2 = { courses: {} }
      Object.keys(v1).forEach(cid => {
        migrated.courses[cid] = { lessons: {} }
        Object.keys(v1[cid]).forEach(lid => {
          migrated.courses[cid].lessons[lid] = v1[cid][lid] as LessonStatus
        })
      })
      localStorage.setItem(KEY_V2, JSON.stringify(migrated))
      localStorage.removeItem(KEY_V1)
      return migrated
    }
  } catch {}
  return { courses: {} }
}

function writeV2(store: StoreV2) {
  if (typeof window === 'undefined') return
  localStorage.setItem(KEY_V2, JSON.stringify(store))
}

export function getLessonStatus(courseId: string, lessonId: string): LessonStatus {
  const s = readV2()
  return s.courses[courseId]?.lessons[lessonId] ?? 'not-started'
}

export function setLessonStatus(courseId: string, lessonId: string, status: LessonStatus) {
  const s = readV2()
  if (!s.courses[courseId]) s.courses[courseId] = { lessons: {} }
  s.courses[courseId].lessons[lessonId] = status
  writeV2(s)
}

export function getCourseLessonMap(courseId: string): Record<string, LessonStatus> {
  const s = readV2()
  return s.courses[courseId]?.lessons ?? {}
}

export function resetCourse(courseId: string) {
  const s = readV2()
  if (s.courses[courseId]) {
    s.courses[courseId].lessons = {}
    writeV2(s)
  }
}

export function computeCourseStats(courseId: string, lessonIds: string[]) {
  const map = getCourseLessonMap(courseId)
  const total = Math.max(1, lessonIds.length)
  const completed = lessonIds.filter(id => map[id] === 'completed').length
  const anyInProgress = lessonIds.some(id => map[id] === 'in-progress')
  const anyCompleted = completed > 0

  const percent = Math.round((completed / total) * 100)

  let status: 'not-started' | 'in-progress' | 'completed' = 'not-started'
  if (completed === total) status = 'completed'
  else if (anyCompleted || anyInProgress) status = 'in-progress'

  return { completed, total, percent, status }
}