import { X } from 'lucide-react'
import Sidebar from './BranchSideBar'

export default function MobileSidebar({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Mobile Sidebar */}
      <div className={`
        fixed z-30 top-0 left-0 h-screen w-64 transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:hidden
      `}>
        <Sidebar className="flex" />
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-full bg-white/10 text-white hover:bg-white/20"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </>
  )
}