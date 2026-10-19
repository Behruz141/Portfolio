import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Ma'lumotlar saqlanadigan vaqtinchalik fayl yo'li
const filePath = path.join(process.cwd(), "src/config/status.json");

// Agar fayl bo'lmasa, dastlabki holatni yozib qo'yamiz
function getData() {
  try {
    if (!fs.existsSync(filePath)) {
      const initialData = {
        isOpenForWork: true,
        viewsCount: 120,
        ordersCount: 5,
      };
      fs.writeFileSync(filePath, JSON.stringify(initialData));
      return initialData;
    }
    const fileData = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileData);
  } catch {
    return { isOpenForWork: true, viewsCount: 100, ordersCount: 3 };
  }
}

// GET: Holatni o'qib olish
export async function GET() {
  const data = getData();
  return NextResponse.json(data);
}

// POST: Admin panel orqali holatni o'zgartirish
export async function POST(request) {
  try {
    const body = await request.json();
    const currentData = getData();

    const updatedData = {
      ...currentData,
      ...body,
    };

    fs.writeFileSync(filePath, JSON.stringify(updatedData, null, 2));
    return NextResponse.json({ success: true, data: updatedData });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}
