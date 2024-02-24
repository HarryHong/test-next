import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// POST /api/collections/:id/bids/:id
// Required fields in body: title, authorEmail
// Optional fields in body: content

export async function POST(
  req: NextResponse,
  { params }: { params: { collection_id: string, bid_id: string } }
) {
  const cid = params.collection_id
  const bid = params.bid_id
  const data = await req.json()
  const result = await prisma.bid.update({
    where: { id: Number(bid) },
    data: data,
  })

  return NextResponse.json(result)
}

// GET /api/collections/:id
// Required fields in body: title, authorEmail
// Optional fields in body: content

export async function GET(
  req: NextResponse,
  { params }: { params: { collection_id: string, bid_id: string } }
) {
  const id = params.bid_id
  const result = await prisma.collection.findUnique({
    where: { id: Number(id) }
  })
  return NextResponse.json(result)
}

// DELETE /api/collections/:id
// Required fields in body: title, authorEmail
// Optional fields in body: content

export async function DELETE(
  req: NextResponse,
  { params }: { params: { collection_id: string, bid_id: string } }
) {
  const id = params.bid_id
  // delete all related bids
  // await prisma.bid.deleteMany({
  //   where: { collectionId: Number(id) }
  // })
  const result = await prisma.bid.delete({
    where: { id: Number(id) }
  })
  
  return NextResponse.json(result)
}