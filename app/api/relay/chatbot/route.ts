import { NextResponse } from "next/server";

const N8N_URL = process.env.NEXT_PUBLIC_N8N_CHATBOT_WEBHOOK;

export async function POST(req: Request) {
  try {
    if (!N8N_URL) {
      return NextResponse.json(
        { ok: false, error: "N8N webhook env not set" },
        { status: 500 }
      );
    }

    const body = await req.json();

    const res = await fetch(N8N_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const text = await res.text();
    return new NextResponse(text, {
      status: res.status,
      headers: {
        "Content-Type": res.headers.get("Content-Type") ?? "application/json",
      },
    });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: e?.message ?? "relay-error" },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Max-Age": "86400",
    },
  });
}


