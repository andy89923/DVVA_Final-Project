import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const graphRouter = createTRPCRouter({
  // linkRatingBetween: publicProcedure
  //   .input(z.object({ minRating: z.number(), maxRating: z.number() }))
  //   .query( async ({ ctx, input }) => {
  //     const userRatings = await ctx.prisma.user.findMany({
  //       include: {
  //         ratings: {
  //           include: {
  //             movie: {
  //               select: {
  //                 id: true,
  //                 title: true,
  //               }
  //             }
  //           },
  //           where: {
  //             rating: {
  //               gte: input.minRating,
  //               lte: input.maxRating,
  //             }
  //           },
  //         }
  //       },
  //     });

  //     //get appeared movies
  //     const appearedMovies = getUniqueDict(userRatings, ["ratings"], ["movie"], "id") as Record<number, { id: number; title: string }>;
      
  //     const movieNodes = Object.values(appearedMovies).map((node) => {
  //       return {
  //         id: node.id,
  //         name: node.title,
  //         val: 10,
  //       }
  //     });

  //     const userNodes = userRatings.map((user) => {
  //       return {
  //         id: user.id + movieNodes.length,
  //         name: `User ID:${user.id}`,
  //         val: 1,
  //       }
  //     });

  //     const links = userRatings.reduce((links, user) => {
  //       user.ratings.forEach((rating) => {
  //         links.push({
  //           source: user.id + movieNodes.length,
  //           target: rating.movie.id,
  //         })
  //       });
  //       return links;
  //     }, [] as { source: number; target: number; }[]);

  //     const graph = {
  //       nodes: [...movieNodes, ...userNodes],
  //       links: links
  //     }

  //     return graph;
  //   }),

  // linkKeywords: publicProcedure
  //   .input(z.object({ minYear: z.number(), maxYear: z.number() }))
  //   .query( async ({ ctx, input }) => {
  //     const keywords = await ctx.prisma.keyword.findMany({
  //       include: {
  //         movies: {
  //           where: {
  //             release_date: {
  //               gte: new Date(input.minYear, 0, 1).toISOString(),
  //               lte: new Date(input.maxYear, 12, 31).toISOString(),
  //             },
  //           }
  //         }
  //       },
  //     });
  //   }),
});
