import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // ....  Prisma client queries here
  //   const user = await prisma.user.findMany();
  //   console.log(user);
  await prisma.user.deleteMany();
}

main()
  .catch((e) => {
    console.log(e.message);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
