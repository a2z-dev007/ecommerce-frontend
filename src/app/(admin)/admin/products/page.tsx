'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useAdminProducts, useDeleteProduct, useBulkDeleteProducts, useBulkUpdateProducts } from '@/features/admin/queries';
import { Skeleton } from '@/components/ui/skeleton';
import { Plus, Search, Trash2, Edit, MoreVertical, Package, Filter, Download, Eye } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import Image from 'next/image';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Checkbox } from '@/components/ui/checkbox';
import { ProductModal } from '@/features/admin/components/ProductModal';
import { ConfirmModal } from '@/components/ui/confirm-modal';

export default function AdminProducts() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [isClient, setIsClient] = useState(false);

  // Modal states
  const [isProductModalOpen, setProductModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const { data, isLoading } = useAdminProducts({ page, limit: 10, search });
  const { mutate: deleteProduct, isPending: isDeleting } = useDeleteProduct();
  const { mutate: bulkDelete, isPending: isBulkDeleting } = useBulkDeleteProducts();
  const { mutate: bulkUpdate } = useBulkUpdateProducts();

  const products = data?.data || [];
  const pagination = data?.pagination;

  // Calculate stats safely
  const stats = isClient && products.length > 0 ? {
    total: pagination?.total || 0,
    active: products.filter((p: any) => p.isActive).length,
    lowStock: products.filter((p: any) => p.stock <= 10 && p.stock > 0).length,
    outOfStock: products.filter((p: any) => p.stock === 0).length,
  } : {
    total: pagination?.total || 0,
    active: 0,
    lowStock: 0,
    outOfStock: 0,
  };

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

  // Show loading skeleton on initial render to prevent hydration issues
  if (!isClient) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Skeleton className="h-9 w-48 mb-2" />
            <Skeleton className="h-5 w-64" />
          </div>
          <Skeleton className="h-10 w-32" />
        </div>

        <Card>
          <CardContent className="pt-6">
            <Skeleton className="h-10 w-full max-w-md" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-48" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="h-20 w-full" />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-10xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              Products
            </h1>
            <p className="text-slate-600 text-lg">Manage your product catalog with ease</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="hidden sm:flex">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button onClick={openAddModal} className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg">
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-0 shadow-md bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Total Products</p>
                  {isLoading ? (
                    <Skeleton className="h-8 w-16 mt-1" />
                  ) : (
                    <p className="text-2xl font-bold text-slate-900">{stats.total}</p>
                  )}
                </div>
                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Package className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Active Products</p>
                  {isLoading ? (
                    <Skeleton className="h-8 w-16 mt-1" />
                  ) : (
                    <p className="text-2xl font-bold text-green-600">{stats.active}</p>
                  )}
                </div>
                <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Eye className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Low Stock</p>
                  {isLoading ? (
                    <Skeleton className="h-8 w-16 mt-1" />
                  ) : (
                    <p className="text-2xl font-bold text-orange-600">{stats.lowStock}</p>
                  )}
                </div>
                <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Package className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Out of Stock</p>
                  {isLoading ? (
                    <Skeleton className="h-8 w-16 mt-1" />
                  ) : (
                    <p className="text-2xl font-bold text-red-600">{stats.outOfStock}</p>
                  )}
                </div>
                <div className="h-12 w-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <Package className="h-6 w-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search products by name or SKU..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
                />
              </div>
              <Button variant="outline" size="sm" className="hidden sm:flex">
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>
              {selectedProducts.length > 0 && (
                <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="text-sm font-medium text-slate-700">
                    {selectedProducts.length} selected
                  </span>
                  <div className="h-4 w-px bg-slate-300" />
                  <Button variant="outline" size="sm" onClick={handleBulkActivate} className="text-green-600 hover:text-green-700">
                    Activate
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleBulkDeactivate} className="text-orange-600 hover:text-orange-700">
                    Deactivate
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleBulkDelete} disabled={isBulkDeleting} className="text-red-600 hover:text-red-700">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Products Table */}
        <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-semibold text-slate-900">
              Product Catalog
              {isLoading ? (
                <Skeleton className="ml-2 h-4 w-20 inline-block" />
              ) : (
                <span className="ml-2 text-sm font-normal text-slate-500">
                  ({stats.total} total)
                </span>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {isLoading ? (
              <div className="space-y-4 p-6">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-center gap-4">
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-16 w-16 rounded-lg" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-48" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-6 w-16" />
                  </div>
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-16 px-6">
                <div className="mx-auto h-24 w-24 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                  <Package className="h-12 w-12 text-slate-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">No products found</h3>
                <p className="text-slate-600 mb-6 max-w-sm mx-auto">
                  {search ? 'Try adjusting your search terms or filters.' : 'Get started by creating your first product.'}
                </p>
                {!search && (
                  <Button onClick={openAddModal} className="bg-gradient-to-r from-blue-600 to-blue-700">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Your First Product
                  </Button>
                )}
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {/* Table Header */}
                <div className="flex items-center gap-4 px-6 py-4 bg-slate-50/50 border-b border-slate-200">
                  <Checkbox
                    checked={selectedProducts.length === products.length && products.length > 0}
                    onCheckedChange={handleSelectAll}
                    className="border-slate-300"
                  />
                  <div className="flex-1 grid grid-cols-5 gap-4 text-sm font-semibold text-slate-700">
                    <div className="col-span-2">Product Details</div>
                    <div>Pricing</div>
                    <div>Inventory</div>
                    <div>Status</div>
                    
                  </div>
                  <div className="w-20 text-center text-sm font-semibold text-slate-700">Actions</div>
                </div>

                {/* Product Rows */}
                {products.map((product: any, index: number) => (
                  <div
                    key={product._id}
                    className={`flex items-center gap-4 px-6 py-4 hover:bg-slate-50/50 transition-all duration-200 group ${index % 2 === 0 ? 'bg-white' : 'bg-slate-50/30'
                      }`}
                  >
                    <Checkbox
                      checked={selectedProducts.includes(product._id)}
                      onCheckedChange={() => handleSelect(product._id)}
                      className="border-slate-300"
                    />
                    <div className="flex-1 grid grid-cols-5 gap-4 items-center">
                      {/* Product Info */}
                      <div className="col-span-2 flex items-center gap-4">
                        <div className="relative">
                          {product.images?.[0] ? (
                            <div className="relative w-16 h-16 rounded-xl overflow-hidden shadow-sm border border-slate-200">
                              <Image
                                src={product.images[0]}
                                alt={product.name}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-200"
                              />
                            </div>
                          ) : (
                            <div className="w-16 h-16 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl flex items-center justify-center border border-slate-200">
                              <Package className="h-8 w-8 text-slate-400" />
                            </div>
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-semibold text-slate-900 truncate group-hover:text-blue-600 transition-colors">
                            {product.name}
                          </h3>
                          <p className="text-sm text-slate-500 font-mono">{product.sku}</p>
                          {product.category && (
                            <p className="text-xs text-slate-400 mt-1">{product.category.name || product.category}</p>
                          )}
                        </div>
                      </div>

                      {/* Price */}
                      <div>
                        <p className="font-bold text-slate-900 text-lg">{formatCurrency(product.price)}</p>
                        {product.comparePrice && product.comparePrice > product.price && (
                          <p className="text-sm text-slate-400 line-through">{formatCurrency(product.comparePrice)}</p>
                        )}
                      </div>

                      {/* Stock */}
                      <div>
                        <Badge
                          variant={product.stock > 10 ? 'default' : product.stock > 0 ? 'secondary' : 'destructive'}
                          className={`font-medium ${product.stock > 10
                              ? 'bg-green-100 text-green-800 hover:bg-green-200'
                              : product.stock > 0
                                ? 'bg-orange-100 text-orange-800 hover:bg-orange-200'
                                : 'bg-red-100 text-red-800 hover:bg-red-200'
                            }`}
                        >
                          {product.stock} {product.stock === 1 ? 'unit' : 'units'}
                        </Badge>
                      </div>

                      {/* Status */}
                      <div>
                        <Badge
                          variant={product.isActive ? 'default' : 'secondary'}
                          className={`font-medium ${product.isActive
                              ? 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                        >
                          {product.isActive ? 'Active' : 'Inactive'}
                        </Badge>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="w-20 flex justify-center">
                      <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-slate-500 hover:text-slate-700 hover:bg-slate-100"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem onClick={() => openEditModal(product)} className="cursor-pointer">
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Product
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => bulkUpdate({ ids: [product._id], updates: { isActive: !product.isActive } })}
                          className="cursor-pointer"
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          {product.isActive ? 'Deactivate' : 'Activate'}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-red-600 focus:text-red-600 cursor-pointer"
                          onClick={() => openDeleteModal(product)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete Product
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Enhanced Pagination */}
            {pagination && pagination.pages > 1 && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 bg-slate-50/30 border-t border-slate-200">
                <p className="text-sm text-slate-600">
                  Showing <span className="font-medium">{((page - 1) * 10) + 1}</span> to{' '}
                  <span className="font-medium">{Math.min(page * 10, pagination.total)}</span> of{' '}
                  <span className="font-medium">{pagination.total}</span> products
                </p>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="border-slate-300 hover:bg-slate-50"
                  >
                    Previous
                  </Button>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: Math.min(5, pagination.pages) }, (_, i) => {
                      const pageNum = i + 1;
                      return (
                        <Button
                          key={pageNum}
                          variant={page === pageNum ? "default" : "outline"}
                          size="sm"
                          onClick={() => setPage(pageNum)}
                          className={`w-8 h-8 p-0 ${page === pageNum
                              ? 'bg-blue-600 hover:bg-blue-700'
                              : 'border-slate-300 hover:bg-slate-50'
                            }`}
                        >
                          {pageNum}
                        </Button>
                      );
                    })}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage(p => p + 1)}
                    disabled={page >= pagination.pages}
                    className="border-slate-300 hover:bg-slate-50"
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
    </div>
  );
}