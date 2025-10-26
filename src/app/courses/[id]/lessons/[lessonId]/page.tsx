'use client'
import Container from '@/components/Container'
import { useCourse } from '@/hooks/useCourse'
import { useParams, useRouter } from 'next/navigation'
import Button from '@mui/material/Button'
import { useEffect } from 'react'
import { useProgressCtx } from '@/contexts/ProgressContext'
import { LessonDetailSkeleton } from '@/components/LoadingSkeleton'

export default function LessonDetailPage() {
  const params = useParams<{ id: string; lessonId: string }>()
  const router = useRouter()
  const { course, loading, error } = useCourse(params.id)
  const lesson = course?.lessons.find(l => l.id === params.lessonId)

  const { getStatus, setStatus } = useProgressCtx()
  const status = lesson ? getStatus(params.id, lesson.id) : 'not-started'

  useEffect(() => {
    if (lesson && status === 'not-started') {
      setStatus(params.id, lesson.id, 'in-progress')
    }
  }, [lesson?.id])

  if (loading) return <Container><div className="card p-6 max-md:">Đang tải...</div></Container>
  if (error || !course || !lesson) return <Container><div className="text-red-600">Không tìm thấy bài học.</div></Container>

  const handleComplete = () => {
    if (status !== 'completed') setStatus(course.id, lesson.id, 'completed')
  }
  if (loading) return <Container><LessonDetailSkeleton /></Container>

  return (
    <Container>
      <div className="card p-6 max-md:py-3 max-sm:py-1">
        <div className="flex items-start justify-between gap-4 max-sm:flex-col">
          <div>
            <h1 className="text-xl font-semibold max-sm:text-lg">#{lesson.order} — {lesson.title}</h1>
            <div className="text-sm text-gray-500 mt-1">{lesson.duration} phút</div>
          </div>
          <span className={`text-xs px-2 py-1 rounded-full border ${status === 'completed' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : status === 'in-progress' ? 'bg-amber-50 text-amber-700 border-amber-200' : 'text-gray-600 border-gray-200'}`}>
            {status === 'completed' ? 'Completed' : status === 'in-progress' ? 'In progress' : 'Not started'}
          </span>
        </div>

        <div className="aspect-16-9 mt-4">
          <img src={course.thumbnail} alt="Video thumbnail" />
        </div>

        <p className="mt-4 text-gray-700">{lesson.description}</p>

        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <Button
            variant="contained"
            color="primary"
            onClick={handleComplete}
            disabled={status === 'completed'}
            sx={{ textTransform: 'none', height: 44, borderRadius: 2 }}
          >
            {status === 'completed' ? 'Đã hoàn thành' : 'Mark as Completed'}
          </Button>

          <Button
            variant="outlined"
            onClick={() => router.push(`/courses/${course.id}`)}
            sx={{ textTransform: 'none', height: 44, borderRadius: 2 }}
          >
            Back to Course
          </Button>
        </div>
      </div>
    </Container>
  )
}
