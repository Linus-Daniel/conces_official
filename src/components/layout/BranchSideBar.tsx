import Link from 'next/link'
import { sidebarLinks } from '@/constant'
import { Church, Cross, House } from 'lucide-react'

export default function Sidebar({
  className,
}: {
  className?: string
}) {
  return (
    <aside className="fixed z-10 w-64  bg-blue-800 text-white h-screen transition-all duration-300"
    
    >
      <div className="p-4 border-b border-blue-700 flex items-center">
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mr-3">
          <Cross className="text-blue-800 w-5 h-5" />
        </div>
        <span className="font-bold text-xl">CONCES</span>
      </div>
      
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1">
          {sidebarLinks.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                className="flex items-center px-4 py-3 hover:bg-white/10 rounded-r-lg group"
              >
                <link.icon
                  className="w-5 h-5 mr-3 group-hover:text-yellow-400" 
                />
                <span className="group-hover:text-yellow-100">{link.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-blue-700">
        <div className="bg-white/10 rounded-lg p-3">
          <div className="flex items-center mb-2">
            <Church name="church" className="text-yellow-500 mr-2 w-4 h-4" />
            <span className="text-sm font-semibold">UNILAG Chapter</span>
          </div>
          <p className="text-xs text-gray-200">
            "Let your light shine before others, that they may see your good deeds." - Matthew 5:16
          </p>
        </div>
      </div>
    </aside>
  )
}