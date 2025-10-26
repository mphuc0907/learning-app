import type { Course } from '@/types'
import Link from 'next/link'
import { useProgressCtx } from '@/contexts/ProgressContext'
import { useMemo } from 'react'
import ProgressBar from './ProgressBar'

export default function CourseCard({ course }: { course: Course }) {
  const { courseStats } = useProgressCtx()
  const stats = useMemo(
    () => courseStats(course.id, course.lessons.map(l => l.id)),
    [course.id]
  )

  const badgeClass =
    stats.status === 'completed'
      ? 'bg-emerald-50 text-emerald-700'
      : stats.status === 'in-progress'
      ? 'bg-amber-50 text-amber-700'
      : 'bg-gray-100 text-gray-700'

  return (
    <article className="card overflow-hidden shadow-sm hover:shadow-blue-400/20 transition-shadow rounded-xl">
      <div className="p-3">
        <div className="aspect-16-9">
          <img src={course.thumbnail} alt={course.title} />
        </div>

        <div className="mt-3 flex items-center gap-2 text-xs">
          <span className="rounded-full bg-blue-50 text-blue-700 px-2 py-0.5">{course.kindOfCourse}</span>
          <span className="rounded-full bg-gray-100 text-gray-700 px-2 py-0.5">Level: {course.level}</span>
          <span className="rounded-full bg-emerald-50 text-emerald-700 px-2 py-0.5">{course.totalLessons} lessons</span>
          <span className={`rounded-full px-2 py-0.5 ${badgeClass}`}>{stats.status}</span>
        </div>

        <h3 className="mt-2 text-base font-semibold">{course.title}</h3>
        <p className="text-sm text-gray-600 line-clamp-2">{course.description}</p>

        <div className="mt-3 flex items-center gap-3">
          <ProgressBar value={stats.percent} />
          <span className="text-xs text-gray-500">{stats.percent}%</span>
        </div>

        <Link className="btn btn-primary w-full mt-4" href={`/courses/${course.id}`}>
          Xem chi tiết
        </Link>
      </div>
    </article>
  )
}
