import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FaFileArrowDown, FaFileArrowUp, FaFilePdf, FaFileWord } from 'react-icons/fa6'
import { FaFilePowerpoint } from 'react-icons/fa'
import { Download, ImageIcon, Upload } from 'lucide-react'

const uploads = [
  {
    title: "Leadership Training Guide.pdf",
    author: "Engr. Chinedu",
    time: "2 days ago",
    icon: FaFilePdf,
    iconColor: "text-red-500"
  },
  {
    title: "Weekly Devotional - Faith in Engineering.docx",
    author: "Sis. Grace",
    time: "3 days ago",
    icon: FaFileWord,
    iconColor: "text-blue-500"
  },
  {
    title: "Engineering Ethics Presentation.pptx",
    author: "Bro. David",
    time: "5 days ago",
    icon: FaFilePowerpoint,
    iconColor: "text-orange-500"
  },
  {
    title: "Last Outreach Photos.zip",
    author: "Sis. Joy",
    time: "1 week ago",
    icon: ImageIcon,
    iconColor: "text-purple-500"
  }
]

export default function RecentUploads() {
  return (
    <Card>
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-gray-800 flex items-center gap-2">
          <FaFileArrowUp className="text-blue-800 w-5 h-5" />
          Recent Uploads
        </h3>
        <Button variant="link" className="text-blue-800 p-0 h-auto">
          View all
        </Button>
      </div>
      
      <div className="space-y-3">
        {uploads.map((upload, index) => (
          <div key={index} className="flex items-center p-2 hover:bg-gray-50 rounded gap-3">
            <Upload
              className={`${upload.iconColor} w-5 h-5`} 
            />
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-800 text-sm truncate">{upload.title}</p>
              <p className="text-xs text-gray-500">Uploaded by {upload.author} • {upload.time}</p>
            </div>
            <button className="text-gray-400 hover:text-gray-600">
              <Download className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
      
      <Button variant="outline" className="w-full mt-4">
        Upload New Resource
      </Button>
    </Card>
  )
}