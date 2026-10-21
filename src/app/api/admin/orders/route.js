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

const unauthorized = () =>
  NextResponse.json({ success: false, error: "Ruxsat yo'q" }, { status: 401 });

export async function GET(request) {
  if (!isAdmin(request)) return unauthorized();
  try {
    const { data: orders, error } = await getClient()
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return NextResponse.json({ success: true, orders });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 },
    );
  }
}

export async function PATCH(request) {
  if (!isAdmin(request)) return unauthorized();
  try {
    const { id, status } = await request.json();
    const allowed = ["pending", "approved", "completed", "rejected"];
    if (!allowed.includes(status)) {
      return NextResponse.json(
        { success: false, error: "Noto'g'ri status" },
        { status: 400 },
      );
    }

    const { data, error } = await getClient()
      .from("orders")
      .update({ status })
      .eq("id", id)
      .select();

    if (error) throw error;
    return NextResponse.json({ success: true, data });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 },
    );
  }
}
