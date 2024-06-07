# Creating a Node.js server with Express and Typescript
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