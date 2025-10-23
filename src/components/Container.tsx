import { PropsWithChildren } from 'react'

export default function Container({ children }: PropsWithChildren) {
  return <div className="container max-w-6xl">{children}</div>
}
