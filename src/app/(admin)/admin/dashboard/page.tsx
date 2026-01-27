'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// Mock data for demonstration
const mockStats = {
  orders: {
    totalRevenue: 39580,
    deliveredOrders: 4,
    totalOrders: 15,
    pendingOrders: 2,
    processingOrders: 2,
  },
  products: {
    totalProducts: 13,
    activeProducts: 13,
    lowStock: 3,
    outOfStockProducts: 0,
  },
  users: {
    total: 0,
    newThisMonth: 0,
    activeUsers: 14,
  },
};

const mockActivity = {
  orders: [
    {
      _id: '1',
      orderNumber: 'ORD-1766506504691-012',
      status: 'pending',
      items: [{ name: 'Item 1' }, { name: 'Item 2' }, { name: 'Item 3' }],
      totalAmount: 1177,
    },
    {
      _id: '2',
      orderNumber: 'ORD-1766506504688-006',
      status: 'delivered',
      items: [{ name: 'Item 1' }],
      totalAmount: 540,
    },
    {
      _id: '3',
      orderNumber: 'ORD-1766506501422-003',
      status: 'processing',
      items: [{ name: 'Item 1' }, { name: 'Item 2' }],
      totalAmount: 899,
    },
  ],
  users: [
    {
      _id: '1',
      name: 'Shah Hussain',
      email: 'shahhussaindev@gmail.com',
      role: 'user',
    },
    {
      _id: '2',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      role: 'user',
    },
    {
      _id: '3',
      name: 'Mike Johnson',
      email: 'mike.johnson@example.com',
      role: 'user',
    },
  ],
};

/* =======================
   ICONS
======================= */
const IndianRupeeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 3h12" />
    <path d="M6 8h12" />
    <path d="m6 13 8.5 8" />
    <path d="M6 13h3" />
    <path d="M9 13c6.667 0 6.667-10 0-10" />
  </svg>
);

const ShoppingCartIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="8" cy="21" r="1" />
    <circle cx="19" cy="21" r="1" />
    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
  </svg>
);

const PackageIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m7.5 4.27 9 5.15" />
    <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
    <path d="m3.3 7 8.7 5 8.7-5" />
    <path d="M12 22V12" />
  </svg>
);

const UsersIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const TrendingUpIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
    <polyline points="16 7 22 7 22 13" />
  </svg>
);

const AlertTriangleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
    <path d="M12 9v4" />
    <path d="M12 17h.01" />
  </svg>
);

const ArrowUpRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 7h10v10" />
    <path d="M7 17 17 7" />
  </svg>
);

const LoaderIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" x2="12" y1="2" y2="6" />
    <line x1="12" x2="12" y1="18" y2="22" />
    <line x1="4.93" x2="7.76" y1="4.93" y2="7.76" />
    <line x1="16.24" x2="19.07" y1="16.24" y2="19.07" />
    <line x1="2" x2="6" y1="12" y2="12" />
    <line x1="18" x2="22" y1="12" y2="12" />
    <line x1="4.93" x2="7.76" y1="19.07" y2="16.24" />
    <line x1="16.24" x2="19.07" y1="7.76" y2="4.93" />
  </svg>
);

const CheckCircleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const ClockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

/* =======================
   UTILS
======================= */
const formatCurrency = (amount: number) => {
  return `₹${amount.toLocaleString('en-IN')}`;
};

const getOrderStatusBadge = (status: string) => {
  const statusMap: Record<string, { color: string; bg: string }> = {
    pending: { color: 'text-amber-700 dark:text-amber-400', bg: 'bg-amber-100 dark:bg-amber-900/30' },
    processing: { color: 'text-blue-700 dark:text-blue-400', bg: 'bg-blue-100 dark:bg-blue-900/30' },
    delivered: { color: 'text-emerald-700 dark:text-emerald-400', bg: 'bg-emerald-100 dark:bg-emerald-900/30' },
    cancelled: { color: 'text-red-700 dark:text-red-400', bg: 'bg-red-100 dark:bg-red-900/30' },
  };
  return statusMap[status] || statusMap.pending;
};

