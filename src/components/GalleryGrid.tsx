"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Search, X, ChevronLeft, ChevronRight } from 'lucide-react'

type GalleryItem = {
  id: number
  title: string
  date: string // Format: "YYYY-MM-DD"
  chapter?: string
  tags?: string[]
  image: string
  description: string
  originalWidth?: number
  originalHeight?: number
}

export function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const [filteredItems, setFilteredItems] = useState<GalleryItem[]>(items)
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedChapter, setSelectedChapter] = useState<string>('all')
  const [selectedYear, setSelectedYear] = useState<string>('all')

  // Get unique chapters and years for filters
  const chapters = ['all', ...new Set(items.map(item => item.chapter || 'other'))]
  const years = ['all', ...new Set(items.map(item => item.date.split('-')[0]))]

  // Filter logic
  useEffect(() => {
    let result = [...items]
    
    if (searchTerm) {
      result = result.filter(item => 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
    }
    
    if (selectedChapter !== 'all') {
      result = result.filter(item => 
        selectedChapter === 'other' 
          ? !item.chapter 
          : item.chapter === selectedChapter)
    }
    
    if (selectedYear !== 'all') {
      result = result.filter(item => item.date.startsWith(selectedYear))
    }
    
    setFilteredItems(result)
  }, [searchTerm, selectedChapter, selectedYear, items])

  // Modal navigation
  const navigateImage = (direction: 'prev' | 'next') => {
    if (!selectedImage) return
    
    const currentIndex = filteredItems.findIndex(item => item.id === selectedImage.id)
    if (currentIndex === -1) return
    
    const newIndex = direction === 'prev' 
      ? (currentIndex - 1 + filteredItems.length) % filteredItems.length
      : (currentIndex + 1) % filteredItems.length
    
    setSelectedImage(filteredItems[newIndex])
  }

  // Close modal on ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedImage(null)
      if (e.key === 'ArrowLeft') navigateImage('prev')
      if (e.key === 'ArrowRight') navigateImage('next')
    }
    
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedImage, filteredItems])

  console.log('Filtered Items:', filteredItems)

  return (
    <>
      {/* Filters */}
      <div className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative col-span-1 md:col-span-2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-royal-400" />
          <input
            type="text"
            placeholder="Search events..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-royal-200 focus:ring-2 focus:ring-gold-DEFAULT focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <select
          className="px-4 py-2 rounded-lg border border-royal-200 focus:ring-2 focus:ring-gold-DEFAULT"
          value={selectedChapter}
          onChange={(e) => setSelectedChapter(e.target.value)}
        >
          {chapters.map(chapter => (
            <option key={chapter} value={chapter}>
              {chapter === 'all' ? 'All Chapters' : chapter || 'Other'}
            </option>
          ))}
        </select>
        
        <select
          className="px-4 py-2 rounded-lg border border-royal-200 focus:ring-2 focus:ring-gold-DEFAULT"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          {years.map(year => (
            <option key={year} value={year}>
              {year === 'all' ? 'All Years' : year}
            </option>
          ))}
        </select>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
            onClick={() => setSelectedImage(item)}
          >
            <div className="aspect-[4/3]  verflow-hidden relative">
              <div  className="absolute   inset-0 bg-gradient-to-br from-royal-800/20 via-conces-blue/30 to-gold-400/20 z-10" />
              <Image
              
                src={item.image}
                alt={item.title}
                width={item.originalWidth || 800}
                height={item.originalHeight || 600}
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                priority={item.id < 6} // Only prioritize first few images
              />
            </div>
            
            <div className="absolute inset-0 bg-gradient-to-t from-conces-blue/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
              <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <div className="flex items-center gap-2 mb-1">
                  {item.chapter && (
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-gold-DEFAULT text-conces-blue">
                      {item.chapter}
                    </span>
                  )}
                  <span className="text-sm text-gold-light">
                    {new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white">{item.title}</h3>
                <p className="text-sm text-gold-100 line-clamp-2">{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <p className="text-royal-400">No events found matching your filters</p>
        </div>
      )}

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-conces-blue/90 backdrop-blur-sm flex items-center justify-center p-4">
          <button 
            className="absolute top-4 right-4 p-2 rounded-full bg-royal-DEFAULT text-gold-light hover:bg-royal-dark transition-colors z-50"
            onClick={() => setSelectedImage(null)}
          >
            <X className="h-6 w-6" />
          </button>
          
          <button 
            className="absolute left-4 p-2 rounded-full bg-royal-DEFAULT text-gold-light hover:bg-royal-dark transition-colors z-50"
            onClick={() => navigateImage('prev')}
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          
          <button 
            className="absolute right-4 p-2 rounded-full bg-royal-DEFAULT text-gold-light hover:bg-royal-dark transition-colors z-50"
            onClick={() => navigateImage('next')}
          >
            <ChevronRight className="h-6 w-6" />
          </button>
          
          <div className="max-w-4xl w-full max-h-[90vh] bg-light rounded-xl overflow-hidden shadow-2xl flex flex-col">
            <div className="relative flex-1 bg-gradient-to-br from-royal-100 to-royal-200 flex items-center justify-center p-4">
              <div className="relative w-full h-full max-h-[70vh]">
                <Image
                  src={selectedImage.image}
                  alt={selectedImage.title}
                  fill
                  style={{
                    objectFit: 'contain',
                  }}
                  className="p-4"
                  priority
                />
              </div>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[30vh]">
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedImage.chapter && (
                  <span className="px-3 py-1 text-sm font-medium rounded-full bg-gold-DEFAULT text-conces-blue">
                    {selectedImage.chapter}
                  </span>
                )}
                <span className="px-3 py-1 text-sm rounded-full bg-royal-100 text-royal-800">
                  {new Date(selectedImage.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </span>
              </div>
              
              <h2 className="text-2xl font-bold text-dark mb-2">{selectedImage.title}</h2>
              <p className="text-royal-900">{selectedImage.description}</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}