// Multi-restaurant campus food-delivery data model (from the Hall Canteen design).
// Bengali/Bangladeshi context — prices are in Bangladeshi Taka (৳).

export type Meal = "breakfast" | "lunch" | "supper" | "dinner";
export type Variant = "full" | "half";

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  eta: string;
  distance: string;
  emoji: string;
  discount: string;
  bannerBg: string; // CSS background (gradient)
  meals: Meal[];
  desc: string;
}

export interface FoodItem {
  id: string;
  rid: string;
  name: string;
  sub: string;
  desc: string;
  price: number;
  mrp?: number;
  half?: number; // half-portion price (makes the item customisable)
  cat: string;
  emoji: string;
  veg: boolean;
  popular?: boolean;
}

export interface PastOrder {
  id: string;
  rest: string;
  emoji: string;
  items: string;
  total: number;
  date: string;
  status: "delivered" | "cancelled";
}

export const TAKA = "৳";
export function formatTaka(n: number): string {
  return `${TAKA}${n}`;
}

export const restaurants: Restaurant[] = [
  { id: "r1", name: "Shapla Bhojonaloy", cuisine: "Bengali · Rice & Curry", rating: 4.5, eta: "15–20 min", distance: "0.4 km", emoji: "🍛", discount: "30% OFF", bannerBg: "linear-gradient(135deg,#FBEFC9,#F6E2A8)", meals: ["lunch", "supper", "dinner"], desc: "Home-style Bengali bhat, bhorta, mach & mangsho — the hall favourite for dupor & raat." },
  { id: "r2", name: "Bismillah Biryani House", cuisine: "Biryani · Tehari", rating: 4.6, eta: "20–25 min", distance: "0.8 km", emoji: "🍗", discount: "20% OFF", bannerBg: "linear-gradient(135deg,#F7DFD0,#F0C9B2)", meals: ["lunch", "dinner"], desc: "Slow-cooked kacchi, morog polao and beef tehari in proper Dhaka style." },
  { id: "r3", name: "Campus Chai Ghor", cuisine: "Tea · Snacks", rating: 4.3, eta: "8–10 min", distance: "0.2 km", emoji: "☕", discount: "Flat ৳10 OFF", bannerBg: "linear-gradient(135deg,#E9E3DA,#D8CFC2)", meals: ["breakfast", "supper"], desc: "Doodh cha, singara, samosa and porota-dim right inside the campus." },
  { id: "r4", name: "Burger Adda", cuisine: "Fast Food · Burgers", rating: 4.2, eta: "25–30 min", distance: "1.2 km", emoji: "🍔", discount: "Buy 1 Get 1", bannerBg: "linear-gradient(135deg,#FBE3C0,#F3CE94)", meals: ["supper", "dinner"], desc: "Juicy beef burgers, rolls, wraps and loaded fries for late-night cravings." },
  { id: "r5", name: "Mama'r Halim & Kabab", cuisine: "BBQ · Halim", rating: 4.4, eta: "18–22 min", distance: "1.0 km", emoji: "🍢", discount: "15% OFF", bannerBg: "linear-gradient(135deg,#EAD9C2,#D8C0A0)", meals: ["supper", "dinner"], desc: "Steaming beef halim, jali kabab and charcoal chicken grill from the night market." },
  { id: "r6", name: "Fresh Blend", cuisine: "Juice · Dessert", rating: 4.1, eta: "10–12 min", distance: "0.3 km", emoji: "🥤", discount: "10% OFF", bannerBg: "linear-gradient(135deg,#FDE8C8,#FBD9A0)", meals: ["breakfast", "supper"], desc: "Mango lassi, cold coffee, falooda and firni to cool down between classes." },
];

