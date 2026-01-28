'use client';

import { useQuery } from '@tanstack/react-query';
import { productsApi } from '@/features/products/api';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { QUERY_KEYS, ROUTES } from '@/lib/constants';
import { formatPrice } from '@/lib/utils';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/hooks/use-cart';
import { toast } from 'sonner';

export default function ProductsPage() {
  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.PRODUCTS],
    queryFn: () => productsApi.getProducts({ page: 1, limit: 12 }),
  });

  const { addItem } = useCart();

  const handleAddToCart = (product: any) => {
    addItem(product);
    toast.success('Added to cart');
  };

  if (isLoading) {
    return (
      <div className="container py-10 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {[...Array(8)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <div className="aspect-square bg-muted" />
              <CardContent className="p-4">
                <div className="h-4 bg-muted rounded mb-2" />
                <div className="h-4 bg-muted rounded w-2/3" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container py-10 md:py-16">
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-2">All Products</h1>
        <p className="text-muted-foreground">Browse our complete collection</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {data?.data.map((product) => (
          <Card key={product.id} className="group overflow-hidden">
            <Link href={ROUTES.PRODUCT_DETAIL(product.slug)}>
              <div className="aspect-square bg-muted relative overflow-hidden">
                {product.images?.[0] && (
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform"
                  />
                )}
              </div>
            </Link>
            <CardContent className="p-4">
              <Link href={ROUTES.PRODUCT_DETAIL(product.slug)}>
                <h3 className="font-semibold mb-1 hover:text-primary line-clamp-2">
                  {product.name}
                </h3>
              </Link>
              <p className="text-sm text-muted-foreground mb-2">{product.category?.name}</p>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold">{formatPrice(product.price)}</span>
                {product.compareAtPrice && (
                  <span className="text-sm text-muted-foreground line-through">
                    {formatPrice(product.compareAtPrice)}
                  </span>
                )}
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Button
                className="w-full"
                onClick={() => handleAddToCart(product)}
                disabled={product.stock === 0}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
