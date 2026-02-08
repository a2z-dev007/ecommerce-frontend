export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  images: string[];
  category: Category;
  stock: number;
  sku: string;
  isActive: boolean;
  isFeatured: boolean;
  tags?: string[];
  variants?: ProductVariant[];
  specifications?: { name: string; value: string }[];
  shortDescription?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductVariant {
  id: string;
  name: string;
  price: number;
  stock: number;
  sku: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parentId?: string;
  isActive: boolean;
}

export interface CartItem {
  productId: string;
  product: Product;
  quantity: number;
  variantId?: string;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: string;
  shippingAddress: Address;
  billingAddress: Address;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
  price: number;
  variantId?: string;
}

export interface Address {
  id?: string;
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault?: boolean;
}

export interface User {
  _id?: string;
  id?: string;
  firstName?: string;
  lastName?: string;
  name?: string;
  email: string;
  role: 'admin' | 'user' | 'staff';
  avatar?: string;
  phone?: string;
  addresses?: Address[];
  createdAt?: string;
}

export interface Coupon {
  id: string;
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  minOrderAmount?: number;
  maxDiscount?: number;
  usageLimit?: number;
  usageCount: number;
  expiresAt?: string;
  isActive: boolean;
}

export interface Settings {
  id: string;
  storeName: string;
  storeDescription: string;
  logo: string;
  favicon: string;
  primaryColor: string;
  secondaryColor: string;
  currency: string;
  taxRate: number;
  shippingFee: number;
  freeShippingThreshold?: number;
  email: string;
  phone: string;
  address: string;
  socialLinks: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string[];
  features: {
    enableReviews: boolean;
    enableWishlist: boolean;
    enableCoupons: boolean;
  };
}

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';

export interface PaginationParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  status?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}
