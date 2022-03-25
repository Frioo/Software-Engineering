import Prisma from "@prisma/client";
import { getCountries } from "./db.mjs";
const { PrismaClient } = Prisma;

async function getContinentCountries(continent) {
  const options = {
    continent
  }
  const res = await getCountries(options);
  return res;
}

async function getNCountries(limit) {
  const options = {
    limit
  }
  const res = await getCountries(options)
  return res.length
}
test('GetCountries continent filter', async () => {
  const countries = await getContinentCountries('Asia');
  countries.forEach(c => {
    expect(c.Continent).toBe("Asia");
  })
})

test('GetNCountries', async () => {
  let limit = 10
  const res = await getNCountries(limit)
  expect(res).toBe(limit)
}) 