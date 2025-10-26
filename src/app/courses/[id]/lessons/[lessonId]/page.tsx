'use client'
import Container from '@/components/Container'
import { useCourse } from '@/hooks/useCourse'
import { useLessonProgress } from '@/hooks/useProgress'
import { useParams, useRouter } from 'next/navigation'
import Button from '@mui/material/Button'

export default function LessonDetailPage() {
  const params = useParams<{ id: string; lessonId: string }>()
  const router = useRouter()
  const { course, loading, error } = useCourse(params.id)
  const lesson = course?.lessons.find(l => l.id === params.lessonId)

  const { status, markCompleted } = useLessonProgress(params.id, params.lessonId)

  if (loading) return <Container><div className="card p-6">Đang tải...</div></Container>
  if (error || !course || !lesson) return <Container><div className="text-red-600">Không tìm thấy bài học.</div></Container>

  const handleComplete = () => {
    if (status !== 'completed') markCompleted()
  }

  return (
    <Container>
      <div className="card p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold">#{lesson.order} — {lesson.title}</h1>
            <div className="text-sm text-gray-500 mt-1">{lesson.duration} phút</div>
          </div>
          <span className={`text-xs px-2 py-1 rounded-full border ${status === 'completed' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'text-gray-600 border-gray-200'}`}>
            {status === 'completed' ? 'Completed' : 'Not started'}
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
