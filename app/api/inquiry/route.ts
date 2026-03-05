import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = String(body?.name ?? "").trim();
    const email = String(body?.email ?? "").trim();
    const phone = String(body?.phone ?? "").trim();
    // Frontend currently sends `details`; keep `message` for backward compatibility.
    const message = String(body?.message ?? body?.details ?? "").trim();

    if (!name || !message) {
      return NextResponse.json(
        { ok: false, message: "name, details(message)는 필수입니다." },
        { status: 400 }
      );
    }

    await sql`
      insert into inquiries (name, email, phone, message)
      values (${name}, ${email || null}, ${phone || null}, ${message})
    `;

    return NextResponse.json({ ok: true, message: "Inquiry saved" });
  } catch (error) {
    console.error("Inquiry insert failed:", error);
    return NextResponse.json(
      { ok: false, message: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}