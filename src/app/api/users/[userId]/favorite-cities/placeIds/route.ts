import { authOptions } from "@/lib/authOptions";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

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
    const favoriteCities = await prisma.userFavoriteCity.findMany({
      where: {
        userId: params.userId,
      },
      select: {
        favoriteCity: {
          select: {
            placeId: true,
          },
        },
      },
    });

    const favoriteCitiesPlaceIds = favoriteCities.map(
      (city) => city.favoriteCity.placeId
    );

    return NextResponse.json(favoriteCitiesPlaceIds, { status: 200 });
  } catch (error) {
    console.error("Error fetching favorite cities place IDs:", error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
