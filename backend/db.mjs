import Prisma from "@prisma/client";
const { PrismaClient } = Prisma;

export const prisma = new PrismaClient();

export async function getCountriesByPopluation() {
  const res = await prisma.country.findMany({
    orderBy: {
      Population: "desc",
    }
  });
  console.log(res);
  return res;
}

export async function getCountriesByContinent(contient) {
  const res = await prisma.country.findMany({
    orderBy: {
      Population: "desc",
    },
    where: {
      Continent: {
        equals: contient,
      },
    },
  });
  console.log(res);
  return res;
}