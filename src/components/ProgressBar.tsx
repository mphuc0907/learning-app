export default function ProgressBar({ value }: { value: number }) {
  return (
    <div className="h-2 bg-gray-100 rounded-full w-full">
      <div className="h-2 bg-blue-600 rounded-full" style={{ width: `${Math.min(100, Math.max(0, value))}%` }} />
    </div>
  )
}
