"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatPrice, formatDate } from "@/lib/utils";
import { Eye, Package, Truck, CheckCircle, Clock } from "lucide-react";
import { ROUTES } from "@/lib/constants";

export default function OrdersPage() {
  // Mock data - replace with actual API call
  const orders = [
    {
      id: "1",
      orderNumber: "ORD-1001",
      total: 299.99,
      status: "delivered",
      createdAt: new Date().toISOString(),
      items: 3,
    },
    {
      id: "2",
      orderNumber: "ORD-1002",
      total: 149.99,
      status: "shipped",
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      items: 2,
    },
    {
      id: "3",
      orderNumber: "ORD-1003",
      total: 59.99,
      status: "processing",
      createdAt: new Date(Date.now() - 172800000).toISOString(),
      items: 1,
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return <CheckCircle className="h-4 w-4" />;
      case "shipped":
        return <Truck className="h-4 w-4" />;
      case "processing":
        return <Package className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-700 hover:bg-green-100";
      case "shipped":
        return "bg-blue-100 text-blue-700 hover:bg-blue-100";
      case "processing":
        return "bg-orange-100 text-orange-700 hover:bg-orange-100";
      default:
        return "bg-gray-100 text-gray-700 hover:bg-gray-100";
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
          My Orders
        </h1>
        <p className="text-muted-foreground mt-1">
          View and track your order history.
        </p>
      </div>

      <div className="space-y-4">
        {orders.map((order) => (
          <Card
            key={order.id}
            className="border-none shadow-md hover:shadow-lg transition-all bg-white overflow-hidden group"
          >
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row">
                {/* Status Strip - Top on Mobile, Left on Desktop */}
                <div
                  className={`w-full h-1 md:w-1.5 md:h-auto ${
                    order.status === "delivered"
                      ? "bg-green-500"
                      : order.status === "shipped"
                        ? "bg-blue-500"
                        : "bg-orange-500"
                  }`}
                />

                <div className="flex-grow p-5 md:p-6 flex flex-col gap-4">
                  {/* Top Row: Order ID and Status */}
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 leading-none mb-2">
                        {order.orderNumber}
                      </h3>
                      <div className="flex items-center text-sm text-muted-foreground gap-3">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          <span className="hidden xs:inline">Placed on</span>
                          {formatDate(order.createdAt)}
                        </span>
                        <span className="h-1 w-1 rounded-full bg-gray-300" />
                        <span>
                          {order.items} {order.items === 1 ? "item" : "items"}
                        </span>
                      </div>
                    </div>

                    <Badge
                      className={`rounded-full px-3 py-1 text-xs gap-1.5 shadow-none border-0 shrink-0 ${getStatusColor(order.status)}`}
                    >
                      {getStatusIcon(order.status)}
                      <span className="capitalize hidden sm:inline">
                        {order.status}
                      </span>
                    </Badge>
                  </div>

                  {/* Divider for mobile visual separation */}
                  <div className="h-px w-full bg-gray-100 md:hidden" />

                  {/* Bottom Row: Total and Action */}
                  <div className="flex items-end justify-between md:justify-end md:gap-8">
                    <div>
                      <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider mb-0.5">
                        Total Amount
                      </p>
                      <p className="font-bold text-xl text-primary leading-none">
                        {formatPrice(order.total)}
                      </p>
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full shadow-sm hover:bg-gray-50 border-gray-200"
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
