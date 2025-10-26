const KEY = 'progress_v1' 

type Status = 'not-started' | 'completed'
type Store = Record<string, Record<string, Status>>

function read(): Store {
  if (typeof window === 'undefined') return {}
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : {}
  } catch { return {} }
}
function write(store: Store) {
  if (typeof window === 'undefined') return
  localStorage.setItem(KEY, JSON.stringify(store))
}

export function getLessonStatus(courseId: string, lessonId: string): Status {
  const s = read()
  return s[courseId]?.[lessonId] ?? 'not-started'
}

export function setLessonCompleted(courseId: string, lessonId: string) {
  const s = read()
  s[courseId] = s[courseId] || {}
  s[courseId][lessonId] = 'completed'
  write(s)
}

export function getCourseMap(courseId: string): Record<string, Status> {
  const s = read()
  
  return s[courseId] || {}
}
