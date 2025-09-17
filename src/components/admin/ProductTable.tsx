"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Pagination } from "../Pagination";
import { useState, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ProductForm from "./ProductForm";
import Modal from "../Modal";
import { useRouter } from "next/navigation";
import {
  ApprovalSystem,
  createApprovalComponents,
} from "@/components/admin/ApprovalSystem";
import { Category } from "@/types";
import { useApprovalSystem } from "@/hooks/useApprove";

interface ApprovalableProduct {
  _id: string;
  name: string;
  description?: string;
  price: number;
  images: string[];
  chapter: string;
  category: string | Category;
  stock: number;
  featured?: boolean;
  approved: boolean;
}

interface ProductTableProps {
  products: ApprovalableProduct[];
  page: number;
  totalPages: number;
  search?: string;
  userRole: string;
  chapter: string;
  categories: Category[];
}

export function ProductTable({
  products: initialProducts,
  page,
  totalPages,
  search,
  userRole,
  chapter,
  categories,
}: ProductTableProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] =
    useState<ApprovalableProduct | null>(null);
  const [products, setProducts] =
    useState<ApprovalableProduct[]>(initialProducts);
  const router = useRouter();

  // 🔥 ONE hook handles all approval logic
  const approvalSystem = useApprovalSystem({
    items: products,
    setItems: setProducts,
    entity: "products",
    userRole,
  });

  // 🔥 Create reusable table components
  const { ApprovalBadge, ApprovalActions, SelectAllCheckbox, ItemCheckbox } =
    createApprovalComponents<ApprovalableProduct>(approvalSystem);

  // Custom filters state (separate from approval system)
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [stockFilter, setStockFilter] = useState<string>("all");

  // Apply custom filters to already approval-filtered items
  const finalFilteredItems = useMemo(() => {
    return approvalSystem.filteredItems.filter((product) => {
      const matchesCategory =
        categoryFilter === "all" ||
        (typeof product.category === "string"
          ? product.category === categoryFilter
          : false);

      const matchesStock =
        stockFilter === "all" ||
        (stockFilter === "in-stock" && product.stock > 0) ||
        (stockFilter === "out-of-stock" && product.stock === 0);

      return matchesCategory && matchesStock;
    });
  }, [approvalSystem.filteredItems, categoryFilter, stockFilter]);

  const handleEditClick = (product: ApprovalableProduct) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const clearAllFilters = () => {
    approvalSystem.clearFilters();
    setCategoryFilter("all");
    setStockFilter("all");
  };

  return (
    <div className="space-y-4">
      {/* 🔥 ALL filters, search, and batch actions in ONE component */}
      <ApprovalSystem
        {...approvalSystem}
        totalItems={products.length}
        searchFields={["name", "description"]}
        searchPlaceholder="Search products..."
        additionalFilters={
          <>
            {/* Category Filter */}
            <select
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category.slug} value={category.name || ""}>
                  {category.name}
                </option>
              ))}
            </select>

            {/* Stock Filter */}
            <select
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={stockFilter}
              onChange={(e) => setStockFilter(e.target.value)}
            >
              <option value="all">All Stock</option>
              <option value="in-stock">In Stock</option>
              <option value="out-of-stock">Out of Stock</option>
            </select>
          </>
        }
      />

      {/* Override the clear filters to include our custom filters */}
      <div className="px-4">
        <button
          onClick={clearAllFilters}
          className="text-sm text-blue-600 hover:text-blue-800 underline"
        >
          Clear All Filters
        </button>
      </div>

      {/* Results count - using final filtered items */}
      <div className="px-4 text-sm text-gray-600">
        Showing {finalFilteredItems.length} of {products.length} products
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            {approvalSystem.canApprove && (
              <TableHead className="w-12">
                <SelectAllCheckbox />
              </TableHead>
            )}
            <TableHead>Product</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Stock Status</TableHead>
            <TableHead>Approval Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {finalFilteredItems.map((product, index) => (
            <TableRow key={product._id?.toString() || `product-${index}`}>
              {approvalSystem.canApprove && (
                <TableCell>
                  <ItemCheckbox item={product} />
                </TableCell>
              )}
              <TableCell className="font-medium">
                <div className="flex items-center gap-3">
                  <div className="relative h-10 w-10 overflow-hidden rounded-md">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium">{product.name}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline">{product?.category as string}</Badge>
              </TableCell>
              <TableCell>₦{product.price.toLocaleString()}</TableCell>
              <TableCell>{product.stock}</TableCell>
              <TableCell>
                <Badge variant={product.stock > 0 ? "default" : "destructive"}>
                  {product.stock > 0 ? "In Stock" : "Out of Stock"}
                </Badge>
              </TableCell>
              <TableCell>
                <ApprovalBadge approved={product.approved} />
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center gap-2 justify-end">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEditClick(product)}
                  >
                    Edit
                  </Button>
                  <ApprovalActions item={product} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {finalFilteredItems.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No products found matching your filters
        </div>
      )}

      <div className="p-4 border-t">
        <Pagination page={page} totalPages={totalPages} />
      </div>

      <Modal
        isOpen={isModalOpen}
        title="Product details"
        onClose={handleCloseModal}
      >
        <ProductForm
          userRole={userRole}
          chapter={chapter}
          categories={categories}
          initialData={editingProduct || undefined}
          onSuccess={handleCloseModal}
          url=""
          chapterId=""
        />
      </Modal>
    </div>
  );
}
