import { PrismaClient } from "@prisma/client";
import { seedDatabase } from "../src/lib/seed-data";

const prisma = new PrismaClient();

async function main() {
  await seedDatabase(prisma);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error("Seed nije uspeo.", error);
    await prisma.$disconnect();
    process.exit(1);
  });
