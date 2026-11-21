export type CategorySlug =
  | 'study-essentials'
  | 'ergonomic-workspace'
  | 'desk-organization'
  | 'desk-accessories'
  | 'small-space-solutions';

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: CategorySlug;
  description: string;
  specifications: Record<string, string>;
  price: number;
  discountedPrice?: number;
  image: string;
  images: string[];
  stock: number;
  rating: number;
  reviewCount: number;
  sku: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  material: string;
  dimensions: string;
  features: string[];
  badge?: string;
  createdAt: string;
}

export interface Category {
  slug: CategorySlug;
  name: string;
  tagline: string;
  description: string;
  image: string;
  keyword: string;
}

export interface Review {
  id: string;
  productId: string;
  customerName: string;
  rating: number;
  reviewText: string;
  createdAt: string;
}

export interface CartLine { productId: string; quantity: number; }

export interface OrderItemInput { productId: string; quantity: number; }

export interface OrderItem extends OrderItemInput {
  productName: string;
  unitPrice: number;
  subtotal: number;
}

export interface ShippingAddress {
  house: string; street: string; area: string;
  city: string; state: string; pincode: string;
}

export interface Order {
  orderNumber: string;
  customerName: string;
  email: string;
  mobile: string;
  items: OrderItem[];
  subtotal: number;
  delivery: number;
  total: number;
  paymentMethod: string;
  paymentStatus: 'Pending' | 'Paid (Demo)' | 'COD';
  orderStatus: 'Order Placed' | 'Processing' | 'Shipped' | 'Delivered';
  shippingAddress: ShippingAddress;
  createdAt: string;
  estimatedDelivery: string;
}