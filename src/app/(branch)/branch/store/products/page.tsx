import { ProductTable } from '@/components/admin/ProductTable';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { getProducts } from '@/lib/actions/admin';
import api from '@/lib/axiosInstance';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/next-auth';


const getBranchProducts = async (id:string)=>{
    try{
      const response = await api.get(`/chapters/${id}/store/products`)
      const productsData = response.data
      console.log(productsData); 
      return productsData
    }catch(error){
      console.log(error)
    }
}

export default async function AdminProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string }>;
}) {
  const session = await getServerSession(authOptions);
  const id  = session?.user.branch as string
  console.log(id)
  const products = await getBranchProducts(id)

  // Await the searchParams since it's now a Promise
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const search = params.search || '';

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
          totalPages={5}
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