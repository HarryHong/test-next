import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// POST /api/collections/:id/bids
// Required fields in body: title, authorEmail
// Optional fields in body: content

export async function POST(
  req: NextResponse,
  { params }: { params: { collection_id: string } }
) {
  const id = params.collection_id
  const { userId, price} = await req.json();
  const result = await prisma.bid.create({
    data: {
      user:  {
        connect: { id: userId }
      },
      price,
      collection: {
        connect: { id: Number(id) }
      }
    },
  })
  return NextResponse.json(result)
}

// GET /api/collections/:id/bids
// Required fields in body: title, authorEmail
// Optional fields in body: content

export async function GET(
  req: NextResponse,
  { params }: { params: { collection_id: string } }
) {
  const id = params.collection_id
  const result = await prisma.bid.findMany({
    where: { collectionId: Number(id) }
  })
  return NextResponse.json(result)
}