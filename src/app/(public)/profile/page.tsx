'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/use-auth';
import Link from 'next/link';
import { ROUTES } from '@/lib/constants';
import { User, Package, MapPin, Heart, LayoutDashboard, Settings, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

export default function ProfilePage() {
  const { user } = useAuth();
  const pathname = usePathname();

  const sidebarLinks = [
    { label: 'Dashboard', href: ROUTES.DASHBOARD, icon: LayoutDashboard },
    { label: 'Profile Settings', href: ROUTES.PROFILE, icon: User },
    { label: 'My Orders', href: ROUTES.ORDERS, icon: Package },
    { label: 'Saved Addresses', href: ROUTES.ADDRESSES, icon: MapPin },
    { label: 'Wishlist', href: ROUTES.WISHLIST, icon: Heart },
  ];

  return (
    <div className="container py-8 md:py-12">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight">Account Settings</h1>
          <p className="text-muted-foreground">Manage your personal information and security preferences.</p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="space-y-1">
            {sidebarLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start h-11 px-4 rounded-xl transition-all duration-200",
                    pathname === link.href ? "bg-primary/10 text-primary font-semibold" : "hover:bg-muted"
                  )}
                >
                  <link.icon className={cn("mr-3 h-5 w-5", pathname === link.href ? "text-primary" : "text-muted-foreground")} />
                  {link.label}
                </Button>
              </Link>
            ))}
          </aside>

          {/* Main Content */}
          <div className="md:col-span-3 space-y-8">
            <Card className="border-none shadow-md bg-white overflow-hidden">
              <div className="h-2 bg-primary" />
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  Personal Information
                </CardTitle>
                <CardDescription>Update your profile details and how we contact you.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="John" defaultValue={user?.firstName || user?.name?.split(' ')[0]} className="rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Doe" defaultValue={user?.lastName || user?.name?.split(' ')[1]} className="rounded-xl" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" defaultValue={user?.email} disabled className="rounded-xl bg-muted/50" />
                  <p className="text-xs text-muted-foreground italic">Email address cannot be changed.</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative">
                    <Input id="phone" placeholder="+1 (555) 000-0000" defaultValue={user?.phone} className="rounded-xl pl-10" />
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">📞</span>
                  </div>
                </div>

                <div className="pt-2">
                  <Button className="rounded-full px-8 shadow-lg shadow-primary/20">Save Profile</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md bg-white overflow-hidden">
              <div className="h-2 bg-orange-500" />
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-orange-500" />
                  Security & Password
                </CardTitle>
                <CardDescription>Keep your account secure with a strong password.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input id="currentPassword" type="password" className="rounded-xl" />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input id="newPassword" type="password" className="rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input id="confirmPassword" type="password" className="rounded-xl" />
                  </div>
                </div>

                <div className="pt-2">
                  <Button variant="outline" className="rounded-full px-8 border-2">Update Password</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
