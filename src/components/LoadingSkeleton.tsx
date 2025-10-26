export function CourseCardSkeleton() {
  return (
    <div className="card p-3 animate-pulse">
      <div className="aspect-16-9 bg-gray-100 rounded-xl" />
      <div className="mt-3 flex items-center gap-2">
        <div className="h-5 w-14 bg-gray-100 rounded-full" />
        <div className="h-5 w-20 bg-gray-100 rounded-full" />
        <div className="h-5 w-16 bg-gray-100 rounded-full" />
      </div>
      <div className="mt-3 h-4 bg-gray-100 rounded w-2/3" />
      <div className="mt-2 h-3 bg-gray-100 rounded w-full" />
      <div className="mt-2 h-3 bg-gray-100 rounded w-5/6" />
      <div className="mt-4 h-9 bg-gray-100 rounded-xl" />
    </div>
  )
}

export function CardsGridSkeleton({ count = 9 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <CourseCardSkeleton key={i} />
      ))}
    </div>
  )
}

export function CourseDetailSkeleton() {
  return (
    <div className="card overflow-hidden animate-pulse">
      <div className="aspect-16-9 bg-gray-100" />
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div className="h-7 w-64 bg-gray-100 rounded" />
          <div className="flex items-center gap-2">
            <div className="h-6 w-20 bg-gray-100 rounded-full" />
            <div className="h-6 w-28 bg-gray-100 rounded-full" />
            <div className="h-6 w-24 bg-gray-100 rounded-full" />
            <div className="h-6 w-28 bg-gray-100 rounded-full" />
          </div>
        </div>
        <div className="mt-3 space-y-2">
          <div className="h-4 bg-gray-100 rounded w-full" />
          <div className="h-4 bg-gray-100 rounded w-5/6" />
          <div className="h-4 bg-gray-100 rounded w-4/6" />
        </div>
        <div className="mt-4">
          <div className="h-2 bg-gray-100 rounded-full" />
          <div className="mt-2 h-3 w-40 bg-gray-100 rounded" />
        </div>
      </div>
      <div className="p-6">
        <div className="h-6 w-40 bg-gray-100 rounded mb-3" />
        <div className="grid gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="p-3 rounded-xl border">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg" />
                  <div>
                    <div className="h-4 w-56 bg-gray-100 rounded" />
                    <div className="mt-1 h-3 w-24 bg-gray-100 rounded" />
                  </div>
                </div>
                <div className="h-5 w-24 bg-gray-100 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function LessonDetailSkeleton() {
  return (
    <div className="card p-6 animate-pulse">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="h-6 w-72 bg-gray-100 rounded" />
          <div className="mt-2 h-4 w-24 bg-gray-100 rounded" />
        </div>
        <div className="h-6 w-28 bg-gray-100 rounded-full" />
      </div>
      <div className="aspect-16-9 mt-4 bg-gray-100 rounded-xl" />
      <div className="mt-4 space-y-2">
        <div className="h-4 bg-gray-100 rounded w-full" />
        <div className="h-4 bg-gray-100 rounded w-5/6" />
        <div className="h-4 bg-gray-100 rounded w-4/6" />
      </div>
      <div className="mt-6 flex flex-col sm:flex-row gap-3">
        <div className="h-11 w-40 bg-gray-100 rounded-xl" />
        <div className="h-11 w-40 bg-gray-100 rounded-xl" />
      </div>
    </div>
  )
}
