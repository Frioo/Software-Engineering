import Prisma from "@prisma/client";
import { getCountries } from "./db.mjs";
const { PrismaClient } = Prisma;

async function getCountriesAsia() {
  const options = {
    continent: "Asia"
  };
  const res = await getCountries(options);
  return res;
}

test('GetCountries continent filter', async () => {
  const countries = await getCountriesAsia();
  countries.forEach(c => {
    expect(c.Continent).toBe("Asia");
  })
})