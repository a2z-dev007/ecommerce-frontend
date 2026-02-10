"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useAdminOrders, useUpdateOrderStatus } from "@/features/admin/queries";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, Eye, Package, Truck, MoreHorizontal } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { OrderDetailsModal } from "@/features/admin/components/OrderDetailsModal";
import { ORDER_STATUS } from "@/lib/constants";

export default function AdminOrders() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [isDetailsModalOpen, setDetailsModalOpen] = useState(false);

  const { data, isLoading } = useAdminOrders({
    page,
    limit: 10,
    search,
    status: statusFilter !== "all" ? statusFilter : undefined,
  });
  const { mutate: updateStatus } = useUpdateOrderStatus();

  const orders = data?.data || [];
  const pagination = data?.pagination;

  const getStatusColor = (status: string) => {
    switch (status) {
      case ORDER_STATUS.PENDING:
        return "secondary";
      case ORDER_STATUS.PROCESSING:
        return "default";
      case ORDER_STATUS.SHIPPED:
        return "default";
      case ORDER_STATUS.DELIVERED:
        return "outline"; // Delivered could be default with different styling
      case ORDER_STATUS.CANCELLED:
        return "destructive";
      default:
        return "secondary";
    }
  };

  const openDetailsModal = (order: any) => {
    setSelectedOrder(order);
    setDetailsModalOpen(true);
  };

  useEffect(() => {
    setPage(1);
  }, [search, statusFilter]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Orders</h1>
          <p className="text-muted-foreground">
            Manage customer orders and fulfillment
          </p>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search orders..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                "all",
                "pending",
                "processing",
                "shipped",
                "delivered",
                "cancelled",
              ].map((status) => (
                <Button
                  key={status}
                  variant={statusFilter === status ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStatusFilter(status)}
                  className="capitalize"
                >
                  {status}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Orders List */}
      <Card>
        <CardHeader>
          <CardTitle>All Orders ({pagination?.total || 0})</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="h-24 w-full" />
              ))}
            </div>
          ) : orders.length === 0 ? (
            <div className="text-center py-12">
              <Package className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-semibold">No orders found</h3>
              <p className="text-muted-foreground">
                Orders will appear here once customers place them.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order: any) => (
                <div
                  key={order._id}
                  className="border rounded-lg p-4 hover:bg-muted/50 transition-colors group"
                >
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="p-2 bg-primary/10 rounded-lg text-primary">
                        <Package className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <div>
                          <p className="font-bold text-lg">
                            Order #
                            {order.orderNumber ||
                              order._id.slice(-6).toUpperCase()}
                          </p>
                          {/* <Badge variant={getStatusColor(order.status) as any} className="capitalize">
                            status : {order.status}
                          </Badge> */}
                          <Badge
                            variant={getStatusColor(order.status) as any}
                            className="capitalize"
                          >
                            {order.status}
                          </Badge>
                          <Badge
                            variant={
                              order.paymentStatus === "paid"
                                ? "default"
                                : "secondary"
                            }
                            className="capitalize bg-green-50 text-green-700 hover:bg-green-50"
                          >
                            Payment status : {order.paymentStatus || "pending"}
                          </Badge>
                          <Badge variant="outline" className="capitalize ml-2">
                            {order.paymentMethod === "cod"
                              ? "Cash on Delivery"
                              : "Online Payment"}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {order.user?.name || "Guest"} •{" "}
                          {formatDate(order.createdAt)}
                        </p>
                        <p className="text-sm font-medium mt-1">
                          {order.items?.length || 0} items •{" "}
                          {formatCurrency(order.totalAmount)}
                        </p>
                        {order.trackingNumber && (
                          <div className="flex items-center gap-2 mt-2 px-2 py-1 bg-muted rounded w-fit text-xs">
                            <Truck className="h-3 w-3" />
                            <span>
                              Tracking:{" "}
                              <span className="font-mono font-bold">
                                {order.trackingNumber}
                              </span>
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex md:flex-col gap-2 justify-end">
                      <Button
                        variant="default"
                        size="sm"
                        onClick={() => openDetailsModal(order)}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Details
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="sm">
                            Status <MoreHorizontal className="ml-2 h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {[
                            "pending",
                            "processing",
                            "shipped",
                            "delivered",
                            "cancelled",
                          ].map((status) => (
                            <DropdownMenuItem
                              key={status}
                              onClick={() =>
                                updateStatus({ id: order._id, status })
                              }
                              className="capitalize"
                              disabled={order.status === status}
                            >
                              Mark as {status}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {pagination && pagination.pages > 1 && (
            <div className="flex items-center justify-between mt-6 pt-6 border-t">
              <p className="text-sm text-muted-foreground">
                Showing {(page - 1) * 10 + 1} to{" "}
                {Math.min(page * 10, pagination.total)} of {pagination.total}{" "}
                orders
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage((p) => p + 1)}
                  disabled={page >= pagination.pages}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <OrderDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setDetailsModalOpen(false)}
        order={selectedOrder}
      />
    </div>
  );
}
