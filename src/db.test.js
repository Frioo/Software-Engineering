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

async function getRegionCountries(region) {
  const options = {
    region
  }
  const res = await getCountries(options)
  return res;
}
test('GetCountries continent filter', async () => {
  let continent = 'Asia'
  const countries = await getContinentCountries(continent);
  countries.forEach(c => {
    expect(c.Continent).toBe(continent);
  })
})

test('GetNCountries', async () => {
  let limit = 10
  const res = await getNCountries(limit)
  expect(res).toBe(limit)
}) 

test('GetCountries region filter', async () => {
  let region = 'Middle East'
  const countries = await getRegionCountries(region)
  countries.forEach(element => {
    expect(element.Region).toBe(region)
  })

})
