import { PrismaClient } from '@prisma/client'
import myPerson from './person.json' assert { type: "json" };
import myCountry from './country.json' assert { type: "json" };
import myKeyword from './keyword.json' assert { type: "json" };
import myCompany from './company.json' assert { type: "json" };
import myGenre from './genre.json' assert { type: "json" };
import myLanguage from './language.json' assert { type: "json" };
import myUser from './user.json' assert { type: "json" };
import myRating from './rating.json' assert { type: "json" };
import myMovie from './movie.json' assert { type: "json" };


// node import_data.ts
const myPerson_data = myPerson.map((val) => {
  return {
    id: val.id,
    name: val.name,
    gender: val.gender,
    popularity: val.popularity
  }
})

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
})

const myMovie_data = myMovie.map((val) => {
  return {
    // data: {
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
      // spoken_languages: {
      //   connect: val.spoken_languages.map((id) => {return {"id": id}})
      // },
      // keywords: val.keywords,
      // keywords: {
      //   connect: val.keywords.map((id) => {return {"id": id}})
      // },
      
      // crew: val.crew,
      // crew: {
      //   connect: val.crew.map((id) => {return {"id": id}})
      // },

      // genres: val.genres,
      // genres: {
      //   connect: val.genres.map((id) => {return {"id": id}})
      // },

      // countries: val.countries,
      // countries: {
      //   connect: val.countries.map((id) => {return {"id": id}})
      // },
      
      popularity: val.popularity,
      vote_average: val.vote_average,
      vote_count: val.vote_count,

      // ratings: val.ratings
      // ratings: {
      //   connect: val.ratings.map((id) => {return {"id": id }})
      // },

      //companies: val.companies
      // companies: {
      //   connect: val.companies.map((id) => {return {"id": id}})
      // }

    // },
    // include: {
    //   spoken_languages: true,
    //   // keywords: true,
    //   // crew: true,
    //   // countries: true,
    //   // companies: true,
    //   // ratings: true,
    //   // genres: true
    // }
  }
})

const myMovie_relation_data = myMovie.map((val) => {
  return {
    where: {
      id: val.id
    },
    data: {
      spoken_languages: {
        connect: val.spoken_languages.map((id) => {return {"id": id}})
      },
      keywords: {
        connect: val.keywords.map((id) => {return {"id": id}})
      },
      crew: {
        connect: val.crew.map((id) => {return {"id": id}})
      },
      genres: {
        connect: val.genres.map((id) => {return {"id": id}})
      },
      countries: {
        connect: val.countries.map((id) => {return {"id": id}})
      },
      ratings: {
        connect: val.ratings.map((id) => {return {"id": id }})
      },
      companies: {
        connect: val.companies.map((id) => {return {"id": id}})
      }
    }
  }
})


const prisma = new PrismaClient()


const createBySlice = async (data, model) => {
  const sliceSize = 5000
  const sliceCount = Math.ceil(data.length / sliceSize)
  console.log("slicing "+model+", into "+sliceCount+" transactions...")
  for (let i = 0; i < sliceCount; i++) {
    const slice = data.slice(i * sliceSize, (i + 1) * sliceSize)
    await prisma[model].createMany({data: slice, skipDuplicates: true})
  }
}

async function main() {
  // ... you will write your Prisma Client queries here

  const toCreate = []
  // console.log(myMovie_data[0])
  // toCreate.push(prisma.movie.create(myMovie_data[0]))

  // toCreate.push(prisma.country.createMany({data: myCountry_data, skipDuplicates: true}))
  // toCreate.push(prisma.keyword.createMany({data: myKeyword_data, skipDuplicates: true}))
  // toCreate.push(prisma.company.createMany({data: myCompany_data, skipDuplicates: true}))
  // toCreate.push(prisma.genre.createMany({data: myGenre_data, skipDuplicates: true}))
  // console.log(myLanguage_data[0])
  // toCreate.push(prisma.language.createMany({data: myLanguage_data, skipDuplicates: true}))
  // toCreate.push(prisma.user.createMany({data: myUser_data, skipDuplicates: true}))

  // toCreate.push(prisma.person.createMany({data: myPerson_data, skipDuplicates: true}))
  // toCreate.push(prisma.rating.createMany({data: myRating_data, skipDuplicates: true}))
  // toCreate.push(prisma.movie.createMany({data: myMovie_data, skipDuplicates: true}))

  // console.log(myMovie_relation_data[0])
  myMovie_relation_data.slice(0, 50).forEach((val) =>
    toCreate.push(prisma.movie.update(myMovie_relation_data[0]))
  )
  // console.log(myMovie_relation_data[0].data.spoken_languages.connect)
  // toCreate.push(prisma.movie.update(myMovie_relation_data[0]))
  await prisma.$transaction(toCreate)

  // createBySlice(myPerson_data, 'person')
  // createBySlice(myRating_data, 'rating')
  // createBySlice(myMovie_data, 'movie')

  //create first movie to test
  // console.log(myMovie_data[1]) //overview too long???

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

