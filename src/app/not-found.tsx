"use client"
import Button from '@mui/material/Button'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold">Không tìm thấy trang</h1>
      <p className="text-gray-600 mt-2">Trang bạn tìm không tồn tại hoặc đã bị xoá.</p>
      <Link href="/courses">
        <Button variant="contained" sx={{ mt: 2, borderRadius: 2 }}>
          Về danh sách khoá học
        </Button>
      </Link>
    </div>
  )
}