import Prisma from "@prisma/client";
const { PrismaClient, country_Continent } = Prisma;

export const prisma = new PrismaClient();

export async function getCountriesByPopluation() {
  const res = await prisma.country.findMany({
    orderBy: {
      Population: "desc",
    },
  });
  //console.log(res);
  return res;
}

export async function getCountriesByContinent(continent) {
  const continents = Object.values(country_Continent);
  if (!continents.includes(continent)) {
    console.log(
      `countries by continent: invalid continent ${continent}, setting to default.`
    );
    continent = continents[0];
  }
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
  //console.log(res);
  return res;
}
