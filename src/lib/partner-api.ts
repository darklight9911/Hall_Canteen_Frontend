import { api } from "@/lib/api";

const P = "/api/v1/partner";

export type ApplicationStatus = "pending" | "approved" | "rejected";

export interface PartnerApplication {
  id: string;
  user_id: string;
  phone: string;
  full_name: string;
  shop_name: string;
  location: string;
  photo: string;
  status: ApplicationStatus;
  created_at: string;
  reviewed_at: string | null;
}

export interface PartnerRestaurant {
  id: string;
  name: string;
  location: string;
  photo: string | null;
}

export interface PartnerFoodItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string | null;
  is_available: boolean;
}

export interface FoodItemInput {
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string | null;
  is_available: boolean;
}

// ---- application (any Google account) ----
export function applyPartner(input: {
  idToken: string;
  phone: string;
  fullName: string;
  shopName: string;
  location: string;
  photo: string;
}): Promise<PartnerApplication> {
  return api.post(`${P}/apply`, {
    id_token: input.idToken,
    phone: input.phone,
    full_name: input.fullName,
    shop_name: input.shopName,
    location: input.location,
    photo: input.photo,
  });
}

export async function getMyApplication(): Promise<PartnerApplication | null> {
  try {
    return await api.get<PartnerApplication | null>(`${P}/application`);
  } catch {
    return null;
  }
}

// ---- partner shop & items ----
export function getMyRestaurant(): Promise<PartnerRestaurant> {
  return api.get(`${P}/restaurant`);
}
export function listMyItems(): Promise<PartnerFoodItem[]> {
  return api.get(`${P}/items`);
}
export function createItem(body: FoodItemInput): Promise<PartnerFoodItem> {
  return api.post(`${P}/items`, body);
}
export function updateItem(id: string, body: Partial<FoodItemInput>): Promise<PartnerFoodItem> {
  return api.patch(`${P}/items/${id}`, body);
}
export function deleteItem(id: string): Promise<void> {
  return api.delete(`${P}/items/${id}`);
}

// ---- developer review ----
export function listApplications(status?: ApplicationStatus): Promise<PartnerApplication[]> {
  return api.get(`${P}/applications${status ? `?status=${status}` : ""}`);
}
export function approveApplication(id: string): Promise<PartnerRestaurant> {
  return api.post(`${P}/applications/${id}/approve`, {});
}
export function rejectApplication(id: string): Promise<PartnerApplication> {
  return api.post(`${P}/applications/${id}/reject`, {});
}

// ---- helpers ----
export function fileToDataUrl(file: File, maxBytes = 2_000_000): Promise<string> {
  return new Promise((resolve, reject) => {
    if (file.size > maxBytes) {
      reject(new Error("Image is too large (max 2 MB)"));
      return;
    }
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("Could not read the image"));
    reader.readAsDataURL(file);
  });
}