export const items: FoodItem[] = [
  // r1 — Shapla Bhojonaloy
  { id: "i1", rid: "r1", name: "Fried Rice + Chili Chicken Combo", sub: "with Chinese sobji", desc: "Fried rice, chili chicken & mixed Chinese vegetables — a full plate.", price: 150, cat: "Combos", emoji: "🍛", veg: false, popular: true },
  { id: "i2", rid: "r1", name: "Chicken Tehari", sub: "1 plate", desc: "Fragrant short-grain rice cooked with spiced chicken.", price: 80, cat: "Rice & Bread", emoji: "🍚", veg: false, popular: true },
  { id: "i3", rid: "r1", name: "Sada Vat (Rice)", sub: "per plate", desc: "Steamed plain rice.", price: 10, cat: "Rice & Bread", emoji: "🍚", veg: true },
  { id: "i4", rid: "r1", name: "Porota", sub: "per piece", desc: "Flaky hand-rolled paratha.", price: 10, cat: "Rice & Bread", emoji: "🫓", veg: true },
  { id: "i5", rid: "r1", name: "Alu Bhorta", sub: "no half", desc: "Mashed potato with mustard oil, onion & green chili.", price: 20, cat: "Bhorta", emoji: "🥔", veg: true, popular: true },
  { id: "i6", rid: "r1", name: "Begun Bhorta", sub: "no half", desc: "Smoky roasted eggplant mash.", price: 20, cat: "Bhorta", emoji: "🍆", veg: true },
  { id: "i7", rid: "r1", name: "Mach Bhorta", sub: "no half", desc: "Mashed fish with onion & chili.", price: 20, cat: "Bhorta", emoji: "🐟", veg: false },
  { id: "i8", rid: "r1", name: "Alu Bhaji", sub: "no half", desc: "Lightly fried spiced potatoes.", price: 20, cat: "Bhaji & Dal", emoji: "🥔", veg: true },
  { id: "i9", rid: "r1", name: "Chichinga Bhaji", sub: "no half", desc: "Stir-fried snake gourd.", price: 20, cat: "Bhaji & Dal", emoji: "🥒", veg: true },
  { id: "i10", rid: "r1", name: "Jali Kumra Bhaji", sub: "no half", desc: "Stir-fried ash gourd.", price: 20, cat: "Bhaji & Dal", emoji: "🎃", veg: true },
  { id: "i11", rid: "r1", name: "Buter Dal", sub: "no half", desc: "Thick chana lentil curry.", price: 20, cat: "Bhaji & Dal", emoji: "🥣", veg: true },
  { id: "i12", rid: "r1", name: "Dim Bhaji", sub: "per egg", desc: "Spiced scrambled egg.", price: 20, cat: "Bhaji & Dal", emoji: "🍳", veg: false },
  { id: "i13", rid: "r1", name: "Dim Kurma", sub: "1 egg", desc: "Boiled egg in rich korma gravy.", price: 40, cat: "Chicken & Egg", emoji: "🥚", veg: false },
  { id: "i14", rid: "r1", name: "Murgi (Chicken Curry)", sub: "1 piece", desc: "Country-style chicken curry.", price: 40, cat: "Chicken & Egg", emoji: "🍗", veg: false, popular: true },
  { id: "i15", rid: "r1", name: "Koi Mach", sub: "1 piece", desc: "Climbing perch in light gravy.", price: 70, cat: "Fish", emoji: "🐟", veg: false },
  { id: "i16", rid: "r1", name: "Choto Mach", sub: "1 bowl", desc: "Small fish curry with potato.", price: 60, cat: "Fish", emoji: "🐟", veg: false },
  { id: "i17", rid: "r1", name: "Telapiya", sub: "1 piece", desc: "Tilapia fish curry.", price: 70, cat: "Fish", emoji: "🐟", veg: false },
  { id: "i18", rid: "r1", name: "Jhal Fry", sub: "1 plate", desc: "Spicy stir-fried chicken jhal fry.", price: 70, cat: "Special", emoji: "🌶️", veg: false, popular: true },
  { id: "i19", rid: "r1", name: "Chicken Chap", sub: "full / half", desc: "Creamy spiced chicken chap.", price: 130, half: 70, cat: "Special", emoji: "🍗", veg: false, popular: true },
  { id: "i20", rid: "r1", name: "Muglai Porota", sub: "full / half", desc: "Egg & keema stuffed fried paratha.", price: 80, half: 60, cat: "Special", emoji: "🫓", veg: false },
  // r2 — Bismillah Biryani
  { id: "i21", rid: "r2", name: "Mutton Kacchi Biryani", sub: "1 plate", desc: "Dum-cooked mutton kacchi with aloo & borhani.", price: 180, mrp: 220, cat: "Biryani", emoji: "🍗", veg: false, popular: true },
  { id: "i22", rid: "r2", name: "Morog Polao", sub: "1 plate", desc: "Chicken pulao with fried onion.", price: 150, cat: "Biryani", emoji: "🍚", veg: false, popular: true },
  { id: "i23", rid: "r2", name: "Beef Tehari", sub: "1 plate", desc: "Spiced beef tehari, Dhaka style.", price: 120, cat: "Biryani", emoji: "🍛", veg: false },
  { id: "i24", rid: "r2", name: "Borhani", sub: "glass", desc: "Spiced minty yoghurt drink.", price: 30, cat: "Drinks", emoji: "🥛", veg: true },
  { id: "i25", rid: "r2", name: "Jorda", sub: "bowl", desc: "Sweet saffron rice dessert.", price: 40, cat: "Dessert", emoji: "🍮", veg: true },
  // r3 — Campus Chai Ghor
  { id: "i26", rid: "r3", name: "Doodh Cha", sub: "cup", desc: "Classic milk tea.", price: 15, cat: "Tea & Coffee", emoji: "☕", veg: true, popular: true },
  { id: "i27", rid: "r3", name: "Singara", sub: "2 pcs", desc: "Crispy potato-stuffed singara.", price: 12, mrp: 16, cat: "Snacks", emoji: "🥟", veg: true, popular: true },
  { id: "i28", rid: "r3", name: "Samosa", sub: "2 pcs", desc: "Spiced veg samosa with chutney.", price: 15, cat: "Snacks", emoji: "🥟", veg: true },
  { id: "i29", rid: "r3", name: "Porota + Dim", sub: "breakfast", desc: "Two porotas with egg bhaji.", price: 40, cat: "Breakfast", emoji: "🍳", veg: false },
  { id: "i30", rid: "r3", name: "Dim Khichuri", sub: "bowl", desc: "Comforting khichuri with fried egg.", price: 60, cat: "Breakfast", emoji: "🍲", veg: false },
  { id: "i31", rid: "r3", name: "Cold Coffee", sub: "glass", desc: "Iced blended coffee.", price: 30, cat: "Tea & Coffee", emoji: "🧋", veg: true },
  // r4 — Burger Adda
  { id: "i32", rid: "r4", name: "Beef Burger", sub: "single patty", desc: "Grilled beef patty, cheese & sauce.", price: 130, mrp: 160, cat: "Burgers", emoji: "🍔", veg: false, popular: true },
  { id: "i33", rid: "r4", name: "Chicken Burger", sub: "single patty", desc: "Crispy chicken fillet burger.", price: 110, cat: "Burgers", emoji: "🍔", veg: false },
  { id: "i34", rid: "r4", name: "Chicken Roll", sub: "1 roll", desc: "Paratha roll with spiced chicken.", price: 80, cat: "Rolls", emoji: "🌯", veg: false, popular: true },
  { id: "i35", rid: "r4", name: "French Fries", sub: "regular", desc: "Salted crispy fries.", price: 70, cat: "Sides", emoji: "🍟", veg: true },
  { id: "i36", rid: "r4", name: "Chicken Wrap", sub: "1 wrap", desc: "Grilled chicken wrap with veggies.", price: 120, cat: "Rolls", emoji: "🌯", veg: false },
  // r5 — Mama'r Halim & Kabab
  { id: "i37", rid: "r5", name: "Beef Halim", sub: "bowl", desc: "Thick spiced beef & lentil halim.", price: 90, cat: "Halim", emoji: "🍲", veg: false, popular: true },
  { id: "i38", rid: "r5", name: "Chicken Halim", sub: "bowl", desc: "Chicken halim with garnish.", price: 80, cat: "Halim", emoji: "🍲", veg: false },
  { id: "i39", rid: "r5", name: "Jali Kabab", sub: "2 pcs", desc: "Net-fried minced beef kabab.", price: 50, cat: "Kabab", emoji: "🍢", veg: false },
  { id: "i40", rid: "r5", name: "Chicken Grill", sub: "half", desc: "Charcoal chicken grill, half.", price: 160, mrp: 190, cat: "Kabab", emoji: "🍗", veg: false, popular: true },
  { id: "i41", rid: "r5", name: "Naan", sub: "1 pc", desc: "Soft tandoor naan.", price: 25, cat: "Bread", emoji: "🫓", veg: true },
  // r6 — Fresh Blend
  { id: "i42", rid: "r6", name: "Mango Lassi", sub: "glass", desc: "Thick sweet mango yoghurt.", price: 60, cat: "Drinks", emoji: "🥤", veg: true, popular: true },
  { id: "i43", rid: "r6", name: "Cold Coffee", sub: "glass", desc: "Creamy blended cold coffee.", price: 70, cat: "Drinks", emoji: "🧋", veg: true },
  { id: "i44", rid: "r6", name: "Falooda", sub: "glass", desc: "Rose falooda with ice cream.", price: 90, cat: "Dessert", emoji: "🍨", veg: true, popular: true },
  { id: "i45", rid: "r6", name: "Firni", sub: "bowl", desc: "Creamy rice pudding.", price: 50, cat: "Dessert", emoji: "🍮", veg: true },
  { id: "i46", rid: "r6", name: "Mixed Fruit Juice", sub: "glass", desc: "Fresh seasonal fruit blend.", price: 65, cat: "Drinks", emoji: "🧃", veg: true },
];

