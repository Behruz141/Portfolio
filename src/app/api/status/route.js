import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { isAdmin } from "@/lib/adminAuth";

export const dynamic = "force-dynamic";

function getClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    { auth: { persistSession: false } },
  );
}

// Hamma o'qiy oladi
export async function GET() {
  try {
    const { data, error } = await getClient()
      .from("site_settings")
      .select("is_open_for_work")
      .eq("id", 1)
      .maybeSingle();

    if (error) throw error;
    return NextResponse.json({ isOpenForWork: data?.is_open_for_work ?? true });
  } catch {
    return NextResponse.json({ isOpenForWork: true });
  }
}

// Faqat admin parol bilan o'zgartira oladi
export async function POST(request) {
  try {
    if (!isAdmin(request)) {
      return NextResponse.json(
        { success: false, error: "Ruxsat yo'q" },
        { status: 401 },
      );
    }

    const { isOpenForWork } = await request.json();
    if (typeof isOpenForWork !== "boolean") {
      return NextResponse.json(
        { success: false, error: "Noto'g'ri qiymat" },
        { status: 400 },
      );
    }

    const { error } = await getClient()
      .from("site_settings")
      .upsert({ id: 1, is_open_for_work: isOpenForWork });

    if (error) throw error;
    return NextResponse.json({ success: true, isOpenForWork });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 },
    );
  }
}
