import { supabase } from "./supabase";

// 6 xonali unikal tracking kod
export function generateTrackingCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

// Faol buyurtmani tekshirish (Anti-Spam)
export async function checkActiveOrder(email, phone) {
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .or(`email.eq.${email},phone.eq.${phone}`)
    .in("status", ["pending", "approved"]);

  if (error) return null;
  return data && data.length > 0 ? data[0] : null;
}

// Yangi buyurtma yaratish
export async function createOrder(orderData) {
  const trackingCode = generateTrackingCode();

  const { data, error } = await supabase
    .from("orders")
    .insert([
      {
        tracking_code: trackingCode,
        name: orderData.name,
        phone: orderData.phone,
        email: orderData.email,
        telegram: orderData.telegram || "",
        comment: orderData.comment || "",
        tier: orderData.tier,
        tech: orderData.tech,
        discount: orderData.discount,
        status: "pending",
      },
    ])
    .select();

  if (error) throw error;
  return data[0];
}

// Barcha buyurtmalarni olish (Admin uchun)
export async function getAllOrders() {
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data || [];
}

// Statusni o'zgartirish (Admin uchun)
export async function updateOrderStatus(id, newStatus) {
  const { data, error } = await supabase
    .from("orders")
    .update({ status: newStatus })
    .eq("id", id)
    .select();

  if (error) throw error;
  return data[0];
}