export const pastOrders: PastOrder[] = [
  { id: "#HC-2048", rest: "Bismillah Biryani House", emoji: "🍗", items: "Mutton Kacchi Biryani, Borhani", total: 210, date: "Yesterday · 1:40 PM", status: "delivered" },
  { id: "#HC-2041", rest: "Shapla Bhojonaloy", emoji: "🍛", items: "Chicken Tehari, Alu Bhorta ×2", total: 120, date: "18 Jun · 8:20 PM", status: "delivered" },
  { id: "#HC-2033", rest: "Campus Chai Ghor", emoji: "☕", items: "Doodh Cha ×2, Singara", total: 42, date: "16 Jun · 5:10 PM", status: "cancelled" },
];

export const MEALS: { key: Meal | "all"; label: string; emoji: string }[] = [
  { key: "all", label: "All", emoji: "🍽️" },
  { key: "breakfast", label: "Breakfast", emoji: "🍳" },
  { key: "lunch", label: "Lunch", emoji: "🍛" },
  { key: "supper", label: "Supper", emoji: "🍵" },
  { key: "dinner", label: "Dinner", emoji: "🍽️" },
];

export const PROMOS: { title: string; sub: string; emoji: string; bg: string; meal: Meal | "all" }[] = [
  { title: "Breakfast combos", sub: "Start your day for less", emoji: "🫓", bg: "#FBF4DA", meal: "breakfast" },
  { title: "Late-night cravings", sub: "Snacks & burgers till midnight", emoji: "🍟", bg: "#E6EEFB", meal: "supper" },
  { title: "Bulk orders for events", sub: "Feeding the whole hall?", emoji: "🍱", bg: "#E4F2E7", meal: "all" },
];

