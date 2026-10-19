import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// 6 xonali tasodifiy tracking kod generatori
function generateTrackingCode() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "#";
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, phone, email, telegram, comment, tier, tech, discount } =
      body;

    // 1. Shu email yoki telefon bilan oldin buyurtma berilganmi tekshiramiz
    const { data: existingUser } = await supabase
      .from("orders")
      .select("id, status")
      .or(`email.eq.${email},phone.eq.${phone}`)
      .single();

    if (existingUser) {
      if (
        existingUser.status !== "completed" &&
        existingUser.status !== "rejected"
      ) {
        return NextResponse.json(
          {
            success: false,
            message:
              "Siz allaqachon buyurtma bergansiz! Buyurtmangiz bajarilishini kuting.",
          },
          { status: 400 },
        );
      }
    }

    // 2. Unikal 6 xonali tracking kod generatsiya qilamiz
    let tracking_code = generateTrackingCode();
    let isUnique = false;

    while (!isUnique) {
      const { data } = await supabase
        .from("orders")
        .select("id")
        .eq("tracking_code", tracking_code)
        .single();
      if (!data) {
        isUnique = true;
      } else {
        tracking_code = generateTrackingCode();
      }
    }

    // 3. Bazaga yangi buyurtmani qo'shamiz
    const { error } = await supabase.from("orders").insert([
      {
        tracking_code,
        name,
        phone,
        email,
        telegram,
        comment,
        tier,
        tech,
        discount,
        status: "pending",
      },
    ]);

    if (error) throw error;

    return NextResponse.json({ success: true, tracking_code });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 },
    );
  }
}
