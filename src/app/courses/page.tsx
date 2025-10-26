import { Suspense } from 'react'
import Container from '@/components/Container'
import { CardsGridSkeleton } from '@/components/LoadingSkeleton'
import CoursesClient from './CoursesClient'

export default function CoursesPageWrapper() {
  return (
    <Suspense
      fallback={
        <Container>
          <CardsGridSkeleton count={9} />
        </Container>
      }
    >
      <CoursesClient />
    </Suspense>
  )
}