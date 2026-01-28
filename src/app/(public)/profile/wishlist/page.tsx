'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatPrice } from '@/lib/utils';
import { ShoppingCart, Trash2 } from 'lucide-react';
import Navbar from '@/components/home/Navbar';

export default function WishlistPage() {
  // Mock data
  const wishlistItems = [
    {
      id: '1',
      name: 'Premium Headphones',
      price: 299.99,
      image: '',
      inStock: true,
    },
    {
      id: '2',
      name: 'Wireless Mouse',
      price: 49.99,
      image: '',
      inStock: false,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans bg-brand-beige">
      <Navbar solid />
      <div className="container py-8 flex-grow">
        <div className="max-w-4xl mx-auto space-y-6">
          <div>
            <h1 className="text-3xl font-bold">My Wishlist</h1>
            <p className="text-muted-foreground">Items you want to buy later</p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {wishlistItems.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <div className="w-24 h-24 bg-muted rounded-lg flex-shrink-0" />

                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{item.name}</h3>
                      <p className="font-bold mb-2">{formatPrice(item.price)}</p>
                      <p className="text-sm text-muted-foreground mb-3">
                        {item.inStock ? 'In Stock' : 'Out of Stock'}
                      </p>

                      <div className="flex gap-2">
                        <Button size="sm" disabled={!item.inStock}>
                          <ShoppingCart className="mr-2 h-4 w-4" />
                          Add to Cart
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
