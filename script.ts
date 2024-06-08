import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// --->> TO LOG THE QUERIES
//const prisma = new PrismaClient({log: ["query"]});

async function main() {
  // ....  Prisma client queries here
  //   const user = await prisma.user.findMany();
  //   console.log(user);
  //   await prisma.user.deleteMany();
  const user = await prisma.user.create({
    data: {
        name: "galib2",
        email: "galib2@gmail.com",
        age: 22,
    }
  })
  console.log(user)
}

main()
  .catch((e) => {
    console.log(e.message);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
