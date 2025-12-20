'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useAdminProducts } from '@/features/admin/queries';
import { Warehouse, AlertTriangle, Package, Edit2 } from 'lucide-react';
import { AdjustStockModal } from '@/features/admin/components/AdjustStockModal';

export default function AdminInventory() {
  const [page, setPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isAdjustModalOpen, setAdjustModalOpen] = useState(false);

  const { data, isLoading } = useAdminProducts({ page, limit: 20 });

  const products = data?.data || [];
  const lowStock = products.filter((p: any) => p.stock > 0 && p.stock <= 10);
  const outOfStock = products.filter((p: any) => p.stock === 0);

  const openAdjustModal = (product: any) => {
    setSelectedProduct(product);
    setAdjustModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Inventory Management</h1>
          <p className="text-muted-foreground">Monitor and manage product stock levels</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{products.length}</div>
            <p className="text-xs text-muted-foreground mt-1">In inventory</p>
          </CardContent>
        </Card>

        <Card className="border-orange-200 bg-orange-50/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-orange-600" />
              Low Stock
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{lowStock.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Need restocking</p>
          </CardContent>
        </Card>

        <Card className="border-red-200 bg-red-50/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Package className="h-4 w-4 text-red-600" />
              Out of Stock
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{outOfStock.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Unavailable</p>
          </CardContent>
        </Card>
      </div>

      {lowStock.length > 0 && (
        <Card className="border-orange-200">
          <CardHeader>
            <CardTitle>Low Stock Alert</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {lowStock.map((product: any) => (
                <div key={product._id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-muted-foreground">{product.sku}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                      {product.stock} left
                    </Badge>
                    <Button variant="outline" size="sm" onClick={() => openAdjustModal(product)}>
                      <Edit2 className="h-4 w-4 mr-2" />
                      Adjust
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {outOfStock.length > 0 && (
        <Card className="border-red-200">
          <CardHeader>
            <CardTitle>Out of Stock</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {outOfStock.map((product: any) => (
                <div key={product._id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-muted-foreground">{product.sku}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge variant="destructive">Out of Stock</Badge>
                    <Button variant="outline" size="sm" onClick={() => openAdjustModal(product)}>
                      <Edit2 className="h-4 w-4 mr-2" />
                      Adjust
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {!isLoading && products.filter((p: any) => p.stock > 10).length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>In Stock Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {products.filter((p: any) => p.stock > 10).map((product: any) => (
                <div key={product._id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-muted-foreground">{product.sku}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge variant="default" className="bg-green-100 text-green-700 hover:bg-green-100">
                      {product.stock} in stock
                    </Badge>
                    <Button variant="outline" size="sm" onClick={() => openAdjustModal(product)}>
                      <Edit2 className="h-4 w-4 mr-2" />
                      Adjust
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {isLoading && (
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <AdjustStockModal
        isOpen={isAdjustModalOpen}
        onClose={() => setAdjustModalOpen(false)}
        product={selectedProduct}
      />
    </div>
  );
}
