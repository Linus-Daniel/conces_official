import { ProductTable } from "@/components/admin/ProductTable";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getProducts } from "@/lib/actions/admin";
import { ICategory } from "@/models/Category";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/next-auth";
import { Category } from "@/types";

export default async function AdminProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string }>;
}) {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  // Await the searchParams since it's now a Promise
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const search = params.search || "";
  const { products, totalPages } = await getProducts(page, search);
  const categories: Category[] = [
    {
      name: "Shirts",
      slug: "shirts",
      icon: null,
      count: 0,
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      name: "Wrist bangle",
      slug: "wrist-band",
      icon: null,
      count: 0,
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      name: "Umbrellas",
      slug: "umbrellas",
      icon: null,
      count: 0,
      bgColor: "bg-yellow-100",
      iconColor: "text-yellow-600",
    },
    {
      name: "shoes",
      slug: "shoes",
      icon: null,
      count: 0,
      bgColor: "bg-red-100",
      iconColor: "text-red-600",
    },
    {
      name: "Holy books",
      slug: "bible",
      icon: null,
      count: 0,
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600",
    },
  ];

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
          chapter=""
          categories={categories}
          userRole={user?.role as string}
          key={Math.random()}
        />
      </div>
    </div>
  );
}