export const WHY_CARDS: { icon: string; title: string; sub: string }[] = [
  { icon: "🛵", title: "10-minute delivery", sub: "Hot food, straight to your block" },
  { icon: "🍃", title: "Fresh & hygienic", sub: "Cooked to order in vetted kitchens" },
  { icon: "💳", title: "Student-friendly prices", sub: "Honest pricing, no surprises" },
  { icon: "🔔", title: "Live order tracking", sub: "Know exactly when it's ready" },
];

export function mealLabel(m: Meal | "all"): string {
  return MEALS.find((x) => x.key === m)?.label ?? m;
}

// ---- lookups ----
export function restaurantById(id: string): Restaurant | undefined {
  return restaurants.find((r) => r.id === id);
}
export function itemById(id: string): FoodItem | undefined {
  return items.find((i) => i.id === id);
}
export function itemsByRestaurant(rid: string): FoodItem[] {
  return items.filter((i) => i.rid === rid);
}
export function vegColor(veg: boolean): string {
  return veg ? "#0C831F" : "#D7263D";
}
export function dishTint(veg: boolean): string {
  return veg ? "#EFF6EE" : "#FBF1EC";
}

// ---- cart keys ----
export function keyOf(id: string, variant: Variant): string {
  return variant === "half" ? `${id}__half` : id;
}
export function parseKey(key: string): { id: string; variant: Variant } {
  const half = key.endsWith("__half");
  return { id: half ? key.slice(0, -6) : key, variant: half ? "half" : "full" };
}
export function priceFor(item: FoodItem, variant: Variant): number {
  return variant === "half" && item.half ? item.half : item.price;
}

// ---- cart math (pure helpers over the cart map) ----
export type Cart = Record<string, number>;
export interface CartLine {
  key: string;
  item: FoodItem;
  variant: Variant;
  qty: number;
  price: number;
  line: number;
}

export function cartLines(cart: Cart): CartLine[] {
  return Object.entries(cart)
    .map(([key, qty]) => {
      const { id, variant } = parseKey(key);
      const item = itemById(id);
      if (!item) return null;
      const price = priceFor(item, variant);
      return { key, item, variant, qty, price, line: price * qty };
    })
    .filter((l): l is CartLine => l !== null);
}
export function cartCount(cart: Cart): number {
  return Object.values(cart).reduce((a, b) => a + b, 0);
}
export function cartSubtotal(cart: Cart): number {
  return cartLines(cart).reduce((a, l) => a + l.line, 0);
}
export function cartSavings(cart: Cart): number {
  return cartLines(cart).reduce((a, l) => a + (l.item.mrp ? (l.item.mrp - l.item.price) * l.qty : 0), 0);
}
export function deliveryFee(cart: Cart): number {
  if (cartCount(cart) === 0) return 0;
  return cartSubtotal(cart) >= 199 ? 0 : 15;
}
export function packFee(cart: Cart): number {
  return cartCount(cart) > 0 ? 5 : 0;
}
export function grandTotal(cart: Cart): number {
  return cartSubtotal(cart) + deliveryFee(cart) + packFee(cart);
}
