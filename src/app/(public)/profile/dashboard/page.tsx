'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import Link from 'next/link';
import { ROUTES } from '@/lib/constants';
import { Package, User, MapPin, Heart, ShoppingBag, ChevronRight, Zap } from 'lucide-react';

export default function DashboardPage() {
    const { user } = useAuth();

    const stats = [
        { label: 'Total Orders', value: '0', icon: Package, color: 'text-blue-500' },
        { label: 'Wishlist Items', value: '0', icon: Heart, color: 'text-pink-500' },
        { label: 'Active Addresses', value: user?.addresses?.length || 0, icon: MapPin, color: 'text-green-500' },
    ];

    return (
        <div className="container py-8">
            <div className="max-w-6xl mx-auto space-y-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight mb-2">Welcome back, {user?.name || user?.firstName}!</h1>
                    <p className="text-muted-foreground">Here&apos;s an overview of your account activity.</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {stats.map((stat) => (
                        <Card key={stat.label} className="border-none shadow-md overflow-hidden bg-white">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground mb-1">{stat.label}</p>
                                        <p className="text-3xl font-bold">{stat.value}</p>
                                    </div>
                                    <div className={`p-3 rounded-2xl bg-muted/50 ${stat.color}`}>
                                        <stat.icon className="h-6 w-6" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Main Dashboard Actions */}
                    <div className="md:col-span-2 space-y-6">
                        <Card className="border-none shadow-md bg-white">
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle>Recent Orders</CardTitle>
                                    <Link href={ROUTES.ORDERS}>
                                        <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                                            View All <ChevronRight className="ml-1 h-3 w-3" />
                                        </Button>
                                    </Link>
                                </div>
                                <CardDescription>You haven&apos;t placed any orders recently.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-col items-center justify-center py-12 text-center border-2 border-dashed rounded-xl">
                                    <div className="p-4 rounded-full bg-primary/10 mb-4 text-primary">
                                        <ShoppingBag className="h-8 w-8" />
                                    </div>
                                    <h3 className="text-lg font-semibold mb-2">No orders found</h3>
                                    <p className="text-sm text-muted-foreground mb-6">Looks like you haven&apos;t made any purchases yet.</p>
                                    <Link href={ROUTES.PRODUCTS}>
                                        <Button className="rounded-full shadow-lg">Start Shopping</Button>
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Quick Links / Profile Summary */}
                    <div className="space-y-6">
                        <Card className="border-none shadow-md bg-white">
                            <CardHeader>
                                <CardTitle>Quick Links</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <Link href={ROUTES.PROFILE} className="flex items-center p-3 rounded-xl hover:bg-muted/50 transition-colors group">
                                    <div className="p-2 rounded-lg bg-orange-100 text-orange-600 mr-3">
                                        <User className="h-4 w-4" />
                                    </div>
                                    <span className="text-sm font-medium">Profile Settings</span>
                                    <ChevronRight className="ml-auto h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
                                </Link>
                                <Link href={ROUTES.ADDRESSES} className="flex items-center p-3 rounded-xl hover:bg-muted/50 transition-colors group">
                                    <div className="p-2 rounded-lg bg-purple-100 text-purple-600 mr-3">
                                        <MapPin className="h-4 w-4" />
                                    </div>
                                    <span className="text-sm font-medium">Saved Addresses</span>
                                    <ChevronRight className="ml-auto h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
                                </Link>
                                <Link href={ROUTES.WISHLIST} className="flex items-center p-3 rounded-xl hover:bg-muted/50 transition-colors group">
                                    <div className="p-2 rounded-lg bg-pink-100 text-pink-600 mr-3">
                                        <Heart className="h-4 w-4" />
                                    </div>
                                    <span className="text-sm font-medium">My Wishlist</span>
                                    <ChevronRight className="ml-auto h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
                                </Link>
                            </CardContent>
                        </Card>

                        <Card className="border-none shadow-md bg-gradient-to-br from-primary to-primary/80 text-white overflow-hidden">
                            <CardContent className="p-6 relative">
                                <div className="relative z-10">
                                    <h3 className="text-lg font-bold mb-2">Need Help?</h3>
                                    <p className="text-sm text-white/80 mb-4">Our support team is here to assist you with any questions.</p>
                                    <Button variant="secondary" className="w-full rounded-full shadow-lg">Contact Support</Button>
                                </div>
                                <div className="absolute top-0 right-0 p-4 opacity-20 translate-x-4 -translate-y-4">
                                    <Zap className="h-24 w-24 fill-white" />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
