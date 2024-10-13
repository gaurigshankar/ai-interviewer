// prisma/seed.ts
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { PrismaClient } = require("@prisma/client");
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { hash } = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  const password = await hash("", 10); // provide the password
  await prisma.user.create({
    data: {
      name: "Interviewer User",
      email: "interviewer@example.com",
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      password,
      role: "interviewer",
    },
  });
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
