'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingCart, User, Search, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/use-cart';
import { useAuth } from '@/hooks/use-auth';
import { ROUTES } from '@/lib/constants';

export function Header() {
  const { getItemCount } = useCart();
  const { isAuthenticated, user } = useAuth();
  const [cartCount, setCartCount] = useState(0);
  const [mounted, setMounted] = useState(false);

  // Only access client-side state after hydration
  useEffect(() => {
    setMounted(true);
    setCartCount(getItemCount());
  }, [getItemCount]);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
          
          <Link href={ROUTES.HOME} className="flex items-center space-x-2">
            <span className="text-xl font-bold">Store</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link href={ROUTES.PRODUCTS} className="text-sm font-medium hover:text-primary">
              Products
            </Link>
            <Link href="/categories" className="text-sm font-medium hover:text-primary">
              Categories
            </Link>
            <Link href="/deals" className="text-sm font-medium hover:text-primary">
              Deals
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5" />
          </Button>

          <Link href={ROUTES.CART}>
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {mounted && cartCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-xs text-primary-foreground flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Button>
          </Link>

          {mounted ? (
            isAuthenticated ? (
              <Link href={user?.role === 'admin' ? ROUTES.ADMIN_DASHBOARD : ROUTES.PROFILE}>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
            ) : (
              <Link href={ROUTES.LOGIN}>
                <Button size="sm">Sign In</Button>
              </Link>
            )
          ) : (
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
