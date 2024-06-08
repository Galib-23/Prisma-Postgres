# Calibrating Prisma with Postgres on node.js
<br>

**1.** First run this command to initiate the **package.json** file
```bash
npm init -y
```

**2.** Install the following dependencies:

```bash
npm i --save-dev prisma typescript ts-node @types/node nodemon
```

**3.** Now configure the **tsconfig.json** file as like this:
```javascript
{
    {
    "compilerOptions": {
        "sourceMap": true,
        "outDir": "dist",
        "strict": true,
        "lib": ["ESNext"],
        "esModuleInterop": true
        }
    }
}
```

**4.** Initialize prisma along with the database using the following command:
```bash
npx prisma init --datasource-provider postgresql
``` 

**5.** Now we can see that a boilerplate **schema.prisma** file along with a **.env** file is created.

**6.** Setup a local postgres database and put the connection url in **.env** file.

**7.** Create the models. e.g:
```prisma
model User {
  id   Int    @id @default(autoincrement())
  name String
}
```
**8.** Add the created model to make changes in the database.
```bash
npx prisma migrate dev --name init
```
*it would create a new migration file to interact with the database.*

**9.** Install the prisma client library:
```bash
npm i @prisma/client
```

**10.** *Manually regenarate prisma client:*
```bash
npx prisma generate
```

**11.** It would give some pieces of code as follows:
```javascript
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
```

**12.** Create a file **script.ts** and paste that code.

***#** Boilerplate for **script.ts** :*
```typescript
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
```

**13.** Playing with models:
```prisma
model User {
  //field level attributes
  id             String          @id @default(uuid())
  name           String
  email          String          @unique
  age            Int
  role           Role            @default(BASIC)
  writtenPosts   Post[]          @relation("WrittenPosts")
  favoritedPosts Post[]          @relation("FavoritePosts")
  userPreference UserPreference?

  //block level attributes
  @@unique([age, name])
  @@index([email])
}

model UserPreference {
  id           String  @id @default(uuid())
  emailUpdates Boolean
  user         User    @relation(fields: [userId], references: [id])
  userId       String  @unique
}

model Post {
  id            String     @id @default(uuid())
  title         String
  averageRating Float
  createdAt     DateTime   @default(now())
  updatedAt     DateTime   @updatedAt
  author        User       @relation("WrittenPosts", fields: [authorId], references: [id])
  authorId      String
  favoritedBy   User?      @relation("FavoritePosts", fields: [favoritedById], references: [id])
  favoritedById String?
  categoryId    String?
  categories    Category[]

  //@@id([title, authorId])
}

model Category {
  id    String @id @default(uuid())
  name  String @unique
  posts Post[]
}

enum Role {
  BASIC
  ADMIN
}
```

**14.** After creating the model/Schema, Migrate to database:
```bash
npx prisma migrate dev
```

**15.** Regenerate Prisma client
```bash
npx prisma generate
```