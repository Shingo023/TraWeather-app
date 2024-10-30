import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { userId, cityOrder } = await req.json();

  if (!userId || !Array.isArray(cityOrder)) {
    return NextResponse.json({ message: "Invalid input" }, { status: 400 });
  }

  try {
    // Start a transaction to update the display order for each city
    await prisma.$transaction(
      cityOrder.map((cityId, index) =>
        prisma.userFavoriteCity.update({
          where: { id: cityId },
          data: {
            displayOrder: index,
          },
        })
      )
    );

    return NextResponse.json(
      { message: "Order updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
