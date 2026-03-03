import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  console.log("FixPage inquiry received:", body);

  return NextResponse.json({
    ok: true,
    message: "Inquiry received",
  });
}
