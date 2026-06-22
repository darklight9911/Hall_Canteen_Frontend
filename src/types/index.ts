// developer = admin (full access) · partner = seller · student = default
export type Role = "developer" | "partner" | "student";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
}

export type MenuCategory = "breakfast" | "lunch" | "dinner" | "snacks";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: MenuCategory;
  available: boolean;
  imageUrl?: string;
}

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "ready"
  | "delivered"
  | "cancelled";

export interface OrderItem {
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  status: OrderStatus;
  total: number;
  createdAt: string;
}

export interface Invoice {
  id: string;
  orderId: string;
  amount: number;
  issuedAt: string;
}
