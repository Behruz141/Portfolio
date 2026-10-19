import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// Tasodifiy 6 xonali kod yaratish (Masalan: A7K9X2)
function generateTrackingCode() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

// POST: Yangi buyurtma yaratish
export async function POST(request) {
  try {
    const body = await request.json();
    const { name, phone, email, telegram, comment, tier, tech, discount } =
      body;

    // 1. Anti-spam: Shu email yoki telefon bilan allaqachon buyurtma berilganmi va statusi 'completed' (bajarilgan) emasmi tekshiramiz
    const { data: existingOrder, error: checkError } = await supabase
      .from("orders")
      .select("*")
      .or(`email.eq.${email},phone.eq.${phone}`)
      .neq("status", "completed")
      .neq("status", "rejected");

    if (checkError) throw checkError;

    if (existingOrder && existingOrder.length > 0) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Siz allaqachon faol buyurtma bergansiz! Buyurtmangiz tugashini kuting.",
        },
        { status: 400 },
      );
    }

    // 2. Unikal 6 xonali kod generatsiya qilish
    let trackingCode = generateTrackingCode();
    let isUnique = false;

    while (!isUnique) {
      const { data } = await supabase
        .from("orders")
        .select("id")
        .eq("tracking_code", trackingCode)
        .single();
      if (!data) {
        isUnique = true;
      } else {
        trackingCode = generateTrackingCode();
      }
    }

    // 3. Bazaga saqlash
    const { data: newOrder, error: insertError } = await supabase
      .from("orders")
      .insert([
        {
          tracking_code: trackingCode,
          name,
          phone,
          email,
          telegram,
          comment,
          tier,
          tech,
          discount,
          status: "pending", // kutilmoqda
        },
      ])
      .select()
      .single();

    if (insertError) throw insertError;

    return NextResponse.json({
      success: true,
      trackingCode: newOrder.tracking_code,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}
