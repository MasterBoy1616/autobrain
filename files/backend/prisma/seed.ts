import prisma from "../src/prismaClient";
import bcrypt from "bcrypt";

async function main() {
  const pass = await bcrypt.hash("password123", 10);
  const user = await prisma.user.upsert({
    where: { email: "test@autobrain.ai" },
    update: {},
    create: {
      name: "Test User",
      email: "test@autobrain.ai",
      passwordHash: pass
    }
  });

  await prisma.car.upsert({
    where: { id: "car-demo-1" },
    update: {},
    create: {
      id: "car-demo-1",
      userId: user.id,
      plate: "34ABCD1",
      brandModel: "Ford Fiesta 2016",
      km: 92000
    }
  });

  console.log("Seed finished");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });