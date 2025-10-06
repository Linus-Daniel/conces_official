import CategorySection from '@/components/store/CategorySection';
import DonationBanner from '@/components/store/Donate';
import FeaturedProducts from '@/components/store/Products';
import { IProduct } from '@/models/Product';
import ProductsPage from './products/page';



async function getProducts(): Promise<IProduct[]> {
  try {
    // Use full URL for external API calls or relative for same domain
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/store/products`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // Important: Configure caching behavior
      next: { 
        revalidate: 3600, // Cache for 1 hour
        tags: ['products'] // For on-demand revalidation
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const products = await response.json();
    return products;
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return []; // Return empty array on error
  }
}

export default async function StorePage() {
  const products = await getProducts();

  return (
    <>
      {/* <CategorySection /> */}
      <ProductsPage products={products} />
    </>
  );
}

export const metadata = {
  title: 'Store - Your App Name',
  description: 'Browse our featured products and categories',
};