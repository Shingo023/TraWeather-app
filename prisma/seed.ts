import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  // Delete all existing records from the tables
  await prisma.userFavoriteCity.deleteMany({});
  await prisma.favoriteCity.deleteMany({});
  await prisma.user.deleteMany({});

  // Hash the password
  const hashedPassword = await bcrypt.hash("password123", 10);

  // Create favorite city (London) with place_id
  const london = await prisma.favoriteCity.create({
    data: {
      cityName: "London",
      address: "London, UK",
      latitude: 51.5072178,
      longitude: -0.1275862,
      timeZone: "Europe/London",
      placeId: "ChIJdd4hrwug2EcRmSrV3Vo6llI",
    },
  });

  // Seed user
  const user1 = await prisma.user.create({
    data: {
      name: "Bob",
      email: "bob@example.com",
      password: hashedPassword,
    },
  });

  // Create relation between user and favorite city (London)
  await prisma.userFavoriteCity.create({
    data: {
      userId: user1.id,
      favoriteCityId: london.id,
      isDefault: true,
      customName: "London",
      displayOrder: 1,
    },
  });

  console.log("Seeded user and favorite city (London).");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
