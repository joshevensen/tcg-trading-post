import { PrismaClient } from "@prisma/client";
import userSeeds from "./seeds/user.seeds.js";
import lorcanaSeeds from "./seeds/games/lorcana.seeds.js";

const prisma = new PrismaClient();

async function main() {
  userSeeds(prisma);
  lorcanaSeeds(prisma);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