/* =======================
   PAGE
======================= */
export default function AdminDashboard() {
  const [stats, setStats] = useState(mockStats);
  const [activity, setActivity] = useState(mockActivity);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 500);
  }, []);

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  const statCards = [
    {
      title: 'Total Revenue',
      value: formatCurrency(Math.ceil(stats?.orders?.totalRevenue || 0)),
      icon: IndianRupeeIcon,
      description: `${stats?.orders?.deliveredOrders || 0} completed orders`,
      trend: '+12.5%',
      iconBg: 'bg-violet-500',
    },
    {
      title: 'Total Orders',
      value: stats?.orders?.totalOrders || 0,
      icon: ShoppingCartIcon,
      description: `${stats?.orders?.pendingOrders || 0} pending`,
      trend: '+8.2%',
      iconBg: 'bg-blue-500',
    },
    {
      title: 'Products',
      value: stats?.products?.totalProducts || 0,
      icon: PackageIcon,
      description: `${stats?.products?.activeProducts || 0} active`,
      trend: '+3.1%',
      iconBg: 'bg-orange-500',
    },
    {
      title: 'Customers',
      value: stats?.users?.total || 0,
      icon: UsersIcon,
      description: `${stats?.users?.newThisMonth || 0} new this month`,
      trend: '+15.3%',
      iconBg: 'bg-emerald-500',
    },
  ];

  return (
    <div className="min-h-screen  dark:bg-gray-900 p-6">
      <div className="max-w-10xl mx-auto space-y-6">
        {/* HEADER */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Real-time overview of your store performance
          </p>
        </div>

        {/* STAT CARDS */}
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {statCards.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.title}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-5 hover:border-gray-300 dark:hover:border-gray-600 transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                      {stat.value}
                    </p>
                  </div>

                  <div className={`h-10 w-10 rounded-full ${stat.iconBg} flex items-center justify-center text-white`}>
                    <Icon />
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    {stat.description}
                  </span>
                  <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
                    <TrendingUpIcon />
                    {stat.trend}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* ALERT */}
        {(stats?.products?.lowStock || 0) > 0 && (
          <div className="bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-900/50 rounded-lg p-5">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-orange-500 flex items-center justify-center text-white flex-shrink-0">
                <AlertTriangleIcon />
              </div>

              <div className="flex-1">
                <p className="font-semibold text-gray-900 dark:text-white">Low Stock Warning</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">
                  {stats?.products?.lowStock} products need restocking
                </p>
              </div>

              <button className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2">
                Fix Now
                <ArrowUpRightIcon />
              </button>
            </div>
          </div>
        )}

        {/* QUICK STATS */}
        <div className="grid gap-5 md:grid-cols-3">
          <QuickStat
            title="Processing Orders"
            value={stats?.orders?.processingOrders || 0}
            icon={LoaderIcon}
            color="blue"
          />
          <QuickStat
            title="Out of Stock"
            value={stats?.products?.outOfStockProducts || 0}
            icon={AlertTriangleIcon}
            color="red"
          />
          <QuickStat
            title="Active Users"
            value={stats?.users?.activeUsers || 0}
            icon={CheckCircleIcon}
            color="green"
          />
        </div>

        {/* ACTIVITY */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* ORDERS */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-blue-500 flex items-center justify-center text-white">
                  <ShoppingCartIcon />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Orders</h3>
              </div>
              <button className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
                View All
                <ArrowUpRightIcon />
              </button>
            </div>

            <div className="space-y-3">
              {activity.orders.map((order) => {
                const badgeConfig = getOrderStatusBadge(order.status.toLowerCase());

                return (
                  <Link
                    key={order._id}
                    href={`/admin/orders?id=${order._id}`}
                    className="block"
                  >
                    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white text-sm">
                            Order #{order.orderNumber}
                          </p>
                          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 flex items-center gap-1.5">
                            <ClockIcon />
                            {order.items.length} items
                          </p>
                        </div>
                        <span className={`px-2.5 py-1 rounded-md text-xs font-medium ${badgeConfig.color} ${badgeConfig.bg}`}>
                          {order.status}
                        </span>
                      </div>

                      <p className="text-base font-semibold text-blue-600 dark:text-blue-400">
                        {formatCurrency(order.totalAmount)}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* CUSTOMERS */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-emerald-500 flex items-center justify-center text-white">
                  <UsersIcon />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">New Customers</h3>
              </div>
              <button className="text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1">
                View All
                <ArrowUpRightIcon />
              </button>
            </div>

            <div className="space-y-3">
              {activity.users.map((user) => (
                <Link
                  key={user._id}
                  href={`/admin/customers?id=${user._id}`}
                  className="block"
                >
                  <div className="flex items-center gap-3 border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer"
                  >
                    <div className="h-10 w-10 rounded-full bg-emerald-500 flex items-center justify-center font-semibold text-white text-sm flex-shrink-0">
                      {user.name.charAt(0).toUpperCase()}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 dark:text-white truncate">{user.name}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                        {user.email}
                      </p>
                    </div>

                    <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                      {user.role}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =======================
   COMPONENTS
======================= */

function QuickStat({ title, value, icon: Icon, color }: { title: string; value: number; icon: any; color: string }) {
  const colorClasses = {
    blue: { bg: 'bg-blue-500', text: 'text-blue-600 dark:text-blue-400' },
    red: { bg: 'bg-red-500', text: 'text-red-600 dark:text-red-400' },
    green: { bg: 'bg-emerald-500', text: 'text-emerald-600 dark:text-emerald-400' },
  };

  const colors = colorClasses[color as keyof typeof colorClasses];

  return (

    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{value}</p>
        </div>
        <div className={`h-10 w-10 rounded-full ${colors.bg} flex items-center justify-center text-white`}>
          <Icon />
        </div>
      </div>
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div>
          <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          <div className="h-5 w-72 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mt-2" />
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  );
}