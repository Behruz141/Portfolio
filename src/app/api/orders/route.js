import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

function generateTrackingCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // O'xshash harflar (O, 0, I, 1) olib tashlangan
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

export async function POST(request) {
  try {
    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json(
        {
          success: false,
          message:
            ".env.local faylida Supabase URL yoki KEY topilmadi. Serverni qayta ishga tushiring!",
        },
        { status: 500 },
      );
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      auth: { persistSession: false },
    });

    const body = await request.json();
    const { name, phone, email, telegram, comment, tier, tech, discount } =
      body;

    // 1. Anti-Spam tekshiruvi
    const { data: existingOrder, error: checkError } = await supabase
      .from("orders")
      .select("id, status")
      .or(`email.eq.${email},phone.eq.${phone}`)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (checkError) {
      console.error("Supabase check error:", checkError);
    }

    if (
      existingOrder &&
      existingOrder.status !== "completed" &&
      existingOrder.status !== "rejected"
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Siz allaqachon buyurtma bergansiz! Buyurtmangiz holati hal bo'lishini kuting.",
        },
        { status: 400 },
      );
    }

    // 2. 6 xonali unikal kod
    let trackingCode = generateTrackingCode();
    let isUnique = false;
    let attempts = 0;

    while (!isUnique && attempts < 5) {
      attempts++;
      const { data: codeCheck } = await supabase
        .from("orders")
        .select("id")
        .eq("tracking_code", trackingCode)
        .maybeSingle();

      if (!codeCheck) {
        isUnique = true;
      } else {
        trackingCode = generateTrackingCode();
      }
    }

    // 3. Bazaga kiritish
    const { error: insertError } = await supabase.from("orders").insert([
      {
        tracking_code: trackingCode,
        name,
        phone,
        email,
        telegram: telegram || "",
        comment: comment || "",
        tier,
        tech,
        discount,
        status: "pending",
      },
    ]);

    if (insertError) {
      console.error("Insert error:", insertError);
      return NextResponse.json(
        { success: false, message: "Baza xatoligi: " + insertError.message },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      tracking_code: trackingCode,
      message: "Buyurtmangiz muvaffaqiyatli qabul qilindi!",
    });
  } catch (err) {
    console.error("Route error:", err);
    return NextResponse.json(
      { success: false, message: "Server xatoligi: " + (err?.message || err) },
      { status: 500 },
    );
  }
}
