import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
// POST /api/collections
// Required fields in body: title, authorEmail
// Optional fields in body: content

export async function POST(
  req: NextResponse
  ) {
    const { userId, name, description, stocks } = await req.json();
    const result = await prisma.collection.create({
      data: {
        user:  {
          connect: { id: userId }
        },
        name,
        description,
        stocks,
      },
    })
  return NextResponse.json(result)
}

export async function GET(
  req: NextResponse
  ) {
  const result = await prisma.collection.findMany({
  })
  return NextResponse.json(result)
}