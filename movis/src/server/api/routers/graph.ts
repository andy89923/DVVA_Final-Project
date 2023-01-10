import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const graphRouter = createTRPCRouter({
  //move process to frontend tomorrow
  linkRatingBetween: publicProcedure
    .input(z.object({ minRating: z.number(), maxRating: z.number() }))
    .query( async ({ ctx, input }) => {
      const userRatings = await ctx.prisma.user.findMany({
        include: {
          ratings: {
            include: {
              movie: {
                select: {
                  id: true,
                  title: true,
                }
              }
            },
            where: {
              rating: {
                gte: input.minRating,
                lte: input.maxRating,
              }
            },
          }
        },
      });

      //get appeared movies
      const appearedMovies = userRatings.reduce((unique, user) => {
        user.ratings.forEach((rating) => {
          unique[rating.movie.id] = rating.movie
        });
        return unique;
      }, {} as Record<number, { id: number; title: string }>);
      const movieNodes = Object.values(appearedMovies).map((node) => {
        return {
          id: node.id.toString(),
          name: node.title,
          val: 10,
        }
      });
      const userNodes = userRatings.map((user) => {
        return {
          id: (user.id + movieNodes.length).toString(),
          name: `User ID:${user.id}`,
        }
      });
      const links = userRatings.reduce((links, user) => {
        user.ratings.forEach((rating) => {
          links.push({
            source: (user.id + movieNodes.length).toString(),
            target: (rating.movie.id).toString(),
          })
        });
        return links;
      }, [] as { source: string; target: string; }[]);

      const graph = {
        nodes: [...movieNodes, ...userNodes],
        links: links
      }

      return graph;
    }),
});
