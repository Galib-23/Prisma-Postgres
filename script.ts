import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // ....  Prisma client queries here
  const user = await prisma.user.create({
    data: {
        name: "Galib"
    }
  });
  console.log(user);
}

main()
  .catch((e) => {
    console.log(e.message);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
