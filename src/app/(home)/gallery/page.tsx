import {gallery} from "@/constant"
import GalleryGrid from "@/components/GalleryGrid";

export default function GalleryPage() {
  return (
    <section className="section">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Our Moments</h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
          Explore the memorable events and milestones that define the Conces
          Fellowship journey.
        </p>
        <GalleryGrid items={gallery} />
      </div>
    </section>
  );
}


