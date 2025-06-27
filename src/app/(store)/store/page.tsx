import CategorySection from '@/components/store/CategorySection';
import DonationBanner from '@/components/store/Donate';
import FeaturedProducts from '@/components/store/Products';
export default function StorePage() {
  return (
    <>
      <CategorySection />
      <FeaturedProducts />
      <DonationBanner />
    </>
  );
}