import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const movieRouter = createTRPCRouter({
  betweenYearRange: publicProcedure
    .input(z.object({ minYear: z.number(), maxYear: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.movie.findMany({
        where: {
          release_date: {
            gte: new Date(input.minYear, 0, 1).toISOString(),
            lte: new Date(input.maxYear, 11, 31).toISOString(),
          },
        },
        include: {
          genres: true,
        },
      });
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.movie.findMany({
      include: {
        genres: true,
      },
    });
  }),
});
