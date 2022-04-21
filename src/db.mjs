import Prisma from "@prisma/client";
const { country_Continent } = Prisma;

//export const prisma = new PrismaClient();
import prisma from "./js/client.mjs";

/* 
  Handles parameters for retrieving countries.
  Receives an options object with HTTP parameters.
  Validates param values / sets defaults when needed.
  Transforms that object into Prisma-compatible query options.
*/
export function getCountryOptions(options) {
  // Extract options
  let { limit, continent, region, sortby } = options;

  // Validate limit value (if it's set)
  if (limit) {
    limit = parseInt(limit);
    if (limit <= 0) {
      console.log(
        `GetCountries: Invalid limit value: ${limit}; unsetting limit.`
      );
      limit = undefined;
    }
  }

  // Valid continent values
  const continents = Object.values(country_Continent);

  // Sanity check for invalid continent (if set)
  if (continent && !continents.includes(continent)) {
    const defaultContinent = continents[0];
    console.log(
      `GetQueryOptions: Invalid continent '${continent}', setting to default (${defaultContinent})`
    );
    continent = defaultContinent;
  }

  // Define column sorting based on sortby parameter
  let orderBy = {};
  switch (sortby) {
    case "Pop_Asc":
      orderBy = {
        Population: "asc",
      };
      break;

    case "Pop_Desc":
      orderBy = {
        Population: "desc",
      };
      break;

    default:
      orderBy = {
        Population: "desc",
      };
      break;
  }

  return {
    // Default sorting: by population, descending
    orderBy,
    where: {
      // If a continent filter is set, filter to only get countries from that continent
      ...(continent && { Continent: { equals: continent } }),
      // Same filter for region
      ...(region && { Region: { equals: region } }),
    },
    // Similarily, only get the top <limit> records if a limit is set
    ...(limit && { take: limit }),
  };
}

/*
 * Universal method to retrieve countries from the database.
 * Allows filters, sorting modes and limits to be set via the options object.
 */
export async function getCountries(options) {
  console.log("GetCountries: Retrieving countries", options);

  const opts = getCountryOptions(options);

  // Build and execute the countries query
  const res = await prisma.country.findMany({
    // Get all cities related to this country
    include: {
      city: true,
    },
    // Expand transformed options for Prisma to use
    ...opts,
  });

  // Find the capital city for each country, and asign that object to `Capital` field
  res.map((country) => {
    const capitalId = country.Capital;
    const capital = country.city.find((c) => c.ID === capitalId);
    country.CapitalCity = capital;
    return country;
  });

  return res;
}

export async function LivingInCities(options) {
  let res = await getCountries(options)
  let pop = 0
  res.forEach(country => {
    let countryPopulation = country.city.reduce((total, city) => {
      total += city.Population;
      return total;
    }, 0);
    let notLivingInCitiesPop = country.Population - countryPopulation
    console.log("Total population of people living in cities: ", country.Name, countryPopulation)
    console.log("Total country not living in cities pop: ", country.Name, notLivingInCitiesPop)
  });
  return pop
}