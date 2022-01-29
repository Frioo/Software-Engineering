import Prisma from "@prisma/client";
const { PrismaClient, country_Continent } = Prisma;

export const prisma = new PrismaClient();

/*
 * Universal method to retrieve countries from the database.
 * Allows filters, sorting modes and limits to be set via the options object.
 */
export async function getCountries(options) {
  console.log("GetCountries: Retrieving countries", options);
  // Extract options
  let { limit, continent, region } = options;

  // Validate limit value (if it's set)
  if (limit) {
    limit = parseInt(limit);
    if (limit <= 0) {
      console.log(`GetCountries: Invalid limit value: ${limit}`);
      limit = undefined;
    }
  }
  // Valid continent values
  const continents = Object.values(country_Continent);
  // Sanity check for invalid continent
  if (!continents.includes(continent)) {
    const defaultContinent = continents[0];
    console.log(
      `GetCountries: Invalid continent '${continent}', setting to default (${defaultContinent})`
    );
    continent = defaultContinent;
  }

  // Build and execute the countries query
  const res = await prisma.country.findMany({
    // Default sorting: by population, descending
    orderBy: {
      Population: "desc",
    },
    where: {
      // If a continent filter is set, filter to only get countries from that continent
      ...(continent && { Continent: { equals: continent } }),
      // Same filter for region
      ...(region && { Region: { equals: region } }),
    },
    // Similarily, only get the top <limit> records if a limit is set
    ...(limit && { take: limit }),
  });
  return res;
}
