import Prisma from "@prisma/client";
const { PrismaClient } = Prisma;

export const prisma = new PrismaClient();

export async function getCountriesByPopluation() {
  const res = await prisma.country.findMany({
    orderBy: {
      Population: "desc",
    },
  });
  console.log(res);
  return res;
}
