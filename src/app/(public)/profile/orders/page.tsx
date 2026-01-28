'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatPrice, formatDate } from '@/lib/utils';
import { Eye } from 'lucide-react';
import Navbar from '@/components/home/Navbar';

export default function OrdersPage() {
  // Mock data - replace with actual API call
  const orders = [
    {
      id: '1',
      orderNumber: 'ORD-1001',
      total: 299.99,
      status: 'delivered',
      createdAt: new Date().toISOString(),
      items: 3,
    },
    {
      id: '2',
      orderNumber: 'ORD-1002',
      total: 149.99,
      status: 'shipped',
      createdAt: new Date().toISOString(),
      items: 2,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans bg-brand-beige">
      <Navbar solid />
      <div className="container py-8 flex-grow">
        <div className="max-w-4xl mx-auto space-y-6">
          <div>
            <h1 className="text-3xl font-bold">My Orders</h1>
            <p className="text-muted-foreground">View and track your orders</p>
          </div>

          <div className="space-y-4">
            {orders.map((order) => (
              <Card key={order.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <p className="font-semibold text-lg">{order.orderNumber}</p>
                        <Badge>{order.status}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {order.items} items • Placed on {formatDate(order.createdAt)}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="font-bold text-lg">{formatPrice(order.total)}</p>
                      <Button variant="outline" size="sm" className="mt-2">
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </Button>
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
