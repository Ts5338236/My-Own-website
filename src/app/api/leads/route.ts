import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyToken, COOKIE_NAME } from "@/lib/auth";

export const dynamic = "force-dynamic";

// Public Lead creation
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, company, projectType, budget, message } = body;

    if (!name || !email || !company || !projectType || !budget || !message) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    const lead = await prisma.lead.create({
      data: {
        name,
        email,
        company,
        projectType,
        budget,
        message,
        status: "new",
      },
    });

    return NextResponse.json({ success: true, lead }, { status: 201 });
  } catch (err: any) {
    console.error("Lead creation API error:", err);
    return NextResponse.json(
      { error: "Database transaction failed." },
      { status: 500 }
    );
  }
}

// Protected Admin leads list
export async function GET(request: Request) {
  try {
    const cookieHeader = request.headers.get("cookie") || "";
    const sessionCookie = cookieHeader
      .split(";")
      .find((c) => c.trim().startsWith(`${COOKIE_NAME}=`));

    if (!sessionCookie) {
      return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
    }

    const token = sessionCookie.split("=")[1];
    const decoded = await verifyToken(token);

    if (!decoded) {
      return NextResponse.json({ error: "Invalid session session token." }, { status: 401 });
    }

    const leads = await prisma.lead.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ leads });
  } catch (err) {
    console.error("Get leads API error:", err);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
