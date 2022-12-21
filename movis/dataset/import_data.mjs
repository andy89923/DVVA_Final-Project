import { PrismaClient } from '@prisma/client'
// import myPerson from './person.json' assert { type: "json" };
import myCountry from './country.json' assert { type: "json" };
import myKeyword from './keyword.json' assert { type: "json" };
import myCompany from './company.json' assert { type: "json" };
import myGenre from './genre.json' assert { type: "json" };
import myLanguage from './language.json' assert { type: "json" };
import myUser from './user.json' assert { type: "json" };
import myRating from './rating.json' assert { type: "json" };
import myMovie from './movie.json' assert { type: "json" };


//node import_data.ts
// const myPerson_data = myPerson.map((val) => {
//   return {
//     id: val.id,
//     name: val.name,
//     gender: val.gender,
//     popularity: val.popularity
//   }
// })

const myCountry_data = myCountry.map((val) => {
  return {
    id: val.id,
    iso_3166_1: val.iso_3166_1,
    name: val.name
  }
})

const myKeyword_data = myKeyword.map((val) => {
  return {
    id: val.id,
    name: val.name
  }
})

const myCompany_data = myCompany.map((val) => {
  return {
    id: val.id,
    name: val.name
  }
})

const myGenre_data = myGenre.map((val) => {
  return {
    id: val.id,
    name: val.name
  }
})

const myLanguage_data = myLanguage.map((val) => {
  return {
    id: val.id,
    iso_639_1: val.iso_639_1,
    name: val.name,
  }
})

const myUser_data = myUser.map((val) => {
  return {
    id: val.id,
  }
})

const myRating_data = myRating.map((val) => {
  return {
    id: val.id,
    movieId: val.movieId,
    userId: val.userId,
    rating: val.rating,
    createdAt: val.createdAt,
    updatedAt: val.updatedAt
  }
}).slice(0, 5000);

const myMovie_data = myMovie.map((val) => {
  return {
    id: val.id,
    title: val.title,
    overview: val.overview,
    runtime: val.runtime,
    poster_url: val.poster_url,
    release_date: val.release_date,
    budget: val.budget,
    revenue: val.revenue,
    original_language_id: val.original_language_id,
    // spoken_languages: val.spoken_languages,
    // keywords: val.keywords,
    // crew: val.crew,
    // genres: val.genres,
    // countries: val.countries,
    // companies: val.companies,
    popularity: val.popularity,
    vote_average: val.vote_average,
    vote_count: val.vote_count,
    // ratings: val.ratings
  }
}).slice(0, 5000);

const prisma = new PrismaClient()

async function main() {
  // ... you will write your Prisma Client queries here

  const toCreate = []
  // toCreate.push(prisma.person.createMany({data: myPerson_data, skipDuplicates: true}))
  // toCreate.push(prisma.country.createMany({data: myCountry_data, skipDuplicates: true}))
  // toCreate.push(prisma.keyword.createMany({data: myKeyword_data, skipDuplicates: true}))
  // toCreate.push(prisma.company.createMany({data: myCompany_data, skipDuplicates: true}))
  // toCreate.push(prisma.genre.createMany({data: myGenre_data, skipDuplicates: true}))
  toCreate.push(prisma.language.createMany({data: myLanguage_data, skipDuplicates: true}))
  // toCreate.push(prisma.user.createMany({data: myUser_data, skipDuplicates: true}))
  // toCreate.push(prisma.rating.createMany({data: myRating_data, skipDuplicates: true}))
  // toCreate.push(prisma.movie.createMany({data: myMovie_data, skipDuplicates: true}))
  await prisma.$transaction(toCreate)
}

console.log("start")
// console.log([myGenre[0]])
main()
  .then(async () => {
    await prisma.$disconnect()
    console.log('success')
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

