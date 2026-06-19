import type { Invoice, MenuCategory, MenuItem, Order } from "@/types";

// View-model extension for the storefront — `mrp` drives the discount badge,
// `emoji` is the placeholder visual (no image assets yet). The base shape stays
// a valid `MenuItem` so swapping in real API data later is a drop-in.
export interface MockMenuItem extends MenuItem {
  mrp?: number;
  emoji?: string;
}

export const categoryMeta: Record<MenuCategory, { emoji: string }> = {
  breakfast: { emoji: "🥞" },
  lunch: { emoji: "🍛" },
  dinner: { emoji: "🍲" },
  snacks: { emoji: "🥪" },
};

export const menuItems: MockMenuItem[] = [
  // Breakfast
  { id: "m1", name: "Aloo Paratha (2 pcs) with Curd", description: "Stuffed potato flatbread, butter & curd", price: 45, mrp: 60, category: "breakfast", available: true, emoji: "🥔" },
  { id: "m2", name: "Masala Dosa", description: "Crispy dosa, potato masala, sambar & chutney", price: 60, category: "breakfast", available: true, emoji: "🥞" },
  { id: "m3", name: "Poha", description: "Flattened rice, peanuts & lemon", price: 30, category: "breakfast", available: true, emoji: "🍚" },
  { id: "m4", name: "Bread Omelette", description: "Two-egg omelette with toasted bread", price: 40, mrp: 50, category: "breakfast", available: false, emoji: "🍳" },
  { id: "m5", name: "Idli Sambar (3 pcs)", description: "Steamed rice cakes with sambar", price: 35, category: "breakfast", available: true, emoji: "🍘" },

  // Lunch
  { id: "m6", name: "Veg Thali", description: "Dal, sabzi, rice, 3 roti, salad & sweet", price: 90, mrp: 120, category: "lunch", available: true, emoji: "🍛" },
  { id: "m7", name: "Chicken Biryani", description: "Hyderabadi dum biryani with raita", price: 150, mrp: 180, category: "lunch", available: true, emoji: "🍗" },
  { id: "m8", name: "Rajma Chawal", description: "Kidney bean curry over steamed rice", price: 80, category: "lunch", available: true, emoji: "🍚" },
  { id: "m9", name: "Paneer Butter Masala with Roti", description: "Cottage cheese in rich tomato gravy", price: 120, category: "lunch", available: true, emoji: "🧀" },

  // Dinner
  { id: "m10", name: "Dal Tadka with Jeera Rice", description: "Tempered yellow dal & cumin rice", price: 85, mrp: 100, category: "dinner", available: true, emoji: "🍲" },
  { id: "m11", name: "Egg Curry (2 eggs) with Roti", description: "Spiced egg curry, 3 roti", price: 95, category: "dinner", available: true, emoji: "🥚" },
  { id: "m12", name: "Chowmein", description: "Stir-fried noodles with veggies", price: 70, category: "dinner", available: false, emoji: "🍜" },

  // Snacks
  { id: "m13", name: "Samosa (2 pcs)", description: "Crispy potato samosa with chutney", price: 25, category: "snacks", available: true, emoji: "🥟" },
  { id: "m14", name: "Veg Sandwich", description: "Grilled veggie & cheese sandwich", price: 40, mrp: 55, category: "snacks", available: true, emoji: "🥪" },
  { id: "m15", name: "Masala Chai", description: "Spiced milk tea", price: 15, category: "snacks", available: true, emoji: "☕" },
  { id: "m16", name: "Cold Coffee", description: "Chilled blended coffee with ice cream", price: 60, mrp: 80, category: "snacks", available: true, emoji: "🥤" },
];

export const mockOrders: Order[] = [
  { id: "1042", userId: "demo", status: "pending", total: 150, createdAt: "2026-06-19T08:15:00Z", items: [{ menuItemId: "m7", name: "Chicken Biryani", price: 150, quantity: 1 }] },
  { id: "1041", userId: "demo", status: "confirmed", total: 115, createdAt: "2026-06-19T07:50:00Z", items: [{ menuItemId: "m6", name: "Veg Thali", price: 90, quantity: 1 }, { menuItemId: "m13", name: "Samosa (2 pcs)", price: 25, quantity: 1 }] },
  { id: "1040", userId: "demo", status: "ready", total: 75, createdAt: "2026-06-19T07:30:00Z", items: [{ menuItemId: "m15", name: "Masala Chai", price: 15, quantity: 1 }, { menuItemId: "m2", name: "Masala Dosa", price: 60, quantity: 1 }] },
  { id: "1039", userId: "demo", status: "delivered", total: 90, createdAt: "2026-06-18T13:05:00Z", items: [{ menuItemId: "m6", name: "Veg Thali", price: 90, quantity: 1 }] },
  { id: "1038", userId: "demo", status: "delivered", total: 50, createdAt: "2026-06-18T09:20:00Z", items: [{ menuItemId: "m1", name: "Aloo Paratha", price: 45, quantity: 1 }] },
  { id: "1037", userId: "demo", status: "cancelled", total: 70, createdAt: "2026-06-17T20:10:00Z", items: [{ menuItemId: "m12", name: "Chowmein", price: 70, quantity: 1 }] },
];

export const mockInvoices: Invoice[] = [
  { id: "INV-1039", orderId: "1039", amount: 90, issuedAt: "2026-06-18T13:06:00Z" },
  { id: "INV-1038", orderId: "1038", amount: 50, issuedAt: "2026-06-18T09:21:00Z" },
  { id: "INV-1035", orderId: "1035", amount: 240, issuedAt: "2026-06-17T13:40:00Z" },
  { id: "INV-1031", orderId: "1031", amount: 175, issuedAt: "2026-06-16T12:15:00Z" },
  { id: "INV-1028", orderId: "1028", amount: 60, issuedAt: "2026-06-15T18:05:00Z" },
  { id: "INV-1024", orderId: "1024", amount: 320, issuedAt: "2026-06-14T13:00:00Z" },
];

export const revenueByDay = [
  { day: "Mon", revenue: 4200, orders: 38 },
  { day: "Tue", revenue: 3850, orders: 34 },
  { day: "Wed", revenue: 5100, orders: 46 },
  { day: "Thu", revenue: 4700, orders: 41 },
  { day: "Fri", revenue: 6300, orders: 58 },
  { day: "Sat", revenue: 7100, orders: 64 },
  { day: "Sun", revenue: 5600, orders: 49 },
];

export const popularItems = [
  { name: "Veg Thali", sold: 142 },
  { name: "Biryani", sold: 118 },
  { name: "Samosa", sold: 96 },
  { name: "Masala Chai", sold: 88 },
  { name: "Cold Coffee", sold: 64 },
];
