'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { IProduct } from '@/models/Product';
import Image from 'next/image';
import { Pagination } from '../Pagination';
import { SearchBar } from '../searchBar';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import ProductForm from './ProductForm';
import { ICategory } from '@/models/Category';

interface ProductTableProps {
  products: IProduct[];
  page: number;
  totalPages: number;
  search?: string;
  userRole: string;
  branch: string;
  categories: any[]; // Add proper type for categories
}

const categories: Partial<ICategory>[] = [
  {
    name: "Shirts",
    slug: "shirts"
  },
  {
    name: "Wrist bangle",
    slug: "wrist-band"
  },
  {
    name: "Umbrellas",
    slug: "umbrellas"
  },
  {
    name: "shoes",
    slug: "shoes"
  },
  {
    name: "Holy books",
    slug: "bible"
  }
];


export function ProductTable({ 
  products, 
  page, 
  totalPages,
  search,
  userRole,
  branch,
  categories
}: ProductTableProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<IProduct | null>(null);

  const handleEditClick = (product: IProduct) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleCreateClick = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  return (
    <div>
      <div className="flex items-center w-full justify-between p-4 border-b">
        <SearchBar 
          placeholder="Search products..." 
          defaultValue={search}
        />   
      </div>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product,index) => (
            <TableRow key={index}>
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
              <TableCell>{product.price}</TableCell>
              <TableCell>{product.stock}</TableCell>
              <TableCell>
                <Badge
                  variant={product.stock > 0 ? 'default' : 'destructive'}
                >
                  {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleEditClick(product)}
                >
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="p-4 border-t">
        <Pagination 
          page={page} 
          totalPages={totalPages} 
        />
      </div>

      <Dialog open={isModalOpen} onOpenChange={handleCloseModal}>
      <DialogContent className="w-full h-full sm:w-[600px] sm:max-h-[90vh] sm:rounded-lg sm:p-4 p-2">

          <DialogHeader>
            <DialogTitle>
              {editingProduct ? 'Edit Product' : 'Create New Product'}
            </DialogTitle>
          </DialogHeader>
          <ProductForm 
            userRole={userRole}
            branch={branch}
            categories={categories}
            initialData={editingProduct || undefined}
            onSuccess={handleCloseModal}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}