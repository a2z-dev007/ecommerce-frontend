'use client';

import { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { formatCurrency, formatDate } from '@/lib/utils';
import { useAddTracking, useUpdateOrderStatus } from '../queries';
import { Loader2, Package, Truck, User, MapPin, CreditCard, Clock } from 'lucide-react';

interface OrderDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    order?: any;
}

export function OrderDetailsModal({ isOpen, onClose, order }: OrderDetailsModalProps) {
    const [trackingNumber, setTrackingNumber] = useState(order?.trackingNumber || '');
    const [carrier, setCarrier] = useState(order?.carrier || '');

    const { mutate: addTracking, isPending: isAddingTracking } = useAddTracking();
    const { mutate: updateStatus, isPending: isUpdatingStatus } = useUpdateOrderStatus();

    const handleUpdateTracking = () => {
        if (!trackingNumber) return;
        addTracking({ id: order._id, trackingNumber, carrier });
    };

    if (!order) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <div className="flex items-center justify-between pr-8">
                        <DialogTitle className="text-xl">Order Details: #{order.orderNumber}</DialogTitle>
                        <Badge variant={order.status === 'delivered' ? 'default' : 'secondary'}>
                            {order.status}
                        </Badge>
                    </div>
                </DialogHeader>

                <div className="grid grid-cols-2 gap-6 mt-4">
                    <div className="space-y-4">
                        <div className="flex items-start gap-3">
                            <User className="h-5 w-5 text-muted-foreground mt-0.5" />
                            <div>
                                <p className="font-semibold">Customer</p>
                                <p className="text-sm">{order.user?.name || 'Guest Customer'}</p>
                                <p className="text-sm text-muted-foreground">{order.user?.email || order.shippingAddress?.email}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                            <div>
                                <p className="font-semibold">Shipping Address</p>
                                <p className="text-sm">
                                    {order.shippingAddress?.firstName} {order.shippingAddress?.lastName}<br />
                                    {order.shippingAddress?.address}<br />
                                    {order.shippingAddress?.city}, {order.shippingAddress?.state} {order.shippingAddress?.zipCode}<br />
                                    {order.shippingAddress?.country}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-start gap-3">
                            <CreditCard className="h-5 w-5 text-muted-foreground mt-0.5" />
                            <div>
                                <p className="font-semibold">Payment</p>
                                <p className="text-sm capitalize">{order.paymentMethod || 'Credit Card'}</p>
                                <Badge variant={order.paymentStatus === 'paid' ? 'default' : 'secondary'} className="mt-1">
                                    {order.paymentStatus}
                                </Badge>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                            <div>
                                <p className="font-semibold">Order Placed</p>
                                <p className="text-sm">{formatDate(order.createdAt)}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-6">
                    <p className="font-semibold mb-3 flex items-center gap-2">
                        <Package className="h-5 w-5" />
                        Order Items
                    </p>
                    <div className="border rounded-lg divide-y bg-muted/30">
                        {order.items?.map((item: any) => (
                            <div key={item._id || item.product?._id} className="flex items-center justify-between p-3 text-sm">
                                <div className="flex gap-3">
                                    {item.product?.images?.[0] && (
                                        <img
                                            src={item.product.images[0]}
                                            alt={item.product.name}
                                            className="w-10 h-10 rounded border object-cover bg-white"
                                        />
                                    )}
                                    <div>
                                        <p className="font-medium">{item.product?.name || 'Deleted Product'}</p>
                                        <p className="text-muted-foreground">Qty: {item.quantity} × {formatCurrency(item.price)}</p>
                                    </div>
                                </div>
                                <p className="font-semibold">{formatCurrency(item.price * item.quantity)}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-6 flex flex-col items-end gap-2 border-t pt-4">
                    <div className="flex justify-between w-full max-w-[200px] text-sm">
                        <span className="text-muted-foreground">Subtotal:</span>
                        <span>{formatCurrency(order.subtotal || order.total)}</span>
                    </div>
                    <div className="flex justify-between w-full max-w-[200px] text-sm">
                        <span className="text-muted-foreground">Shipping:</span>
                        <span>{formatCurrency(order.shippingCost || 0)}</span>
                    </div>
                    <div className="flex justify-between w-full max-w-[200px] text-lg font-bold border-t pt-2">
                        <span>Total:</span>
                        <span>{formatCurrency(order.total)}</span>
                    </div>
                </div>

                <div className="mt-6 pt-6 border-t">
                    <p className="font-semibold mb-3 flex items-center gap-2">
                        <Truck className="h-5 w-5" />
                        Fulfillment
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Tracking Number</label>
                            <Input
                                placeholder="Enter tracking number"
                                value={trackingNumber}
                                onChange={(e) => setTrackingNumber(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Carrier</label>
                            <div className="flex gap-2">
                                <Input
                                    placeholder="e.g. FedEx, BlueDart"
                                    value={carrier}
                                    onChange={(e) => setCarrier(e.target.value)}
                                />
                                <Button onClick={handleUpdateTracking} disabled={isAddingTracking || !trackingNumber}>
                                    {isAddingTracking ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Update'}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
