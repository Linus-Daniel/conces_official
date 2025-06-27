import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

export default function Home() {
  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative h-[80vh] bg-conces-dark text-white">
        <div className="absolute inset-0 bg-black/30 z-10" />
        <Image
          src="/hero-bg.jpg"
          alt="Luxury Vehicles"
          fill
          className="object-cover"
        />
        <div className="container relative z-20 h-full flex flex-col justify-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold max-w-2xl mb-6">
            Premium Automotive Excellence
          </h1>
          <p className="text-xl max-w-xl mb-8">
            Discover the finest selection of luxury vehicles and automotive accessories
          </p>
          <div className="flex space-x-4">
            <Button asChild size="lg" className="bg-conces-gold text-conces-blue hover:bg-conces-gold-dark">
              <Link href="/shop">Shop Now</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-white border-white hover:bg-white/10">
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

     
      <section className="bg-conces-blue text-white py-16">
        <div className="container px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Find Your Dream Vehicle?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Our experts are here to help you find the perfect match for your lifestyle.
          </p>
          <Button asChild size="lg" className="bg-conces-gold text-conces-blue hover:bg-conces-gold-dark">
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}