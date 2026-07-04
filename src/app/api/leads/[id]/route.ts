import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyToken, COOKIE_NAME } from "@/lib/auth";

async function isAuthorized(request: Request) {
  const cookieHeader = request.headers.get("cookie") || "";
  const sessionCookie = cookieHeader
    .split(";")
    .find((c) => c.trim().startsWith(`${COOKIE_NAME}=`));

  if (!sessionCookie) return false;

  const token = sessionCookie.split("=")[1];
  const decoded = await verifyToken(token);
  return !!decoded;
}

// Update lead status
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    if (!(await isAuthorized(request))) {
      return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
    }

    const { id } = params;
    const { status } = await request.json();

    if (!status) {
      return NextResponse.json({ error: "Missing status parameter." }, { status: 400 });
    }

    const updatedLead = await prisma.lead.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json({ success: true, lead: updatedLead });
  } catch (err: any) {
    console.error("PATCH lead API error:", err);
    return NextResponse.json({ error: "Database update failed." }, { status: 500 });
  }
}

// Delete lead
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    if (!(await isAuthorized(request))) {
      return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
    }

    const { id } = params;

    await prisma.lead.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("DELETE lead API error:", err);
    return NextResponse.json({ error: "Database deletion failed." }, { status: 500 });
  }
}
