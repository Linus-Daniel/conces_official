import ProductForm from "@/components/admin/ProductForm";
import { getProductById } from "../../../../../../lib/actions/admin";
import { getCategories } from "../../../../../../lib/actions/admin";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Await the params since it's now a Promise
  const { id } = await params;

  const product = await getProductById(id);
  const categories = await getCategories();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">
          {product ? "Edit Product" : "Create Product"}
        </h2>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <ProductForm
          categories={categories}
          userRole=""
          chapter=""
          url=""
          chapterId=""
        />
      </div>
    </div>
  );
}
