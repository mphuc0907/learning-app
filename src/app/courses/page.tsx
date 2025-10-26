'use client'
import Container from '@/components/Container'
import CourseCard from '@/components/CourseCard'
import { useCourses } from '@/hooks/useCourses'
import { Button, FormControl, Input, InputLabel, MenuItem, Pagination, Select } from '@mui/material'
import { useEffect, useMemo, useState } from 'react'
import { CardsGridSkeleton } from '@/components/LoadingSkeleton'

const LEVELS = ['All', 'S', 'Pres', 'TC', 'MTC'] as const

export default function CoursesPage() {
  const { data, loading, error, page, q, level, setQuery } = useCourses()
  const [search, setSearch] = useState(q)

  useEffect(() => { setSearch(q) }, [q])

  const totalPages = useMemo(() => data?.totalPages ?? 1, [data])

  return (

    <Container>

      <div className="mb-4 flex flex-col md:flex-row md:items-center gap-3">
        <div className="flex-1 max-md:mx-2">
          <div className="relative">
            <Input
              className="input"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Nhập tên khóa học..."
              onKeyDown={(e) => {
                if (e.key === 'Enter') setQuery({ q: search })
              }}
            />
            <Button
              className="btn border-t-neutral-200 absolute right-1 top-1 h-9 px-3 "
              onClick={() => setQuery({ q: search })}
            >
              Search
            </Button>
          </div>
        </div>

        <div className="md:w-60 max-md:mx-2">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Filter Level</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={level}
              label="Filter Level"
              onChange={e => setQuery({ level: e.target.value as any })}
            >
              {LEVELS.map(l => <MenuItem key={l} value={l}>{l}</MenuItem>)}
            </Select>
          </FormControl>
        </div>
      </div>
      {loading && <CardsGridSkeleton count={9} />}

      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="card p-3 animate-pulse">
              <div className="aspect-16-9 bg-gray-100" />
              <div className="mt-3 h-4 bg-gray-100 rounded w-2/3" />
              <div className="mt-2 h-3 bg-gray-100 rounded w-full" />
              <div className="mt-2 h-3 bg-gray-100 rounded w-5/6" />
              <div className="mt-4 h-9 bg-gray-100 rounded" />
            </div>
          ))}
        </div>
      )}

      {!loading && error && (
        <div className="text-red-600">Có lỗi xảy ra: {error}</div>
      )}

      {!loading && !error && data && data.items.length === 0 && (
        <div className="text-gray-600">No results</div>
      )}

      {!loading && !error && data && data.items.length > 0 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-sm:gap-3">
            {data.items.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>

          <div className="mt-6 flex justify-center">
            <Pagination
              count={totalPages}
              page={page}
              onChange={(_, value) => setQuery({ page: value })}
              color="primary"
              shape="rounded"
            />
          </div>
        </>
      )}
    </Container>
  )
}
