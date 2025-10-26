'use client'
import Container from '@/components/Container'
import ProgressBar from '@/components/ProgressBar'
import LessonItem from '@/components/LessonItem'
import { useCourse } from '@/hooks/useCourse'
import { useParams } from 'next/navigation'
import { useProgressCtx } from '@/contexts/ProgressContext'

export default function CourseDetailPage() {
  const params = useParams<{ id: string }>()
  const courseId = params.id
  const { course, loading, error } = useCourse(courseId)
  const { courseMap, courseStats } = useProgressCtx()

  if (loading) return <Container><div className="card p-6">Đang tải...</div></Container>
  if (error || !course) return <Container><div className="text-red-600">Không tìm thấy khóa học.</div></Container>

  const map = courseMap(course.id)
  const stats = courseStats(course.id, course.lessons.map(l => l.id))

  const statusBadge = (
    <span className={
      'rounded-full px-3 py-1 text-sm ' + 
      (stats.status === 'completed'
        ? 'bg-emerald-50 text-emerald-700'
        : stats.status === 'in-progress'
        ? 'bg-amber-50 text-amber-700'
        : 'bg-gray-100 text-gray-700')
    }>
      {stats.status}
    </span>
  )

  return (
    <Container>
      <div className="card overflow-hidden">
        <div className="aspect-16-9">
          <img src={course.thumbnail} alt={course.title} />
        </div>
        <div className="p-6">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <h1 className="text-2xl font-semibold">{course.title}</h1>
            <div className="flex items-center gap-2 text-sm">
              <span className="rounded-full bg-blue-50 text-blue-700 px-3 py-1">{course.kindOfCourse}</span>
              <span className="rounded-full bg-gray-100 text-gray-700 px-3 py-1">Level: {course.level}</span>
              <span className="rounded-full bg-emerald-50 text-emerald-700 px-3 py-1">{course.totalLessons} lessons</span>
              {statusBadge}
            </div>
          </div>

          <p className="mt-3 text-gray-700">{course.description}</p>

          <div className="mt-4">
            <ProgressBar value={stats.percent} />
            <div className="text-xs text-gray-500 mt-1">
              {stats.completed}/{stats.total} completed • {stats.percent}%
            </div>
          </div>
        </div>
      </div>

      <section className="mt-6">
        <h2 className="text-lg font-semibold mb-3">Danh sách bài học</h2>
        <div className="grid gap-2">
          {course.lessons.map(ls => (
            <LessonItem
              key={ls.id}
              courseId={course.id}
              lesson={ls}
              completed={map[ls.id] === 'completed'}
            />
          ))}
        </div>
      </section>
    </Container>
  )
}
