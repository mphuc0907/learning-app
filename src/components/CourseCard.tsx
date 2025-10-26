import type { Course } from '@/types'
import Link from 'next/link'
import { useProgressCtx } from '@/contexts/ProgressContext'
import { useMemo, useEffect } from 'react'
import ProgressBar from './ProgressBar'
import AOS from 'aos'
import 'aos/dist/aos.css'

export default function CourseCard({ course }: { course: Course }) {
  const { courseStats } = useProgressCtx()
  const stats = useMemo(
    () => courseStats(course.id, course.lessons.map(l => l.id)),
    [course.id]
  )

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true
    })
  }, [])

  const badgeClass =
    stats.status === 'completed'
      ? 'bg-emerald-50 text-emerald-700'
      : stats.status === 'in-progress'
        ? 'bg-amber-50 text-amber-700'
        : 'bg-gray-100 text-gray-700'

  return (
    <article 
      className="card overflow-hidden shadow-sm hover:shadow-blue-400/20 transition-shadow rounded-xl max-sm:ml-2 max-sm:mr-2"
      data-aos="fade-up"
      data-aos-delay="100"
    >
      <div className="p-3">
        <Link href={`/courses/${course.id}`}>
          <div className="aspect-16-9" data-aos="zoom-in" data-aos-delay="200">
            <img src={course.thumbnail} alt={course.title} />
          </div>
        </Link>
        <Link href={`/courses/${course.id}`}>
          <div 
            className="mt-3 flex items-center gap-2 text-xs max-xl:flex-wrap"
            data-aos="fade-right"
            data-aos-delay="300"
          >
            <span className="rounded-full bg-blue-50 text-blue-700 px-2 py-0.5">{course.kindOfCourse}</span>
            <span className="rounded-full bg-gray-100 text-gray-700 px-2 py-0.5">Level: {course.level}</span>
            <span className="rounded-full bg-emerald-50 text-emerald-700 px-2 py-0.5">{course.totalLessons} lessons</span>
            <span className={`rounded-full px-2 py-0.5 ${badgeClass}`}>{stats.status}</span>
          </div>

          <h3 
            className="mt-2 text-base font-semibold"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            {course.title}
          </h3>
          <p 
            className="text-sm text-gray-600 line-clamp-2"
            data-aos="fade-up"
            data-aos-delay="500"
          >
            {course.description}
          </p>

          <div 
            className="mt-3 flex items-center gap-3"
            data-aos="fade-up"
            data-aos-delay="600"
          >
            <ProgressBar value={stats.percent} />
            <span className="text-xs text-gray-500">{stats.percent}%</span>
          </div>
        </Link>
      </div>
    </article>
  )
}
