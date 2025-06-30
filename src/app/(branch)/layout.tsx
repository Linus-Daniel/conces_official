import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import BranchLayout from '@/components/layout/BranchLayout'
import "../(home)/globals.css"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CONCES Branch Dashboard',
  description: 'Dashboard for CONCES branch management',
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body className="antialiased">
        <BranchLayout>
          {children}
        </BranchLayout>
      </body>
    </html>
  )
}