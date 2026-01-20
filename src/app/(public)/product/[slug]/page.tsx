'use client';

import { useQuery } from '@tanstack/react-query';
import { productsApi } from '@/features/products/api';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { QUERY_KEYS } from '@/lib/constants';
import { formatPrice } from '@/lib/utils';
import { ShoppingCart, Heart } from 'lucide-react';
import { useCart } from '@/hooks/use-cart';
import { toast } from 'sonner';
import { useState, use } from 'react';

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  const { data: product, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.PRODUCT, slug],
    queryFn: () => productsApi.getProduct(slug),
  });

  const handleAddToCart = () => {
    if (product) {
      addItem(product, quantity);
      toast.success('Added to cart');
    }
  };

  if (isLoading) {
    return (
      <div className="container py-8">
        <div className="grid md:grid-cols-2 gap-8 animate-pulse">
          <div className="aspect-square bg-muted rounded-lg" />
          <div className="space-y-4">
            <div className="h-8 bg-muted rounded w-3/4" />
            <div className="h-4 bg-muted rounded w-1/2" />
            <div className="h-20 bg-muted rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container py-8">
        <p>Product not found</p>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Images */}
        <div className="space-y-4">
          <div className="aspect-square bg-muted rounded-lg overflow-hidden">
            {product.images?.[0] && (
              <img
                src={product.images[0]}
                alt={product.name}
                className="object-cover w-full h-full"
              />
            )}
          </div>
          {product.images && product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-4">
              {product.images.slice(1, 5).map((image, i) => (
                <div key={i} className="aspect-square bg-muted rounded-lg overflow-hidden">
                  <img src={image} alt={`${product.name} ${i + 2}`} className="object-cover w-full h-full" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-muted-foreground">{product.category?.name}</p>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-3xl font-bold">{formatPrice(product.price)}</span>
            {product.compareAtPrice && (
              <span className="text-xl text-muted-foreground line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
          </div>

          {product.stock > 0 ? (
            <Badge variant="secondary">In Stock ({product.stock} available)</Badge>
          ) : (
            <Badge variant="destructive">Out of Stock</Badge>
          )}

          <div className="prose prose-sm">
            <p>{product.description}</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center border rounded-md">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                -
              </Button>
              <span className="px-4">{quantity}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
              >
                +
              </Button>
            </div>
          </div>

          <div className="flex gap-4">
            <Button
              size="lg"
              className="flex-1"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>
            <Button size="lg" variant="outline">
              <Heart className="h-5 w-5" />
            </Button>
          </div>

          {product.sku && (
            <div className="text-sm text-muted-foreground">
              SKU: {product.sku}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
