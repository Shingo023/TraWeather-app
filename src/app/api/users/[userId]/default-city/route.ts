import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { PrismaClient } from "@prisma/client";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const prisma = new PrismaClient();

export async function GET(
  req: Request,
  { params }: { params: { userId: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (session.user.id !== params.userId) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const defaultCity = await prisma.userFavoriteCity.findFirst({
      where: {
        userId: params.userId,
        isDefault: true,
      },
      include: {
        favoriteCity: true,
      },
    });

    if (!defaultCity) {
      return NextResponse.json(
        { error: "Default city not found" },
        { status: 404 }
      );
    }

    const { customName, favoriteCity } = defaultCity;
    const { latitude, longitude, address, placeId } = favoriteCity;
    return NextResponse.json({
      customName,
      latitude,
      longitude,
      address,
      placeId,
    });
  } catch (error) {
    console.error("Error fetching default city:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT request to unset the current default city or update the home location (default city)
export async function PUT(req: Request) {
  const { currentHomeLocationId, newHomeLocationId } = await req.json();

  if (!currentHomeLocationId && !newHomeLocationId) {
    return NextResponse.json(
      { error: "At least one city ID is required" },
      { status: 400 }
    );
  }

  try {
    await prisma.$transaction(async (prisma) => {
      // Step 1: Set the old default city to isDefault: false (if provided)
      if (currentHomeLocationId) {
        await prisma.userFavoriteCity.update({
          where: { id: Number(currentHomeLocationId) },
          data: { isDefault: false },
        });
      }

      // Step 2: Set the new default city to isDefault: true
      if (newHomeLocationId) {
        await prisma.userFavoriteCity.update({
          where: { id: Number(newHomeLocationId) },
          data: { isDefault: true },
        });
      }
    });

    return NextResponse.json(
      {
        message: "Default city updated successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating default city:", error);
    return NextResponse.json(
      { error: "Failed to update default city" },
      { status: 500 }
    );
  }
}
