import Link from 'next/link'
import { useProgressCtx } from '@/contexts/ProgressContext'

export default function LessonItem({ courseId, lesson, current, completed }: {
  courseId: string
  lesson: { id: string; title: string; duration: number; order: number }
  current?: boolean
  completed?: boolean
}) {
  const { setStatus } = useProgressCtx()
  return (
    <Link
      href={`/courses/${courseId}/lessons/${lesson.id}`}
      onClick={() => setStatus(courseId, lesson.id, 'in-progress')}
      className={`block p-3 rounded-xl border hover:border-blue-400 transition ${current ? 'bg-blue-50' : 'bg-white'}`}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-sm font-semibold">
            {lesson.order}
          </div>
          <div>
            <div className="font-medium">{lesson.title}</div>
            <div className="text-xs text-gray-500">{lesson.duration} phút</div>
          </div>
        </div>
        <span className={`text-xs px-2 py-1 rounded-full border ${completed ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'text-gray-600 border-gray-200'}`}>
          {completed ? 'Completed' : 'Not started'}
        </span>
      </div>
    </Link>
  )
}
