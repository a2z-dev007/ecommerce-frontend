'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useAdminProducts, useDeleteProduct, useBulkDeleteProducts, useBulkUpdateProducts } from '@/features/admin/queries';
import { Skeleton } from '@/components/ui/skeleton';
import { Plus, Search, Trash2, Edit, MoreVertical, Package } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import Image from 'next/image';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Checkbox } from '@/components/ui/checkbox';
import { ProductModal } from '@/features/admin/components/ProductModal';
import { ConfirmModal } from '@/components/ui/confirm-modal';

export default function AdminProducts() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  // Modal states
  const [isProductModalOpen, setProductModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const { data, isLoading } = useAdminProducts({ page, limit: 10, search });
  const { mutate: deleteProduct, isPending: isDeleting } = useDeleteProduct();
  const { mutate: bulkDelete, isPending: isBulkDeleting } = useBulkDeleteProducts();
  const { mutate: bulkUpdate } = useBulkUpdateProducts();

  const products = data?.data || [];
  const pagination = data?.pagination;

  const handleSelectAll = () => {
    if (selectedProducts.length === products.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(products.map((p: any) => p._id));
    }
  };

  const handleSelect = (id: string) => {
    setSelectedProducts(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const handleBulkDelete = () => {
    bulkDelete(selectedProducts, {
      onSuccess: () => {
        setSelectedProducts([]);
      }
    });
  };

  const handleBulkActivate = () => {
    bulkUpdate({ ids: selectedProducts, updates: { isActive: true } });
    setSelectedProducts([]);
  };

  const handleBulkDeactivate = () => {
    bulkUpdate({ ids: selectedProducts, updates: { isActive: false } });
    setSelectedProducts([]);
  };

  const openAddModal = () => {
    setSelectedProduct(null);
    setProductModalOpen(true);
  };

  const openEditModal = (product: any) => {
    setSelectedProduct(product);
    setProductModalOpen(true);
  };

  const openDeleteModal = (product: any) => {
    setSelectedProduct(product);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedProduct) {
      deleteProduct(selectedProduct._id, {
        onSuccess: () => {
          setDeleteModalOpen(false);
          setSelectedProduct(null);
        }
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Products</h1>
          <p className="text-muted-foreground">Manage your product catalog</p>
        </div>
        <Button onClick={openAddModal}>
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            {selectedProducts.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  {selectedProducts.length} selected
                </span>
                <Button variant="outline" size="sm" onClick={handleBulkActivate}>
                  Activate
                </Button>
                <Button variant="outline" size="sm" onClick={handleBulkDeactivate}>
                  Deactivate
                </Button>
                <Button variant="destructive" size="sm" onClick={handleBulkDelete} disabled={isBulkDeleting}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Products ({pagination?.total || 0})</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="h-20 w-full" />
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-12">
              <Package className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-semibold">No products found</h3>
              <p className="text-muted-foreground">Get started by creating your first product.</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-4 pb-2 border-b">
                <Checkbox
                  checked={selectedProducts.length === products.length && products.length > 0}
                  onCheckedChange={handleSelectAll}
                />
                <div className="flex-1 grid grid-cols-5 gap-4 text-sm font-medium text-muted-foreground">
                  <div className="col-span-2">Product</div>
                  <div>Price</div>
                  <div>Stock</div>
                  <div>Status</div>
                </div>
                <div className="w-10" />
              </div>

              {products.map((product: any) => (
                <div key={product._id} className="flex items-center gap-4 group hover:bg-muted/50 p-2 rounded-lg transition-colors">
                  <Checkbox
                    checked={selectedProducts.includes(product._id)}
                    onCheckedChange={() => handleSelect(product._id)}
                  />
                  <div className="flex-1 grid grid-cols-5 gap-4 items-center">
                    <div className="col-span-2 flex items-center gap-3">
                      {product.images?.[0] ? (
                        <div className="relative w-12 h-12">
                          <Image
                            src={product.images[0]}
                            alt={product.name}
                            fill
                            className="rounded-lg object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                          <Package className="h-6 w-6 text-muted-foreground" />
                        </div>
                      )}
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-muted-foreground">{product.sku}</p>
                      </div>
                    </div>
                    <div className="font-medium">{formatCurrency(product.price)}</div>
                    <div>
                      <Badge variant={product.stock > 10 ? 'default' : product.stock > 0 ? 'secondary' : 'destructive'}>
                        {product.stock} in stock
                      </Badge>
                    </div>
                    <div>
                      <Badge variant={product.isActive ? 'default' : 'secondary'}>
                        {product.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => openEditModal(product)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-destructive"
                        onClick={() => openDeleteModal(product)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {pagination && pagination.totalPages > 1 && (
            <div className="flex items-center justify-between mt-6 pt-6 border-t">
              <p className="text-sm text-muted-foreground">
                Showing {((page - 1) * 10) + 1} to {Math.min(page * 10, pagination.total)} of {pagination.total} products
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage(p => p + 1)}
                  disabled={page >= pagination.totalPages}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <ProductModal
        isOpen={isProductModalOpen}
        onClose={() => setProductModalOpen(false)}
        product={selectedProduct}
      />

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Product"
        description={`Are you sure you want to delete "${selectedProduct?.name}"? This action cannot be undone.`}
        isLoading={isDeleting}
      />
    </div>
  );
}
