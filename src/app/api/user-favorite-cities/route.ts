import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const userFavoriteCities = await prisma.userFavoriteCity.findMany({
      where: { userId: userId },
      select: {
        id: true,
        customName: true,
        isDefault: true,
        favoriteCity: true,
      },
    });
    return NextResponse.json(userFavoriteCities);
  } catch (error) {
    console.error("Error fetching favorite cities:", error);
    return NextResponse.json(
      { error: "Failed to fetch favorite cities" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { userId, customName, favoriteCityId } = await request.json();
    const userFavoriteCitiesCount = await prisma.userFavoriteCity.count({
      where: { userId },
    });

    const userFavoriteCity = await prisma.userFavoriteCity.create({
      data: {
        userId,
        customName,
        favoriteCityId,
        displayOrder: userFavoriteCitiesCount + 1,
      },
    });
    return NextResponse.json(
      { userFavoriteCity, message: "City has been added to your favorites!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error adding city to favorites:", error);
    return NextResponse.json(
      { error: "Error adding city to favorites" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { userId, favoriteCityId } = await request.json();

    await prisma.$transaction(async (prisma) => {
      // Step 1: Remove the city from user's favorites
      await prisma.userFavoriteCity.deleteMany({
        where: {
          userId,
          favoriteCityId,
        },
      });

      // Step 2: Check if any users still have this city as a favorite
      const remainingFavorites = await prisma.userFavoriteCity.findFirst({
        where: {
          favoriteCityId,
        },
      });

      // Step 3: If no users have the city as a favorite, remove it from the FavoriteCity table
      if (!remainingFavorites) {
        await prisma.favoriteCity.delete({
          where: {
            id: favoriteCityId,
          },
        });
      }
    });

    return NextResponse.json(
      { message: "City has been removed from your favorites." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error unbookmarking city:", error);
    return NextResponse.json(
      { error: "Failed to remove city from favorites" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const { customName } = await req.json();

    if (!id || !customName) {
      return NextResponse.json(
        { message: "Missing required parameters" },
        { status: 400 }
      );
    }

    const updatedCity = await prisma.userFavoriteCity.update({
      where: { id: Number(id) },
      data: {
        customName,
      },
    });

    return NextResponse.json(
      { message: "City name updated", updatedCity },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to update city name" },
      { status: 500 }
    );
  }
}
