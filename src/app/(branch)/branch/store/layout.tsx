import AdminLayout from '@/components/admin/Layout'
import { ReactNode } from 'react'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-white text-slate-800">
      <AdminLayout>
        <main className="flex-1 container mx-auto px-4 py-6">
          {children}
        </main>
      </AdminLayout>
    </div>
  )
}
