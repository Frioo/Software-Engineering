import Prisma from "@prisma/client";
const { PrismaClient, country_Continent } = Prisma;

export const prisma = new PrismaClient();

//Countries
export async function getCountriesByPopluation() {
  const res = await prisma.country.findMany({
    orderBy: {
      Population: "desc",
    },
  });
  //console.log(res);
  return res;
}

export async function getTopCountriesByCount(count) {
  const res = await prisma.country.findMany({
    orderBy: {
      Population: "desc"
    },
    take: count
  });
  console.log(res);
  return res;
}

//No need to sanity check the count
export async function getTopCountriesByCountAndContinent(continent, count) {
  //Sanity check for invalid continent
  const continents = Object.values(country_Continent);
  if (!continents.includes(continent)) {
    console.log(
      `countries by continent: invalid continent ${continent}, setting to default.`
    );
  }
  const res = await prisma.country.findMany({
    orderBy: {
      Population: "desc"
    },
    where: {
      Continent: {
        equals: continent,
      },
    },
    take: count
  });
  console.log(res);
  return res;
}
//Continent
export async function getCountriesByContinent(continent) {
  const continents = Object.values(country_Continent);
  //Sanity check for invalid continent
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
