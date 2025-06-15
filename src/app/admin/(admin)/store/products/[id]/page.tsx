import ProductForm from '@/components/admin/ProductForm';
import { getProductById } from '../../../../../../lib/actions/admin';
import { getCategories } from '../../../../../../lib/actions/admin';

export default async function EditProductPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await getProductById(params.id);
  const categories = await getCategories();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">
          {product ? 'Edit Product' : 'Create Product'}
        </h2>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <ProductForm 
          product={product} 
          categories={categories} 
        />
      </div>
    </div>
  );
}