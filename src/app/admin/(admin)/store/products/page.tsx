import { ProductTable } from '@/components/admin/ProductTable';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { getProducts } from '@/lib/actions/admin';

export default async function AdminProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string }>;
}) {
  // Await the searchParams since it's now a Promise
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const search = params.search || '';
  const { products, totalPages } = await getProducts(page, search);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Products</h2>
        <Button asChild>
          <Link href="/admin/store/products/new">Add Product</Link>
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <ProductTable 
          products={products} 
          page={page}
          totalPages={totalPages}
          search={search}
          branch=''
          categories={[]}
          userRole=''
          key={Math.random()}
        />
      </div>
    </div>
  );
}