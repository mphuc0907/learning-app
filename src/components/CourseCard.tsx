import type { Course } from '@/types'
import Link from 'next/link'

export default function CourseCard({ course }: { course: Course }) {
  return (
    <article className="card overflow-hidden shadow-sm hover:shadow-blue-400 transition-shadow rounded-xl">
      <div >
        <div className="overflow-hidden rounded-md">
          <Link
            href={`/courses/${course.id}`}>
            <img src={course.thumbnail} alt={course.title} />
          </Link>
        </div>
        <div className="p-4">
          <Link
            href={`/courses/${course.id}`}>
            <div className="mt-3 flex items-center gap-2 text-xs">
              <span className="rounded-full bg-blue-50 text-blue-700 px-2 py-0.5">{course.kindOfCourse}</span>
              <span className="rounded-full bg-gray-100 text-gray-700 px-2 py-0.5">Level: {course.level}</span>
              <span className="rounded-full bg-emerald-50 text-emerald-700 px-2 py-0.5">{course.totalLessons} lessons</span>
            </div>

            <h3 className="mt-2 text-base font-semibold">{course.title}</h3>
            <p className="text-sm text-gray-600 line-clamp-2">{course.description}</p>

            <div className="mt-3 flex items-center justify-between">
              <div className="h-2 bg-gray-100 rounded-full flex-1 mr-3">
                <div
                  className="h-2 bg-blue-600 rounded-full"
                  style={{ width: `${course.progress ?? 0}%` }}
                />
              </div>
              <span className="text-xs text-gray-500">{Math.round(course.progress ?? 0)}%</span>
            </div>
          </Link>
        </div>
      </div>
    </article >
  )
}
