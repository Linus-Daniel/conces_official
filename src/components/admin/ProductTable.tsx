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
// import { formatCurrency } from '@/lib/utils';
import Image from 'next/image';
import { Pagination } from '../Pagination';
import { SearchBar } from '../searchBar';

interface ProductTableProps {
  products: IProduct[];
  page: number;
  totalPages: number;
  search?: string;
}

export function ProductTable({ 
  products, 
  page, 
  totalPages,
  search 
}: ProductTableProps) {
  return (
    <div>
      <div className="p-4 border-b">
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
          {products.map((product) => (
            <TableRow key={product._id}>
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
                <Badge variant="outline">{product?.category?.name as string}</Badge>
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
                <Button variant="ghost" size="sm" asChild>
                  <Link href={`/admin/products/${product._id}`}>Edit</Link>
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
    </div>
  );
}