import { gallery } from "@/constant";
import { GalleryGrid } from "@/components/GalleryGrid";

export default function GalleryPage() {
  console.log(gallery)
  return (

    <section className="section">
        <div className="text-center mb-3 py-10 bg-conces-blue" >
          <h2 className="text-3xl font-bold text-conces-gold mb-2">
            Our Moments
          </h2>
          <p className="text-lg text-gold-600 max-w-3xl mx-auto">
            Explore the memorable events and milestones that define the Conces
            Fellowship journey.
          </p>
        </div>
      <div className="container mx-auto px-4 max-w-7xl">
        <GalleryGrid items={gallery} />
      </div>
    </section>
  );
}
