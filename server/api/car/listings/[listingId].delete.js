import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const { listingsId } = event.context.params;

  return await prisma.car.delete({
    where: {
      id: parseInt(listingsId),
    },
  });
});
