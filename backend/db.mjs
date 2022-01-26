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

export async function getCountriesByContinent(continent) {
  const res = await prisma.country.findMany({
    orderBy: {
      Population: "desc",
    },
    where: {
      Continent: {
        equals: continent,
      },
    },
  });
  console.log(res);
  return res;
}
