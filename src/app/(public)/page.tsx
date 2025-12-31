'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, ShoppingBag, Zap, Shield, Truck } from 'lucide-react';
import { ROUTES } from '@/lib/constants';
import { useQuery } from '@tanstack/react-query';
import { categoriesApi } from '@/features/categories/api';
import { productsApi } from '@/features/products/api';
import { Skeleton } from '@/components/ui/skeleton';
import { formatPrice } from '@/lib/utils';

export default function HomePage() {
  const { data: categories, isLoading: categoriesLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: () => categoriesApi.getCategories({ limit: 4 }),
  });

  const { data: featuredProducts, isLoading: productsLoading } = useQuery({
    queryKey: ['featured-products'],
    queryFn: () => productsApi.getFeaturedProducts(),
  });

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/20 via-background to-secondary/10 py-20 md:py-32 lg:py-40">
        <div className="container relative z-10 px-4 md:px-6">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-5xl font-extrabold tracking-tight sm:text-7xl mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
              Elevate Your Lifestyle
            </h1>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              Experience the future of shopping with our curated collection of premium products.
              Quality meets innovation in every item we offer.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <Link href={ROUTES.PRODUCTS}>
                <Button size="lg" className="h-14 px-8 text-lg rounded-full shadow-lg hover:shadow-primary/20 transition-all">
                  Shop Collection <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/categories">
                <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full border-2">
                  Explore Categories
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Abstract shapes for premium feel */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-3xl" />
      </section>

      {/* Featured Categories */}
      <section className="py-16 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-2">Shop by Category</h2>
              <p className="text-muted-foreground">Find exactly what you're looking for</p>
            </div>
            <Link href="/categories" className="text-primary font-medium hover:underline flex items-center gap-1">
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            {categoriesLoading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="aspect-[4/3] rounded-2xl" />
              ))
            ) : (
              categories?.data.map((category) => (
                <Link
                  key={category.id}
                  href={`/products?category=${category.slug}`}
                  className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-muted transition-all hover:scale-[1.02]"
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{ backgroundImage: `url(${category.image || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80'})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-6 left-6 text-white">
                    <h3 className="text-xl font-bold mb-1">{category.name}</h3>
                    <p className="text-sm text-white/70 opacity-0 group-hover:opacity-100 transition-opacity">
                      Browse Collection
                    </p>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 md:py-24 lg:py-32 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-2">Featured Products</h2>
              <p className="text-muted-foreground">Carefully selected for their quality and design</p>
            </div>
            <Link href={ROUTES.PRODUCTS} className="text-primary font-medium hover:underline flex items-center gap-1">
              Shop All Products <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {productsLoading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="aspect-square rounded-2xl" />
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-4 w-1/3" />
                </div>
              ))
            ) : (
              featuredProducts?.map((product) => (
                <Link key={product.id} href={`/product/${product.slug}`} className="group">
                  <div className="relative aspect-square rounded-2xl overflow-hidden bg-white mb-4 shadow-sm group-hover:shadow-xl transition-all duration-300">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                    />
                    <Button
                      size="icon"
                      className="absolute bottom-4 right-4 rounded-full opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0"
                    >
                      <ShoppingBag className="h-5 w-5" />
                    </Button>
                  </div>
                  <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-primary font-bold">{formatPrice(product.price)}</p>
                </Link>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Features with more style */}
      <section className="py-16 md:py-24 lg:py-32 border-t">
        <div className="container px-4 md:px-6">
          <div className="grid md:grid-cols-4 gap-8 md:gap-12">
            <div className="flex flex-col items-center text-center group">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <Truck className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-bold mb-2">Global Shipping</h3>
              <p className="text-sm text-muted-foreground">Fast & reliable delivery to your doorstep</p>
            </div>
            <div className="flex flex-col items-center text-center group">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <Shield className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-bold mb-2">Secure Checkout</h3>
              <p className="text-sm text-muted-foreground">Your data is protected with 256-bit encryption</p>
            </div>
            <div className="flex flex-col items-center text-center group">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <Zap className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-bold mb-2">Instant Support</h3>
              <p className="text-sm text-muted-foreground">24/7 dedicated customer service team</p>
            </div>
            <div className="flex flex-col items-center text-center group">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <ArrowRight className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-bold mb-2">Hassle-free Returns</h3>
              <p className="text-sm text-muted-foreground">30-day money back guarantee policy</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
