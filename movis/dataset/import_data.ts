import { PrismaClient } from '@prisma/client'
import myMovie from './movie.json'
import myPerson from './person.json'
import myCountry from './country.json'
import myKeyword from './keyword.json'
import myCompany from './company.json'
import myGenre from './genre.json'
import myRating from './rating.json'
import myUser from './user.json'
//ts-node import_data.ts

const prisma = new PrismaClient()

async function main() {
  // ... you will write your Prisma Client queries here
  const createMovie = prisma.movie.updateMany({data: myMovie})
  const createPerson = prisma.person.updateMany({data: myPerson})
  const createCountry = prisma.country.updateMany({data: myCountry})
  const createKeyword = prisma.keyword.updateMany({data: myKeyword})
  const createCompany = prisma.company.updateMany({data: myCompany})
  const createGenre = prisma.genre.updateMany({data: myGenre})
  const createRating = prisma.rating.updateMany({data: myRating})
  const createUser = prisma.user.updateMany({data: myUser})
  
  await prisma.$transaction([
    createMovie,
    createPerson,
    createCountry,
    createKeyword,
    createCompany,
    createGenre,
    createRating,
    createUser
  ])
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })